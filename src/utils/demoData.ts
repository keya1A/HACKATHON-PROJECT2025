import { Trip, TouristSpot, AdminAnalytics, WeatherInfo, Alert } from '../types';

export const generateDemoTrips = (count: number = 50): Trip[] => {
  const modes = ['walk', 'bus', 'car', 'train', 'auto', 'bike'] as const;
  const purposes = ['Work', 'Education', 'Shopping', 'Recreation', 'Medical', 'Social'];
  
  const keralaCities = [
    { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
    { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
    { name: 'Kozhikode', lat: 11.2588, lng: 75.7804 },
    { name: 'Thrissur', lat: 10.5276, lng: 76.2144 },
    { name: 'Alappuzha', lat: 9.4981, lng: 76.3388 },
    { name: 'Kollam', lat: 8.8932, lng: 76.6141 },
    { name: 'Palakkad', lat: 10.7867, lng: 76.6548 },
    { name: 'Kannur', lat: 11.8745, lng: 75.3704 }
  ];

  return Array.from({ length: count }, (_, i) => {
    const startTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const duration = Math.random() * 3600 + 300; // 5 minutes to 1 hour
    const origin = keralaCities[Math.floor(Math.random() * keralaCities.length)];
    const destination = keralaCities[Math.floor(Math.random() * keralaCities.length)];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    return {
      id: `trip_${i + 1}`,
      userId: '1',
      startTime: startTime.toISOString(),
      endTime: new Date(startTime.getTime() + duration * 1000).toISOString(),
      origin: {
        lat: origin.lat + (Math.random() - 0.5) * 0.01,
        lng: origin.lng + (Math.random() - 0.5) * 0.01,
        address: origin.name
      },
      destination: {
        lat: destination.lat + (Math.random() - 0.5) * 0.01,
        lng: destination.lng + (Math.random() - 0.5) * 0.01,
        address: destination.name
      },
      distance: Math.random() * 50000 + 1000, // 1km to 50km
      duration: duration,
      mode: mode,
      modeConfidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
      coTravelers: Math.floor(Math.random() * 4),
      isHousehold: Math.random() > 0.3,
      cleanedFlag: false,
      sourceDevice: 'mobile_app',
      syncedAt: new Date().toISOString()
    };
  });
};

export const getTouristSpots = (): TouristSpot[] => [
  {
    id: '1',
    name: 'Munnar Tea Gardens',
    description: 'Rolling hills covered with tea plantations and misty mountains',
    images: ['https://images.pexels.com/photos/4355346/pexels-photo-4355346.jpeg'],
    location: { lat: 10.0889, lng: 77.0595 },
    ticketCost: 0,
    category: 'Hills',
    weather: {
      temperature: 18,
      condition: 'Pleasant',
      humidity: 65,
      windSpeed: 12,
      forecast: []
    },
    distanceFromUser: 125,
    travelTime: 180
  },
  {
    id: '2',
    name: 'Kovalam Beach',
    description: 'Famous crescent-shaped beach with lighthouse and resorts',
    images: ['https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg'],
    location: { lat: 8.4004, lng: 76.9784 },
    ticketCost: 0,
    category: 'Beach',
    weather: {
      temperature: 28,
      condition: 'Sunny',
      humidity: 78,
      windSpeed: 8,
      forecast: []
    },
    distanceFromUser: 12,
    travelTime: 25
  },
  {
    id: '3',
    name: 'Alleppey Backwaters',
    description: 'Serene backwaters with houseboats and coconut palms',
    images: ['https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg'],
    location: { lat: 9.4981, lng: 76.3388 },
    ticketCost: 1500,
    category: 'Backwaters',
    weather: {
      temperature: 26,
      condition: 'Partly Cloudy',
      humidity: 82,
      windSpeed: 6,
      forecast: []
    },
    distanceFromUser: 85,
    travelTime: 120
  },
  {
    id: '4',
    name: 'Fort Kochi',
    description: 'Historic colonial port city with Chinese fishing nets',
    images: ['https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg'],
    location: { lat: 9.9654, lng: 76.2430 },
    ticketCost: 25,
    category: 'Heritage',
    weather: {
      temperature: 29,
      condition: 'Humid',
      humidity: 85,
      windSpeed: 10,
      forecast: []
    },
    distanceFromUser: 95,
    travelTime: 135
  },
  {
    id: '5',
    name: 'Wayanad Wildlife Sanctuary',
    description: 'Rich biodiversity with elephants, tigers, and exotic birds',
    images: ['https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg'],
    location: { lat: 11.6854, lng: 76.1320 },
    ticketCost: 60,
    category: 'Wildlife',
    weather: {
      temperature: 22,
      condition: 'Misty',
      humidity: 90,
      windSpeed: 4,
      forecast: []
    },
    distanceFromUser: 180,
    travelTime: 240
  },
  {
    id: '6',
    name: 'Thekkady Spice Plantations',
    description: 'Aromatic spice gardens with cardamom, pepper, and cinnamon',
    images: ['https://images.pexels.com/photos/4492551/pexels-photo-4492551.jpeg'],
    location: { lat: 9.5916, lng: 77.1700 },
    ticketCost: 200,
    category: 'Plantations',
    weather: {
      temperature: 24,
      condition: 'Cool',
      humidity: 72,
      windSpeed: 8,
      forecast: []
    },
    distanceFromUser: 110,
    travelTime: 165
  }
];

export const getDemoAnalytics = (): AdminAnalytics => ({
  totalTrips: 47235,
  uniqueUsers: 8943,
  modeShare: {
    walk: 25,
    bus: 35,
    car: 15,
    train: 8,
    auto: 12,
    bike: 5
  },
  topODPairs: [
    { origin: 'Thiruvananthapuram', destination: 'Kochi', count: 1245, distance: 214 },
    { origin: 'Kochi', destination: 'Munnar', count: 987, distance: 130 },
    { origin: 'Kozhikode', destination: 'Wayanad', count: 756, distance: 76 },
    { origin: 'Thrissur', destination: 'Palakkad', count: 654, distance: 45 },
    { origin: 'Alappuzha', destination: 'Kovalam', count: 543, distance: 89 }
  ],
  activeAlerts: [
    {
      id: '1',
      type: 'weather',
      message: 'Heavy rain expected in Wayanad district',
      severity: 'high',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'traffic',
      message: 'Traffic congestion on NH-66 near Kochi',
      severity: 'medium',
      timestamp: new Date().toISOString()
    }
  ]
});

export const getCurrentWeather = (): WeatherInfo => ({
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 76,
  windSpeed: 12,
  forecast: [
    { time: '12:00', temperature: 30, condition: 'Sunny', precipitation: 0 },
    { time: '15:00', temperature: 32, condition: 'Partly Cloudy', precipitation: 10 },
    { time: '18:00', temperature: 29, condition: 'Cloudy', precipitation: 40 },
    { time: '21:00', temperature: 26, condition: 'Light Rain', precipitation: 80 }
  ]
});