import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Banknote, Truck, ShoppingBag, Clock, MapPin, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/restaurantInfo';

export const CheckoutModal = ({ isOpen, onClose, user }) => {
  const { cartItems, orderType, postcode, subtotal, deliveryFee, total, clearCart } = useCart();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'card'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    if (orderType === 'delivery' && !address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = 'MH-' + Math.floor(100000 + Math.random() * 900000);
      const placedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const orderDetails = {
        orderNumber,
        placedAt,
        orderType,
        fullName,
        phone,
        address: orderType === 'delivery' ? `${address}, ${postcode}` : restaurantInfo.address,
        notes,
        paymentMethod,
        items: [...cartItems],
        subtotal,
        deliveryFee,
        total,
        estimatedTime: orderType === 'delivery' ? restaurantInfo.deliveryTimeMins : restaurantInfo.collectionTimeMins
      };

      setConfirmedOrder(orderDetails);
      setIsSubmitting(false);
      clearCart();

      // Fire festive celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-md max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            {confirmedOrder ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : orderType === 'delivery' ? (
              <Truck className="w-5 h-5 text-[#b10000]" />
            ) : (
              <ShoppingBag className="w-5 h-5 text-[#b10000]" />
            )}
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#a9891e] pb-1">
              {confirmedOrder ? 'Order Confirmed!' : `Checkout (${orderType === 'delivery' ? 'Delivery' : 'Collection'})`}
            </h3>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {confirmedOrder ? (
            /* Order Success Receipt */
            <div className="space-y-6">
              <div className="text-center bg-green-50 p-6 rounded-lg border border-green-200">
                <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-2" />
                <h4 className="text-2xl font-black text-gray-900 uppercase tracking-wide">
                  Thank You, {confirmedOrder.fullName}!
                </h4>
                <p className="text-green-800 font-medium text-sm mt-1">
                  Your takeaway order has been sent directly to the kitchen.
                </p>
                <div className="mt-4 inline-block bg-white px-4 py-2 rounded border border-green-300 shadow-xs">
                  <span className="text-xs uppercase text-gray-500 font-bold block">Order Reference</span>
                  <span className="text-xl font-mono font-bold text-gray-900">{confirmedOrder.orderNumber}</span>
                </div>
              </div>

              {/* Timing & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="flex items-center gap-2 font-bold text-gray-800 mb-1">
                    <Clock className="w-4 h-4 text-[#a9891e]" />
                    Estimated Time
                  </div>
                  <p className="text-gray-600">
                    {confirmedOrder.orderType === 'delivery' ? 'Delivering in' : 'Ready for collection in'}:
                  </p>
                  <p className="text-base font-bold text-[#b10000] mt-0.5">
                    {confirmedOrder.estimatedTime} minutes
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="flex items-center gap-2 font-bold text-gray-800 mb-1">
                    <MapPin className="w-4 h-4 text-[#b10000]" />
                    {confirmedOrder.orderType === 'delivery' ? 'Delivery Address' : 'Collection Address'}
                  </div>
                  <p className="text-gray-700 font-medium text-xs leading-relaxed">
                    {confirmedOrder.address}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Phone: {confirmedOrder.phone}</p>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="border border-gray-200 rounded overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 font-bold text-xs uppercase text-gray-700">
                  Ordered Dishes
                </div>
                <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto p-2">
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 px-2 text-sm">
                      <div>
                        <span className="font-bold text-gray-800 mr-2">{it.quantity}x</span>
                        <span className="font-medium text-gray-900">{it.name}</span>
                        {it.optionName && (
                          <span className="text-xs text-gray-500 block ml-6">({it.optionName})</span>
                        )}
                        {it.specialInstructions && (
                          <span className="text-xs text-amber-700 block ml-6 italic">Note: {it.specialInstructions}</span>
                        )}
                      </div>
                      <span className="font-mono font-medium text-gray-800">
                        &pound;{(it.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-200 space-y-1 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>&pound;{confirmedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {confirmedOrder.deliveryFee > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee:</span>
                      <span>&pound;{confirmedOrder.deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total ({confirmedOrder.paymentMethod === 'cash' ? 'Pay Cash' : 'Paid Card'}):</span>
                    <span className="text-[#b10000]">&pound;{confirmedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition"
                >
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 bg-[#b10000] hover:bg-[#860000] text-white rounded font-bold text-sm uppercase tracking-wider transition"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Name <span className="text-[#b10000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Harrison"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone Number <span className="text-[#b10000]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 07123 456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Delivery Street Address <span className="text-[#b10000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 14 Church Road, Flat 2"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner mb-2"
                  />
                  <div className="flex gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Delivering to Postcode: <strong className="text-gray-800">{postcode || 'DN14 7SU'}</strong></span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Delivery / Collection Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Leave with neighbour if no answer, ring door bell"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('cash')}
                    className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition ${
                      paymentMethod === 'cash' ? 'border-[#b10000] bg-red-50/50 shadow-xs' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Banknote className={`w-5 h-5 ${paymentMethod === 'cash' ? 'text-[#b10000]' : 'text-gray-500'}`} />
                    <div>
                      <p className="text-sm font-bold text-gray-800">Cash on {orderType === 'delivery' ? 'Delivery' : 'Collection'}</p>
                      <p className="text-xs text-gray-500">Pay the driver or counter</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition ${
                      paymentMethod === 'card' ? 'border-[#b10000] bg-red-50/50 shadow-xs' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-[#b10000]' : 'text-gray-500'}`} />
                    <div>
                      <p className="text-sm font-bold text-gray-800">Card Payment</p>
                      <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal:</span>
                  <span>&pound;{subtotal.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee:</span>
                    <span>&pound;{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-200 pt-2">
                  <span>Grand Total:</span>
                  <span className="text-[#b10000] text-lg font-black">&pound;{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#b10000] hover:bg-[#860000] text-white font-bold rounded text-base uppercase tracking-wider transition shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming with Kitchen...' : `Place Takeaway Order • £${total.toFixed(2)}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
