import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ItemOptionsModal = ({ isOpen, onClose, item }) => {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('Default');

  useEffect(() => {
    if (item) {
      if (item.subitems && item.subitems.length > 0) {
        setSelectedOption(item.subitems[0]);
      } else {
        setSelectedOption(null);
      }
      setQuantity(1);
      setSpecialInstructions('');
      setSpiceLevel('Default');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const currentPrice = selectedOption ? selectedOption.price : item.price;
  const totalPrice = (Number(currentPrice) * quantity).toFixed(2);

  const handleAddToCart = () => {
    let finalInstructions = specialInstructions.trim();
    if (spiceLevel !== 'Default') {
      finalInstructions = finalInstructions 
        ? `${spiceLevel} Spice. ${finalInstructions}` 
        : `${spiceLevel} Spice`;
    }

    addToCart(item, selectedOption, finalInstructions, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-md max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#a9891e] pb-1 inline-block">
              {item.name}
            </h3>
            {item.categoryName && (
              <span className="block text-xs uppercase text-gray-500 font-semibold tracking-wider mt-1">
                {item.categoryName}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {item.description && (
            <p className="text-gray-600 text-sm italic bg-amber-50/50 p-3 rounded border border-amber-100">
              {item.description}
            </p>
          )}

          {/* Subitems / Options */}
          {item.subitems && item.subitems.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                Choose Variety / Option <span className="text-[#b10000]">*</span>
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {item.subitems.map((sub) => {
                  const isChecked = selectedOption?._id === sub._id;
                  return (
                    <div
                      key={sub._id}
                      onClick={() => setSelectedOption(sub)}
                      className={`flex items-center justify-between p-3 rounded border cursor-pointer transition ${
                        isChecked 
                          ? 'border-[#b10000] bg-red-50/40 text-black font-medium shadow-xs' 
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isChecked ? 'border-[#b10000] bg-[#b10000]' : 'border-gray-300'
                        }`}>
                          {isChecked && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium">{sub.name}</span>
                      </div>
                      <span className="font-bold text-sm text-[#b10000]">
                        &pound;{Number(sub.price).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              Spice Preference (Optional)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Default', 'Mild', 'Medium', 'Hot'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpiceLevel(lvl)}
                  className={`py-2 text-xs font-semibold rounded border transition ${
                    spiceLevel === lvl 
                      ? 'border-[#b10000] bg-[#b10000] text-white shadow-xs' 
                      : 'border-gray-200 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. No fresh coriander, extra crisp, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Adjuster */}
          <div className="flex items-center border border-gray-300 rounded bg-white">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-30 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="w-10 text-center font-bold text-gray-800 text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-gray-100 transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-4 bg-[#007c38] hover:bg-[#005e2b] text-white font-bold rounded text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
          >
            <span>Add to Order</span>
            <span>&bull;</span>
            <span>&pound;{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
