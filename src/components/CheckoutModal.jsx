import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, CheckCircle } from 'lucide-react';
import { formatPrice } from '../data/menuData.js';
import { createPaymentIntent, createOrder } from '../utils/api.js';

// Load Stripe (Make sure you set VITE_STRIPE_PUBLIC_KEY in .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

function CheckoutForm({ cart, totalAmount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // 1. Confirm payment
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/?success=true',
          payment_method_data: {
            billing_details: {
              name: customerDetails.name,
              email: customerDetails.email,
            }
          }
        },
        redirect: 'if_required' // Prevent automatic redirect so we can save order
      });

      if (submitError) {
        setError(submitError.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 2. Create Order in Database
        const items = cart.map(entry => ({
          id: entry.item.id,
          price: entry.item.price + entry.addOns.reduce((s, a) => s + a.price, 0),
          quantity: entry.quantity
        }));

        await createOrder({
          items,
          customer_details: customerDetails,
          total_amount: totalAmount,
          payment_intent_id: paymentIntent.id
        });

        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={customerDetails.name}
            onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
            className="w-full bg-[#111111] border border-[#222222] text-white px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Email</label>
          <input
            type="email"
            required
            value={customerDetails.email}
            onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
            className="w-full bg-[#111111] border border-[#222222] text-white px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Delivery Address</label>
          <textarea
            required
            value={customerDetails.address}
            onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
            className="w-full bg-[#111111] border border-[#222222] text-white px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
          />
        </div>
      </div>
      
      <div className="bg-[#111111] border border-[#222222] p-4">
        <PaymentElement options={{ theme: 'night' }} />
      </div>

      {error && <div className="text-red-500 text-sm font-bold">{error}</div>}

      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full flex h-14 items-center justify-center bg-orange-500 font-display text-xl font-black uppercase tracking-wider text-black transition-all hover:bg-white disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay ${formatPrice(totalAmount)}`}
      </button>
    </form>
  );
}

export default function CheckoutModal({ open, cart, totalAmount, onClose, onClearCart }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open && cart.length > 0) {
      // Map cart to expected API format
      const items = cart.map(entry => ({
        id: entry.item.id,
        price: entry.item.price + entry.addOns.reduce((s, a) => s + a.price, 0),
        quantity: entry.quantity
      }));

      createPaymentIntent(items)
        .then(data => setClientSecret(data.clientSecret))
        .catch(err => console.error("Failed to initialize payment intent", err));
    }
  }, [open, cart]);

  const handleSuccess = () => {
    setSuccess(true);
    onClearCart();
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative w-full max-w-lg bg-black border-2 border-[#222222] p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-[#222222] text-white hover:border-orange-500 hover:text-orange-500 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-12 text-center flex flex-col items-center">
            <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
            <h2 className="font-display text-3xl font-black uppercase text-white mb-2">Order Confirmed</h2>
            <p className="text-gray-400">Your delicious food is being prepared!</p>
            <button
              onClick={handleClose}
              className="mt-8 px-8 py-3 bg-white text-black font-display font-black uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-colors"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight mb-8">Checkout</h2>
            
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                <CheckoutForm cart={cart} totalAmount={totalAmount} onSuccess={handleSuccess} />
              </Elements>
            ) : (
              <div className="flex justify-center py-12">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
