/* ==========================================================================
   R&G COLLECTIONS - REAL-TIME LIVE VISITOR PRESENCE ENGINE
   Accurately counts 1 when single user is active, increments when others join,
   and decrements immediately when visitors disconnect.
   Zero external dependencies, cross-device and cross-tab synchronized.
   ========================================================================== */

const PRESENCE_TOPIC = 'rg_collections_presence_pulse_v2';
const WS_URL = `wss://ntfy.sh/${PRESENCE_TOPIC}/ws`;
const HTTP_URL = `https://ntfy.sh/${PRESENCE_TOPIC}`;
const HEARTBEAT_INTERVAL_MS = 15000;
const SESSION_TTL_MS = 40000;

// Unique session ID per browser tab/window
const getSessionId = () => {
  try {
    let sid = sessionStorage.getItem('rg_presence_sid');
    if (!sid) {
      sid = 'vis_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem('rg_presence_sid', sid);
    }
    return sid;
  } catch (e) {
    return 'vis_' + Math.random().toString(36).substring(2, 9);
  }
};

const sessionId = getSessionId();

// Map of sessionId -> lastSeenTimestamp
const activeSessions = new Map();
activeSessions.set(sessionId, Date.now());

// Subscribers list
const subscribers = new Set();

let ws = null;
let heartbeatTimer = null;
let pruneTimer = null;
let localChannel = null;

const notifySubscribers = () => {
  pruneDeadSessions();
  // Always count at least the current user (1)
  const count = Math.max(1, activeSessions.size);
  subscribers.forEach(cb => {
    try {
      cb(count);
    } catch (err) {
      console.warn('Presence subscriber error:', err);
    }
  });
};

const pruneDeadSessions = () => {
  const cutoff = Date.now() - SESSION_TTL_MS;
  for (const [id, lastSeen] of activeSessions.entries()) {
    if (id !== sessionId && lastSeen < cutoff) {
      activeSessions.delete(id);
    }
  }
};

// Send heartbeat packet
const sendHeartbeat = (isLeaving = false) => {
  const payload = JSON.stringify({
    id: sessionId,
    t: Date.now(),
    leave: isLeaving
  });

  // Broadcast to local tabs via BroadcastChannel
  if (localChannel) {
    try {
      localChannel.postMessage(payload);
    } catch (e) {
      // ignore
    }
  }

  // Send across devices via WebSocket or HTTP POST
  if (ws && ws.readyState === WebSocket.OPEN && !isLeaving) {
    // ntfy WebSocket is primarily downstream, so use fetch for publishing
  }

  try {
    fetch(HTTP_URL, {
      method: 'POST',
      body: payload,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    }).catch(() => {});
  } catch (e) {
    // Silent resilience
  }
};

const handleIncomingMessage = (rawText) => {
  try {
    const data = typeof rawText === 'string' ? JSON.parse(rawText) : rawText;
    // ntfy wraps payloads in a message property
    let packet = data;
    if (data.message) {
      try {
        packet = JSON.parse(data.message);
      } catch {
        return;
      }
    }

    if (!packet || !packet.id) return;

    if (packet.leave) {
      if (packet.id !== sessionId) {
        activeSessions.delete(packet.id);
        notifySubscribers();
      }
      return;
    }

    activeSessions.set(packet.id, packet.t || Date.now());
    notifySubscribers();
  } catch (err) {
    // Ignore invalid packets
  }
};

// Initialize WebSocket connection
const connectWebSocket = () => {
  if (typeof window === 'undefined') return;

  try {
    ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      handleIncomingMessage(event.data);
    };

    ws.onerror = () => {
      // Silent error handling
    };

    ws.onclose = () => {
      // Reconnect after 5 seconds if still mounted
      setTimeout(() => {
        if (subscribers.size > 0 || typeof window !== 'undefined') {
          connectWebSocket();
        }
      }, 5000);
    };
  } catch (err) {
    // WebSocket unsupported or blocked
  }
};

// Initialize BroadcastChannel for instant local cross-tab communication
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    localChannel = new BroadcastChannel('rg_presence_stream_v1');
    localChannel.onmessage = (event) => {
      handleIncomingMessage(event.data);
    };
  } catch (e) {
    localChannel = null;
  }
}

// Global lifecycle hooks
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    sendHeartbeat(true);
  });
}

let isInitialized = false;

export function initPresence() {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  // Initial heartbeat
  sendHeartbeat(false);

  // Connect to cross-device WebSocket
  connectWebSocket();

  // Periodic heartbeat every 15s
  heartbeatTimer = setInterval(() => {
    sendHeartbeat(false);
  }, HEARTBEAT_INTERVAL_MS);

  // Periodic pruning of inactive sessions every 5s
  pruneTimer = setInterval(() => {
    notifySubscribers();
  }, 5000);
}

export function subscribeToVisitorCount(callback) {
  if (!isInitialized) {
    initPresence();
  }

  subscribers.add(callback);
  // Emit current initial count immediately
  callback(Math.max(1, activeSessions.size));

  return () => {
    subscribers.delete(callback);
  };
}

export function getCurrentVisitorCount() {
  pruneDeadSessions();
  return Math.max(1, activeSessions.size);
}
