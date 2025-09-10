// src/components/pages/DashboardPage.tsx
import React, { useState } from 'react';
import { getCurrentUser, logout } from '../../utils/auth';
import AIAssistant from './user/AIAssistant';
import TripTracker from './user/TripTracker';
import LiveMap from './user/LiveMap';
import TripHistory from './user/TripHistory';
import WeatherWidget from './user/WeatherWidget';
import { LogOut, MapPin, Clock, Route, MessageCircle } from 'lucide-react';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const DashboardPage: React.FC<DashboardProps> = ({ onNavigate }) => {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTrip, setCurrentTrip] = useState<any>(null);

  const mockTrips = [
    {
      id: 1,
      origin: 'Kochi Marine Drive',
      destination: 'Ernakulam South',
      mode: 'bus',
      duration: 25,
      distance: 8.5,
      startTime: '09:15 AM',
      endTime: '09:40 AM',
      date: '2024-01-15',
      purpose: 'Work'
    },
    {
      id: 2,
      origin: 'Ernakulam South',
      destination: 'Vytilla Hub',
      mode: 'metro',
      duration: 15,
      distance: 6.2,
      startTime: '06:30 PM',
      endTime: '06:45 PM',
      date: '2024-01-15',
      purpose: 'Home'
    },
    {
      id: 3,
      origin: 'Home - Kakkanad',
      destination: 'Lulu Mall',
      mode: 'car',
      duration: 20,
      distance: 12.3,
      startTime: '02:15 PM',
      endTime: '02:35 PM',
      date: '2024-01-14',
      purpose: 'Shopping'
    }
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: MapPin },
    { id: 'tracker', name: 'Trip Tracker', icon: Route },
    { id: 'history', name: 'Trip History', icon: Clock },
    { id: 'assistant', name: 'AI Assistant', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 🔹 Removed Kerala Travel logo + Welcome */}
            <div></div>

      
          </div>

          <div className="flex space-x-8 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveMap currentTrip={currentTrip} />
              </div>
              <div className="space-y-6">
                <WeatherWidget />
                <AIAssistant userName={user?.fullName || ''} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracker' && (
          <TripTracker onTripStart={setCurrentTrip} currentTrip={currentTrip} />
        )}

        {activeTab === 'history' && <TripHistory trips={mockTrips} />}

        {activeTab === 'assistant' && (
          <div className="max-w-4xl mx-auto">
            <AIAssistant userName={user?.fullName || ''} fullView />
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
