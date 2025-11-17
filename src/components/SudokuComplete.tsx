import { Trophy, RotateCcw } from 'lucide-react';

interface SudokuCompleteProps {
  time: number;
  difficulty: string;
  onNewGame: () => void;
}

export const SudokuComplete = ({ time, difficulty, onNewGame }: SudokuCompleteProps) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-10">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border-4 border-green-500 max-w-md w-full mx-4 text-center">
        <div className="flex justify-center mb-4">
          <Trophy className="w-16 h-16 text-yellow-400" />
        </div>
        <h2 className="text-4xl font-bold text-green-400 mb-4">Puzzle Solved!</h2>
        <div className="space-y-3 mb-6">
          <div>
            <p className="text-gray-400 text-sm uppercase">Time</p>
            <p className="text-white text-2xl font-bold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm uppercase">Difficulty</p>
            <p className="text-white text-2xl font-bold capitalize">{difficulty}</p>
          </div>
        </div>
        <button
          onClick={onNewGame}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          New Game
        </button>
      </div>
    </div>
  );
};
