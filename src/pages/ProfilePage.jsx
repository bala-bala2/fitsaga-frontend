import React, { useState, useEffect } from 'react';
import { User, Trash2, ArrowLeft, Plus, ChevronRight, Scale, Activity, Apple, CheckCircle2 } from 'lucide-react';

const ProfilePage = () => {
  // Initialize profiles state from local storage immediately to prevent mismatch
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('fitsagaProfilesList');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Profiles initialization error:", e);
      }
    }
    
    // Fallback if list is empty: check onboarding data
    const onboarding = localStorage.getItem('fitSagaPersonalData');
    if (onboarding) {
      try {
        const parsed = JSON.parse(onboarding);
        const initial = {
          id: Date.now(),
          name: parsed.name || 'Main Profile',
          gender: parsed.formData?.gender || 'Not set',
          age: parsed.formData?.age || '25',
          height: parsed.formData?.height || '170',
          weight: parsed.formData?.weight || '70',
          targetWeight: parsed.formData?.targetWeight || '70',
          dietType: parsed.formData?.dietPref || 'Veg'
        };
        return [initial];
      } catch (e) {}
    }
    return [];
  });

  const [view, setView] = useState('list'); // 'list' | 'add' | 'detail'
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '', gender: '', age: '', height: '', weight: '', targetWeight: '', dietType: ''
  });

  // Persist to local storage whenever profiles change
  useEffect(() => {
    localStorage.setItem('fitsagaProfilesList', JSON.stringify(profiles));
  }, [profiles]);

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newProfile = { 
      ...formData, 
      id: Date.now(),
      // Ensure numeric values are stored cleanly
      age: formData.age || '0',
      weight: formData.weight || '0',
      height: formData.height || '0',
      targetWeight: formData.targetWeight || '0'
    };

    setProfiles((prev) => [...prev, newProfile]);
    setFormData({ name: '', gender: '', age: '', height: '', weight: '', targetWeight: '', dietType: '' });
    setView('list');
  };

  const deleteProfile = (id, e) => {
    e.stopPropagation();
    setProfiles((prev) => prev.filter(p => p.id !== id));
    if (selectedProfile?.id === id) setView('list');
  };

  const selectProfile = (p) => {
    setSelectedProfile(p);
    setView('detail');
  };

  const goBackToDash = () => { window.location.hash = '#dashboard'; };

  const switchActiveProfile = (profile) => {
    // This updates the main FitSaga dashboard session
    const syncData = {
      name: profile.name,
      formData: {
        name: profile.name,
        gender: profile.gender,
        age: profile.age,
        weight: profile.weight,
        height: profile.height,
        targetWeight: profile.targetWeight,
        dietPref: profile.dietType
      }
    };
    localStorage.setItem('fitSagaPersonalData', JSON.stringify(syncData));
    alert(`${profile.name}'s profile is now active on the dashboard!`);
    window.location.hash = '#member';
  };

  // --- UI Renders ---

  const renderList = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div>
          <span className="px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 inline-block border border-primary-100 shadow-sm">Account Hub</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">Profile Registry</h2>
          <p className="text-slate-500 font-medium text-lg max-w-lg">Manage and switch between your registered fitness profiles instantly.</p>
        </div>
        <button 
          onClick={() => setView('add')}
          className="flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-7 py-4 rounded-2xl font-bold hover:shadow-primary-500/40 transition-all shadow-xl shadow-primary-500/20 active:scale-95 whitespace-nowrap text-lg relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 skew-x-12"></div>
          <Plus size={20} strokeWidth={3} className="relative z-10" /> <span className="relative z-10">Register New Account</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(p => (
          <div 
            key={p.id}
            onClick={() => selectProfile(p)}
            className="group relative bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[32px] hover:border-primary-500/30 hover:bg-white hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-[22px] flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:text-white group-hover:rotate-6 shadow-sm border border-primary-100">
                <User size={28} />
              </div>
              <button 
                onClick={(e) => deleteProfile(p.id, e)}
                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <h4 className="font-extrabold text-slate-900 text-3xl tracking-tight mb-2">{p.name}</h4>
            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm uppercase tracking-wider mb-8">
               <span className="bg-white/80 px-3 py-1 rounded-lg border border-slate-100">{p.weight} kg</span>
               <span className="bg-white/80 px-3 py-1 rounded-lg border border-slate-100">{p.dietType}</span>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-slate-200/50 mt-auto">
               <span className="text-sm font-extrabold text-primary-500 uppercase tracking-widest group-hover:text-primary-600 transition-colors">View Profile</span>
               <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transform group-hover:translate-x-1 transition-all">
                 <ChevronRight size={18} />
               </div>
            </div>
          </div>
        ))}

        {/* Empty Placeholder Card */}
        {profiles.length < 6 && (
          <div 
            onClick={() => setView('add')}
            className="border-2 border-dashed border-slate-300/60 rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 text-slate-500 hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group"
          >
             <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all shadow-sm">
                <Plus size={24} />
             </div>
             <span className="font-bold text-sm tracking-wide">Add Empty Slot</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderAdd = () => (
    <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl border border-white shadow-2xl p-10 sm:p-14 rounded-[40px] animate-in zoom-in-95 duration-500 text-slate-900">
      <button onClick={() => setView('list')} className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-800 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-xl w-fit shadow-sm">
        <ArrowLeft size={18} strokeWidth={3} /> Cancel Registration
      </button>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Register New Profile</h2>
      <form onSubmit={handleAddProfile} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="sm:col-span-2">
             <label className="text-xs font-extrabold text-slate-500 mb-2.5 block uppercase tracking-widest ml-1">Account Holder Name</label>
             <input required name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-2 border-white p-5 rounded-[22px] focus:outline-none focus:bg-white focus:border-primary-500 transition-all font-bold text-lg text-slate-900 placeholder-slate-400 shadow-sm" placeholder="E.g. John Doe / Summer Cut" />
           </div>
           <div>
             <label className="text-xs font-extrabold text-slate-500 mb-2.5 block uppercase tracking-widest ml-1">Gender</label>
             <select required name="gender" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full bg-slate-50 border-2 border-white p-5 rounded-[22px] focus:outline-none focus:bg-white focus:border-primary-500 transition-all font-bold text-lg text-slate-900 appearance-none shadow-sm">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
             </select>
           </div>
           <div>
             <label className="text-xs font-extrabold text-slate-500 mb-2.5 block uppercase tracking-widest ml-1">Current Age</label>
             <input required name="age" type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full bg-slate-50 border-2 border-white p-5 rounded-[22px] focus:outline-none focus:bg-white focus:border-primary-500 transition-all font-bold text-lg text-slate-900 shadow-sm" />
           </div>
           <div>
             <label className="text-xs font-extrabold text-slate-500 mb-2.5 block uppercase tracking-widest ml-1">Weight (kg)</label>
             <input required name="weight" type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full bg-slate-50 border-2 border-white p-5 rounded-[22px] focus:outline-none focus:bg-white focus:border-primary-500 transition-all font-bold text-lg text-slate-900 shadow-sm" />
           </div>
           <div>
             <label className="text-xs font-extrabold text-slate-500 mb-2.5 block uppercase tracking-widest ml-1">Height (cm)</label>
             <input required name="height" type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="w-full bg-slate-50 border-2 border-white p-5 rounded-[22px] focus:outline-none focus:bg-white focus:border-primary-500 transition-all font-bold text-lg text-slate-900 shadow-sm" />
           </div>
           <div>
             <label className="text-xs font-extrabold text-slate-500 mb-2.5 block uppercase tracking-widest ml-1">Target Goal (kg)</label>
             <input required name="targetWeight" type="number" value={formData.targetWeight} onChange={(e) => setFormData({...formData, targetWeight: e.target.value})} className="w-full bg-slate-50 border-2 border-white p-5 rounded-[22px] focus:outline-none focus:bg-white focus:border-primary-500 transition-all font-bold text-lg text-slate-900 shadow-sm" />
           </div>
           <div>
             <label className="text-xs font-extrabold text-slate-500 mb-2.5 block uppercase tracking-widest ml-1">Diet Preference</label>
             <select required name="dietType" value={formData.dietType} onChange={(e) => setFormData({...formData, dietType: e.target.value})} className="w-full bg-slate-50 border-2 border-white p-5 rounded-[22px] focus:outline-none focus:bg-white focus:border-primary-500 transition-all font-bold text-lg text-slate-900 appearance-none shadow-sm">
                <option value="">Select Diet</option>
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
             </select>
           </div>
        </div>
        <button type="submit" className="w-full py-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-[24px] font-extrabold text-xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all active:scale-95 mt-8">Save Profile Details</button>
      </form>
    </div>
  );

  const renderDetail = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-700">
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-[24px] border border-white shadow-sm">
         <button onClick={() => setView('list')} className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 transition-colors bg-white px-5 py-3 rounded-[16px] shadow-sm border border-slate-100 hover:shadow-md">
          <ArrowLeft size={18} strokeWidth={3} /> Return to Registry
        </button>
        <div className="flex items-center gap-2 px-5 py-3 bg-emerald-50 text-emerald-600 rounded-[16px] text-xs font-extrabold uppercase tracking-widest border border-emerald-100">
          <CheckCircle2 size={16} /> Profile Verified
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[40px] border border-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         <div className="w-32 h-32 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-[34px] flex items-center justify-center text-white shadow-2xl shadow-primary-500/30 relative z-10 flex-shrink-0 border border-white/40">
            <User size={56} strokeWidth={2.5} />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-white">
               <CheckCircle2 size={24} className="text-secondary-500" />
            </div>
         </div>
         <div className="flex-1 text-center md:text-left z-10">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tighter leading-none mb-4">{selectedProfile.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
              <span className="px-4 py-2 bg-white/80 text-slate-600 rounded-xl text-sm font-bold uppercase tracking-widest border border-slate-100">{selectedProfile.gender}</span>
              <span className="px-4 py-2 bg-white/80 text-slate-600 rounded-xl text-sm font-bold uppercase tracking-widest border border-slate-100">{selectedProfile.age} Years Old</span>
              <span className="px-4 py-2 bg-white/80 text-slate-600 rounded-xl text-sm font-bold uppercase tracking-widest border border-slate-100">{selectedProfile.height} cm</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         <div className="bg-white/80 backdrop-blur-lg border border-white p-8 rounded-[32px] shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-[18px] flex items-center justify-center mb-6 border border-primary-100"><Scale size={24} /></div>
            <div className="text-5xl font-extrabold text-slate-900 mb-2">{selectedProfile.weight} <span className="text-sm text-slate-400 font-bold uppercase tracking-widest align-middle">kg</span></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Initial Mass</p>
         </div>
         <div className="bg-white/80 backdrop-blur-lg border border-white p-8 rounded-[32px] shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-secondary-50 text-secondary-600 rounded-[18px] flex items-center justify-center mb-6 border border-secondary-100"><Activity size={24} /></div>
            <div className="text-5xl font-extrabold text-slate-900 mb-2">{selectedProfile.targetWeight} <span className="text-sm text-slate-400 font-bold uppercase tracking-widest align-middle">kg</span></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Target</p>
         </div>
         <div className="bg-white/80 backdrop-blur-lg border border-white p-8 rounded-[32px] shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-[18px] flex items-center justify-center mb-6 border border-purple-100"><Apple size={24} /></div>
            <div className="text-3xl font-extrabold text-slate-900 mb-2 whitespace-nowrap">{selectedProfile.dietType}</div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dietary Map</p>
         </div>
      </div>

      <div className="bg-slate-900 p-10 sm:p-14 rounded-[48px] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mt-10 border border-slate-800">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-screen"></div>
          
          <div className="relative z-10 max-w-lg">
            <span className="px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 inline-block backdrop-blur-md border border-white/10">Action Required</span>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Integrate to Main Dashboard</h3>
            <p className="text-slate-300 font-medium leading-relaxed text-lg">Deploy {selectedProfile.name}'s physiological signature into the central FitSaga AI. Charts, logic, and calorie models will instantly adapt.</p>
          </div>
          <button 
             onClick={() => switchActiveProfile(selectedProfile)}
             className="w-full md:w-auto px-10 py-5 bg-white text-slate-900 rounded-[24px] font-extrabold text-xl hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all transform active:scale-95 shadow-xl relative z-10 whitespace-nowrap"
          >
            Launch Active Session
          </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-14 transition-all relative overflow-hidden font-sans text-slate-900">
      {/* Premium Light Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-[#f8fafc] to-[#f8fafc] pointer-events-none"></div>
      
      {/* Animated Soft Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary-200/40 blur-[120px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-secondary-200/40 blur-[120px] pointer-events-none mix-blend-multiply flex animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-start mb-12 animate-in slide-in-from-left duration-700">
           <button onClick={goBackToDash} className="px-6 py-4 bg-white/60 backdrop-blur-md border border-white rounded-[20px] text-slate-600 font-extrabold hover:text-slate-900 hover:bg-white hover:-translate-y-1 transition-all flex items-center gap-3 shadow-lg hover:shadow-xl">
             <ArrowLeft size={20} strokeWidth={3} /> Return to Hub
           </button>
        </div>
        
        <div className="relative">
           {view === 'list' && renderList()}
           {view === 'add' && renderAdd()}
           {view === 'detail' && renderDetail()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
