import { RotateCcw } from 'lucide-react';

interface GameOverProps {
  score: number;
  level: number;
  lines: number;
  onRestart: () => void;
}

export const GameOver = ({ score, level, lines, onRestart }: GameOverProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-10">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border-4 border-red-500 max-w-md w-full mx-4">
        <h2 className="text-4xl font-bold text-red-500 mb-6 text-center">Game Over</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-lg">Final Score:</span>
            <span className="text-white text-2xl font-bold">{score}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-lg">Level Reached:</span>
            <span className="text-white text-2xl font-bold">{level}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-lg">Lines Cleared:</span>
            <span className="text-white text-2xl font-bold">{lines}</span>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};
