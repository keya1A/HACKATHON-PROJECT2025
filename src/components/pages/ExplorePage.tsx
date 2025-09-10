import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Thermometer, 
  Star, 
  Navigation, 
  Camera,
  Heart,
  Share2,
  Calendar,
  Users,
  Car,
  Bus,
  Filter,
  Search
} from 'lucide-react';

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteSpots, setFavoriteSpots] = useState<number[]>([]);

  // Mock tourist spots data
  const touristSpots = [
    {
      id: 1,
      name: 'Munnar Hill Station',
      category: 'hill-station',
      image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Famous hill station known for tea plantations and scenic beauty',
      rating: 4.8,
      reviews: 12847,
      entryFee: '₹50',
      distance: '132 km',
      travelTime: '3h 45m',
      weather: { temp: '18°C', condition: 'Sunny', icon: '☀️' },
      highlights: ['Tea Gardens', 'Eravikulam National Park', 'Mattupetty Dam'],
      bestTime: 'Oct - Mar',
      duration: '2-3 Days'
    },
    {
      id: 2,
      name: 'Kovalam Beach',
      category: 'beach',
      image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Pristine beach with golden sand and perfect waves',
      rating: 4.6,
      reviews: 8934,
      entryFee: 'Free',
      distance: '16 km',
      travelTime: '35m',
      weather: { temp: '29°C', condition: 'Partly Cloudy', icon: '⛅' },
      highlights: ['Lighthouse Beach', 'Hawah Beach', 'Samudra Beach'],
      bestTime: 'Nov - Feb',
      duration: '1-2 Days'
    },
    {
      id: 3,
      name: 'Alleppey Backwaters',
      category: 'backwater',
      image: 'https://images.pexels.com/photos/3573266/pexels-photo-3573266.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Venice of the East with mesmerizing backwater cruises',
      rating: 4.9,
      reviews: 15621,
      entryFee: '₹2000',
      distance: '85 km',
      travelTime: '2h 15m',
      weather: { temp: '26°C', condition: 'Clear', icon: '☀️' },
      highlights: ['Houseboat Cruise', 'Kumarakom Bird Sanctuary', 'Coir Village'],
      bestTime: 'Dec - Apr',
      duration: '1-2 Days'
    },
    {
      id: 4,
      name: 'Kochi Fort Area',
      category: 'heritage',
      image: 'https://images.pexels.com/photos/9828170/pexels-photo-9828170.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Historic port city with colonial architecture and cultural heritage',
      rating: 4.5,
      reviews: 9876,
      entryFee: '₹25',
      distance: '45 km',
      travelTime: '1h 20m',
      weather: { temp: '31°C', condition: 'Humid', icon: '🌤️' },
      highlights: ['Chinese Fishing Nets', 'Mattancherry Palace', 'Jewish Synagogue'],
      bestTime: 'Oct - Mar',
      duration: '1 Day'
    },
    {
      id: 5,
      name: 'Wayanad Wildlife Sanctuary',
      category: 'wildlife',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Rich biodiversity with elephants, tigers, and exotic birds',
      rating: 4.7,
      reviews: 6543,
      entryFee: '₹100',
      distance: '280 km',
      travelTime: '6h 30m',
      weather: { temp: '22°C', condition: 'Misty', icon: '🌫️' },
      highlights: ['Elephant Safari', 'Banasura Sagar Dam', 'Chembra Peak'],
      bestTime: 'Oct - May',
      duration: '2-3 Days'
    },
    {
      id: 6,
      name: 'Thekkady Spice Gardens',
      category: 'nature',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Aromatic spice plantations and Periyar Wildlife Sanctuary',
      rating: 4.4,
      reviews: 4721,
      entryFee: '₹75',
      distance: '190 km',
      travelTime: '4h 45m',
      weather: { temp: '24°C', condition: 'Pleasant', icon: '🌿' },
      highlights: ['Spice Tours', 'Periyar Lake', 'Bamboo Rafting'],
      bestTime: 'Sep - May',
      duration: '1-2 Days'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Places', count: touristSpots.length },
    { id: 'beach', label: 'Beaches', count: touristSpots.filter(s => s.category === 'beach').length },
    { id: 'hill-station', label: 'Hill Stations', count: touristSpots.filter(s => s.category === 'hill-station').length },
    { id: 'backwater', label: 'Backwaters', count: touristSpots.filter(s => s.category === 'backwater').length },
    { id: 'heritage', label: 'Heritage', count: touristSpots.filter(s => s.category === 'heritage').length },
    { id: 'wildlife', label: 'Wildlife', count: touristSpots.filter(s => s.category === 'wildlife').length },
    { id: 'nature', label: 'Nature', count: touristSpots.filter(s => s.category === 'nature').length }
  ];

  const filteredSpots = touristSpots.filter(spot => {
    const matchesCategory = selectedCategory === 'all' || spot.category === selectedCategory;
    const matchesSearch = spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spot.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (spotId: number) => {
    setFavoriteSpots(prev => 
      prev.includes(spotId) 
        ? prev.filter(id => id !== spotId)
        : [...prev, spotId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Kerala's Hidden Gems
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the most beautiful destinations in God's Own Country with real-time information, 
          weather updates, and AI-powered recommendations.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tourist Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpots.map((spot) => (
          <div key={spot.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => toggleFavorite(spot.id)}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    favoriteSpots.includes(spot.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm transition-all duration-200">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Weather Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {spot.weather.icon} {spot.weather.temp}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{spot.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{spot.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{spot.description}</p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2 text-emerald-600" />
                  <span className="font-medium">{spot.entryFee}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  <span>{spot.distance}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  <span>{spot.travelTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                  <span>{spot.duration}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">TOP HIGHLIGHTS</p>
                <div className="flex flex-wrap gap-1">
                  {spot.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-100"
                    >
                      {highlight}
                    </span>
                  ))}
                  {spot.highlights.length > 2 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                      +{spot.highlights.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Reviews Count */}
              <div className="mt-3 text-center">
                <span className="text-xs text-gray-500">
                  {spot.reviews.toLocaleString()} reviews • Best time: {spot.bestTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="mt-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">🤖 AI Travel Assistant</h2>
          <p className="text-emerald-100 mb-6">
            Get personalized recommendations based on your preferences, current location, and weather conditions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-semibold mb-2">Perfect Weather</h3>
              <p className="text-sm text-emerald-100">
                Based on current conditions, Munnar and Thekkady have ideal weather for visiting today!
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-semibold mb-2">Nearby Attractions</h3>
              <p className="text-sm text-emerald-100">
                3 hidden gems within 50km of your location. Discover secret spots only locals know about.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-semibold mb-2">Budget Friendly</h3>
              <p className="text-sm text-emerald-100">
                5 amazing free attractions that offer incredible experiences without entry fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* No Results */}
      {filteredSpots.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No destinations found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or explore different categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;