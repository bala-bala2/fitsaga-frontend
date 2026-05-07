import { useEffect, useState } from 'react';
import { Clock, PlayCircle } from 'lucide-react';
import { workouts } from '../data/fitnessData';
import { useAuthModal } from '../context/AuthContext';

const WorkoutCards = () => {
  const { openModal } = useAuthModal();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating API call
    // fetch("/api/workouts").then(res => res.json()).then(setData)
    setData(workouts);
  }, []);

  return (
    <section id="workouts" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-500 font-semibold tracking-wide uppercase text-sm mb-3">Programs</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trending Workouts</h3>
          <p className="text-slate-600 text-lg">Pick a program, press play, and let our expert trainers guide you every step of the way.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((workout) => (
            <div key={workout.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={workout.image} 
                  alt={workout.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {workout.difficulty}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-slate-900 mb-2 truncate">{workout.title}</h4>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <Clock size={16} /> {workout.duration}
                </div>
                <button onClick={() => openModal('signup')} className="mt-auto w-full py-3 rounded-xl bg-slate-50 text-slate-900 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors flex justify-center items-center gap-2 border border-slate-100 group-hover:border-primary-100">
                  <PlayCircle size={18} /> Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutCards;
