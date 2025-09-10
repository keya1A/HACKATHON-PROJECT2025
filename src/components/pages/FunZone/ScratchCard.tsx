import React, { useState, useRef, useEffect } from 'react';
import { Gift, RefreshCw, Coins } from 'lucide-react';

interface ScratchCardProps {
  userCoins: number;
  onScratchComplete: (reward: any, coinsSpent: number) => void;
}

const rewards = [
  { type: 'coins', value: 30, message: '30 Coins!', color: 'text-yellow-600' },
  { type: 'discount', value: '15%', message: '15% Travel Discount!', color: 'text-green-600' },
  { type: 'coins', value: 75, message: '75 Coins!', color: 'text-yellow-600' },
  { type: 'badge', value: 'Lucky', message: 'Lucky Badge!', color: 'text-purple-600' },
  { type: 'coins', value: 10, message: '10 Coins!', color: 'text-yellow-600' },
  { type: 'discount', value: '25%', message: '25% Food Discount!', color: 'text-green-600' },
];

const ScratchCard: React.FC<ScratchCardProps> = ({ userCoins, onScratchComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [reward, setReward] = useState(rewards[Math.floor(Math.random() * rewards.length)]);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  const cardCost = 15;

  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 200;

    // Create scratch surface
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch instruction
    ctx.fillStyle = '#666';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Your Prize!', canvas.width / 2, canvas.height / 2 + 25);
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const percentage = (transparent / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 60 && !isScratched) {
      setIsScratched(true);
      onScratchComplete(reward, cardCost);
    }
  };

  const startNewCard = () => {
    if (userCoins < cardCost) return;
    
    setIsScratched(false);
    setScratchPercentage(0);
    setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    initCanvas();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Scratch Card</h3>
        <p className="text-gray-600">Scratch away the silver coating to reveal your prize!</p>
        <div className="flex items-center justify-center mt-2">
          <Coins className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-sm text-gray-600">Cost: {cardCost} coins</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-80 h-48 bg-gradient-to-br from-yellow-200 to-green-200 rounded-lg p-4 flex items-center justify-center relative">
            {isScratched ? (
              <div className="text-center">
                <Gift className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h4>
                <p className={`text-xl font-bold ${reward.color}`}>{reward.message}</p>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 cursor-crosshair rounded-lg"
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={() => setIsScratching(false)}
                onMouseLeave={() => setIsScratching(false)}
                onMouseMove={scratch}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={() => setIsScratching(false)}
                onTouchMove={scratch}
              />
            )}
          </div>
          
          {scratchPercentage > 0 && scratchPercentage < 60 && (
            <div className="mt-2 text-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scratchPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">Scratched: {Math.round(scratchPercentage)}%</p>
            </div>
          )}
        </div>

        <button
          onClick={startNewCard}
          disabled={userCoins < cardCost}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Get New Card
        </button>

        {userCoins < cardCost && (
          <p className="text-red-500 text-sm mt-2">Not enough coins for a new card!</p>
        )}
      </div>
    </div>
  );
};

export default ScratchCard;