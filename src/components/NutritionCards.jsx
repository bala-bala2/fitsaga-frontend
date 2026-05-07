import { useEffect, useState } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import { diets } from '../data/fitnessData';
import { useAuthModal } from '../context/AuthContext';

const NutritionCards = () => {
  const { openModal } = useAuthModal();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating API call
    // fetch("/api/nutrition").then(res => res.json()).then(setData)
    setData(diets);
  }, []);

  return (
    <section id="nutrition" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-50 text-secondary-600 font-medium text-sm self-start border border-secondary-100">
              <Leaf size={16} /> Fuel Your Body
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nutrition Plans Designed For You</h2>
            <p className="text-slate-600 text-lg leading-relaxed">Achieving your goals is 80% nutrition. Our expertly curated diet plans ensure that you eat well without sacrificing flavor.</p>
            <button onClick={() => openModal('signup')} className="text-white bg-slate-900 px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors font-medium self-start mt-4 flex items-center gap-2 shadow-sm">
              Explore Recipes <ArrowRight size={18} />
            </button>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {data.map((diet) => (
              <div key={diet.id} className="flex bg-slate-50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                <img 
                  src={diet.image} 
                  alt={diet.title} 
                  className="w-1/3 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="w-2/3 p-5 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-slate-900 mb-2 truncate">{diet.title}</h4>
                  <p className="text-slate-500 text-sm line-clamp-2">{diet.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionCards;
