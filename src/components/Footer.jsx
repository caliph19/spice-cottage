import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export const Footer = ({ onOpenPolicyModal, onOpenAllergyModal }) => {
  return (
    <footer className="bg-[#0b1011] text-gray-400 text-sm relative border-t border-gray-800">
      {/* Top subtle dotted border line like original */}
      <div className="w-full h-1 bg-[radial-gradient(#a9891e_1px,transparent_1px)] [background-size:8px_8px] opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-800">
          
          {/* Brand & Address */}
          <div className="md:col-span-2 space-y-3">
<h1 className="h-10 sm:h-12 w-auto object-contain font-bold text-white text-4xl sm:text-5xl">
  Spice Cottage
</h1>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Authentic Indian Takeaway in Howden, Goole. Providing high-quality curries, tandoori grills, biryanis, and chef specialties cooked fresh with finest spices.
            </p>
            <div className="text-xs text-gray-400 space-y-1 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#a9891e]" />
                <span>{restaurantInfo.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#a9891e]" />
                <a href={`tel:${restaurantInfo.phone}`} className="hover:text-white transition">
                  {restaurantInfo.displayPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#a9891e]" />
                <a href={`mailto:${restaurantInfo.email}`} className="hover:text-white transition">
                  {restaurantInfo.email}
                </a>
              </p>
            </div>
          </div>

          {/* Opening Hours Summary */}
          <div>
            <h6 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
              Opening Hours
            </h6>
            <div className="text-xs space-y-1.5 text-gray-400">
              <div className="flex justify-between">
                <span>Mon - Thu:</span>
                <span className="font-semibold text-gray-300">17:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sat:</span>
                <span className="font-semibold text-[#a9891e]">17:00 - 22:30</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold text-gray-300">17:00 - 22:00</span>
              </div>
              <p className="pt-2 text-[11px] text-gray-500">
                Delivery and Collection available everyday.
              </p>
            </div>
          </div>

          {/* Quick Legal Links */}
          <div>
            <h6 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
              Customer Information
            </h6>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal('terms')}
                  className="hover:text-white transition"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal('privacy')}
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal('cookie')}
                  className="hover:text-white transition"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAllergyModal}
                  className="hover:text-amber-400 text-amber-200/80 transition"
                >
                  Allergy &amp; Dietary Advice
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <div>
            &copy; {new Date().getFullYear()} Massala Hut - All Rights Reserved.
          </div>
          <div>
            Powered by modern React &amp; Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
