import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Healthy Body, Healthy Mind",
    subtext: "Maintain a balanced lifestyle tailored just for you.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    title: "Achieve Your Prime",
    subtext: "Experience the power of consistent training.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    title: "Fuel Your Journey",
    subtext: "Smart nutrition choices designed to keep you at your best.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000",
  }
];

const DashboardHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-slate-900 mt-0">
      <div 
        className="flex transition-transform duration-[1200ms] ease-in-out h-full w-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative flex-shrink-0">
            {/* Background Image */}
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
            
            {/* Content properly aligned */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center relative z-20 pt-20">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                  {slide.subtext}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 inset-x-0 z-30 flex justify-center items-center gap-6">
         <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors">
            <ChevronLeft size={20} />
         </button>
         <div className="flex gap-3">
           {slides.map((_, idx) => (
             <button 
               key={idx} 
               onClick={() => setCurrentSlide(idx)}
               className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-primary-500' : 'w-2 bg-white/50 hover:bg-white/80'}`}
             ></button>
           ))}
         </div>
         <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors">
            <ChevronRight size={20} />
         </button>
      </div>
    </section>
  );
};

export default DashboardHeroSlider;
