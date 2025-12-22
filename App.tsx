
import React, { useState, useEffect } from 'react';
import { Screen, ETF } from './types';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import ETFDetail from './screens/ETFDetail';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedETF, setSelectedETF] = useState<ETF | null>(null);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('hasOnboarded');
    if (hasOnboarded && currentScreen === 'onboarding') {
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('hasOnboarded', 'true');
    setCurrentScreen('dashboard');
  };

  const handleSelectETF = (etf: ETF) => {
    setSelectedETF(etf);
    setCurrentScreen('detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={handleCompleteOnboarding} />;
      case 'dashboard':
        return <Dashboard onSelectETF={handleSelectETF} />;
      case 'search':
        return <SearchScreen onSelectETF={handleSelectETF} />;
      case 'profile':
        return <ProfileScreen />;
      case 'detail':
        return selectedETF ? (
          <ETFDetail etf={selectedETF} onBack={() => setCurrentScreen('dashboard')} />
        ) : (
          <Dashboard onSelectETF={handleSelectETF} />
        );
      default:
        return <Dashboard onSelectETF={handleSelectETF} />;
    }
  };

  return (
    <div className="flex justify-center min-h-screen w-full font-sans text-zinc-950 bg-gray-100">
      <div className="relative w-full max-w-md h-screen overflow-hidden bg-white shadow-2xl flex flex-col">
        {renderScreen()}
        
        {/* Elite Navigation Bar */}
        {(currentScreen !== 'onboarding') && (
          <nav className="flex-none bg-white/80 backdrop-blur-2xl border-t border-gray-100 px-6 pt-3 pb-8 z-50">
            <div className="flex items-center justify-between">
              <NavItem 
                active={currentScreen === 'dashboard' || currentScreen === 'detail'} 
                onClick={() => setCurrentScreen('dashboard')} 
                icon="home" 
                label="Home" 
              />
              <NavItem 
                active={currentScreen === 'search'} 
                onClick={() => setCurrentScreen('search')} 
                icon="manage_search" 
                label="Search" 
              />
              <NavItem 
                active={false} 
                onClick={() => {}} 
                icon="account_balance_wallet" 
                label="Portfolio" 
                disabled
              />
              <NavItem 
                active={currentScreen === 'profile'} 
                onClick={() => setCurrentScreen('profile')} 
                icon="account_circle" 
                label="Profile" 
              />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label, disabled = false }: any) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${disabled ? 'opacity-20 grayscale cursor-not-allowed' : ''} ${active ? 'text-primary' : 'text-gray-400'}`}
  >
    <span className={`material-symbols-outlined text-2xl ${active ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
