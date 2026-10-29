import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, user, setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    const loggedUser = {
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      phone: phone.trim() || '07123456789'
    };

    localStorage.setItem('massala_user', JSON.stringify(loggedUser));
    setUser(loggedUser);
    setSuccessMsg(isRegister ? 'Account created successfully!' : 'Signed in successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 800);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '07890 123456'
    };
    localStorage.setItem('massala_user', JSON.stringify(demoUser));
    setUser(demoUser);
    setSuccessMsg('Signed in as demo customer!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-md max-w-md w-full overflow-hidden shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#b10000]" />
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#a9891e] pb-1">
              {isRegister ? 'Create Account' : 'Sign In'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successMsg ? (
            <div className="py-8 text-center text-green-700 space-y-2">
              <CheckCircle className="w-12 h-12 mx-auto text-green-600 animate-bounce" />
              <p className="font-bold text-lg">{successMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07123 456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-black outline-none shadow-inner"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                </div>
              </div>

              {!isRegister && (
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#b10000] focus:ring-0"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#a9891e] hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#b10000] hover:bg-[#860000] text-white font-bold rounded text-sm uppercase tracking-wider shadow-sm transition"
              >
                {isRegister ? 'Sign Up' : 'Sign In'}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-medium">Or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded text-xs uppercase tracking-wider transition border border-gray-300"
              >
                Quick Demo Login (Sarah)
              </button>

              <div className="text-center pt-2 text-xs text-gray-600">
                {isRegister ? (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      className="text-[#b10000] font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegister(true)}
                      className="text-[#b10000] font-bold hover:underline"
                    >
                      Create One
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
