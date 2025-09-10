import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('week');
  const [format, setFormat] = useState('pdf');

  const predefinedReports = [
    {
      id: 1,
      title: 'Weekly Travel Summary',
      description: 'Comprehensive overview of travel patterns for the past week',
      generated: '2024-01-15',
      size: '2.3 MB',
      downloads: 45,
      type: 'summary'
    },
    {
      id: 2,
      title: 'Mode Share Analysis',
      description: 'Detailed breakdown of transportation modes used across Kerala',
      generated: '2024-01-14',
      size: '1.8 MB',
      downloads: 32,
      type: 'analysis'
    },
    {
      id: 3,
      title: 'Peak Hours Traffic Report',
      description: 'Analysis of traffic patterns during peak and off-peak hours',
      generated: '2024-01-13',
      size: '3.1 MB',
      downloads: 67,
      type: 'traffic'
    },
    {
      id: 4,
      title: 'Route Efficiency Study',
      description: 'Evaluation of most and least efficient travel routes',
      generated: '2024-01-12',
      size: '2.7 MB',
      downloads: 28,
      type: 'efficiency'
    }
  ];

  const reportMetrics = [
    { label: 'Reports Generated', value: '1,247', icon: FileText, color: 'text-blue-600' },
    { label: 'Total Downloads', value: '8,934', icon: Download, color: 'text-green-600' },
    { label: 'Data Points', value: '2.3M', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Accuracy Rate', value: '96.8%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const generateReport = () => {
    // Mock report generation
    alert(`Generating ${reportType} report for ${dateRange} in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
            <p className="text-gray-600">Generate and manage transportation analysis reports</p>
          </div>
          
          <button 
            onClick={generateReport}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            <FileText className="w-5 h-5" />
            <span>Generate New Report</span>
          </button>
        </div>
      </div>

      {/* Report Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {reportMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Report Generation Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Generate Custom Report</h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="summary">Travel Summary</option>
              <option value="analysis">Mode Share Analysis</option>
              <option value="traffic">Traffic Patterns</option>
              <option value="efficiency">Route Efficiency</option>
              <option value="od_matrix">OD Matrix</option>
              <option value="environmental">Environmental Impact</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="powerpoint">PowerPoint</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={generateReport}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Recent Reports</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Types</option>
                <option value="summary">Summary</option>
                <option value="analysis">Analysis</option>
                <option value="traffic">Traffic</option>
                <option value="efficiency">Efficiency</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {predefinedReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Generated: {report.generated}</span>
                      </span>
                      <span>Size: {report.size}</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.type === 'summary' ? 'bg-blue-100 text-blue-800' :
                    report.type === 'analysis' ? 'bg-green-100 text-green-800' :
                    report.type === 'traffic' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {report.type.toUpperCase()}
                  </span>
                  
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Scheduled Reports</h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            + Add Schedule
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">Weekly Summary Report</h4>
              <p className="text-sm text-gray-600">Every Monday at 9:00 AM</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">ACTIVE</span>
              <button className="text-gray-400 hover:text-gray-600">•••</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Analytics Report</h4>
              <p className="text-sm text-gray-600">First day of each month at 8:00 AM</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">ACTIVE</span>
              <button className="text-gray-400 hover:text-gray-600">•••</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;