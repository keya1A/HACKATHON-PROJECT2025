import React, { useState, useEffect } from 'react';
import { getCurrentUser } from './utils/auth';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import UserDashboardPage from "./components/pages/UserDashboardPage";
import DashboardPage from "./components/pages/DashboardPage";
import AnalyticsPage from "./components/pages/Analytics";
import ExplorePage from './components/pages/ExplorePage';
import LiveTracking from './components/pages/map';
import NavigationPage from './components/pages/Navigation';
import Reports from './components/pages/Reports';
import DataManagement from './components/pages/data';
import Footer from './components/Footer';   // ✅ import Footer
import FunZone from "./components/pages/FunZone";  
import Rewards from "./components/pages/Rewards";
import UGC from "./components/pages/UGC";





function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        if (currentUser.role === 'admin' && currentPage === 'home') {
          setCurrentPage('dashboard');
        } else if (
          currentUser.role === 'user' &&
          (currentPage === 'home' || currentPage === 'login')
        ) {
          setCurrentPage('user-dashboard');
        }
      } else if (!['home', 'explore', 'login'].includes(currentPage)) {
        setCurrentPage('home');
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'user-dashboard':
        return user ? (
          <UserDashboardPage onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'dashboard':
        return user?.role === 'admin' ? (
          <DashboardPage onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'analytics':
        return user?.role === 'admin' ? (
          <AnalyticsPage />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'explore':
        return <ExplorePage />;
      case 'reports':
        return <Reports />;
      case 'data':
        return <DataManagement />;
 case 'funzone': // ✅ FIXED
        return <FunZone />;

        case 'rewards':
  return <Rewards />;

case 'ugc':
  return <UGC />;
case 'map':
  return <LiveTracking />;

      case 'navigation':
        return user ? (
          <NavigationPage user={user} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      
      default:
        return user?.role === 'admin' ? (
          <DashboardPage onNavigate={handleNavigate} />
        ) : user ? (
          <UserDashboardPage onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />  {/* ✅ Footer added */}
    </div>
  );
}

export default App;
