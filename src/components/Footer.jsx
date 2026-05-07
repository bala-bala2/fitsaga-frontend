import { Facebook, Twitter, Instagram, Youtube, Dumbbell } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
                <Dumbbell size={20} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">FitSaga</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your comprehensive platform to track goals, find workouts, and optimize nutrition. Let's build a healthier you together.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-slate-400 hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#workflows" className="text-slate-400 hover:text-primary-400 transition-colors">Programs</a></li>
              <li><a href="#nutrition" className="text-slate-400 hover:text-primary-400 transition-colors">Nutrition</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Subscribe</h4>
            <p className="text-slate-400 mb-4">Get the latest fitness tips and news right in your inbox.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-600"
              />
              <button 
                type="submit" 
                className="bg-primary-500 text-white font-medium py-3 rounded-xl hover:bg-primary-600 transition-colors"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} FitSaga. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
