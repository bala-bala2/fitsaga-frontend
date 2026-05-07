import React, { useEffect } from 'react';
import { 
  Activity, Home, Map, Heart, Target, BarChart2, Settings, 
  Search, Bell, ChevronDown, Footprints, Flame, Clock, TrendingUp,
  MapPin, Calendar, Award
} from 'lucide-react';

const StravaDashboard = () => {
  // Simulate auth connection on load if accessing via callback
  useEffect(() => {
    if (window.location.hash.includes('strava-callback')) {
      localStorage.setItem('stravaConnected', 'true');
      window.location.hash = '#stravadashboard';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans flex overflow-hidden">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 bg-[#1F2937] border-r border-slate-800 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#FC4C02] flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Strava Analytics</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#FC4C02]/10 text-[#FC4C02] rounded-xl font-medium transition-colors">
            <Home size={18} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <Map size={18} /> Activities
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <TrendingUp size={18} /> Performance
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <Heart size={18} /> Heart Rate
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <Target size={18} /> Goals
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <BarChart2 size={18} /> Analytics
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <Settings size={18} /> Settings
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* 2. Top Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-[#111827]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search activities, goals..." 
                className="w-full bg-[#1F2937] border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#FC4C02] focus:ring-1 focus:ring-[#FC4C02] transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FC4C02] rounded-full border-2 border-[#111827]"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-800 pl-6 cursor-pointer group">
              <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-transparent group-hover:border-[#FC4C02] transition-colors" />
              <div className="hidden sm:block text-sm">
                <p className="font-bold text-white">Good Morning, Abhishek 👋</p>
                <p className="text-xs text-[#FC4C02] font-medium">+12% faster this week</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
            {/* Quick exit & Disconnect */}
            <div className="flex items-center gap-2">
              <button onClick={() => window.location.hash = '#dashboard'} className="text-xs font-bold text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded border border-slate-700 transition-colors">
                Exit
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('stravaConnected');
                  window.location.hash = '#dashboard';
                }} 
                className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded border border-red-400/20 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* 3. Hero Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1F2937] border border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-[#FC4C02]/5 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FC4C02]/10 flex items-center justify-center text-[#FC4C02]">
                  <MapPin size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">+4.2%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Distance</p>
              <h3 className="text-3xl font-extrabold text-white">42.8 <span className="text-lg text-slate-500 font-medium">km</span></h3>
            </div>
            
            <div className="bg-[#1F2937] border border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-[#FC4C02]/5 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FC4C02]/10 flex items-center justify-center text-[#FC4C02]">
                  <Flame size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">+12.5%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Calories Burned</p>
              <h3 className="text-3xl font-extrabold text-white">3,240 <span className="text-lg text-slate-500 font-medium">kcal</span></h3>
            </div>

            <div className="bg-[#1F2937] border border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-[#FC4C02]/5 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FC4C02]/10 flex items-center justify-center text-[#FC4C02]">
                  <TrendingUp size={20} />
                </div>
                <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded-md">-1.1%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Average Pace</p>
              <h3 className="text-3xl font-extrabold text-white">5:42 <span className="text-lg text-slate-500 font-medium">/km</span></h3>
            </div>

            <div className="bg-[#1F2937] border border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-[#FC4C02]/5 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FC4C02]/10 flex items-center justify-center text-[#FC4C02]">
                  <Clock size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">+8.0%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Active Time</p>
              <h3 className="text-3xl font-extrabold text-white">4h 12m</h3>
            </div>
          </div>

          {/* 4. Main Analytics Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Chart Area */}
            <div className="xl:col-span-2 bg-[#1F2937] border border-slate-800 rounded-2xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Activity Overview</h3>
                  <p className="text-sm text-slate-400">Distance vs Elevation over the last 7 days</p>
                </div>
                <div className="flex bg-[#111827] rounded-lg p-1 border border-slate-800">
                  <button className="px-3 py-1.5 text-xs font-bold bg-[#FC4C02] text-white rounded shadow-sm">Weekly</button>
                  <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white">Monthly</button>
                </div>
              </div>

              {/* Mock CSS Graph */}
              <div className="flex-1 flex items-end justify-between gap-2 h-64 mt-auto">
                {[40, 65, 30, 85, 45, 90, 60].map((height, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-3">
                    <div className="w-full relative h-48 bg-[#111827] rounded-t-lg flex items-end overflow-hidden group">
                      <div 
                        className="w-full bg-gradient-to-t from-[#FC4C02]/80 to-[#FF7B42] rounded-t-lg group-hover:opacity-80 transition-opacity relative"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#FC4C02] text-white text-xs font-bold px-2 py-1 rounded transition-opacity">
                          {height/10}km
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{'MTWTFSS'[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Progress Rings */}
            <div className="bg-[#1F2937] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Weekly Goals</h3>
              
              <div className="space-y-6">
                {/* Ring 1 */}
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#FC4C02] stroke-current" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-sm font-bold text-white">75%</span>
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Running Distance</p>
                    <p className="text-xs text-slate-400">15 / 20 km completed</p>
                  </div>
                </div>

                {/* Ring 2 */}
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-emerald-500 stroke-current" strokeWidth="3" strokeDasharray="92, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-sm font-bold text-white">92%</span>
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Active Minutes</p>
                    <p className="text-xs text-slate-400">276 / 300 mins completed</p>
                  </div>
                </div>

                {/* Ring 3 */}
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-blue-500 stroke-current" strokeWidth="3" strokeDasharray="45, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-sm font-bold text-white">45%</span>
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Elevation Gain</p>
                    <p className="text-xs text-slate-400">450 / 1000m climbed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Recent Activities */}
          <div className="bg-[#1F2937] border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Recent Activities</h3>
              <a href="#" className="text-sm font-medium text-[#FC4C02] hover:text-[#FF7B42]">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-[#111827] text-xs uppercase font-semibold text-slate-500 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Activity</th>
                    <th className="px-6 py-4">Distance</th>
                    <th className="px-6 py-4">Pace</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Heart Rate</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-[#111827]/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FC4C02]/10 flex items-center justify-center text-[#FC4C02]">
                        <Footprints size={14} />
                      </div>
                      <span className="font-bold text-white">Morning Trail Run</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">8.42 km</td>
                    <td className="px-6 py-4">5:12 /km</td>
                    <td className="px-6 py-4">43m 48s</td>
                    <td className="px-6 py-4"><span className="text-red-400 font-medium">148 bpm</span></td>
                    <td className="px-6 py-4">Today, 6:30 AM</td>
                  </tr>
                  <tr className="hover:bg-[#111827]/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Activity size={14} />
                      </div>
                      <span className="font-bold text-white">Evening Cycle</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">24.5 km</td>
                    <td className="px-6 py-4">24.2 km/h</td>
                    <td className="px-6 py-4">1h 01m</td>
                    <td className="px-6 py-4"><span className="text-orange-400 font-medium">132 bpm</span></td>
                    <td className="px-6 py-4">Yesterday, 5:45 PM</td>
                  </tr>
                  <tr className="hover:bg-[#111827]/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FC4C02]/10 flex items-center justify-center text-[#FC4C02]">
                        <Footprints size={14} />
                      </div>
                      <span className="font-bold text-white">Tempo Run</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">5.00 km</td>
                    <td className="px-6 py-4">4:45 /km</td>
                    <td className="px-6 py-4">23m 45s</td>
                    <td className="px-6 py-4"><span className="text-red-500 font-bold">165 bpm</span></td>
                    <td className="px-6 py-4">Oct 24, 6:00 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StravaDashboard;
