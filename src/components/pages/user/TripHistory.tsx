import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Filter, Download } from 'lucide-react';

interface Trip {
  id: number;
  origin: string;
  destination: string;
  mode: string;
  duration: number;
  distance: number;
  startTime: string;
  endTime: string;
  date: string;
  purpose: string;
}

interface TripHistoryProps {
  trips: Trip[];
}

const TripHistory: React.FC<TripHistoryProps> = ({ trips }) => {
  const [filterPeriod, setFilterPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [selectedMode, setSelectedMode] = useState<string>('all');

  const modeColors = {
    bus: 'bg-blue-100 text-blue-800',
    metro: 'bg-green-100 text-green-800',
    car: 'bg-purple-100 text-purple-800',
    auto: 'bg-yellow-100 text-yellow-800',
    walk: 'bg-gray-100 text-gray-800'
  };

  const modeIcons = {
    bus: '🚌',
    metro: '🚇',
    car: '🚗',
    auto: '🛺',
    walk: '🚶'
  };

  const filteredTrips = trips.filter(trip => 
    selectedMode === 'all' || trip.mode === selectedMode
  );

  const totalDistance = filteredTrips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalDuration = filteredTrips.reduce((sum, trip) => sum + trip.duration, 0);

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{filteredTrips.length}</h3>
          <p className="text-gray-600 text-sm">Total Trips</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{totalDistance.toFixed(1)} km</h3>
          <p className="text-gray-600 text-sm">Total Distance</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</h3>
          <p className="text-gray-600 text-sm">Total Time</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Filter className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">5.2 kg</h3>
          <p className="text-gray-600 text-sm">CO₂ Saved</p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transport Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Modes</option>
                <option value="bus">Bus</option>
                <option value="metro">Metro</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="walk">Walking</option>
              </select>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Trip List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Recent Trips</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {modeIcons[trip.mode as keyof typeof modeIcons]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {trip.origin} → {trip.destination}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        modeColors[trip.mode as keyof typeof modeColors]
                      }`}>
                        {trip.mode.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{trip.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{trip.startTime} - {trip.endTime}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-800">{trip.distance} km</p>
                      <p className="text-gray-500">Distance</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{trip.duration} min</p>
                      <p className="text-gray-500">Duration</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 capitalize">{trip.purpose}</p>
                      <p className="text-gray-500">Purpose</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripHistory;