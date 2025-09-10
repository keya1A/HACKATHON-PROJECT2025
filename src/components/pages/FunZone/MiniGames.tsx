import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Timer, Zap, Coins } from 'lucide-react';

interface MiniGamesProps {
  userCoins: number;
  onGameComplete: (points: number, coinsSpent: number) => void;
}

const MiniGames: React.FC<MiniGamesProps> = ({ userCoins, onGameComplete }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>({});

  const games = [
    {
      id: 'memory',
      name: 'Memory Match',
      description: 'Match Kerala landmarks and win coins!',
      cost: 10,
      reward: 30,
      icon: '🧠'
    },
    {
      id: 'puzzle',
      name: 'Kerala Puzzle',
      description: 'Solve the Kerala map puzzle!',
      cost: 15,
      reward: 45,
      icon: '🧩'
    },
    {
      id: 'trivia',
      name: 'Quick Trivia',
      description: 'Answer 5 quick questions!',
      cost: 5,
      reward: 20,
      icon: '🤔'
    }
  ];

  const MemoryGame = () => {
    const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameWon, setGameWon] = useState(false);

    const landmarks = ['🏖️', '🌴', '🛶', '🕌', '🏰', '🌊', '🦚', '🐘'];
    
    useEffect(() => {
      initializeCards();
    }, []);

    useEffect(() => {
      if (timeLeft > 0 && !gameWon) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        // Game over
        onGameComplete(0, games.find(g => g.id === 'memory')?.cost || 0);
        setSelectedGame(null);
      }
    }, [timeLeft, gameWon]);

    const initializeCards = () => {
      const shuffled = [...landmarks, ...landmarks]
        .sort(() => Math.random() - 0.5)
        .map((value, index) => ({
          id: index,
          value,
          flipped: false,
          matched: false
        }));
      setCards(shuffled);
    };

    const handleCardClick = (cardId: number) => {
      if (flippedCards.length === 2) return;
      
      const newCards = cards.map(card => 
        card.id === cardId ? { ...card, flipped: true } : card
      );
      setCards(newCards);
      setFlippedCards([...flippedCards, cardId]);

      if (flippedCards.length === 1) {
        setMoves(moves + 1);
        const firstCard = cards.find(c => c.id === flippedCards[0]);
        const secondCard = cards.find(c => c.id === cardId);

        setTimeout(() => {
          if (firstCard?.value === secondCard?.value) {
            setCards(prev => prev.map(card => 
              card.id === flippedCards[0] || card.id === cardId 
                ? { ...card, matched: true } 
                : card
            ));
            
            const allMatched = newCards.filter(c => c.id !== flippedCards[0] && c.id !== cardId)
              .every(c => c.matched);
            
            if (allMatched) {
              setGameWon(true);
              const bonus = timeLeft > 30 ? 20 : 10;
              onGameComplete(games.find(g => g.id === 'memory')?.reward! + bonus, games.find(g => g.id === 'memory')?.cost || 0);
            }
          } else {
            setCards(prev => prev.map(card => 
              card.id === flippedCards[0] || card.id === cardId 
                ? { ...card, flipped: false } 
                : card
            ));
          }
          setFlippedCards([]);
        }, 1000);
      }
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Memory Match</h3>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center"><Timer className="w-4 h-4 mr-1" />{timeLeft}s</span>
            <span className="flex items-center"><Zap className="w-4 h-4 mr-1" />{moves} moves</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.flipped || card.matched}
              className={`aspect-square rounded-lg text-2xl font-bold transition-all duration-300 ${
                card.flipped || card.matched
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {card.flipped || card.matched ? card.value : '❓'}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const PuzzleGame = () => {
    const [pieces, setPieces] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(90);
    const [moves, setMoves] = useState(0);
    
    useEffect(() => {
      // Initialize puzzle with shuffled pieces
      const shuffled = Array.from({ length: 15 }, (_, i) => i + 1).concat([0]);
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setPieces(shuffled);
    }, []);

    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        onGameComplete(0, games.find(g => g.id === 'puzzle')?.cost || 0);
        setSelectedGame(null);
      }
    }, [timeLeft]);

    const movePiece = (index: number) => {
      const emptyIndex = pieces.indexOf(0);
      const validMoves = [
        emptyIndex - 4, // up
        emptyIndex + 4, // down
        emptyIndex % 4 !== 0 ? emptyIndex - 1 : -1, // left
        emptyIndex % 4 !== 3 ? emptyIndex + 1 : -1  // right
      ];

      if (validMoves.includes(index)) {
        const newPieces = [...pieces];
        [newPieces[emptyIndex], newPieces[index]] = [newPieces[index], newPieces[emptyIndex]];
        setPieces(newPieces);
        setMoves(moves + 1);

        // Check if puzzle is solved
        const isSolved = newPieces.every((piece, i) => piece === (i + 1) % 16);
        if (isSolved) {
          const bonus = timeLeft > 60 ? 30 : 15;
          onGameComplete(games.find(g => g.id === 'puzzle')?.reward! + bonus, games.find(g => g.id === 'puzzle')?.cost || 0);
        }
      }
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Kerala Puzzle</h3>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center"><Timer className="w-4 h-4 mr-1" />{timeLeft}s</span>
            <span className="flex items-center"><Zap className="w-4 h-4 mr-1" />{moves} moves</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto bg-gray-300 p-2 rounded-lg">
          {pieces.map((piece, index) => (
            <button
              key={index}
              onClick={() => movePiece(index)}
              className={`aspect-square rounded text-sm font-bold transition-all duration-200 ${
                piece === 0 
                  ? 'bg-transparent' 
                  : 'bg-gradient-to-br from-green-400 to-blue-500 text-white hover:shadow-lg'
              }`}
            >
              {piece !== 0 && piece}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (selectedGame === 'memory') {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <button 
            onClick={() => setSelectedGame(null)}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Games
          </button>
        </div>
        <MemoryGame />
      </div>
    );
  }

  if (selectedGame === 'puzzle') {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <button 
            onClick={() => setSelectedGame(null)}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Games
          </button>
        </div>
        <PuzzleGame />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <Gamepad2 className="w-6 h-6 mr-2 text-purple-500" />
          Mini Games
        </h3>
        <p className="text-gray-600">Play fun games and earn coins!</p>
      </div>

      <div className="grid gap-4">
        {games.map(game => (
          <div key={game.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{game.icon}</span>
                <div>
                  <h4 className="font-semibold text-lg">{game.name}</h4>
                  <p className="text-gray-600 text-sm">{game.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-red-500 text-sm mb-1">
                  <Coins className="w-4 h-4 mr-1" />
                  {game.cost}
                </div>
                <div className="flex items-center text-green-500 text-sm mb-2">
                  <Trophy className="w-4 h-4 mr-1" />
                  {game.reward}
                </div>
                <button
                  onClick={() => setSelectedGame(game.id)}
                  disabled={userCoins < game.cost}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userCoins < Math.min(...games.map(g => g.cost)) && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
          <p className="text-yellow-800 text-sm">You need more coins to play games!</p>
        </div>
      )}
    </div>
  );
};

export default MiniGames;