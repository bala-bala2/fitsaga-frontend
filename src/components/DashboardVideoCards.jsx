import React from 'react';
import { PlayCircle } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "Full Body HIIT",
    desc: "Intense 20 min full body fat burn.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
    time: "20m"
  },
  {
    id: 2,
    title: "Core Strength",
    desc: "Build a solid foundation.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    time: "15m"
  },
  {
    id: 3,
    title: "Upper Body Power",
    desc: "Gain muscle mass and strength.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
    time: "35m"
  },
  {
    id: 4,
    title: "Yoga & Flexibility",
    desc: "Recover and improve mobility.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800",
    time: "30m"
  }
];

const DashboardVideoCards = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100 rounded-full blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Exercises You Must Like</h2>
            <p className="text-slate-600">Pick up right where you left off</p>
          </div>
          <button className="text-primary-500 font-semibold hover:text-primary-600 transition-colors hidden sm:block">
            View All Workouts
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="group relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={video.image} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                  <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-md" />
                </div>
                <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-md">
                  {video.time}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{video.title}</h3>
                <p className="text-slate-500 text-sm">{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardVideoCards;
