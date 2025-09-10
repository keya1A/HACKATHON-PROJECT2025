import React, { useState } from 'react';
import { MapPin, Users, Eye, Filter, RefreshCw } from 'lucide-react';

const LiveTracking: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const liveUsers = [
    { id: 1, name: 'Rahul K.', location: 'Marine Drive', mode: 'bus', status: 'moving', lastUpdate: '2 min ago', destination: 'Ernakulam' },
    { id: 2, name: 'Priya S.', location: 'MG Road', mode: 'metro', status: 'waiting', lastUpdate: '1 min ago', destination: 'Aluva' },
    { id: 3, name: 'Arjun M.', location: 'Vytilla Hub', mode: 'car', status: 'moving', lastUpdate: '30 sec ago', destination: 'Kakkanad' },
    { id: 4, name: 'Sneha R.', location: 'Fort Kochi', mode: 'walk', status: 'moving', lastUpdate: '1 min ago', destination: 'Mattancherry' },
    { id: 5, name: 'Kiran P.', location: 'Edappally', mode: 'auto', status: 'stopped', lastUpdate: '5 min ago', destination: 'Lulu Mall' }
  ];

  const modeColors = {
    bus: 'bg-blue-100 text-blue-800',
    metro: 'bg-green-100 text-green-800',
    car: 'bg-purple-100 text-purple-800',
    auto: 'bg-yellow-100 text-yellow-800',
    walk: 'bg-gray-100 text-gray-800'
  };

  const statusColors = {
    moving: 'bg-green-500',
    waiting: 'bg-yellow-500',
    stopped: 'bg-red-500'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Live User Tracking</h2>
            <p className="text-gray-600">Real-time monitoring of consented users</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Map View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              List View
            </button>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Modes</option>
              <option value="bus">Bus Only</option>
              <option value="metro">Metro Only</option>
              <option value="car">Car Only</option>
              <option value="auto">Auto Only</option>
              <option value="walk">Walking Only</option>
            </select>
            
            <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{liveUsers.length}</h3>
              <p className="text-gray-600 text-sm">Users Online</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{liveUsers.filter(u => u.status === 'moving').length}</h3>
              <p className="text-gray-600 text-sm">Currently Moving</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{liveUsers.filter(u => u.mode === 'bus').length}</h3>
              <p className="text-gray-600 text-sm">Using Public Transport</p>
            </div>
            <div className="text-2xl">🚌</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">95.2%</h3>
              <p className="text-gray-600 text-sm">Data Accuracy</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'map' ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Tracking Map</h3>
                <p className="text-gray-600">Real-time user locations displayed here</p>
              </div>
            </div>
            
            {/* Mock user locations */}
            <div className="absolute top-12 left-16 w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse">
              <div className="absolute -top-8 -left-8 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap">
                Rahul K. (Bus)
              </div>
            </div>
            
            <div className="absolute top-32 right-24 w-4 h-4 bg-green-500 rounded-full shadow-lg animate-pulse">
              <div className="absolute -top-8 -left-8 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap">
                Priya S. (Metro)
              </div>
            </div>
            
            <div className="absolute bottom-20 left-32 w-4 h-4 bg-purple-500 rounded-full shadow-lg animate-pulse">
              <div className="absolute -top-8 -left-8 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap">
                Arjun M. (Car)
              </div>
            </div>
            
            <div className="absolute bottom-32 right-16 w-4 h-4 bg-yellow-500 rounded-full shadow-lg animate-pulse">
              <div className="absolute -top-8 -left-8 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap">
                Sneha R. (Walk)
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Live User List</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {liveUsers
              .filter(user => selectedFilter === 'all' || user.mode === selectedFilter)
              .map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[user.status as keyof typeof statusColors]} rounded-full border-2 border-white`}></div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800">{user.name}</h4>
                        <p className="text-sm text-gray-600">
                          {user.location} → {user.destination}
                        </p>
                        <p className="text-xs text-gray-500">Updated {user.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        modeColors[user.mode as keyof typeof modeColors]
                      }`}>
                        {user.mode.toUpperCase()}
                      </span>
                      
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        user.status === 'moving' ? 'bg-green-100 text-green-800' :
                        user.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Eye className="w-6 h-6 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Privacy & Consent Notice</h4>
            <p className="text-yellow-700 text-sm">
              All users shown have explicitly consented to live tracking for research purposes. 
              Personal information is anonymized and location data is used solely for transportation planning. 
              Users can revoke consent at any time through their mobile app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;