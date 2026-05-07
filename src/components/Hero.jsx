import { ArrowRight, Play } from 'lucide-react';
import { useAuthModal } from '../context/AuthContext';

const Hero = () => {
  const { openModal } = useAuthModal();
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary-50/50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-6 border border-primary-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              New: AI Personalized Workouts
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Your Fitness. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Your Goals.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Track your fitness goals, log workouts, and discover the perfect nutrition plans to match your lifestyle. Join a community dedicated to getting healthier everyday.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => openModal('signup')} className="px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Start Your Journey <ArrowRight size={20} />
              </button>
              <button onClick={() => openModal('signup')} className="px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                <Play size={20} className="text-primary-500" /> Explore Plans
              </button>
            </div>
            
            <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <span className="text-slate-900 font-bold">10k+</span> Active members
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main Image */}
            <div className="relative w-full max-w-md mx-auto z-10">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800" 
                alt="Fitness App Dashboard" 
                className="rounded-3xl shadow-2xl border-4 border-white object-cover"
              />
              
              {/* Floating Cards simulating UI */}
              <div className="absolute top-10 -left-12 glass-card p-4 rounded-xl flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl">🔥</div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Calories Burned</div>
                  <div className="text-lg font-bold text-slate-900">840 kcal</div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-8 glass-card p-4 rounded-xl flex items-center gap-4 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 text-xl">👟</div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Daily Steps</div>
                  <div className="text-lg font-bold text-slate-900">12,450</div>
                </div>
              </div>
            </div>
            
            {/* Background blob for image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 rounded-full blur-3xl opacity-50 scale-90 -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
