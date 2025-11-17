import { RotateCcw, Lightbulb, Check } from 'lucide-react';
import { SudokuDifficulty } from '../types/sudoku';

interface SudokuControlsProps {
  difficulty: SudokuDifficulty;
  onReset: () => void;
  onHint: () => void;
  onCheck: () => void;
  onDifficultyChange: (difficulty: SudokuDifficulty) => void;
}

export const SudokuControls = ({
  difficulty,
  onReset,
  onHint,
  onCheck,
  onDifficultyChange,
}: SudokuControlsProps) => {
  const difficulties: SudokuDifficulty[] = ['easy', 'medium', 'hard', 'expert'];

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-xl border-2 border-gray-700 space-y-4">
      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Difficulty</p>
        <div className="grid grid-cols-4 gap-2">
          {difficulties.map(d => (
            <button
              key={d}
              onClick={() => onDifficultyChange(d)}
              className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                difficulty === d
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={onHint}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Lightbulb className="w-4 h-4" />
          Get Hint
        </button>
        <button
          onClick={onCheck}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Check Solution
        </button>
        <button
          onClick={onReset}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};
