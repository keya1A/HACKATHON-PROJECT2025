import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, MapPin, Clock, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('trips');

  const keyMetrics = [
    { label: 'Total Trips', value: '12,847', change: '+8.2%', icon: MapPin, color: 'text-blue-600' },
    { label: 'Active Users', value: '3,421', change: '+12.5%', icon: Users, color: 'text-green-600' },
    { label: 'Avg Trip Duration', value: '24.3 min', change: '-2.1%', icon: Clock, color: 'text-purple-600' },
    { label: 'Data Quality', value: '94.7%', change: '+1.3%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const modeShareData = [
    { mode: 'Bus', percentage: 45, count: 5780, color: 'bg-blue-500' },
    { mode: 'Car', percentage: 28, count: 3597, color: 'bg-green-500' },
    { mode: 'Metro', percentage: 15, count: 1927, color: 'bg-purple-500' },
    { mode: 'Auto', percentage: 8, count: 1028, color: 'bg-yellow-500' },
    { mode: 'Walk', percentage: 4, count: 515, color: 'bg-gray-500' }
  ];

  const peakHours = [
    { time: '06:00', trips: 245 },
    { time: '07:00', trips: 542 },
    { time: '08:00', trips: 1234 },
    { time: '09:00', trips: 1567 },
    { time: '10:00', trips: 892 },
    { time: '17:00', trips: 1432 },
    { time: '18:00', trips: 1678 },
    { time: '19:00', trips: 1345 },
    { time: '20:00', trips: 876 }
  ];

  const topRoutes = [
    { from: 'Ernakulam', to: 'Kochi', count: 1234, avgDuration: '25 min' },
    { from: 'Vytilla', to: 'Marine Drive', count: 987, avgDuration: '18 min' },
    { from: 'Kakkanad', to: 'MG Road', count: 856, avgDuration: '32 min' },
    { from: 'Aluva', to: 'Fort Kochi', count: 745, avgDuration: '45 min' },
    { from: 'Edappally', to: 'Mattancherry', count: 632, avgDuration: '28 min' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Transportation Analytics</h2>
            <p className="text-gray-600">Comprehensive insights into Kerala's travel patterns</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mode Share Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Mode Share Analysis</h3>
            <BarChart3 className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {modeShareData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="font-medium text-gray-800">{item.mode}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.percentage}%</span>
                  <span className="text-xs text-gray-500 w-16 text-right">{item.count.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Peak Travel Hours</h3>
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {peakHours.map((hour, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-16">{hour.time}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${(hour.trips / 1678) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-16 text-right">{hour.trips.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Origin-Destination Matrix */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Top Origin-Destination Routes</h3>
            <p className="text-gray-600 text-sm">Most frequent travel corridors</p>
          </div>
          <MapPin className="w-6 h-6 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-gray-600 font-medium">Rank</th>
                <th className="pb-3 text-gray-600 font-medium">Origin</th>
                <th className="pb-3 text-gray-600 font-medium">Destination</th>
                <th className="pb-3 text-gray-600 font-medium">Daily Trips</th>
                <th className="pb-3 text-gray-600 font-medium">Avg Duration</th>
                <th className="pb-3 text-gray-600 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topRoutes.map((route, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 text-gray-800 font-medium">#{index + 1}</td>
                  <td className="py-4 text-gray-800">{route.from}</td>
                  <td className="py-4 text-gray-800">{route.to}</td>
                  <td className="py-4 text-gray-800 font-medium">{route.count.toLocaleString()}</td>
                  <td className="py-4 text-gray-600">{route.avgDuration}</td>
                  <td className="py-4">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;