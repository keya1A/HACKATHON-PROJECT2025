import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, AlertTriangle, Thermometer } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState({
    location: 'Kochi, Kerala',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 78,
    windSpeed: 12,
    alerts: ['Light rain expected in 2 hours', 'Traffic may be affected on coastal roads']
  });

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Sunny')) return <Sun className="w-6 h-6 text-yellow-500" />;
    if (condition.includes('Rain')) return <CloudRain className="w-6 h-6 text-blue-500" />;
    return <Cloud className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Weather & Alerts</h3>
        {getWeatherIcon(currentWeather.condition)}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Thermometer className="w-5 h-5 text-red-500" />
          <span className="text-2xl font-bold text-gray-800">{currentWeather.temperature}°C</span>
        </div>
        <p className="text-gray-600 text-sm">{currentWeather.condition}</p>
        <p className="text-gray-500 text-xs">{currentWeather.location}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <p className="text-gray-600">Humidity</p>
          <p className="font-semibold text-blue-600">{currentWeather.humidity}%</p>
        </div>
        <div className="text-center p-2 bg-green-50 rounded-lg">
          <p className="text-gray-600">Wind</p>
          <p className="font-semibold text-green-600">{currentWeather.windSpeed} km/h</p>
        </div>
      </div>
      
      {/* Weather Alerts */}
      {currentWeather.alerts.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-800">Travel Alerts</span>
          </div>
          {currentWeather.alerts.map((alert, index) => (
            <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800">{alert}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;