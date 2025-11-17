import { SudokuBoard } from '../types/sudoku';

interface SudokuGridProps {
  board: SudokuBoard;
  initialBoard: SudokuBoard;
  selectedCell: [number, number] | null;
  errors: Set<string>;
  completedCells: Set<string>;
  onCellClick: (row: number, col: number) => void;
  onNumberInput: (num: number | null) => void;
}

export const SudokuGrid = ({
  board,
  initialBoard,
  selectedCell,
  errors,
  completedCells,
  onCellClick,
  onNumberInput,
}: SudokuGridProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;

    if (e.key >= '1' && e.key <= '9') {
      e.preventDefault();
      onNumberInput(parseInt(e.key));
    } else if (e.key === 'Backspace' || e.key === '0') {
      e.preventDefault();
      onNumberInput(null);
    } else if (e.key === 'ArrowUp' && selectedCell[0] > 0) {
      e.preventDefault();
      onCellClick(selectedCell[0] - 1, selectedCell[1]);
    } else if (e.key === 'ArrowDown' && selectedCell[0] < 8) {
      e.preventDefault();
      onCellClick(selectedCell[0] + 1, selectedCell[1]);
    } else if (e.key === 'ArrowLeft' && selectedCell[1] > 0) {
      e.preventDefault();
      onCellClick(selectedCell[0], selectedCell[1] - 1);
    } else if (e.key === 'ArrowRight' && selectedCell[1] < 8) {
      e.preventDefault();
      onCellClick(selectedCell[0], selectedCell[1] + 1);
    }
  };

  return (
    <div className="inline-block bg-gray-900 p-1 rounded-lg shadow-2xl border-4 border-gray-700" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="grid gap-0 bg-gray-800" style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}>
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const cellKey = `${rowIdx}-${colIdx}`;
            const isSelected = selectedCell && selectedCell[0] === rowIdx && selectedCell[1] === colIdx;
            const isInitial = initialBoard[rowIdx][colIdx] !== null;
            const isError = errors.has(cellKey);
            const isCompleted = completedCells.has(cellKey);
            const isRelated =
              selectedCell &&
              (selectedCell[0] === rowIdx ||
                selectedCell[1] === colIdx ||
                (Math.floor(selectedCell[0] / 3) === Math.floor(rowIdx / 3) &&
                  Math.floor(selectedCell[1] / 3) === Math.floor(colIdx / 3)));

            const isBoxBottom = (rowIdx + 1) % 3 === 0 && rowIdx !== 8;
            const isBoxRight = (colIdx + 1) % 3 === 0 && colIdx !== 8;

            return (
              <button
                key={cellKey}
                onClick={() => onCellClick(rowIdx, colIdx)}
                className={`w-10 h-10 text-xl font-bold flex items-center justify-center transition-all ${
                  isInitial ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${isSelected ? 'bg-blue-600 text-white' : isRelated ? 'bg-blue-900' : 'bg-gray-800'} ${
                  isError ? 'bg-red-700' : ''
                } ${isCompleted && !isError ? 'text-green-400' : isInitial ? 'text-white' : 'text-gray-200'} ${
                  isBoxBottom ? 'border-b-2' : 'border-b'
                } ${isBoxRight ? 'border-r-2' : 'border-r'} border-gray-600 hover:bg-blue-800`}
              >
                {cell || ''}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
