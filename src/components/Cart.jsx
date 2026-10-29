import React from 'react';
import { Trash2, Plus, Minus, AlertTriangle, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/restaurantInfo';

export const Cart = ({ onOpenPostcodeModal, onOpenAllergyModal, onOpenCheckoutModal }) => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    orderType,
    setOrderType,
    postcode,
    subtotal,
    deliveryFee,
    total,
    isDeliveryMinMet,
    minOrderValue
  } = useCart();

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    if (orderType === 'delivery' && !isDeliveryMinMet) return;
    onOpenCheckoutModal();
  };

  return (
    <div className="bg-white rounded border border-[#bbb] shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#bbb]">
        <h5 className="font-bold text-gray-800 text-lg border-b-2 border-[#a9891e] pb-0.5">
          Your Order
        </h5>
        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-bold text-gray-500 hover:text-red-700 underline uppercase tracking-wider transition"
          >
            Empty Cart
          </button>
        )}
      </div>

      {/* Order Type Toggle (Delivery vs Collection) */}
      <div className="p-3 bg-gray-50 border-b border-[#bbb]">
        <div className="grid grid-cols-2 gap-2">
          {/* Delivery Radio */}
          <label className={`flex items-center justify-between p-2 rounded border cursor-pointer transition ${
            orderType === 'delivery' 
              ? 'border-[#a9891e] bg-amber-50/40 text-black font-semibold' 
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
          }`}>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="orderTypeSelect"
                checked={orderType === 'delivery'}
                onChange={() => setOrderType('delivery')}
                className="text-[#b10000] focus:ring-0 cursor-pointer"
              />
              <span className="text-sm flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-gray-700" />
                Delivery
              </span>
            </div>
            {orderType === 'delivery' && (
              <button
                type="button"
                onClick={onOpenPostcodeModal}
                className="text-xs text-red-600 hover:text-red-800 underline font-bold uppercase"
              >
                EDIT
              </button>
            )}
          </label>

          {/* Collection Radio */}
          <label className={`flex items-center p-2 rounded border cursor-pointer transition ${
            orderType === 'collection' 
              ? 'border-[#a9891e] bg-amber-50/40 text-black font-semibold' 
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
          }`}>
            <input
              type="radio"
              name="orderTypeSelect"
              checked={orderType === 'collection'}
              onChange={() => setOrderType('collection')}
              className="text-[#b10000] focus:ring-0 cursor-pointer mr-2"
            />
            <span className="text-sm flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-gray-700" />
              Collection
            </span>
          </label>
        </div>

        {orderType === 'delivery' && (
          <div className="mt-2 text-xs text-gray-500 flex items-center justify-between px-1">
            <span>Postcode: <strong className="text-gray-800">{postcode || 'DN14 7SU'}</strong></span>
            <span className="text-gray-400">~{restaurantInfo.deliveryTimeMins} mins</span>
          </div>
        )}
      </div>

      {/* Cart Items List */}
      <div className="max-h-72 overflow-y-auto p-3 divide-y divide-gray-100">
        {cartItems.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            <AlertTriangle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-base font-medium">Cart Empty</p>
            <p className="text-xs text-gray-400 mt-1">Select delicious dishes from the menu to get started</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.lineId} className="py-2.5 flex items-start justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="font-bold text-gray-900 text-sm leading-snug">
                  {item.name}
                </div>
                {item.optionName && (
                  <div className="text-xs text-gray-600 font-medium">
                    {item.optionName}
                  </div>
                )}
                {item.specialInstructions && (
                  <div className="text-xs text-amber-700 italic">
                    Note: {item.specialInstructions}
                  </div>
                )}
                <div className="text-xs font-semibold text-[#b10000] mt-0.5">
                  &pound;{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {/* Quantity Adjusters */}
              <div className="flex items-center border border-gray-200 rounded bg-gray-50 shrink-0">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                  className="p-1 hover:bg-gray-200 text-gray-600 transition"
                  aria-label="Decrease"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-gray-800">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                  className="p-1 hover:bg-gray-200 text-gray-600 transition"
                  aria-label="Increase"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.lineId)}
                className="text-gray-400 hover:text-red-600 p-1 transition"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="border-t border-[#bbb] p-3 bg-gray-50/50 space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-800">&pound;{subtotal.toFixed(2)}</span>
          </div>

          {orderType === 'delivery' ? (
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-medium text-gray-800">&pound;{deliveryFee.toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex justify-between text-green-700 text-xs font-medium">
              <span>Collection</span>
              <span>FREE</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base text-gray-900">
            <span>Total</span>
            <span className="text-[#b10000] text-lg">&pound;{total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Allergy Link */}
      <div className="bg-[#f1f1f1] py-2 px-3 text-center border-t border-[#bbb]">
        <button
          type="button"
          onClick={onOpenAllergyModal}
          className="text-xs text-gray-700 hover:text-black hover:underline"
        >
          Do you have an allergy or other dietary requirement?
        </button>
      </div>

      {/* Checkout Button & Minimum Notice */}
      <div className="p-3">
        {orderType === 'delivery' && !isDeliveryMinMet && cartItems.length > 0 && (
          <div className="mb-2 p-2 bg-[#ffe0b4] text-[#8a4b08] text-xs text-center font-bold rounded border border-[#f5c68a]">
            MINIMUM SPEND &pound;{minOrderValue} FOR DELIVERY
            <div className="text-[11px] font-normal mt-0.5">
              Add &pound;{(minOrderValue - subtotal).toFixed(2)} more to qualify
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={cartItems.length === 0 || (orderType === 'delivery' && !isDeliveryMinMet)}
          onClick={handleCheckoutClick}
          className={`w-full py-3 rounded text-sm font-bold uppercase tracking-wider transition ${
            cartItems.length === 0 || (orderType === 'delivery' && !isDeliveryMinMet)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#b10000] hover:bg-[#860000] text-white shadow-md'
          }`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
