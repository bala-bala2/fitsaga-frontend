import { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { useAuthModal } from '../context/AuthContext';

const Navbar = () => {
  const { openModal, isAuthenticated } = useAuthModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Goals', href: '#goals' },
    { name: 'Workouts', href: '#workouts' },
    { name: 'Nutrition', href: '#nutrition' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
              <Dumbbell size={20} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>FitSaga</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-slate-600 hover:text-primary-500 font-medium transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => openModal('login')} className="text-slate-600 hover:text-primary-500 font-medium transition-colors">Login</button>
            <button onClick={() => openModal('signup')} className="px-5 py-2.5 rounded-full bg-primary-500 text-white font-medium hover:bg-primary-600 shadow-md shadow-primary-500/30 transition-all active:scale-95">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-600 hover:text-primary-500 font-medium p-2"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            <button onClick={() => { setIsMobileMenuOpen(false); openModal('login'); }} className="w-full py-2.5 text-center text-slate-600 font-medium border border-slate-200 rounded-lg">Login</button>
            <button onClick={() => { setIsMobileMenuOpen(false); openModal('signup'); }} className="w-full py-2.5 text-center bg-primary-500 text-white font-medium rounded-lg">Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
