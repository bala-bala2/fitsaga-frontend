import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { goals } from '../data/fitnessData';
import { useAuthModal } from '../context/AuthContext';

const GoalCards = () => {
  const { openModal } = useAuthModal();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating API call
    // fetch("/api/goals").then(res => res.json()).then(setData)
    setData(goals);
  }, []);

  return (
    <section id="goals" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Fitness Goal</h2>
            <p className="text-slate-600 text-lg">Select a structured program designed specifically to help you reach your ultimate body aspirations efficiently.</p>
          </div>
          <button onClick={() => openModal('signup')} className="text-primary-500 font-semibold hover:text-primary-600 flex items-center gap-2 group">
            View All Goals <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((goal) => (
            <div key={goal.id} className="group relative rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors z-10"></div>
              <img 
                src={goal.image} 
                alt={goal.title} 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-slate-900 to-transparent pt-12">
                <h4 className="text-2xl font-bold text-white mb-2">{goal.title}</h4>
                <p className="text-slate-200 text-sm mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {goal.description}
                </p>
                <button onClick={() => openModal('signup')} className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-slate-900 transition-colors">
                  View Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalCards;
