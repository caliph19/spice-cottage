import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export const PolicyModal = ({ isOpen, onClose, policyType }) => {
  if (!isOpen) return null;

  const titles = {
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-md max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#a9891e]" />
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#a9891e] pb-1">
              {titles[policyType] || 'Information'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-700 leading-relaxed">
          {policyType === 'terms' && (
            <>
              <h4 className="font-bold text-base text-gray-900">1. Ordering & Delivery</h4>
              <p>
                By placing an order via Massala Hut, you agree to our minimum spend of &pound;15.00 for delivery orders. Delivery times typically range between 45 to 60 minutes, though may extend during peak periods or adverse weather.
              </p>
              <h4 className="font-bold text-base text-gray-900">2. Cancellation & Refunds</h4>
              <p>
                Due to food preparation commencing promptly after order placement, cancellations must be communicated by calling {restaurantInfo.displayPhone} within 5 minutes of placing your order.
              </p>
              <h4 className="font-bold text-base text-gray-900">3. Allergen Advice</h4>
              <p>
                Customers with severe dietary allergies or restrictions are urged to contact us directly by phone prior to ordering to ensure utmost safety.
              </p>
            </>
          )}

          {policyType === 'privacy' && (
            <>
              <h4 className="font-bold text-base text-gray-900">Your Privacy Matters</h4>
              <p>
                Massala Hut values your privacy. We collect customer name, telephone number, and delivery address solely for the purpose of fulfilling your takeaway orders and providing delivery status updates.
              </p>
              <p>
                We do not sell, rent, or trade your personal information with any third-party marketing companies. Payment details processed online are encrypted and securely handled in compliance with industry standards.
              </p>
            </>
          )}

          {policyType === 'cookie' && (
            <>
              <h4 className="font-bold text-base text-gray-900">Cookie Usage</h4>
              <p>
                This website uses essential cookies to remember your shopping cart items, delivery preferences, and provide a seamless checkout experience.
              </p>
              <p>
                By continuing to browse and order from our website, you consent to our use of functional cookies necessary for online ordering.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#66615b] hover:bg-[#403d39] text-white font-medium rounded-sm text-sm uppercase tracking-wider transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
