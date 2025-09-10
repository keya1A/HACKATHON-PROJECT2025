import React, { useState } from 'react';
import { Database, Upload, Download, Trash2, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const DataManagement: React.FC = () => {
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [showCleaningModal, setShowCleaningModal] = useState(false);

  const dataStats = [
    { label: 'Total Records', value: '2,847,291', change: '+12.5%', icon: Database, color: 'text-blue-600' },
    { label: 'Valid Records', value: '2,689,234', change: '+11.8%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Flagged Records', value: '158,057', change: '+15.2%', icon: AlertTriangle, color: 'text-yellow-600' },
    { label: 'Data Quality', value: '94.4%', change: '+0.7%', icon: RefreshCw, color: 'text-purple-600' }
  ];

  const recentData = [
    { id: 1, userId: 'U001', tripId: 'T12847', origin: 'Kochi', destination: 'Ernakulam', mode: 'bus', duration: 25, distance: 8.5, quality: 'valid', timestamp: '2024-01-15 14:30' },
    { id: 2, userId: 'U002', tripId: 'T12848', origin: 'Marine Drive', destination: 'MG Road', mode: 'metro', duration: 15, distance: 5.2, quality: 'valid', timestamp: '2024-01-15 14:25' },
    { id: 3, userId: 'U003', tripId: 'T12849', origin: 'Vytilla', destination: 'Kakkanad', mode: 'car', duration: 0, distance: 0, quality: 'invalid', timestamp: '2024-01-15 14:20' },
    { id: 4, userId: 'U004', tripId: 'T12850', origin: 'Fort Kochi', destination: 'Mattancherry', mode: 'walk', duration: 12, distance: 1.1, quality: 'valid', timestamp: '2024-01-15 14:15' },
    { id: 5, userId: 'U005', tripId: 'T12851', origin: 'Edappally', destination: '', mode: 'bus', duration: 45, distance: 12.8, quality: 'flagged', timestamp: '2024-01-15 14:10' }
  ];

  const qualityColors = {
    valid: 'bg-green-100 text-green-800',
    invalid: 'bg-red-100 text-red-800',
    flagged: 'bg-yellow-100 text-yellow-800'
  };

  const cleaningRules = [
    { id: 1, name: 'Remove trips with zero distance', description: 'Automatically remove trips where distance is 0 or null', enabled: true, affected: 2847 },
    { id: 2, name: 'Validate origin/destination', description: 'Flag trips with missing or invalid location data', enabled: true, affected: 1523 },
    { id: 3, name: 'Duration consistency check', description: 'Flag trips where duration doesn\'t match distance and mode', enabled: true, affected: 892 },
    { id: 4, name: 'Remove duplicate trips', description: 'Remove identical trips from same user within 5 minutes', enabled: false, affected: 445 },
    { id: 5, name: 'Mode validation', description: 'Validate transport mode against speed and route patterns', enabled: true, affected: 678 }
  ];

  const toggleRecordSelection = (id: number) => {
    setSelectedRecords(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAllRecords = () => {
    setSelectedRecords(selectedRecords.length === recentData.length ? [] : recentData.map(r => r.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Data Management</h2>
            <p className="text-gray-600">Clean, validate, and manage transportation data</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import Data</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Clean Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        {dataStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Data Cleaning Rules */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Data Cleaning Rules</h3>
          <button 
            onClick={() => setShowCleaningModal(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Run Cleaning
          </button>
        </div>
        
        <div className="space-y-4">
          {cleaningRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={() => {}}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{rule.name}</h4>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-800">{rule.affected.toLocaleString()}</p>
                <p className="text-sm text-gray-600">records affected</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Data Records */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Recent Data Records</h3>
            <div className="flex items-center space-x-3">
              {selectedRecords.length > 0 && (
                <button className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Selected ({selectedRecords.length})</span>
                </button>
              )}
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                <RefreshCw className="w-4 h-4 inline mr-1" />
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedRecords.length === recentData.length}
                    onChange={selectAllRecords}
                    className="rounded focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-600">Trip ID</th>
                <th className="text-left p-4 font-medium text-gray-600">User</th>
                <th className="text-left p-4 font-medium text-gray-600">Route</th>
                <th className="text-left p-4 font-medium text-gray-600">Mode</th>
                <th className="text-left p-4 font-medium text-gray-600">Duration</th>
                <th className="text-left p-4 font-medium text-gray-600">Distance</th>
                <th className="text-left p-4 font-medium text-gray-600">Quality</th>
                <th className="text-left p-4 font-medium text-gray-600">Timestamp</th>
                <th className="text-left p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentData.map((record) => (
                <tr key={record.id} className={`hover:bg-gray-50 transition-colors ${selectedRecords.includes(record.id) ? 'bg-blue-50' : ''}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => toggleRecordSelection(record.id)}
                      className="rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4 font-mono text-sm">{record.tripId}</td>
                  <td className="p-4 text-sm">{record.userId}</td>
                  <td className="p-4 text-sm">
                    <div>
                      <p>{record.origin}</p>
                      <p className="text-gray-500">→ {record.destination || 'Unknown'}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium uppercase">
                      {record.mode}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{record.duration || '-'} min</td>
                  <td className="p-4 text-sm">{record.distance || '-'} km</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${qualityColors[record.quality as keyof typeof qualityColors]}`}>
                      {record.quality}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{record.timestamp}</td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Cleaning Confirmation Modal */}
      {showCleaningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Data Cleaning</h3>
            <p className="text-gray-600 mb-6">
              This will apply selected cleaning rules to your data. The process may take several minutes and cannot be undone.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Estimated Impact</h4>
                  <p className="text-yellow-700 text-sm">~158,057 records will be affected</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowCleaningModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowCleaningModal(false);
                  alert('Data cleaning started! This may take a few minutes...');
                }}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Start Cleaning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;