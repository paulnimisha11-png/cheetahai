import { useState } from 'react';
import { useSudoku } from './hooks/useSudoku';
import { SudokuGrid } from './components/SudokuGrid';
import { SudokuControls } from './components/SudokuControls';
import { NumberPad } from './components/NumberPad';
import { SudokuStats } from './components/SudokuStats';
import { SudokuComplete } from './components/SudokuComplete';

function App() {
  const {
    gameState,
    elapsedTime,
    selectCell,
    inputNumber,
    getHint,
    checkSolution,
    resetGame,
    newGame,
  } = useSudoku();

  const [showGame, setShowGame] = useState(true);

  const completedCells = gameState.board.reduce((count, row, rowIdx) => {
    return (
      count +
      row.reduce((rowCount, cell, colIdx) => {
        if (cell !== null && gameState.initialBoard[rowIdx][colIdx] === null) {
          return rowCount + 1;
        }
        return rowCount;
      }, 0)
    );
  }, 0);

  const cellsToFill = Array.from({ length: 9 }, (_, i) =>
    Array.from({ length: 9 }, (_, j) => gameState.initialBoard[i][j])
  ).reduce((count, row) => count + row.filter(cell => cell === null).length, 0);

  if (!showGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-8">
        <div className="text-center">
          <button
            onClick={() => setShowGame(true)}
            className="text-white text-2xl font-bold hover:text-blue-400 transition-colors"
          >
            ← Back to Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-7xl w-full">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          Sudoku
        </h1>

        <div className="flex flex-wrap gap-6 justify-center items-start">
          <div>
            <SudokuGrid
              board={gameState.board}
              initialBoard={gameState.initialBoard}
              selectedCell={gameState.selectedCell}
              errors={gameState.errors}
              completedCells={gameState.completedCells}
              onCellClick={selectCell}
              onNumberInput={inputNumber}
            />
          </div>

          <div className="flex flex-col gap-6">
            <SudokuStats
              completedCells={completedCells}
              totalCells={cellsToFill}
              elapsedTime={elapsedTime}
              errors={gameState.errors.size}
            />

            <NumberPad onNumberClick={inputNumber} />

            <SudokuControls
              difficulty={gameState.difficulty}
              onReset={resetGame}
              onHint={getHint}
              onCheck={checkSolution}
              onDifficultyChange={newGame}
            />
          </div>
        </div>
      </div>

      {gameState.isComplete && (
        <SudokuComplete
          time={elapsedTime}
          difficulty={gameState.difficulty}
          onNewGame={() => newGame('easy')}
        />
      )}
    </div>
  );
}

export default App;
