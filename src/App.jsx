import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import PersonalDashboard from './pages/PersonalDashboard'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider, useAuthModal } from './context/AuthContext'
import AuthModal from './components/AuthModal'
import StravaDashboard from './pages/StravaDashboard'
import { useState, useEffect } from 'react'

const AppContent = () => {
  const { isAuthenticated } = useAuthModal();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  
  let content;
  if (currentHash === '#member' && isAuthenticated) {
    content = <PersonalDashboard />;
  } else if (currentHash === '#profile' && isAuthenticated) {
    content = <ProfilePage />;
  } else if ((currentHash === '#dashboard' || currentHash === '') && isAuthenticated) {
    content = <Dashboard />;
  } else if (currentHash === '#stravadashboard' || currentHash.includes('#strava-callback')) {
    content = <StravaDashboard />;
  } else {
    content = <Home />;
  }

  return (
    <div className="app-container">
      {content}
      <AuthModal />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
