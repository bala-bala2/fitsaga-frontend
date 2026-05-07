import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const OnboardingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    name: '',
    age: '',
    weight: '',
    height: '',
    targetWeight: '',
    dietPref: '',
    activity: ''
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ gender: '', name: '', age: '', weight: '', height: '', targetWeight: '', dietPref: '', activity: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    // Auto-fill target weight using current weight first time they reach Step 3
    if (step === 2 && !formData.targetWeight && formData.weight) {
      setFormData(prev => ({ ...prev, targetWeight: prev.weight }));
    }
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerate = () => {
    const { gender, age, weight, height, activity, targetWeight, dietPref } = formData;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    const tW = parseFloat(targetWeight);

    // Calculate BMI
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    
    let bmiCategory = '';
    let bmiColor = ''; 

    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = 'text-yellow-500';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      bmiCategory = 'Normal Weight';
      bmiColor = 'text-green-500';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      bmiCategory = 'Overweight';
      bmiColor = 'text-yellow-600';
    } else {
      bmiCategory = 'High Risk (Obese)';
      bmiColor = 'text-red-500';
    }

    // Calculate BMR
    let bmr = 0;
    if (gender === 'Male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Activity Multiplier
    let multiplier = 1.2;
    if (activity === 'Low') multiplier = 1.2;
    if (activity === 'Moderate') multiplier = 1.55;
    if (activity === 'High') multiplier = 1.725;

    const maintenanceCalories = Math.round(bmr * multiplier);

    let goalCalories = maintenanceCalories;
    let dietPlan = '';
    let exercisePlan = '';

    const weightDiff = tW - w;

    // Adjust calories and exercise based on target weight differential
    if (weightDiff > 1) {
      goalCalories += 450;
      exercisePlan = 'Strength training 3-4 days/week focused on progressive overload (heavy lifting). Keep cardio light to conserve energy for muscle growth.';
    } else if (weightDiff < -1) {
      goalCalories -= 500;
      exercisePlan = 'High-intensity interval training (HIIT) paired with 10k daily steps. Aim for 4-5 active days a week maximizing calorie burn and fat loss.';
    } else {
      exercisePlan = 'A hybrid blend: 3 days of strength/resistance training and 2 days of cardiovascular activities to maintain lean mass and heart health.';
    }

    // Curate diet deeply based on Veg/Non-Veg AND Weight Differential
    if (dietPref === 'Veg') {
      if (weightDiff > 1) {
        dietPlan = 'High-protein vegetarian diet for mass building: Focus on Paneer, Lentils/Dal, Chickpeas, Greek Yogurt, Nuts, and Quinoa. Eat highly caloric-dense whole foods.';
      } else if (weightDiff < -1) {
        dietPlan = 'Calorie deficit vegetarian diet: Emphasize high-volume, low-calorie fibrous vegetables, Tofu, sprouts, and clear soups. Avoid excess cooking oils and refined carbs.';
      } else {
        dietPlan = 'Balanced vegetarian maintenance diet: 40% carbs, 30% protein (Tofu/Paneer/Legumes), 30% healthy fats. Ensure broad vitamin intake through leafy greens.';
      }
    } else {
      if (weightDiff > 1) {
        dietPlan = 'High-protein non-vegetarian diet for mass building: Focus on Chicken breast, Eggs, Salmon, whole milk, and complex carbs like sweet potatoes and rice.';
      } else if (weightDiff < -1) {
        dietPlan = 'Calorie deficit non-vegetarian diet: Emphasize lean proteins (grilled chicken, white fish, egg whites) paired with massive portions of steamed green vegetables.';
      } else {
        dietPlan = 'Balanced non-vegetarian maintenance diet: 40% carbs, 30% protein (chicken, beef, eggs), 30% fats. Focus on whole foods and adequate hydration.';
      }
    }

    const calculatedResult = {
      bmi: bmiValue.toFixed(1),
      bmiCategory,
      bmiColor,
      calories: goalCalories,
      dietPlan,
      exercisePlan
    };

    localStorage.setItem('fitSagaPersonalData', JSON.stringify({ result: calculatedResult, name: formData.name, formData: formData }));

    // --- AUTO-SAVE TO PROFILE REGISTRY ---
    const newProfileEntry = {
      id: Date.now(),
      name: formData.name || `User ${Date.now().toString().slice(-4)}`,
      gender: formData.gender,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      targetWeight: formData.targetWeight || formData.weight,
      dietType: formData.dietPref === 'Veg' ? 'Vegetarian' : 'Non-Vegetarian'
    };

    const existingProfilesRaw = localStorage.getItem('fitsagaProfilesList');
    let updatedProfiles = [];
    if (existingProfilesRaw) {
      try {
        updatedProfiles = JSON.parse(existingProfilesRaw);
      } catch (e) { updatedProfiles = []; }
    }
    
    // Check if a profile with similar name already exists to avoid duplicates if user re-runs
    const exists = updatedProfiles.find(p => p.name === newProfileEntry.name);
    if (!exists) {
      updatedProfiles.push(newProfileEntry);
      localStorage.setItem('fitsagaProfilesList', JSON.stringify(updatedProfiles));
    }

    onClose();
    window.location.hash = '#member';
  };

  const isStep1Valid = formData.gender !== '';
  const isStep2Valid = formData.name && formData.age && formData.weight && formData.height;
  const isStep3Valid = formData.dietPref !== '';
  const isStep4Valid = formData.activity !== '';

  return (
    <div 
      className={`fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-[480px] bg-white border border-slate-200 rounded-[32px] shadow-2xl overflow-hidden will-change-transform z-10 p-8 pt-10">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors bg-slate-100 p-2 rounded-full hover:bg-slate-200">
          <X size={20} />
        </button>

        {/* Progress Indicator */}
        <div className="mb-8 pr-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Step {step} of 4</span>
            <span className="text-xs font-semibold text-slate-400">
              {step === 1 ? 'Gender' : step === 2 ? 'Measures' : step === 3 ? 'Goals' : 'Lifestyle'}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
            <div 
              className="h-full bg-primary-500 transition-all duration-700 ease-out relative" 
              style={{ width: `${(step / 4) * 100}%` }}
            >
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden w-full min-h-[380px]">
          
          {/* Step 1: Gender */}
          <div className={`absolute inset-0 w-full transition-all duration-500 ease-out ${step === 1 ? 'translate-x-0 opacity-100 relative pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'}`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Tell us about you 👋</h2>
              <p className="text-slate-500 font-medium text-sm">Select your gender to personalize your experience.</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <button 
                onClick={() => setFormData({...formData, gender: 'Male'})}
                className={`flex flex-col items-center justify-center px-4 py-10 rounded-[24px] border-2 transition-all duration-300 focus:outline-none ${formData.gender === 'Male' ? 'bg-primary-50 border-primary-500 scale-[1.02] shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <span className="text-6xl mb-4 drop-shadow-sm">🧑</span>
                <span className={`font-bold text-lg ${formData.gender === 'Male' ? 'text-primary-700' : 'text-slate-600'}`}>Male</span>
              </button>
              <button 
                onClick={() => setFormData({...formData, gender: 'Female'})}
                className={`flex flex-col items-center justify-center px-4 py-10 rounded-[24px] border-2 transition-all duration-300 focus:outline-none ${formData.gender === 'Female' ? 'bg-primary-50 border-primary-500 scale-[1.02] shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <span className="text-6xl mb-4 drop-shadow-sm">👩</span>
                <span className={`font-bold text-lg ${formData.gender === 'Female' ? 'text-primary-700' : 'text-slate-600'}`}>Female</span>
              </button>
            </div>
            <button 
              onClick={handleNext}
              disabled={!isStep1Valid}
              className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-lg"
            >
              Next Step <ArrowRight size={20} />
            </button>
          </div>

          {/* Step 2: Basic Info */}
          <div className={`absolute top-0 w-full transition-all duration-500 ease-out ${step === 2 ? 'translate-x-0 opacity-100 relative pointer-events-auto' : step < 2 ? 'translate-x-12 opacity-0 pointer-events-none' : '-translate-x-12 opacity-0 pointer-events-none'}`}>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Your Basic Info</h2>
              <p className="text-slate-500 font-medium text-sm">Help us calculate your specific body metrics.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block px-1">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary-500 transition-colors font-medium text-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block px-1">Age (Yrs)</label>
                  <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary-500 transition-colors font-medium text-lg" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block px-1">Weight (Kg)</label>
                  <input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary-500 transition-colors font-medium text-lg" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block px-1">Height (Cm)</label>
                  <input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="w-full bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary-500 transition-colors font-medium text-lg" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={handleBack} className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-200 transition-all border border-slate-200"><ArrowLeft size={20} /></button>
              <button onClick={handleNext} disabled={!isStep2Valid} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-lg">Next Step <ArrowRight size={20} /></button>
            </div>
          </div>

          {/* Step 3: Goals & Diet Preferences */}
          <div className={`absolute top-0 w-full transition-all duration-500 ease-out ${step === 3 ? 'translate-x-0 opacity-100 relative pointer-events-auto' : step < 3 ? 'translate-x-12 opacity-0 pointer-events-none' : '-translate-x-12 opacity-0 pointer-events-none'}`}>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Your Custom Goals</h2>
              <p className="text-slate-500 font-medium text-sm">Where do you want to be?</p>
            </div>
            <div className="space-y-8">
              {/* Target Weight Slider */}
              <div>
                <div className="flex justify-between items-end mb-3 px-1">
                  <label className="text-sm font-bold text-slate-700">Target Weight</label>
                  <span className="text-2xl font-extrabold text-primary-600">{formData.targetWeight || formData.weight} <span className="text-sm text-slate-500 font-medium">kg</span></span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="150" 
                  value={formData.targetWeight || formData.weight} 
                  onChange={(e) => setFormData({...formData, targetWeight: e.target.value})} 
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
                />
                <div className="flex justify-between mt-2 px-1 text-xs text-slate-400 font-medium">
                  <span>Lose Weight</span>
                  <span>Gain Weight</span>
                </div>
              </div>

              {/* Diet Preferences */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-4 block px-1">Dietary Preference</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setFormData({...formData, dietPref: 'Veg'})}
                    className={`flex items-center justify-center gap-3 py-5 rounded-[20px] border-2 transition-all duration-300 font-bold focus:outline-none ${formData.dietPref === 'Veg' ? 'bg-green-50 text-green-700 border-green-500 shadow-sm scale-[1.02]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    <span className="text-2xl pt-0.5">🌿</span> Vegetarian
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, dietPref: 'Non-Veg'})}
                    className={`flex items-center justify-center gap-3 py-5 rounded-[20px] border-2 transition-all duration-300 font-bold focus:outline-none ${formData.dietPref === 'Non-Veg' ? 'bg-red-50 text-red-700 border-red-500 shadow-sm scale-[1.02]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    <span className="text-2xl pt-0.5">🍗</span> Non-Veg
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-10">
              <button onClick={handleBack} className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-200 transition-all border border-slate-200"><ArrowLeft size={20} /></button>
              <button onClick={handleNext} disabled={!isStep3Valid} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-lg">Next Step <ArrowRight size={20} /></button>
            </div>
          </div>

          {/* Step 4: Lifestyle */}
          <div className={`absolute top-0 w-full transition-all duration-500 ease-out ${step === 4 ? 'translate-x-0 opacity-100 relative pointer-events-auto' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Your Lifestyle</h2>
              <p className="text-slate-500 font-medium text-sm">How active are you on a daily basis?</p>
            </div>
            <div className="space-y-3">
              {[
                { level: 'Low', icon: '🛋️', label: 'Low Activity', desc: 'Mostly sitting down, working at a desk' },
                { level: 'Moderate', icon: '🚶', label: 'Moderate Activity', desc: 'Light exercise 3-5 days/week' },
                { level: 'High', icon: '🏃', label: 'High Activity', desc: 'Hard exercise almost every day' }
              ].map(act => (
                <button 
                  key={act.level}
                  onClick={() => setFormData({...formData, activity: act.level})}
                  className={`w-full text-left flex items-center gap-5 p-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${formData.activity === act.level ? 'bg-primary-50 border-primary-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <div className="text-4xl drop-shadow-sm ml-1">{act.icon}</div>
                  <div className="flex-1">
                    <div className={`text-lg font-bold ${formData.activity === act.level ? 'text-primary-800' : 'text-slate-800'}`}>{act.label}</div>
                    <div className="text-slate-500 text-sm mt-0.5 max-w-[200px] line-clamp-1">{act.desc}</div>
                  </div>
                  {formData.activity === act.level && (
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-2 shadow-inner">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={handleBack} className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-200 transition-all border border-slate-200"><ArrowLeft size={20} /></button>
              <button onClick={handleGenerate} disabled={!isStep4Valid} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-lg">Generate Plan</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OnboardingModal;
