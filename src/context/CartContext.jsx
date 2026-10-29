import React, { createContext, useContext, useState, useEffect } from 'react';
import { restaurantInfo } from '../data/restaurantInfo';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('massala_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState(() => {
    return localStorage.getItem('massala_order_type') || 'delivery';
  });

  const [postcode, setPostcode] = useState(() => {
    return localStorage.getItem('massala_postcode') || 'DN14 7SU';
  });

  const [deliveryNote, setDeliveryNote] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('massala_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('massala_order_type', orderType);
  }, [orderType]);

  useEffect(() => {
    localStorage.setItem('massala_postcode', postcode);
  }, [postcode]);

  const addToCart = (item, selectedOption = null, specialInstructions = '', quantity = 1) => {
    const itemName = item.name;
    const optionName = selectedOption ? selectedOption.name : null;
    const price = selectedOption ? selectedOption.price : item.price;
    const lineId = `${item._id}_${selectedOption ? selectedOption._id : 'base'}_${(specialInstructions || '').trim().toLowerCase()}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.lineId === lineId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            lineId,
            itemId: item._id,
            name: itemName,
            optionName,
            price: Number(price),
            quantity,
            specialInstructions: specialInstructions || '',
            categoryName: item.categoryName || ''
          }
        ];
      }
    });
  };

  const updateQuantity = (lineId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.lineId === lineId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (lineId) => {
    setCartItems(prev => prev.filter(item => item.lineId !== lineId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isPostcodeValid = (code) => {
    if (!code) return false;
    const clean = code.trim().toUpperCase().replace(/\s+/g, '');
    return restaurantInfo.supportedPostcodes.some(p => clean.startsWith(p));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal > 0 ? restaurantInfo.standardDeliveryFee : 0) : 0;
  const total = subtotal + deliveryFee;
  const isDeliveryMinMet = orderType === 'collection' || subtotal >= restaurantInfo.minOrderValue;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orderType,
        setOrderType,
        postcode,
        setPostcode,
        isPostcodeValid,
        deliveryNote,
        setDeliveryNote,
        subtotal,
        deliveryFee,
        total,
        isDeliveryMinMet,
        cartCount,
        minOrderValue: restaurantInfo.minOrderValue
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
