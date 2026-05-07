import React, { useState } from 'react';
import { useAuthModal } from '../context/AuthContext';
import { X, Mail, Lock, User } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('API URL:', API_URL); // 👈 add this
const AuthModal = () => {
  const { isOpen, closeModal, view, setView, login } = useAuthModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/register`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registered successfully! Please login.');
        setView('login');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Error contacting the backend server. Make sure it's running on localhost:5000");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        login(); // Trigger SPA re-render
        window.location.hash = '#dashboard'; // Redirect immediately to dashboard
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Error contacting the backend server. Make sure it's running on localhost:5000");
    }
  };


  if (!isOpen && typeof document !== 'undefined') {
    // We could return null to completely unmount, but keeping it in DOM with opacity-0 allows smooth transitions
    // However, for simplicity and proper focus management, we render only when open, 
    // or use a wrapper that handles visibility cleanly.
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
    >
      {/* Background Dimmed Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeModal}
      ></div>

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-[420px] bg-white/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
      >
        {/* Decorative Blurred Background Shapes inside modal */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 px-6 pt-10 pb-8 sm:px-8 sm:pt-12 sm:pb-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {view === 'signup' ? 'Start Your Fitness Journey' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-slate-500 font-medium h-5">
              {view === 'signup' ? 'Track your progress. Transform your life.' : 'Log in to continue your progress.'}
            </p>
          </div>

          {/* Form Area */}
          <form className="space-y-4" onSubmit={view === 'signup' ? handleRegister : handleLogin}>
            {view === 'signup' ? (
              <>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-slate-400 font-medium text-slate-800"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    autoComplete="username"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-slate-400 font-medium text-slate-800"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-slate-400 font-medium text-slate-800"
                  />
                </div>
                <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                  <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500/30 transition-shadow" />
                  <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors leading-relaxed">
                    I agree to FitSaga’s <a href="#" className="text-primary-500 hover:underline">Terms</a> & <a href="#" className="text-primary-500 hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </>
            ) : (
              // Login View Inputs
              <>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    autoComplete="username"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-slate-400 font-medium text-slate-800"
                  />
                </div>
                <div className="relative group mt-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-slate-400 font-medium text-slate-800"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors">Forgot Password?</a>
                </div>
              </>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 mt-6 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {view === 'signup' ? 'Create Account' : 'Log in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-semibold text-slate-400 tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-slate-700 text-sm font-semibold border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Toggle View Footer */}
          <div className="mt-8 text-center">
            {view === 'signup' ? (
              <p className="text-sm text-slate-600 font-medium">
                Already have an account?{' '}
                <button
                  onClick={() => setView('login')}
                  className="text-primary-500 font-bold hover:text-primary-600 hover:underline transition-all focus:outline-none"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p className="text-sm text-slate-600 font-medium">
                New to FitSaga?{' '}
                <button
                  onClick={() => setView('signup')}
                  className="text-primary-500 font-bold hover:text-primary-600 hover:underline transition-all focus:outline-none"
                >
                  Create account
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
