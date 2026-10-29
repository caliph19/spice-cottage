import React from 'react';
import { X, AlertTriangle, Phone } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export const AllergyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-md max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#a9891e] pb-1">Allergy Info</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-gray-700 leading-relaxed text-base">
          <p className="mb-4">
            If you have an allergy that could harm your health, we strongly advise you to contact us directly before you place your order.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
            <p className="text-sm text-amber-900 mb-2 font-medium">
              Our food may contain or come into contact with common allergens such as celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame seeds, soya, and sulphur dioxide.
            </p>
            <p className="text-sm font-bold text-amber-950 flex items-center gap-2 mt-3">
              <Phone className="w-4 h-4 text-amber-700" />
              Please contact <span className="text-[#b10000] text-base">{restaurantInfo.displayPhone}</span> for more information!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#66615b] hover:bg-[#403d39] text-white font-medium rounded-sm text-sm uppercase tracking-wider transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
