import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/restaurantInfo';

export const Navbar = ({ 
  activeView, 
  setActiveView, 
  onOpenAuthModal, 
  user, 
  setUser, 
  onOpenMobileCart 
}) => {
  const { cartCount, total } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('massala_user');
    setUser(null);
  };

  const isTransparent = activeView === 'home' && !isScrolled;

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      isTransparent 
        ? 'bg-transparent py-4' 
        : 'bg-[#151515] py-2 shadow-lg border-b border-[#222]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Call to Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center transition hover:opacity-90"
              aria-label="Massala Hut Home"
            >
<h1 className="h-10 sm:h-12 w-auto object-contain font-bold text-white text-4xl sm:text-5xl">
  Spice Cottage
</h1>
              {/* <img 

                src="/images/top-logo.svg" 
                alt="Massala Hut Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              /> */}
            </button>

            {/* Quick action buttons (Visible on desktop & tablet) */}
            <div className="hidden md:flex items-center gap-2 ml-4">
              <button
                onClick={() => {
                  setActiveView('order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border-2 border-[#a9891e] text-white hover:bg-[#a9891e] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition"
              >
                Order Online
              </button>
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="border-2 border-[#a9891e] text-white hover:bg-[#a9891e] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Us
              </a>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-sm uppercase font-semibold tracking-wider transition ${
                activeView === 'home' ? 'text-[#a9891e]' : 'text-white/90 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setActiveView('order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-sm uppercase font-semibold tracking-wider transition ${
                activeView === 'order' ? 'text-[#a9891e]' : 'text-white/90 hover:text-white'
              }`}
            >
              Order
            </button>

            {/* Auth / Account */}
            {user ? (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                <User className="w-4 h-4 text-[#a9891e]" />
                <span className="text-xs font-medium text-white">{user.name}</span>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="text-gray-400 hover:text-red-400 ml-1 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="text-sm uppercase font-semibold tracking-wider text-white/90 hover:text-white transition flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-[#a9891e]" />
                Sign In
              </button>
            )}

            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-white/70">
              <a href={restaurantInfo.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={restaurantInfo.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            {/* Cart Button Shortcut */}
            <button
              onClick={() => {
                setActiveView('order');
                onOpenMobileCart();
              }}
              className="bg-[#b10000] hover:bg-[#860000] text-white px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{cartCount}</span>
              <span className="opacity-60">|</span>
              <span>&pound;{total.toFixed(2)}</span>
            </button>
          </div>

          {/* Mobile Right Controls: Cart Badge & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                setActiveView('order');
                onOpenMobileCart();
              }}
              className="bg-[#b10000] text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cartCount}</span>
              <span className="hidden sm:inline">&pound;{total.toFixed(2)}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1.5 hover:text-[#a9891e] transition"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-gray-800 space-y-3 bg-[#151515]/95 backdrop-blur-md rounded-b-lg px-2 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block w-full text-left py-2 px-3 text-sm font-bold text-white hover:bg-white/5 rounded uppercase"
            >
              Home
            </button>

            <button
              onClick={() => {
                setActiveView('order');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block w-full text-left py-2 px-3 text-sm font-bold text-[#a9891e] hover:bg-white/5 rounded uppercase"
            >
              Order Online
            </button>

            {user ? (
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm font-medium text-white">{user.name}</span>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-red-400 font-bold uppercase tracking-wider"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 text-sm font-bold text-white hover:bg-white/5 rounded uppercase"
              >
                Sign In / Register
              </button>
            )}

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-gray-800">
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex-1 py-2 text-center bg-[#a9891e] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Call {restaurantInfo.displayPhone}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
