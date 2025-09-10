import React, { useState, useEffect } from 'react';
import { Play, Square, MapPin, Clock, Route, Users } from 'lucide-react';

interface Trip {
  id: string;
  isActive: boolean;
  startTime: Date;
  origin: string;
  destination: string;
  mode: string;
  duration: number;
  distance: number;
}

interface TripTrackerProps {
  onTripStart: (trip: Trip | null) => void;
  currentTrip: Trip | null;
}

const TripTracker: React.FC<TripTrackerProps> = ({ onTripStart, currentTrip }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [detectedMode, setDetectedMode] = useState<string>('detecting...');
  const [tripData, setTripData] = useState({
    purpose: '',
    coTravelers: 1,
    notes: ''
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking) {
      // Simulate mode detection
      const modes = ['walking', 'bus', 'car', 'metro', 'auto'];
      let currentModeIndex = 0;
      
      interval = setInterval(() => {
        setDetectedMode(modes[currentModeIndex % modes.length]);
        currentModeIndex++;
      }, 2000);
    }
    
    return () => clearInterval(interval);
  }, [isTracking]);

  const startTrip = () => {
    setIsTracking(true);
    const newTrip: Trip = {
      id: Date.now().toString(),
      isActive: true,
      startTime: new Date(),
      origin: 'Current Location',
      destination: 'Detecting...',
      mode: 'detecting...',
      duration: 0,
      distance: 0
    };
    onTripStart(newTrip);
  };

  const stopTrip = () => {
    setIsTracking(false);
    setDetectedMode('completed');
    
    // Mock completed trip data
    const completedTrip: Trip = {
      id: currentTrip?.id || Date.now().toString(),
      isActive: false,
      startTime: currentTrip?.startTime || new Date(),
      origin: 'Kochi Marine Drive',
      destination: 'Ernakulam South',
      mode: detectedMode,
      duration: 25,
      distance: 8.5
    };
    
    onTripStart(null);
    alert('Trip completed and saved!');
  };

  return (
    <div className="space-y-6">
      {/* Trip Control Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Tracker</h2>
          <p className="text-gray-600">
            {isTracking ? 'Your trip is being tracked automatically' : 'Start tracking your journey'}
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          {!isTracking ? (
            <button
              onClick={startTrip}
              className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-6 h-6" />
              <span>Start Trip</span>
            </button>
          ) : (
            <button
              onClick={stopTrip}
              className="flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Square className="w-6 h-6" />
              <span>Stop Trip</span>
            </button>
          )}
        </div>

        {/* Live Tracking Status */}
        {isTracking && (
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-gray-800">Live Tracking Active</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Route className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Detected Mode</p>
                <p className="font-semibold text-gray-800 capitalize">{detectedMode}</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-800">
                  {currentTrip ? Math.floor((Date.now() - currentTrip.startTime.getTime()) / 60000) : 0} min
                </p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Distance</p>
                <p className="font-semibold text-gray-800">~2.3 km</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trip Details Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Trip Details</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trip Purpose</label>
            <select
              value={tripData.purpose}
              onChange={(e) => setTripData({...tripData, purpose: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select purpose</option>
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="shopping">Shopping</option>
              <option value="recreation">Recreation</option>
              <option value="medical">Medical</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Co-travelers</label>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="10"
                value={tripData.coTravelers}
                onChange={(e) => setTripData({...tripData, coTravelers: parseInt(e.target.value)})}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              value={tripData.notes}
              onChange={(e) => setTripData({...tripData, notes: e.target.value})}
              rows={3}
              placeholder="Any additional information about your trip..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">Privacy & Data Control</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Your trip data helps improve Kerala's transportation planning</p>
          <p>• All location data is encrypted and anonymized</p>
          <p>• You can pause or stop tracking anytime</p>
          <p>• Data is stored securely and never shared with third parties</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4">
          <input type="checkbox" id="consent" className="rounded" />
          <label htmlFor="consent" className="text-sm text-gray-700">
            I consent to data collection for transportation research purposes
          </label>
        </div>
      </div>
    </div>
  );
};

export default TripTracker;