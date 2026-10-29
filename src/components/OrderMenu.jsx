import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, Flame, Sparkles, AlertCircle, ShoppingBag, ListFilter, ChevronDown, Check } from 'lucide-react';
import { globalMenu } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Cart } from './Cart';

export const OrderMenu = ({
  onOpenItemModal,
  onOpenPostcodeModal,
  onOpenAllergyModal,
  onOpenCheckoutModal,
  mobileCartOpen,
  setMobileCartOpen
}) => {
  const { addToCart, cartCount, total } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(globalMenu.categories[0]?._id);
  const [justAddedId, setJustAddedId] = useState(null);

  const categoryRefs = useRef({});

  // Filter categories and items based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return globalMenu.categories;
    }
    const query = searchQuery.toLowerCase().trim();
    return globalMenu.categories
      .map(cat => {
        const matchesCategory = cat.name.toLowerCase().includes(query);
        const filteredItems = cat.items.filter(item => {
          const nameMatches = item.name.toLowerCase().includes(query);
          const descMatches = item.description?.toLowerCase().includes(query);
          const subMatches = item.subitems?.some(sub => sub.name.toLowerCase().includes(query));
          return nameMatches || descMatches || subMatches;
        });

        if (matchesCategory) {
          return cat;
        }
        if (filteredItems.length > 0) {
          return { ...cat, items: filteredItems };
        }
        return null;
      })
      .filter(Boolean);
  }, [searchQuery]);

  const scrollToCategory = (catId) => {
    setActiveCategoryId(catId);
    const element = categoryRefs.current[catId];
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleItemAdd = (item, categoryName) => {
    const itemWithCat = { ...item, categoryName };
    if (item.subitems && item.subitems.length > 0) {
      onOpenItemModal(itemWithCat);
    } else {
      addToCart(itemWithCat, null, '', 1);
      setJustAddedId(item._id);
      setTimeout(() => setJustAddedId(null), 1000);
    }
  };

  const getItemPriceDisplay = (item) => {
    if (item.subitems && item.subitems.length > 0) {
      const minPrice = Math.min(...item.subitems.map(s => Number(s.price)));
      return `From £${minPrice.toFixed(2)}`;
    }
    return `£${Number(item.price).toFixed(2)}`;
  };

  const getItemBadge = (item, catName) => {
    const name = item.name.toLowerCase();
    const cat = catName.toLowerCase();

    if (name.includes('vindaloo') || name.includes('naga') || cat.includes('jalfrezi')) {
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">🌶️🌶️🌶️ Hot</span>;
    }
    if (name.includes('madras') || cat.includes('karahi') || cat.includes('balti')) {
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">🌶️ Spicy</span>;
    }
    if (name.includes('korma') || name.includes('passanda') || name.includes('makni') || cat.includes('mild')) {
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded">🥥 Mild</span>;
    }
    if (name.includes('veg') || name.includes('paneer') || name.includes('mushroom') || cat.includes('vegetarian')) {
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">🥦 Vegetarian</span>;
    }
    if (cat.includes('chef') || cat.includes('special')) {
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#a9891e] bg-amber-50 border border-[#a9891e]/30 px-2 py-0.5 rounded">⭐ Chef Special</span>;
    }
    return null;
  };

  return (
    <div className="pt-20 pb-24 min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Search Bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2 m-0">
              <span>Online Menu</span>
              <span className="text-xs bg-[#a9891e] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Live Ordering
              </span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Select dishes below to add directly to your takeaway order
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken tikka, biryani, naan..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile Category Horizontal Scroll Bar */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-3 mb-4 no-scrollbar">
          {globalMenu.categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => scrollToCategory(cat._id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                activeCategoryId === cat._id 
                  ? 'bg-[#b10000] text-white shadow-xs' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Main 3-Column Layout (Categories Sidebar, Menu Area, Cart Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Categories List (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className="bg-white rounded border border-[#bbb] shadow-xs overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-[#bbb]">
                <h5 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                  Menu Categories
                </h5>
              </div>
              <ul className="max-h-[72vh] overflow-y-auto divide-y divide-gray-100 text-sm">
                {globalMenu.categories.map((cat) => (
                  <li key={cat._id}>
                    <button
                      type="button"
                      onClick={() => scrollToCategory(cat._id)}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition ${
                        activeCategoryId === cat._id
                          ? 'bg-amber-50 text-[#b10000] font-bold border-l-4 border-[#b10000]'
                          : 'text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full shrink-0">
                        {cat.items.length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center Column: Menu Dishes Area */}
          <div className="lg:col-span-6 space-y-8">
            {filteredCategories.length === 0 ? (
              <div className="bg-white p-12 text-center rounded border border-gray-200 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <h4 className="text-lg font-bold text-gray-800">No dishes found</h4>
                <p className="text-sm mt-1">Try searching for something else like "curry", "rice", or "tikka".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-[#b10000] text-white rounded text-xs font-bold uppercase tracking-wider"
                >
                  View Full Menu
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category._id}
                  ref={(el) => (categoryRefs.current[category._id] = el)}
                  className="scroll-mt-24"
                >
                  {/* Category Header */}
                  <div className="mb-4 pb-2 border-b-2 border-gray-200">
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                      <span>{category.name}</span>
                      <span className="text-xs font-normal text-gray-500">
                        ({category.items.length} dishes)
                      </span>
                    </h3>
                    {category.description && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 italic">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Dishes in this Category */}
                  <div className="space-y-3">
                    {category.items.map((item) => {
                      const hasOptions = item.subitems && item.subitems.length > 0;
                      const isRecentlyAdded = justAddedId === item._id;

                      return (
                        <div
                          key={item._id}
                          className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs hover:border-gray-300 hover:shadow-sm transition flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                        >
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-bold text-gray-900 text-base leading-snug">
                                {item.name}
                              </h4>
                              {getItemBadge(item, category.name)}
                            </div>

                            {item.description ? (
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {item.description}
                              </p>
                            ) : null}

                            {/* Options preview tag if applicable */}
                            {hasOptions && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                  {item.subitems.length} varieties (e.g. {item.subitems.slice(0, 2).map(s => s.name).join(', ')}...)
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Price & Add Action */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                            <span className="font-bold text-gray-900 text-base font-mono">
                              {getItemPriceDisplay(item)}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleItemAdd(item, category.name)}
                              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${
                                isRecentlyAdded
                                  ? 'bg-green-600 text-white'
                                  : 'bg-[#b10000] hover:bg-[#860000] text-white shadow-xs'
                              }`}
                            >
                              {isRecentlyAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added!</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>{hasOptions ? 'Choose' : 'Add'}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Shopping Cart (Desktop Sticky) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <Cart
              onOpenPostcodeModal={onOpenPostcodeModal}
              onOpenAllergyModal={onOpenAllergyModal}
              onOpenCheckoutModal={onOpenCheckoutModal}
            />
          </div>

        </div>

      </div>

      {/* Mobile Sticky Bottom Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#151515] border-t border-gray-800 p-3 z-40 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileCartOpen(true)}
            className="flex-1 py-3 px-4 bg-[#b10000] hover:bg-[#860000] text-white font-bold rounded flex items-center justify-between shadow-md text-sm uppercase tracking-wider"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white text-[#b10000] flex items-center justify-center font-mono font-bold text-xs">
                {cartCount}
              </span>
              <span>View Order</span>
            </div>
            <span className="font-mono text-base font-black">&pound;{total.toFixed(2)}</span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Up Cart Drawer */}
      {mobileCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white w-full rounded-t-xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-t border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
              <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">
                Your Takeaway Basket
              </span>
              <button
                onClick={() => setMobileCartOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black"
              >
                Close &times;
              </button>
            </div>
            
            <div className="overflow-y-auto p-2">
              <Cart
                onOpenPostcodeModal={() => {
                  setMobileCartOpen(false);
                  onOpenPostcodeModal();
                }}
                onOpenAllergyModal={() => {
                  setMobileCartOpen(false);
                  onOpenAllergyModal();
                }}
                onOpenCheckoutModal={() => {
                  setMobileCartOpen(false);
                  onOpenCheckoutModal();
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
