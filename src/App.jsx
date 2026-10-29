import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { OrderMenu } from './components/OrderMenu';
import { Footer } from './components/Footer';
import { AllergyModal } from './components/AllergyModal';
import { PostcodeModal } from './components/PostcodeModal';
import { ItemOptionsModal } from './components/ItemOptionsModal';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PolicyModal } from './components/PolicyModal';

export function App() {
  const [activeView, setActiveView] = useState('home');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('massala_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modal States
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [policyType, setPolicyType] = useState(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  // Handle browser back/forward or hash changes if needed
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#order') {
        setActiveView('order');
      } else {
        setActiveView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToOrder = () => {
    setActiveView('order');
    window.location.hash = 'order';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setActiveView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#fafafa] selection:bg-[#a9891e] selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar
          activeView={activeView}
          setActiveView={(view) => {
            if (view === 'order') navigateToOrder();
            else navigateToHome();
          }}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          user={user}
          setUser={setUser}
          onOpenMobileCart={() => setMobileCartOpen(true)}
        />

        {/* Main View Area */}
        <main className="flex-1">
          {activeView === 'home' ? (
            <Home onNavigateToOrder={navigateToOrder} />
          ) : (
            <OrderMenu
              onOpenItemModal={(item) => setSelectedItemForModal(item)}
              onOpenPostcodeModal={() => setIsPostcodeModalOpen(true)}
              onOpenAllergyModal={() => setIsAllergyModalOpen(true)}
              onOpenCheckoutModal={() => setIsCheckoutModalOpen(true)}
              mobileCartOpen={mobileCartOpen}
              setMobileCartOpen={setMobileCartOpen}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onOpenPolicyModal={(type) => setPolicyType(type)}
          onOpenAllergyModal={() => setIsAllergyModalOpen(true)}
        />

        {/* Modals */}
        <AllergyModal
          isOpen={isAllergyModalOpen}
          onClose={() => setIsAllergyModalOpen(false)}
        />

        <PostcodeModal
          isOpen={isPostcodeModalOpen}
          onClose={() => setIsPostcodeModalOpen(false)}
        />

        <ItemOptionsModal
          isOpen={Boolean(selectedItemForModal)}
          item={selectedItemForModal}
          onClose={() => setSelectedItemForModal(null)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          user={user}
          setUser={setUser}
          onClose={() => setIsAuthModalOpen(false)}
        />

        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          user={user}
          onClose={() => setIsCheckoutModalOpen(false)}
        />

        <PolicyModal
          isOpen={Boolean(policyType)}
          policyType={policyType}
          onClose={() => setPolicyType(null)}
        />

      </div>
    </CartProvider>
  );
}

export default App;
