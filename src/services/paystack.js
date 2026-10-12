/* ==========================================================================
   R&G COLLECTIONS - PAYSTACK PAYMENT INTEGRATION SERVICE
   Handles popup checkout and transaction verification
   ========================================================================== */

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_d3a826477e7f7815cfb4efb8b2e5a4d7c8e9f1a2';

export function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(window.PaystackPop);
    script.onerror = () => reject(new Error('Failed to load Paystack SDK.'));
    document.body.appendChild(script);
  });
}

export async function processPaystackPayment({
  email,
  amountInNaira,
  orderId,
  customerName,
  phone,
  onSuccess,
  onClose
}) {
  try {
    const PaystackPop = await loadPaystackScript();

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: Math.round(Number(amountInNaira) * 100), // In Kobo
      currency: 'NGN',
      ref: 'RG-' + Date.now() + '-' + Math.floor(Math.random() * 1000000),
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerName || "Valued Client"
          },
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: orderId
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone || ""
          }
        ]
      },
      callback: function(response) {
        if (onSuccess) {
          onSuccess({
            reference: response.reference,
            status: 'success',
            message: 'Payment completed successfully',
            transId: response.trans
          });
        }
      },
      onClose: function() {
        if (onClose) {
          onClose();
        }
      }
    });

    handler.openIframe();
  } catch (err) {
    console.error('Paystack initiation error:', err);
    throw err;
  }
}
