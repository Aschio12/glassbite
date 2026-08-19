import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { X, CheckCircle } from 'lucide-react';
import { formatPrice } from '../data/menuData.js';
import { createPayPalOrder, capturePayPalOrder } from '../utils/api.js';

function CheckoutForm({ cart, totalAmount, onSuccess }) {
  const [error, setError] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: ''
  });

  const isFormValid = customerDetails.name && customerDetails.email && customerDetails.address;

  const handleCreateOrder = async (data, actions) => {
    try {
      const response = await createPayPalOrder(totalAmount);
      return response.id; // Return PayPal order ID
    } catch (err) {
      console.error(err);
      setError('Failed to initialize PayPal order.');
      throw err;
    }
  };

  const handleApprove = async (data, actions) => {
    try {
      const items = cart.map(entry => ({
        id: entry.item.id,
        price: entry.item.price + entry.addOns.reduce((s, a) => s + a.price, 0),
        quantity: entry.quantity
      }));

      await capturePayPalOrder({
        orderID: data.orderID,
        items,
        customer_details: customerDetails,
        total_amount: totalAmount
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      setError('Payment capture failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
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
      
      {error && <div className="text-red-500 text-sm font-bold">{error}</div>}

      <div className="pt-4">
        {!isFormValid ? (
          <div className="text-orange-500 text-sm font-bold text-center border border-orange-500/30 bg-orange-500/10 py-3">
            Please fill out your delivery details to pay.
          </div>
        ) : (
          <div className="min-h-[150px]">
            <PayPalButtons
              createOrder={handleCreateOrder}
              onApprove={handleApprove}
              style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
              onError={(err) => {
                console.error(err);
                setError("PayPal encountered an error. Please try again.");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutModal({ open, cart, totalAmount, onClose, onClearCart }) {
  const [success, setSuccess] = useState(false);
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb'; // Default to 'sb' for sandbox placeholder

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
          <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
            <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight mb-8">
              Checkout <span className="text-orange-500">({formatPrice(totalAmount)})</span>
            </h2>
            <CheckoutForm cart={cart} totalAmount={totalAmount} onSuccess={handleSuccess} />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );
}
