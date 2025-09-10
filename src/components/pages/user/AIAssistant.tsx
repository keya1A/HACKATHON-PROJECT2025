import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, MapPin, Cloud, Route, Info } from 'lucide-react';

interface AIAssistantProps {
  userName: string;
  fullView?: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ userName, fullView = false }) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'ai', timestamp: Date}>>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    { icon: Route, text: 'Best route to Munnar', color: 'bg-blue-100 text-blue-700' },
    { icon: Cloud, text: 'Weather forecast', color: 'bg-green-100 text-green-700' },
    { icon: MapPin, text: 'Nearby attractions', color: 'bg-purple-100 text-purple-700' },
    { icon: Info, text: 'Traffic updates', color: 'bg-orange-100 text-orange-700' }
  ];

  useEffect(() => {
    // Initial greeting
    const greeting = {
      id: 1,
      text: `Namaste ${userName}! 🙏 Welcome to Kerala! I'm your AI travel assistant. I can help you with routes, weather updates, tourist spots, and traffic information. How can I assist you today?`,
      sender: 'ai' as const,
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, [userName]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes('route') || text.includes('direction') || text.includes('munnar')) {
      return `🚌 For the best route to Munnar from your current location:\n\n• Bus: Take KSRTC from Kochi (₹120, 4 hours)\n• Car: Via NH85 - scenic route through tea gardens (130 km, 3.5 hours)\n• Train + Bus: Aluva → Munnar (more economical)\n\nCurrent traffic: Moderate. Weather: Pleasant 18°C. Best time to travel: Early morning!`;
    }
    
    if (text.includes('weather') || text.includes('rain') || text.includes('climate')) {
      return `🌦️ Kerala Weather Update:\n\n• Today: Partly cloudy, 28°C\n• Tomorrow: Light showers expected\n• Weekend: Heavy rain alert in Wayanad\n• Coastal areas: Moderate winds\n\n🚨 Travel Alert: Carry umbrella for afternoon travels. Hill station roads may be slippery.`;
    }
    
    if (text.includes('attraction') || text.includes('tourist') || text.includes('places')) {
      return `🏞️ Popular attractions near you:\n\n• Fort Kochi (2.5 km) - Historic architecture\n• Marine Drive (1.8 km) - Evening walks\n• Mattancherry Palace (3.2 km) - Royal heritage\n• Chinese Fishing Nets (2.1 km) - Iconic photography spot\n\n💡 Pro tip: Visit Fort Kochi in the evening for the best sunset views!`;
    }
    
    if (text.includes('traffic') || text.includes('jam') || text.includes('road')) {
      return `🚦 Live Traffic Update:\n\n• NH66: Moderate traffic near Vytilla\n• Edappally Flyover: Heavy congestion\n• Marine Drive: Clear roads\n• MG Road: Light traffic\n\nEstimated delay: 15-20 minutes on major routes. Alternative routes available via Metro connectivity.`;
    }

    return `I understand you're asking about "${userText}". I can help you with:\n\n🗺️ Route planning and directions\n🌤️ Weather forecasts and alerts\n📍 Tourist attractions and recommendations\n🚦 Live traffic updates\n🚌 Public transport schedules\n\nWhat specific information would you like?`;
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  if (!fullView) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">AI Travel Assistant</h3>
            <p className="text-sm text-green-600">● Online</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            "Hello {userName}! Ready to explore Kerala? Ask me about routes, weather, or attractions! 🌴"
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {suggestions.slice(0, 2).map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className={`flex items-center space-x-2 p-2 rounded-lg ${suggestion.color} hover:opacity-80 transition-opacity text-xs`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{suggestion.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-3 p-6 border-b">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">AI Travel Assistant</h3>
          <p className="text-sm text-green-600">● Online - Ready to help!</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${suggestion.color} hover:opacity-80 transition-opacity text-sm`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{suggestion.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Input */}
      <div className="p-6 border-t">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            placeholder="Ask me about routes, weather, attractions..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;