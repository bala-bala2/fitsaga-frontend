import { useEffect, useState } from 'react';
import { Target, Activity, Utensils, LineChart, Calculator, Users } from 'lucide-react';
import { features } from '../data/fitnessData';

const iconMap = {
  Target: Target,
  Activity: Activity,
  Utensils: Utensils,
  LineChart: LineChart,
  Calculator: Calculator,
  Users: Users,
};

const FeatureCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating API call
    // fetch("/api/features").then(res => res.json()).then(setData)
    setData(features);
  }, []);

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-500 font-semibold tracking-wide uppercase text-sm mb-3">Core Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to succeed</h3>
          <p className="text-slate-600 text-lg">Our platform provides comprehensive tools to track your fitness, monitor nutrition, and achieve your health goals.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Activity;
            return (
              <div 
                key={feature.id} 
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-primary-50 text-primary-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <IconComponent size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
