import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';
import GoalCards from '../components/GoalCards';
import WorkoutCards from '../components/WorkoutCards';
import NutritionCards from '../components/NutritionCards';
import ProgressCards from '../components/ProgressCards';
import Footer from '../components/Footer';
import { useAuthModal } from '../context/AuthContext';

const CTASection = () => {
  const { openModal } = useAuthModal();
  return (
  <section className="py-24 relative overflow-hidden bg-primary-600 text-white">
    {/* Decorative blur elements for modern UI */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-500 rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-40 -translate-x-1/2 translate-y-1/2"></div>
    
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Transform Your Life?</h2>
      <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
        Join FitSaga today and get access to personalized plans, real-time tracking, and a community that supports your fitness journey.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button onClick={() => openModal('signup')} className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold hover:bg-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto text-lg shadow-lg">
          Start Free Trial
        </button>

      </div>
      <p className="text-primary-200 mt-6 text-sm">No credit card required for 7-day free trial.</p>
    </div>
  </section>
  );
};

const TestimonialSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-primary-500 font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Success Stories</h3>
        <p className="text-slate-600 text-lg">Real people. Real results. See how FitSaga is changing lives.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Sarah Jenkins",
            role: "Lost 25 lbs",
            image: "https://i.pravatar.cc/150?img=47",
            quote: "FitSaga changed my entire approach to health. The goal tracking and nutrition guides simple to follow. I've never felt better!"
          },
          {
            name: "Mike Thompson",
            role: "Gained 10 lbs Muscle",
            image: "https://i.pravatar.cc/150?img=11",
            quote: "The personalized workout routines adapted to my schedule perfectly. Seeing my daily progress analytics kept me motivated to train harder."
          },
          {
            name: "Elena Rodriguez",
            role: "Marathon Finisher",
            image: "https://i.pravatar.cc/150?img=5",
            quote: "I used the endurance training plans on FitSaga. The community feature also helped me stay accountable when things got tough."
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow relative">
            <div className="text-primary-200 absolute top-6 right-6 text-6xl font-serif">"</div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-slate-900">{item.name}</h4>
                <p className="text-primary-500 text-sm font-medium">{item.role}</p>
              </div>
            </div>
            <p className="text-slate-600 italic leading-relaxed relative z-10">"{item.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      <Hero />
      <FeatureCards />
      <GoalCards />
      <WorkoutCards />
      <NutritionCards />
      <ProgressCards />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
