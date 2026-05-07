import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, User, ChevronDown, ChevronUp,
  Weight, Ruler, Target, Leaf, Drumstick,
  Calendar, Venus, Mars, Pencil, Trash2, Plus
} from 'lucide-react';

// ─── Mock / LocalStorage helpers ───────────────────────────────────────────────────

const STORAGE_KEY = 'fitSagaProfiles';

const defaultProfiles = [
  {
    id: 1,
    name: 'Alex Johnson',
    gender: 'Male',
    age: 27,
    height: 178,
    weight: 82,
    targetWeight: 75,
    diet: 'Non-Vegetarian',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    gender: 'Female',
    age: 24,
    height: 162,
    weight: 60,
    targetWeight: 55,
    diet: 'Vegetarian',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    gender: 'Male',
    age: 31,
    height: 172,
    weight: 70,
    targetWeight: 78,
    diet: 'Non-Vegetarian',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
];

const loadProfiles = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultProfiles;
};

const saveProfiles = (profiles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

// ─── Detail Row ────────────────────────────────────────────────────────────────────

const DetailRow = ({ icon, label, value, colorClass }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
      {icon}
    </div>
    <span className="text-slate-500 text-sm font-medium w-32 flex-shrink-0">{label}</span>
    <span className="text-slate-800 font-semibold text-sm">{value}</span>
  </div>
);

// ─── Profile Card ──────────────────────────────────────────────────────────────────

const ProfileCard = ({ profile, onDelete }) => {
  const [open, setOpen] = useState(false);

  const weightDiff = profile.targetWeight - profile.weight;
  const goalLabel =
    weightDiff < 0
      ? `Lose ${Math.abs(weightDiff)} kg`
      : weightDiff > 0
      ? `Gain ${weightDiff} kg`
      : 'Maintain weight';
  const goalColor =
    weightDiff < 0 ? 'text-rose-500' : weightDiff > 0 ? 'text-emerald-500' : 'text-blue-500';

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        open ? 'border-blue-300 shadow-blue-100' : 'border-slate-200'
      }`}
    >
      {/* ── Header Row (click to toggle) ── */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left focus:outline-none group"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
          />
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${
              profile.diet === 'Vegetarian' ? 'bg-emerald-400' : 'bg-orange-400'
            }`}
            title={profile.diet}
          />
        </div>

        {/* Name + sub-info */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-base leading-tight truncate">{profile.name}</p>
          <p className="text-slate-400 text-xs mt-0.5">
            {profile.gender} · {profile.age} yrs · {profile.diet}
          </p>
        </div>

        {/* Goal badge */}
        <span
          className={`hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 border border-slate-200 ${goalColor}`}
        >
          <Target size={12} />
          {goalLabel}
        </span>

        {/* Chevron */}
        <div
          className={`ml-2 text-slate-400 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown size={20} />
        </div>
      </button>

      {/* ── Slide-down Detail Panel ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 border-t border-slate-100">
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 mb-4">
            {[
              { label: 'Age', value: `${profile.age} yrs`, bg: 'bg-violet-50 text-violet-500' },
              { label: 'Height', value: `${profile.height} cm`, bg: 'bg-sky-50 text-sky-500' },
              { label: 'Current Weight', value: `${profile.weight} kg`, bg: 'bg-amber-50 text-amber-500' },
              { label: 'Target Weight', value: `${profile.targetWeight} kg`, bg: 'bg-emerald-50 text-emerald-500' },
              { label: 'Gender', value: profile.gender, bg: 'bg-pink-50 text-pink-500' },
              { label: 'Diet', value: profile.diet, bg: profile.diet === 'Vegetarian' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl p-3 flex flex-col gap-0.5 ${stat.bg.split(' ')[0]}`}
              >
                <span className={`text-xs font-semibold uppercase tracking-wide ${stat.bg.split(' ')[1]}`}>
                  {stat.label}
                </span>
                <span className="text-slate-800 font-bold text-sm mt-0.5">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Goal bar */}
          <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
            <Target size={16} className={goalColor} />
            <div className="flex-1">
              <div className="flex justify-between text-xs text-slate-500 font-medium mb-1">
                <span>Current: {profile.weight} kg</span>
                <span>Target: {profile.targetWeight} kg</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    weightDiff < 0 ? 'bg-rose-400' : weightDiff > 0 ? 'bg-emerald-400' : 'bg-blue-400'
                  }`}
                  style={{
                    width:
                      weightDiff === 0
                        ? '100%'
                        : `${Math.min(
                            100,
                            Math.abs(
                              ((profile.weight - profile.targetWeight) /
                                Math.max(profile.weight, profile.targetWeight)) *
                                100
                            )
                          )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
              <Pencil size={14} /> Edit Profile
            </button>
            <button
              onClick={() => onDelete(profile.id)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────────

const MyProfile = () => {
  const [profiles, setProfiles] = useState(loadProfiles);

  // Sync from local storage on mount
  useEffect(() => {
    const raw = localStorage.getItem('fitSagaPersonalData');
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        if (saved?.name) {
          const fd = saved.formData || {};
          const liveProfile = {
            id: 'live',
            name: saved.name,
            gender: fd.gender || 'N/A',
            age: fd.age || 'N/A',
            height: fd.height || 'N/A',
            weight: fd.weight || 'N/A',
            targetWeight: fd.targetWeight || 'N/A',
            diet: fd.dietPref === 'Veg' ? 'Vegetarian' : 'Non-Vegetarian',
            avatar: `https://i.pravatar.cc/150?u=${saved.name}`,
          };
          setProfiles((prev) => {
            const withoutLive = prev.filter((p) => p.id !== 'live');
            return [liveProfile, ...withoutLive];
          });
        }
      } catch {}
    }
  }, []);

  const handleDelete = (id) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    saveProfiles(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 font-sans">
      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => (window.location.hash = '')}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold text-sm transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
              <ArrowLeft size={16} />
            </div>
            Back to Main
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg">My Profiles</span>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200">
            <Plus size={15} /> Add Profile
          </button>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        {/* Background blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 relative z-10">
          <p className="text-blue-100 text-sm font-semibold uppercase tracking-widest mb-2">
            FitSaga · Profile Management
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Your Health Profiles
          </h1>
          <p className="text-blue-100 text-base font-medium max-w-md">
            Click on any profile card to reveal detailed metrics. Each profile tracks individual fitness goals.
          </p>

          {/* Quick stats */}
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-extrabold">{profiles.length}</div>
              <div className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Profiles</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-extrabold">
                {profiles.filter((p) => p.diet === 'Vegetarian').length}
              </div>
              <div className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Veg</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-extrabold">
                {profiles.filter((p) => p.diet !== 'Vegetarian').length}
              </div>
              <div className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Non-Veg</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Profile List ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-2">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Vegetarian
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Non-Vegetarian
          </span>
          <span className="ml-auto">Click a card to expand details ↓</span>
        </div>

        {profiles.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <User size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-semibold text-lg">No profiles yet</p>
            <p className="text-sm">Click "Add Profile" to get started.</p>
          </div>
        ) : (
          profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} onDelete={handleDelete} />
          ))
        )}
      </div>

      {/* ── Bottom Return Button ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 text-center">
        <button
          onClick={() => (window.location.hash = '')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft size={18} /> Return to Main Page
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
