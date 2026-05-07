import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell, User, Settings, LogOut, ChevronDown, Bell } from 'lucide-react';
import { useAuthModal } from '../context/AuthContext';

const DashboardNavbar = ({ onCreateProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user data in local storage");
      }
    }
  }, []);
  const { logout } = useAuthModal();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 text-white flex items-center justify-center shadow-lg">
              <Dumbbell size={20} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>FitSaga</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {localStorage.getItem('stravaConnected') === 'true' ? (
              <button onClick={() => window.location.hash = '#stravadashboard'} className="hidden sm:flex items-center gap-2 text-sm font-bold text-white bg-[#fc4c02] px-4 py-2 rounded-xl shadow-sm tracking-wide border border-[#e34402] hover:opacity-90 hover:scale-105 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
                Strava Dashboard
              </button>
            ) : (
              <a href="https://www.strava.com/oauth/authorize?client_id=224632&response_type=code&redirect_uri=http://localhost:5173/#strava-callback&approval_prompt=force&scope=activity:read_all" className="hidden sm:flex hover:opacity-90 hover:scale-105 transition-all">
                <button className="flex items-center gap-2 text-sm font-bold text-white bg-[#fc4c02] px-4 py-2 rounded-xl shadow-sm tracking-wide border border-[#e34402]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                  </svg>
                  Connect Strava
                </button>
              </a>
            )}
            <button onClick={onCreateProfile} className="hidden sm:flex text-sm font-semibold text-white bg-[#0c831f] px-5 py-2 rounded-xl hover:bg-[#0a6618] transition-colors shadow-sm tracking-wide">
              Create Profile
            </button>


            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-full sm:rounded-xl transition-colors outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="hidden sm:flex flex-col items-start mr-1">
                  <span className="text-sm font-bold text-slate-900 leading-none">
                    {user ? user.name.split(' ')[0] : 'Guest'}
                  </span>
                </div>
                <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900">{user ? user.name : 'Guest Account'}</p>
                    <p className="text-xs text-slate-500 truncate">{user ? user.email : 'Please login'}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 font-medium hover:bg-slate-50 hover:text-primary-500 rounded-lg transition-colors">
                      <User size={16} /> Switch Account
                    </button>
                    <button 
                      onClick={() => window.location.hash = '#profile'}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 font-medium hover:bg-slate-50 hover:text-primary-500 rounded-lg transition-colors"
                    >
                      <User size={16} /> My Profile
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
