import React from 'react';

const DashboardActionButtons = ({ onStartJourney }) => {
  return (
    <section className="bg-slate-50 py-16 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="space-y-24">
        
        {/* Diet Row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Left */}
          <div className="h-[400px] w-full relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={onStartJourney}>
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200" 
              alt="Healthy Bowl" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
          </div>
          {/* Text and Button Right */}
          <div className="lg:pl-4 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Fuel Your Body Right 🥗</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              A sustainable, goal-oriented diet is the absolute foundation of any health journey. Whether you're aiming to slim down, maintain your prime, or pack on muscle, giving your body the right nutrients ensures you never waste a workout. 
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We calculate your unique BMR to generate an instant, highly accurate blueprint specifically tailored to keep you healthy and energized.
            </p>
            <button 
              onClick={onStartJourney} 
              className="w-fit px-12 py-4 rounded-2xl bg-[#0c831f] text-white font-bold text-lg transition-all hover:bg-[#0a6618] hover:-translate-y-1 active:scale-95 shadow-lg shadow-green-600/20 uppercase tracking-widest flex items-center justify-center"
            >
              Get Diet Plan
            </button>
          </div>
        </div>

        {/* Start Journey Row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text and Button Left (Alternating Layout) */}
          <div className="lg:pr-4 flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Your Fitness Journey</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Consistent physical training combined with our smart tracking platform provides the ultimate environment for massive transformation. Stop guessing and start progressing.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Experience dynamic routines curated to your lifestyle pace. Launch into your fittest self by hitting the button below!
            </p>
            <button 
              onClick={onStartJourney} 
              className="w-fit px-12 py-4 rounded-2xl bg-[#0c831f] text-white font-bold text-lg transition-all hover:bg-[#0a6618] hover:-translate-y-1 active:scale-95 shadow-lg shadow-green-600/20 uppercase tracking-widest flex items-center justify-center"
            >
              Start Journey
            </button>
          </div>
          {/* Image Right */}
          <div className="h-[400px] w-full relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer order-1 lg:order-2" onClick={onStartJourney}>
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200" 
              alt="Start Journey Rocket" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DashboardActionButtons;
