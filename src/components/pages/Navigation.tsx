import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Target, 
  Clock, 
  Car, 
  Bus, 
  Train, 
  Footprints,
  Route,
  Compass,
  AlertTriangle,
  Cloud,
  MessageCircle,
  Send,
  Mic
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface NavigationPageProps {
  user: User;
}

const NavigationPage: React.FC<NavigationPageProps> = ({ user }) => {
  const [destination, setDestination] = useState('');
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: `Hello ${user.name}! 👋 I'm your Kerala travel assistant. I can help you with directions, weather updates, tourist recommendations, and travel tips. Where would you like to go today?`,
      time: '10:30 AM'
    }
  ]);

  // Mock route data
  const routes = [
    {
      id: 1,
      mode: 'car',
      duration: '2h 45m',
      distance: '95.2 km',
      route: 'Via NH 66',
      traffic: 'Light',
      cost: '₹350 (Fuel)',
      icon: Car,
      color: 'bg-blue-500',
      steps: [
        'Head northeast on MG Road toward Park Avenue',
        'Take NH 66 toward Munnar',
        'Continue for 85 km',
        'Turn right at Munnar Junction'
      ]
    },
    {
      id: 2,
      mode: 'bus',
      duration: '4h 15m',
      distance: '98.5 km',
      route: 'KSRTC Express',
      traffic: 'N/A',
      cost: '₹120',
      icon: Bus,
      color: 'bg-green-500',
      steps: [
        'Walk to Ernakulam Bus Terminal (5 min)',
        'Board KSRTC Express to Munnar',
        'Journey time: 4 hours',
        'Get off at Munnar Bus Station'
      ]
    },
    {
      id: 3,
      mode: 'train',
      duration: '3h 30m + 1h',
      distance: '89.3 km + taxi',
      route: 'Train + Taxi',
      traffic: 'Moderate',
      cost: '₹180 + ₹300',
      icon: Train,
      color: 'bg-purple-500',
      steps: [
        'Walk to Ernakulam Junction (10 min)',
        'Board Vanchinad Express to Aluva',
        'Take taxi from Aluva to Munnar',
        'Total journey time: 4.5 hours'
      ]
    }
  ];

  const handleDestinationSubmit = () => {
    if (destination.trim()) {
      setShowRoutes(true);
    }
  };

  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        type: 'user',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, newMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = getAIResponse(chatMessage);
        setChatHistory(prev => [...prev, {
          type: 'ai',
          message: aiResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
      
      setChatMessage('');
    }
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weather')) {
      return "🌤️ Current weather in Kerala: Partly cloudy with temperatures around 28°C. Perfect for travel! Munnar is cooler at 18°C. Should I help you plan a route there?";
    } else if (lowerMessage.includes('munnar')) {
      return "🏔️ Munnar is a beautiful destination! Best time to visit is October to March. Key attractions include Tea Gardens, Eravikulam National Park, and Mattupetty Dam. Would you like directions or more information about activities?";
    } else if (lowerMessage.includes('traffic')) {
      return "🚦 Current traffic update: NH 66 has light traffic. Ernakulam to Munnar route is clear. Best time to travel is early morning (7-9 AM) to avoid afternoon traffic.";
    } else if (lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "💰 Travel costs to popular destinations: Munnar (₹120-350), Kovalam (₹30-80), Alleppey (₹80-200). Prices vary by transport mode. Which destination interests you?";
    } else {
      return "I can help you with directions, weather updates, tourist spots, traffic conditions, and travel costs in Kerala. What specific information would you like?";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Navigation & AI Assistant</h1>
        <p className="text-lg text-gray-600">
          Get directions, weather updates, and travel assistance for your Kerala journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Panel */}
        <div className="lg:col-span-2">
          {/* Destination Input */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Navigation className="h-5 w-5 mr-2 text-emerald-600" />
                Plan Your Route
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Target className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Current Location (Auto-detected)"
                    value="Ernakulam, Kerala"
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-emerald-600" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    onKeyPress={(e) => e.key === 'Enter' && handleDestinationSubmit()}
                  />
                </div>
                
                <button
                  onClick={handleDestinationSubmit}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Route className="h-5 w-5 mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Routes */}
          {showRoutes && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Compass className="h-5 w-5 mr-2 text-emerald-600" />
                  Route Options to {destination || 'Munnar'}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {routes.map((route, index) => {
                    const Icon = route.icon;
                    return (
                      <div
                        key={route.id}
                        onClick={() => setSelectedRoute(index)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedRoute === index
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${route.color} text-white`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 capitalize">{route.mode}</h3>
                              <p className="text-sm text-gray-600">{route.route}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{route.duration}</p>
                            <p className="text-sm text-gray-600">{route.distance}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-emerald-600 font-medium">{route.cost}</span>
                          {route.traffic && (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              route.traffic === 'Light' ? 'bg-green-100 text-green-800' :
                              route.traffic === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Traffic: {route.traffic}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Selected Route Details */}
                {selectedRoute !== null && (
                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <h3 className="font-medium text-emerald-900 mb-3">Step-by-step directions:</h3>
                    <ol className="space-y-2">
                      {routes[selectedRoute].steps.map((step, index) => (
                        <li key={index} className="flex text-sm text-emerald-800">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    
                    <button className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center">
                      <Navigation className="h-4 w-4 mr-2" />
                      Start Navigation
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Chat */}
        <div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 h-[600px] flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-emerald-600" />
                AI Travel Assistant
              </h2>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      chat.type === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                    <p className={`text-xs mt-1 ${
                      chat.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      {chat.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask about weather, routes, or tourist spots..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-sm"
                />
                <button
                  onClick={handleChatSubmit}
                  className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
                <button className="border border-gray-300 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Mic className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 mt-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Cloud className="h-5 w-5 mr-2 text-emerald-600" />
                Current Weather
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">☀️</div>
                  <div className="text-lg font-bold text-gray-900">28°C</div>
                  <div className="text-sm text-gray-600">Ernakulam</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🌤️</div>
                  <div className="text-lg font-bold text-gray-900">18°C</div>
                  <div className="text-sm text-gray-600">Munnar</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  Light rain expected in Kochi after 6 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;