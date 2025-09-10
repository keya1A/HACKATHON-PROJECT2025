import React, { useState } from 'react';
import { Gift, RotateCcw, Coins } from 'lucide-react';

interface Prize {
  id: number;
  name: string;
  type: 'coins' | 'discount' | 'badge';
  value: number | string;
  color: string;
}

const prizes: Prize[] = [
  { id: 1, name: '50 Coins', type: 'coins', value: 50, color: '#FFD700' },
  { id: 2, name: '10% Discount', type: 'discount', value: '10%', color: '#FF6B6B' },
  { id: 3, name: '25 Coins', type: 'coins', value: 25, color: '#4ECDC4' },
  { id: 4, name: '5% Discount', type: 'discount', value: '5%', color: '#45B7D1' },
  { id: 5, name: '100 Coins', type: 'coins', value: 100, color: '#96CEB4' },
  { id: 6, name: 'Explorer Badge', type: 'badge', value: 'Explorer', color: '#FFEAA7' },
  { id: 7, name: '15 Coins', type: 'coins', value: 15, color: '#DDA0DD' },
  { id: 8, name: '20% Discount', type: 'discount', value: '20%', color: '#98D8C8' }
];

interface SpinWheelProps {
  userCoins: number;
  onSpinComplete: (prize: Prize, coinsSpent: number) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ userCoins, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [showResult, setShowResult] = useState(false);

  const spinCost = 20;

  const handleSpin = () => {
    if (userCoins < spinCost || isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setSelectedPrize(null);

    const randomAngle = Math.floor(Math.random() * 360) + 1440; // At least 4 full rotations
    const finalAngle = randomAngle % 360;
    const prizeIndex = Math.floor((360 - finalAngle) / 45) % 8;
    const prize = prizes[prizeIndex];

    setRotation(prev => prev + randomAngle);
    setSelectedPrize(prize);

    setTimeout(() => {
      setIsSpinning(false);
      setShowResult(true);
      onSpinComplete(prize, spinCost);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Lucky Spin Wheel</h3>
        <p className="text-gray-600">Spin to win amazing prizes!</p>
        <div className="flex items-center justify-center mt-2">
          <Coins className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-sm text-gray-600">Cost: {spinCost} coins</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
          </div>
          
          <div 
            className="w-80 h-80 rounded-full border-8 border-gray-300 relative overflow-hidden transition-transform duration-3000 ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {prizes.map((prize, index) => {
              const angle = (360 / prizes.length) * index;
              return (
                <div
                  key={prize.id}
                  className="absolute w-full h-full"
                  style={{
                    background: `conic-gradient(from ${angle}deg at 50% 50%, ${prize.color} 0deg, ${prize.color} ${360/prizes.length}deg, transparent ${360/prizes.length}deg)`,
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  <div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white text-center"
                    style={{ transform: `rotate(${22.5}deg)` }}
                  >
                    <div className="bg-black bg-opacity-50 px-2 py-1 rounded">
                      {prize.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSpin}
          disabled={userCoins < spinCost || isSpinning}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center"
        >
          <RotateCcw className={`w-5 h-5 mr-2 ${isSpinning ? 'animate-spin' : ''}`} />
          {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
        </button>

        {userCoins < spinCost && (
          <p className="text-red-500 text-sm mt-2">Not enough coins to spin!</p>
        )}
      </div>

      {showResult && selectedPrize && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-green-100 rounded-lg text-center animate-pulse">
          <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
          <h4 className="text-xl font-bold text-green-800">Congratulations!</h4>
          <p className="text-green-700">You won: {selectedPrize.name}!</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;