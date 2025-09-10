import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, Palmtree } from 'lucide-react';
import Button from './ui/Button';
import { getCurrentUser, logout } from '../utils/auth';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setIsMenuOpen(false);
  };

  
  const menuItems = user
    ? user.role === 'admin'
      ? [
          { key: 'dashboard', label: 'Dashboard', icon: User },
          { key: 'analytics', label: 'Analytics', icon: Settings },
          { key: 'reports', label: 'Reports', icon: Settings },
          { key: 'map', label: 'Live Tracking', icon: User },
          { key: 'data', label: 'Data Management', icon: User }

        ]
      : [
          { key: 'user-dashboard', label: 'Dashboard', icon: User },  // ✅ Fix here
          { key: 'navigation', label: 'Navigation', icon: Settings },
          { key: 'explore', label: 'Explore Kerala', icon: Palmtree },
          { key: 'funzone', label: 'FunZone', icon: Palmtree },
             { key: 'rewards', label: 'Reward', icon: Palmtree },
                { key: 'ugc', label: 'UGC', icon: Palmtree }
         
        ]
    : [
     
      ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg border-b-2 border-emerald-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate(user ? 'dashboard' : 'home')}
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-sky-600 p-2 rounded-lg">
              <Palmtree className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                NATPAC Kerala
              </h1>
              <p className="text-xs text-gray-500">God's Own Country</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.fullName.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.fullName}
                </span>
              </div>
            )}

            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => onNavigate('login')}
                className="hidden sm:flex"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.key
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 inline mr-2" />
                  {item.label}
                </button>
              ))}
              
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Logout
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;