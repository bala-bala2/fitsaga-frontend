import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardHeroSlider from '../components/DashboardHeroSlider';
import DashboardActionButtons from '../components/DashboardActionButtons';
import DashboardVideoCards from '../components/DashboardVideoCards';
import DashboardHealthDiet from '../components/DashboardHealthDiet';
import Footer from '../components/Footer';
import OnboardingModal from '../components/OnboardingModal';

const Dashboard = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-500 selection:text-white">
      <DashboardNavbar onCreateProfile={() => setIsOnboardingOpen(true)} />
      <DashboardHeroSlider />
      <DashboardActionButtons onStartJourney={() => setIsOnboardingOpen(true)} />
      <DashboardVideoCards />
      <DashboardHealthDiet />
      <Footer />
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
};

export default Dashboard;
