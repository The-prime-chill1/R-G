/* ==========================================================================
   R&G COLLECTIONS - SIZE GUIDE MODAL COMPONENT
   ========================================================================== */

import React from 'react';
import { FiX } from 'react-icons/fi';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-generic" onClick={onClose}>
      <div className="modal-content-card" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e4e4e7', paddingBottom: '0.75rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', textTransform: 'uppercase' }}>R&G Sizing & Measurements Guide</h3>
          <button onClick={onClose} style={{ fontSize: '1.25rem', color: '#71717a' }} aria-label="Close size guide">
            <FiX />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-600)', marginBottom: '1.25rem' }}>
          All R&G Senator suits, kaftans, and shirts are cut to modern tailored Nigerian specifications.
        </p>

        <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Native Wear & Shirts (Inches)</h4>
        <table className="size-table" style={{ marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (in)</th>
              <th>Shoulder (in)</th>
              <th>Length (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>S (Small)</td><td>36 - 38</td><td>17.0</td><td>32 - 34</td></tr>
            <tr><td>M (Medium)</td><td>39 - 41</td><td>18.0</td><td>34 - 36</td></tr>
            <tr><td>L (Large)</td><td>42 - 44</td><td>19.0</td><td>36 - 38</td></tr>
            <tr><td>XL (Extra Large)</td><td>45 - 47</td><td>20.0</td><td>38 - 40</td></tr>
            <tr><td>XXL (2X Large)</td><td>48 - 50</td><td>21.0</td><td>40 - 42</td></tr>
          </tbody>
        </table>

        <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Footwear & Loafers (EU / UK / US)</h4>
        <table className="size-table">
          <thead>
            <tr>
              <th>EU</th>
              <th>UK</th>
              <th>US</th>
              <th>Foot Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>40</td><td>6.5</td><td>7.5</td><td>25.4 cm</td></tr>
            <tr><td>41</td><td>7.5</td><td>8.5</td><td>26.0 cm</td></tr>
            <tr><td>42</td><td>8.0</td><td>9.0</td><td>26.7 cm</td></tr>
            <tr><td>43</td><td>9.0</td><td>10.0</td><td>27.3 cm</td></tr>
            <tr><td>44</td><td>10.0</td><td>11.0</td><td>28.0 cm</td></tr>
            <tr><td>45</td><td>11.0</td><td>12.0</td><td>28.7 cm</td></tr>
          </tbody>
        </table>

        <div style={{ marginTop: '1.5rem', background: '#f8f8fa', padding: '1rem', borderRadius: '4px', fontSize: '0.82rem', color: 'var(--rg-gray-600)' }}>
          Need bespoke custom measurement tailoring? Contact our Master Cutter on WhatsApp: <strong>09045231629</strong>.
        </div>
      </div>
    </div>
  );
}
