import React, { useState } from 'react';
import { X, MapPin, CheckCircle, AlertCircle, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/restaurantInfo';

export const PostcodeModal = ({ isOpen, onClose }) => {
  const { postcode, setPostcode, isPostcodeValid, setOrderType } = useCart();
  const [inputVal, setInputVal] = useState(postcode || '');
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  if (!isOpen) return null;

  const handleCheck = (e) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    
    const valid = isPostcodeValid(inputVal);
    setChecked(true);
    setIsValid(valid);

    if (valid) {
      setPostcode(inputVal.trim().toUpperCase());
      setOrderType('delivery');
      setTimeout(() => {
        onClose();
        setChecked(false);
      }, 700);
    }
  };

  const handleSelectCollection = () => {
    setOrderType('collection');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-md max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#b10000]" />
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#a9891e] pb-1">
              Delivery Postcode
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Please type your postcode below to verify if your address is within our delivery radius. We deliver across Howden, Goole, and surrounding areas.
          </p>

          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Enter Postcode (e.g. DN14 7SU, YO8...)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setChecked(false);
                  }}
                  placeholder="e.g. DN14 7SU"
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm text-base uppercase focus:border-black focus:ring-1 focus:ring-black outline-none transition shadow-inner font-mono font-medium"
                  autoFocus
                />
              </div>
            </div>

            {checked && (
              <div className={`p-3 rounded text-sm flex items-start gap-2 ${
                isValid ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {isValid ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Great news! Delivery is available.</p>
                      <p className="text-xs text-green-700">Estimated delivery: {restaurantInfo.deliveryTimeMins} mins.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Sorry, we don't deliver to this postcode yet.</p>
                      <p className="text-xs text-red-700 mt-0.5">
                        Supported areas: {restaurantInfo.supportedPostcodes.join(', ')}. You can still order for Collection!
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 border border-gray-100">
              <span className="font-semibold text-gray-700">Delivery Areas Include:</span> {restaurantInfo.supportedPostcodes.join(', ')} and surrounding villages.
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-2 flex-wrap">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm text-sm hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSelectCollection}
              className="px-4 py-2 bg-[#66615b] hover:bg-[#403d39] text-white rounded-sm text-sm font-medium flex items-center gap-1.5 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              Switch to Collection
            </button>
            <button
              type="button"
              onClick={handleCheck}
              className="px-5 py-2 bg-[#b10000] hover:bg-[#860000] text-white rounded-sm text-sm font-medium flex items-center gap-1.5 transition uppercase tracking-wider font-semibold"
            >
              <Truck className="w-4 h-4" />
              Check & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
