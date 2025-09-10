import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Route, 
  TrendingUp, 
  Download, 
  MessageCircle, 
  Cloud,
  Navigation,
  Calendar,
  Filter,
  BarChart3,
  Settings
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getCurrentUser } from '../../utils/auth';
import { generateDemoTrips, getCurrentWeather } from '../../utils/demoData';
import { exportTripsAsCSV, exportTripsAsPDF, exportTripsAsExcel } from '../../utils/exportUtils';
import { Trip, WeatherInfo } from '../../types';
import { format } from 'date-fns';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const user = getCurrentUser();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Load demo data
    const demoTrips = generateDemoTrips(25);
    setTrips(demoTrips);
    setWeather(getCurrentWeather());
  }, []);

  const filteredTrips = trips.filter(trip => {
    const tripDate = new Date(trip.startTime);
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'day':
        return tripDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return tripDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return tripDate >= monthAgo;
      default:
        return true;
    }
  });

  const stats = {
    totalTrips: filteredTrips.length,
    totalDistance: filteredTrips.reduce((sum, trip) => sum + trip.distance, 0),
    totalTime: filteredTrips.reduce((sum, trip) => sum + trip.duration, 0),
    mostUsedMode: Object.entries(
      filteredTrips.reduce((acc, trip) => {
        acc[trip.mode] = (acc[trip.mode] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'walk'
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    switch (format) {
      case 'csv':
        exportTripsAsCSV(filteredTrips);
        break;
      case 'excel':
        exportTripsAsExcel(filteredTrips);
        break;
      case 'pdf':
        exportTripsAsPDF(filteredTrips, user?.fullName);
        break;
    }
  };

  const modeIcons: Record<string, string> = {
    walk: '🚶',
    bus: '🚌',
    car: '🚗',
    train: '🚊',
    auto: '🛺',
    bike: '🚴'
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome {user.fullName}!! 
              </h1>
              <p className="text-gray-600">
                Your intelligent travel companion for God's Own Country
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowChatbot(true)}
                className="flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                onClick={() => onNavigate('explore')}
                className="flex items-center"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Explore Kerala
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Weather Card */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 border-sky-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Cloud className="h-8 w-8 text-sky-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Current Weather</h3>
                    <p className="text-sm text-gray-600">
                      {weather.temperature}°C • {weather.condition}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Humidity: {weather.humidity}%</p>
                  <p>Wind: {weather.windSpeed} km/h</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Period Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">View:</span>
              <div className="flex space-x-1 bg-white rounded-lg p-1 border">
                {[
                  { key: 'day', label: 'Today' },
                  { key: 'week', label: 'This Week' },
                  { key: 'month', label: 'This Month' }
                ].map((period) => (
                  <button
                    key={period.key}
                    onClick={() => setSelectedPeriod(period.key as any)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedPeriod === period.key
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('csv')}
              >
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('excel')}
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Trips',
              value: stats.totalTrips,
              icon: Route,
              color: 'emerald',
              suffix: ''
            },
            {
              title: 'Distance Covered',
              value: (stats.totalDistance / 1000).toFixed(1),
              icon: MapPin,
              color: 'blue',
              suffix: ' km'
            },
            {
              title: 'Time Traveled',
              value: Math.round(stats.totalTime / 3600),
              icon: Clock,
              color: 'purple',
              suffix: ' hrs'
            },
            {
              title: 'Favorite Mode',
              value: modeIcons[stats.mostUsedMode] || '🚶',
              icon: TrendingUp,
              color: 'orange',
              suffix: ` ${stats.mostUsedMode}`
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}{stat.suffix}
                    </p>
                  </div>
                  <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Trips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-900">Recent Trips</h2>
              </div>
              <Button
                variant="outline"
                onClick={() => onNavigate('trips')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {filteredTrips.slice(0, 5).map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {modeIcons[trip.mode]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{trip.origin.address || 'Unknown'}</span>
                        <span>→</span>
                        <span>{trip.destination.address || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{format(new Date(trip.startTime), 'MMM dd, HH:mm')}</span>
                        <span>{(trip.distance / 1000).toFixed(1)} km</span>
                        <span>{Math.round(trip.duration / 60)} min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {trip.mode}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(trip.modeConfidence * 100)}% confidence
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredTrips.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Route className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No trips found for the selected period.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => onNavigate('map')}
                  >
                    Start Your First Trip
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
  variant="outline"
  className="h-16 flex-col space-y-2"
  onClick={() => onNavigate('map')}
>
  <Navigation className="h-6 w-6" />
  <span className="text-sm">Live Map</span>
</Button>

            
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2"
              onClick={() => onNavigate('explore')}
            >
              <MapPin className="h-6 w-6" />
              <span className="text-sm">Explore</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2"
              onClick={() => setShowChatbot(true)}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm">AI Help</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2"
              onClick={() => onNavigate('trips')}
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* AI Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[600px] flex flex-col"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-emerald-400 to-sky-400 w-10 h-10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                    <p className="text-sm text-gray-500">Your Kerala travel companion</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-emerald-800">
                  Welcome {user.fullName}! I'm your AI travel assistant. I can help you with:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-emerald-700">
                  <li>• Show your last trip summary</li>
                  <li>• Export your weekly trips</li>
                  <li>• Recommend routes and modes</li>
                  <li>• Suggest tourist attractions</li>
                  <li>• Current weather & alerts</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full text-left justify-start"
                  onClick={() => alert(`Your last trip was from ${trips[0]?.origin.address} to ${trips[0]?.destination.address} by ${trips[0]?.mode}`)}
                >
                  Show my last trip
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full text-left justify-start"
                  onClick={() => handleExport('csv')}
                >
                  Export my weekly trips
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full text-left justify-start"
                  onClick={() => onNavigate('explore')}
                >
                  Recommend nearby attractions
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full text-left justify-start"
                  onClick={() => alert(`Current weather: ${weather?.temperature}°C, ${weather?.condition}. No active alerts.`)}
                >
                  Weather & alerts
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;