import React, { useState } from 'react';
import { Trophy, Medal, Crown, Users, Calendar, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  coins: number;
  badges: string[];
  avatar: string;
  level: number;
}

const mockData: LeaderboardEntry[] = [
  { id: 1, name: 'Rahul Kumar', score: 2450, coins: 1250, badges: ['Explorer', 'Quiz Master', 'Lucky'], avatar: '👨‍💼', level: 15 },
  { id: 2, name: 'Priya Nair', score: 2320, coins: 1180, badges: ['Culture King', 'Traveler'], avatar: '👩‍🎓', level: 14 },
  { id: 3, name: 'Arjun Menon', score: 2180, coins: 1050, badges: ['Explorer', 'Lucky'], avatar: '👨‍🎨', level: 13 },
  { id: 4, name: 'Sneha Pillai', score: 2050, coins: 980, badges: ['Quiz Master'], avatar: '👩‍💻', level: 12 },
  { id: 5, name: 'Vikram Das', score: 1920, coins: 850, badges: ['Traveler'], avatar: '👨‍🏫', level: 11 },
  { id: 6, name: 'Meera Joseph', score: 1850, coins: 820, badges: ['Explorer'], avatar: '👩‍🔬', level: 10 },
  { id: 7, name: 'Kiran Shah', score: 1750, coins: 780, badges: ['Lucky'], avatar: '👨‍⚕️', level: 10 },
  { id: 8, name: 'Asha Varma', score: 1680, coins: 750, badges: ['Culture King'], avatar: '👩‍🎨', level: 9 },
];

const Leaderboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [currentUser] = useState({ id: 999, name: 'You', score: 1350, coins: 650, rank: 12 });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
      case 2: return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
      case 3: return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300';
      default: return 'bg-white border-gray-200';
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      'Explorer': 'bg-green-100 text-green-800',
      'Quiz Master': 'bg-blue-100 text-blue-800',
      'Lucky': 'bg-purple-100 text-purple-800',
      'Culture King': 'bg-red-100 text-red-800',
      'Traveler': 'bg-indigo-100 text-indigo-800'
    };
    return colors[badge] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Leaderboard
        </h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['weekly', 'monthly', 'allTime'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                timeFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {filter === 'allTime' ? 'All Time' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Current User Stats */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
              #{currentUser.rank}
            </div>
            <div>
              <p className="font-semibold text-blue-800">Your Rank</p>
              <p className="text-sm text-blue-600">{currentUser.score} points • {currentUser.coins} coins</p>
            </div>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center mb-8">
        <div className="flex items-end space-x-4">
          {/* 2nd Place */}
          {mockData[1] && (
            <div className="text-center">
              <div className="w-16 h-20 bg-gray-200 rounded-t-lg flex flex-col items-center justify-end pb-2 mb-2">
                <span className="text-2xl">{mockData[1].avatar}</span>
                <Medal className="w-4 h-4 text-gray-400" />
              </div>
              <p className="font-semibold text-sm">{mockData[1].name.split(' ')[0]}</p>
              <p className="text-xs text-gray-600">{mockData[1].score}</p>
            </div>
          )}
          
          {/* 1st Place */}
          {mockData[0] && (
            <div className="text-center">
              <div className="w-16 h-24 bg-yellow-200 rounded-t-lg flex flex-col items-center justify-end pb-2 mb-2">
                <span className="text-2xl">{mockData[0].avatar}</span>
                <Crown className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="font-semibold text-sm">{mockData[0].name.split(' ')[0]}</p>
              <p className="text-xs text-gray-600">{mockData[0].score}</p>
            </div>
          )}
          
          {/* 3rd Place */}
          {mockData[2] && (
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-t-lg flex flex-col items-center justify-end pb-2 mb-2">
                <span className="text-2xl">{mockData[2].avatar}</span>
                <Medal className="w-4 h-4 text-amber-600" />
              </div>
              <p className="font-semibold text-sm">{mockData[2].name.split(' ')[0]}</p>
              <p className="text-xs text-gray-600">{mockData[2].score}</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="space-y-3">
        {mockData.map((user, index) => (
          <div
            key={user.id}
            className={`p-4 rounded-lg border ${getRankBackground(index + 1)} transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getRankIcon(index + 1)}
                <div className="ml-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{user.avatar}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 mr-4">Level {user.level}</span>
                        <div className="flex gap-1">
                          {user.badges.map((badge, badgeIndex) => (
                            <span
                              key={badgeIndex}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-800">{user.score.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{user.coins} coins</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center text-gray-500 text-sm">
          <Users className="w-4 h-4 mr-2" />
          <span>Updates every hour • {mockData.length}+ active players</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;