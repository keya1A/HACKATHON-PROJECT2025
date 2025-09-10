import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, Trophy, Clock } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which is the most famous backwater destination in Kerala?",
    options: ["Alleppey", "Kochi", "Munnar", "Wayanad"],
    correctAnswer: 0,
    points: 10,
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "What is Kerala known as?",
    options: ["God's Own Country", "Land of Spices", "Queen of Hills", "Venice of East"],
    correctAnswer: 0,
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 3,
    question: "Which dance form originated in Kerala?",
    options: ["Bharatanatyam", "Kathakali", "Odissi", "Manipuri"],
    correctAnswer: 1,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 4,
    question: "What is the traditional boat race of Kerala called?",
    options: ["Vallam Kali", "Boat Race", "Water Festival", "River Race"],
    correctAnswer: 0,
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 5,
    question: "Which spice is Kerala most famous for?",
    options: ["Turmeric", "Cardamom", "Black Pepper", "Cinnamon"],
    correctAnswer: 2,
    points: 10,
    difficulty: 'easy'
  }
];

interface DailyQuizProps {
  onQuizComplete: (points: number) => void;
  hasPlayedToday: boolean;
}

const DailyQuiz: React.FC<DailyQuizProps> = ({ onQuizComplete, hasPlayedToday }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted && !hasPlayedToday) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, quizCompleted, hasPlayedToday]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || hasPlayedToday) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const newScore = isCorrect ? score + question.points : score;
    
    setUserAnswers([...userAnswers, selectedAnswer || -1]);
    setScore(newScore);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
        onQuizComplete(newScore);
      }
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  if (hasPlayedToday && !quizCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Daily Quiz</h3>
        <p className="text-gray-600">You've already completed today's quiz!</p>
        <p className="text-sm text-gray-500 mt-2">Come back tomorrow for new questions.</p>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h3>
        <p className="text-xl font-semibold text-green-600 mb-4">Final Score: {score} points</p>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-gray-700">
            You answered {userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of {questions.length} questions correctly!
          </p>
        </div>
        <button
          onClick={resetQuiz}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again Tomorrow
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-blue-500" />
            Daily Quiz
          </h3>
          <p className="text-gray-600">Test your Kerala knowledge!</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-red-500 mb-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
          <p className="text-sm text-gray-600">Score: {score}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className={`text-sm font-semibold ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)} (+{question.points} pts)
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h4>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                showResult
                  ? index === question.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-300'
                  : selectedAnswer === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border mr-3 flex items-center justify-center text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                )}
                {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedAnswer !== null && !showResult && (
        <button
          onClick={handleNextQuestion}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}

      {showResult && (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          {selectedAnswer === question.correctAnswer ? (
            <div className="text-green-600">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Correct! +{question.points} points</p>
            </div>
          ) : (
            <div className="text-red-600">
              <XCircle className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Wrong answer!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;