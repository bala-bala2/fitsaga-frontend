import React from 'react';
import { Heart, Apple } from 'lucide-react';

const DashboardHealthDiet = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-100 rounded-full blur-[100px] opacity-40 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Row 1 */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Fitness Matters" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>
          
          <div className="lg:pl-8 pt-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex-shrink-0 bg-primary-50 rounded-full flex items-center justify-center text-primary-500 shadow-sm border border-primary-100/50">
                <Heart size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Why Fitness Matters</h2>
            </div>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed mt-2">
              True health is not just about looking good—it’s about optimizing your physical and mental well-being. Regular exercise boosts endurance, enhances cardiovascular health, and drastically reduces stress levels. 
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              At FitSaga, we provide data-driven insights and interactive routines that empower you to take control of your daily habits, making long-term vitality a realistic and engaging goal.
            </p>
            <button className="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-2 group">
              Read Our Health Guide <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:pr-8 order-2 lg:order-1 pt-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex-shrink-0 bg-secondary-50 rounded-full flex items-center justify-center text-secondary-500 shadow-sm border border-secondary-100/50">
                <Apple size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Balanced Diet = Better Results</h2>
            </div>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed mt-2">
              Your workouts are only as effective as the fuel you provide your body. Proper nutrition accelerates recovery, builds lean muscle, and gives you the energy needed to power through your day.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Explore our curated meal plans designed around your specific caloric and macronutrient goals. Never guess what to eat next with our smart, adaptive diet charts.
            </p>
            <button className="text-secondary-600 font-bold hover:text-secondary-700 flex items-center gap-2 group">
              Explore Meal Plans <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-[400px] order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=1200" 
              alt="Balanced Diet" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DashboardHealthDiet;
