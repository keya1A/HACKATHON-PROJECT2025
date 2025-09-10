import React, { useState } from 'react';
import { Wallet, Coins, Gift, History, ShoppingBag, Utensils, Plane, Award, TrendingUp, Calendar } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  date: Date;
  category: string;
}

interface Reward {
  id: number;
  name: string;
  description: string;
  cost: number;
  category: 'travel' | 'food' | 'merchandise' | 'digital';
  icon: React.ReactNode;
  available: boolean;
}

interface RewardsWalletProps {
  coins: number;
  transactions: Transaction[];
  onRedeemReward: (reward: Reward) => void;
}

const availableRewards: Reward[] = [
  {
    id: 1,
    name: '10% Bus Ticket Discount',
    description: 'Valid on KSRTC and private buses',
    cost: 100,
    category: 'travel',
    icon: <Plane className="w-6 h-6" />,
    available: true
  },
  {
    id: 2,
    name: '₹200 Food Voucher',
    description: 'Use at partner restaurants',
    cost: 150,
    category: 'food',
    icon: <Utensils className="w-6 h-6" />,
    available: true
  },
  {
    id: 3,
    name: 'Kerala T-Shirt',
    description: 'Premium quality Kerala themed t-shirt',
    cost: 300,
    category: 'merchandise',
    icon: <ShoppingBag className="w-6 h-6" />,
    available: true
  },
  {
    id: 4,
    name: '25% Hotel Discount',
    description: 'Valid on Kerala Tourism approved hotels',
    cost: 250,
    category: 'travel',
    icon: <Plane className="w-6 h-6" />,
    available: true
  },
  {
    id: 5,
    name: 'Explorer Badge',
    description: 'Digital badge for your profile',
    cost: 50,
    category: 'digital',
    icon: <Award className="w-6 h-6" />,
    available: true
  },
  {
    id: 6,
    name: '₹500 Travel Credit',
    description: 'Use for any travel bookings',
    cost: 400,
    category: 'travel',
    icon: <Plane className="w-6 h-6" />,
    available: true
  }
];

const RewardsWallet: React.FC<RewardsWalletProps> = ({ coins, transactions, onRedeemReward }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showTransactions, setShowTransactions] = useState(false);

  const categories = [
    { id: 'all', name: 'All Rewards', icon: <Gift className="w-4 h-4" /> },
    { id: 'travel', name: 'Travel', icon: <Plane className="w-4 h-4" /> },
    { id: 'food', name: 'Food', icon: <Utensils className="w-4 h-4" /> },
    { id: 'merchandise', name: 'Merchandise', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'digital', name: 'Digital', icon: <Award className="w-4 h-4" /> }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? availableRewards 
    : availableRewards.filter(reward => reward.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      travel: 'bg-blue-100 text-blue-800',
      food: 'bg-green-100 text-green-800',
      merchandise: 'bg-purple-100 text-purple-800',
      digital: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getTransactionIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Spin Wheel': '🎡',
      'Scratch Card': '🎫',
      'Quiz': '🧠',
      'Game': '🎮',
      'Post': '📝',
      'Likes': '❤️',
      'Redemption': '🎁'
    };
    return icons[category] || '💰';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalEarned = transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.amount, 0);
  const totalSpent = transactions.filter(t => t.type === 'spent').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Wallet Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-green-500 p-4 rounded-full">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Rewards Wallet</h3>
        <div className="flex items-center justify-center">
          <Coins className="w-6 h-6 text-yellow-500 mr-2" />
          <span className="text-3xl font-bold text-green-600">{coins}</span>
          <span className="text-gray-600 ml-1">coins</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Total Earned</p>
          <p className="text-xl font-bold text-green-600">{totalEarned}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Gift className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Total Spent</p>
          <p className="text-xl font-bold text-blue-600">{totalSpent}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <History className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Transactions</p>
          <p className="text-xl font-bold text-purple-600">{transactions.length}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setShowTransactions(false)}
          className={`px-4 py-2 font-medium transition-colors ${
            !showTransactions ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Redeem Rewards
        </button>
        <button
          onClick={() => setShowTransactions(true)}
          className={`px-4 py-2 font-medium transition-colors ${
            showTransactions ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Transaction History
        </button>
      </div>

      {!showTransactions ? (
        <>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Rewards Grid */}
          <div className="grid gap-4">
            {filteredRewards.map(reward => (
              <div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      {reward.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{reward.name}</h4>
                      <p className="text-gray-600 text-sm">{reward.description}</p>
                      <div className="mt-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(reward.category)}`}>
                          {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Coins className="w-4 h-4 mr-1" />
                      <span className="font-bold">{reward.cost}</span>
                    </div>
                    <button
                      onClick={() => onRedeemReward(reward)}
                      disabled={coins < reward.cost || !reward.available}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors text-sm"
                    >
                      {coins < reward.cost ? 'Not Enough Coins' : 'Redeem'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Transaction History */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">Recent Transactions</h4>
            <span className="text-sm text-gray-500">{transactions.length} transactions</span>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No transactions yet</p>
              <p className="text-sm">Start earning coins to see your transaction history!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 10).map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">
                      {getTransactionIcon(transaction.category)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold ${transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">coins</span>
                  </div>
                </div>
              ))}
              
              {transactions.length > 10 && (
                <div className="text-center pt-4">
                  <button className="text-blue-500 hover:text-blue-700 font-medium">
                    View All Transactions
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RewardsWallet;