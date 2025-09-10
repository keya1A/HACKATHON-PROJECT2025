import React, { useState } from 'react';
import { MapPin, Navigation, Zap, Car, Bus, Train } from 'lucide-react';

interface LiveMapProps {
  currentTrip: any;
}

const LiveMap: React.FC<LiveMapProps> = ({ currentTrip }) => {
  const [selectedRoute, setSelectedRoute] = useState<'fastest' | 'economical' | 'scenic'>('fastest');

  const routes = {
    fastest: {
      mode: 'car',
      duration: '25 min',
      distance: '18.5 km',
      cost: '₹180',
      description: 'via NH66 - Light traffic',
      icon: Car,
      color: 'text-blue-500'
    },
    economical: {
      mode: 'bus',
      duration: '45 min',
      distance: '22.3 km',
      cost: '₹25',
      description: 'KSRTC Bus via MG Road',
      icon: Bus,
      color: 'text-green-500'
    },
    scenic: {
      mode: 'train',
      duration: '35 min',
      distance: '28.1 km',
      cost: '₹15',
      description: 'Kochi Metro + connecting bus',
      icon: Train,
      color: 'text-purple-500'
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Live Location & Routes</h3>
        </div>
        
        {currentTrip ? (
          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Trip in Progress</span>
            </div>
            <p className="text-sm opacity-90">From: {currentTrip.origin}</p>
            <p className="text-sm opacity-90">To: Detecting destination...</p>
          </div>
        ) : (
          <div className="text-center py-4">
            <Navigation className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <p className="text-sm opacity-90">Ready to navigate - Start your trip to see live tracking</p>
          </div>
        )}
      </div>

      {/* Mock Map Area */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 mx-auto">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-gray-600 text-sm">Interactive Map View</p>
            <p className="text-gray-500 text-xs">GPS Location: Kochi, Kerala</p>
          </div>
        </div>
        
        {/* Mock location markers */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse"></div>
        <div className="absolute bottom-6 right-8 w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-lg">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Route Options */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Suggested Routes</h4>
        
        <div className="space-y-3">
          {Object.entries(routes).map(([key, route]) => {
            const Icon = route.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedRoute(key as any)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedRoute === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-6 h-6 ${route.color}`} />
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 capitalize">{key} Route</p>
                      <p className="text-sm text-gray-600">{route.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800">{route.duration}</p>
                        <p className="text-xs text-gray-500">Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800">{route.distance}</p>
                        <p className="text-xs text-gray-500">Distance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-green-600">{route.cost}</p>
                        <p className="text-xs text-gray-500">Cost</p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <button className="w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
          <Navigation className="w-5 h-5" />
          <span>Start Navigation</span>
        </button>
      </div>
    </div>
  );
};

export default LiveMap;