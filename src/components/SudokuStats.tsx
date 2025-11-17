interface SudokuStatsProps {
  completedCells: number;
  totalCells: number;
  elapsedTime: number;
  errors: number;
}

export const SudokuStats = ({ completedCells, totalCells, elapsedTime, errors }: SudokuStatsProps) => {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-xl border-2 border-gray-700 space-y-4">
      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider">Progress</p>
        <p className="text-white text-2xl font-bold">
          {completedCells} / {totalCells}
        </p>
        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(completedCells / totalCells) * 100}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider">Time</p>
        <p className="text-white text-2xl font-bold">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider">Errors</p>
        <p className={`text-2xl font-bold ${errors > 0 ? 'text-red-400' : 'text-green-400'}`}>{errors}</p>
      </div>
    </div>
  );
};
