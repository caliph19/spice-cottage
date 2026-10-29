import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Quote, Star, Send, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export const Home = ({ onNavigateToOrder }) => {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('x5vA9a8');
  const [captchaError, setCaptchaError] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const generateCaptcha = () => {
    const chars = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 7; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);
    setIsSubmittingContact(true);

    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMsg('');
      setCaptchaInput('');
      generateCaptcha();
      setTimeout(() => setContactSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section 
        className="relative min-h-[100vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/background.jpg')` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24 flex flex-col items-center">
<h1 className="h-10 sm:h-12 w-auto object-contain font-bold text-white text-4xl sm:text-5xl">
  Spice Cottage
</h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mt-4 font-light tracking-wide">
            Experience exceptional Indian cuisine carefully prepared with authentic spices and fresh local ingredients.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onNavigateToOrder}
              className="animated-takeaway-btn px-8 py-4 bg-[#b10000] hover:bg-[#860000] text-white font-extrabold text-lg sm:text-xl rounded-full border-2 border-white uppercase tracking-wider flex items-center gap-2"
            >
              <span>ORDER TAKEAWAY!</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="px-6 py-3.5 bg-black/40 hover:bg-black/60 text-white font-bold text-sm sm:text-base rounded-full border-2 border-[#a9891e] uppercase tracking-wider flex items-center gap-2 backdrop-blur-xs transition"
            >
              <Phone className="w-4 h-4 text-[#a9891e]" />
              <span>Call: {restaurantInfo.displayPhone}</span>
            </a>
          </div>

          {/* Quick Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-200">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-full border border-white/15">
              <Clock className="w-4 h-4 text-[#a9891e]" />
              <span>Open 17:00 - 22:00 Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-full border border-white/15">
              <MapPin className="w-4 h-4 text-[#a9891e]" />
              <span>Howden & Goole Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Hut of Spice (About 1) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Text description */}
            <div className="text-center md:text-left space-y-4">
              <h5 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                THE HUT OF SPICE
              </h5>
              <div className="w-24 h-1 bg-[#a9891e] mx-auto md:mx-0" />
              <p className="text-gray-600 text-base leading-relaxed pt-2">
                Welcome to Massala Hut{' '}
                <a 
                  href="https://en.wikipedia.org/wiki/Goole" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#b10000] font-semibold hover:underline"
                >
                  (Goole)
                </a>
                . It's well known that food feeds the body and soul - food can inspire us, comfort us, satisfy us, and make us feel good. Our menu is packed full of delicious dishes that have been thoughtfully designed by our talented chefs.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                From sizzling tandoori grills to aromatic masala curries and freshly baked clay-oven naans, we bring the true heritage of Indian dining right to your doorstep.
              </p>

              <div className="pt-4 flex justify-center md:justify-start gap-4">
                <button
                  onClick={onNavigateToOrder}
                  className="px-6 py-3 bg-[#b10000] hover:bg-[#860000] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition shadow-sm"
                >
                  Explore Menu & Order
                </button>
              </div>
            </div>

            {/* About Image 1 */}
            <div className="overflow-hidden rounded-lg shadow-xl border border-gray-100 group">
              <img 
                src="/images/about1.jpg" 
                alt="Delicious Indian Cuisine at Massala Hut" 
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Opening Times (About 2) */}
      <section className="py-20 bg-[#f1f1f1] border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* About Image 2 */}
            <div className="order-2 md:order-1 overflow-hidden rounded-lg shadow-xl border border-gray-200 group">
              <img 
                src="/images/about2.jpg" 
                alt="Spices and Fresh Ingredients" 
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Hours Table */}
            <div className="order-1 md:order-2 text-center md:text-left space-y-4">
              <h5 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                OPENING TIMES
              </h5>
              <div className="w-24 h-1 bg-[#a9891e] mx-auto md:mx-0" />
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4">
                <table className="w-full text-sm sm:text-base">
                  <tbody>
                    {restaurantInfo.openingHours.map((row, idx) => (
                      <tr 
                        key={row.day} 
                        className={`border-b border-gray-100 last:border-b-0 ${
                          idx % 2 === 1 ? 'bg-[#d1d1d1]/40' : 'bg-white'
                        }`}
                      >
                        <td className="py-3 px-5 text-left font-medium text-gray-800">{row.day}</td>
                        <td className="py-3 px-5 text-right font-bold text-[#b10000]">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-gray-500 pt-2 italic">
                * Note: Delivery service usually opens 30 minutes after store opening and stops 30 minutes before closing.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* What Our Customers Are Saying */}
      <section className="py-20 bg-white border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h5 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              WHAT OUR CUSTOMERS ARE SAYING
            </h5>
            <div className="w-24 h-1 bg-[#a9891e] mx-auto my-3" />
            <p className="text-sm text-gray-500">
              Honest feedback from our lovely customers in Howden, Goole, and nearby villages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantInfo.reviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-[#fafafa] rounded-lg p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    "{rev.highlight}"
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-800">{rev.name}</span>
                  <span className="text-gray-400">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-[#f1f1f1] border-t border-gray-300">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h5 className="text-xl font-bold text-gray-800 mb-2">Stay Connected With Us</h5>
          <p className="text-sm text-gray-600 mb-6">
            Subscribe to our newsletter and stay updated on the latest developments, special weekly offers, and chef specials!
          </p>

          {newsletterSubscribed ? (
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded flex items-center justify-center gap-2 text-sm font-medium">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Thank you for subscribing! Check your inbox for exclusive takeaway offers.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#66615b] hover:bg-[#403d39] text-white text-xs font-bold uppercase tracking-wider rounded transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Get in Touch (Contact Form & Store Info) */}
      <section className="py-20 bg-white border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h5 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              GET IN TOUCH
            </h5>
            <div className="w-24 h-1 bg-[#a9891e] mx-auto my-3" />
            <p className="text-sm text-gray-600">
              Whether you are contacting to give us some good news or to raise a problem, we will do all we can to help you. Please fill in the form below and we will get back to you promptly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Store Address & Order Times Details */}
              <div className="lg:col-span-5 bg-gray-50 p-8 border-b lg:border-b-0 lg:border-r border-gray-200 space-y-8">
                <div>
                  <h6 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-200">
                    Our Address
                  </h6>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {restaurantInfo.address}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Tel:{' '}
                    <a href={`tel:${restaurantInfo.phone}`} className="font-bold text-[#b10000] hover:underline">
                      {restaurantInfo.displayPhone}
                    </a>
                  </p>
                  <p className="text-sm text-gray-700">
                    Email:{' '}
                    <a href={`mailto:${restaurantInfo.email}`} className="text-[#a9891e] hover:underline">
                      {restaurantInfo.email}
                    </a>
                  </p>

                  <div className="mt-4">
                    <span className="text-xs text-gray-500 block mb-1">Get Directions:</span>
                    <a
                      href={restaurantInfo.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-4 py-2 bg-[#a9891e] hover:bg-[#866d18] text-white rounded text-xs font-bold uppercase tracking-wider transition"
                    >
                      Google Maps
                    </a>
                  </div>
                </div>

                <div>
                  <h6 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-200">
                    Online Orders
                  </h6>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Delivery:</span>
                      <span className="font-bold text-gray-900">{restaurantInfo.deliveryTimeMins} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Collection:</span>
                      <span className="font-bold text-gray-900">{restaurantInfo.collectionTimeMins} minutes</span>
                    </div>
                    <p className="text-xs text-gray-400 italic pt-1">
                      * Times may take longer during busy weekend periods.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 p-8">
                {contactSuccess ? (
                  <div className="py-12 text-center text-green-700 space-y-3">
                    <CheckCircle className="w-14 h-14 mx-auto text-green-600 animate-bounce" />
                    <h5 className="text-xl font-bold">Message Sent Successfully!</h5>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Thank you for contacting Massala Hut. Our team will review your message and reply as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Your Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                      />
                    </div>

                    {/* Captcha Verification */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                          Type Captcha Code <span className="text-red-600">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="text-xs text-[#a9891e] hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Refresh Code
                        </button>
                      </div>

                      <div className="border border-dashed border-gray-400 rounded p-2 bg-gray-50 mb-2">
                        <div className="font-mono text-2xl text-center text-gray-600 tracking-widest font-bold py-1 select-none">
                          ---- {captchaCode} ----
                        </div>
                        <input
                          type="text"
                          required
                          value={captchaInput}
                          onChange={(e) => {
                            setCaptchaInput(e.target.value);
                            setCaptchaError(false);
                          }}
                          placeholder="Type Code Here"
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm text-center uppercase font-mono tracking-wider focus:border-black outline-none"
                        />
                      </div>
                      {captchaError && (
                        <p className="text-xs text-red-600 font-bold">
                          Incorrect captcha code. Please match the letters and numbers above.
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmittingContact}
                        className="px-8 py-3 bg-[#66615b] hover:bg-[#403d39] text-white font-bold rounded text-sm uppercase tracking-wider flex items-center gap-2 transition disabled:opacity-50"
                      >
                        {isSubmittingContact ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
