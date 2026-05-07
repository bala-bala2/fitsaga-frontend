import { Flame, Footprints, Calendar, LineChart } from 'lucide-react';

const ProgressCards = () => {
  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-400 font-semibold tracking-wide uppercase text-sm mb-3">Analytics</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Track Progress Seamlessly</h3>
          <p className="text-slate-400 text-lg">Visualize your hard work with beautiful metrics and charts that keep you motivated daily.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-slate-300 font-medium">Daily Steps</h4>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Footprints size={18} />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold">12,450</span>
              <span className="text-slate-400 mb-1">/ 10k</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full w-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-slate-300 font-medium">Calories Burned</h4>
              <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Flame size={18} />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold">840</span>
              <span className="text-slate-400 mb-1">kcal</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-orange-400 h-full rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-slate-300 font-medium">Workout Streak</h4>
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                <Calendar size={18} />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold">14</span>
              <span className="text-slate-400 mb-1">days</span>
            </div>
            <div className="flex justify-between mt-4">
              {['M','T','W','T','F','S','S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i < 5 ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'}`}>
                    {day}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-slate-300 font-medium">Current BMI</h4>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <LineChart size={18} />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-4xl font-bold">22.4</span>
                <div className="text-green-400 text-sm mt-1">Normal Weight</div>
              </div>
            </div>
            <div className="w-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 h-2 rounded-full mt-4 relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-3 h-3 bg-white border-2 border-slate-900 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressCards;
