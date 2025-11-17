import { useState, useCallback, useEffect } from 'react';
import { SudokuGameState, SudokuDifficulty } from '../types/sudoku';
import {
  generateSudoku,
  isValidPlacement,
  isBoardComplete,
  validateBoard,
} from '../utils/sudokuGenerator';

export const useSudoku = () => {
  const [gameState, setGameState] = useState<SudokuGameState>(() => {
    const { board, solution } = generateSudoku('easy');
    return {
      board: board.map(row => [...row]),
      solution,
      initialBoard: board.map(row => [...row]),
      selectedCell: null,
      difficulty: 'easy',
      errors: new Set(),
      completedCells: new Set(),
      startTime: Date.now(),
      isComplete: false,
    };
  });

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (gameState.isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - gameState.startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.startTime, gameState.isComplete]);

  const selectCell = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.initialBoard[row][col] !== null) {
        return prev;
      }
      return {
        ...prev,
        selectedCell: [row, col],
      };
    });
  }, []);

  const inputNumber = useCallback((num: number | null) => {
    setGameState(prev => {
      if (!prev.selectedCell || prev.initialBoard[prev.selectedCell[0]][prev.selectedCell[1]] !== null) {
        return prev;
      }

      const [row, col] = prev.selectedCell;
      const newBoard = prev.board.map(r => [...r]);
      const cellKey = `${row}-${col}`;
      const newErrors = new Set(prev.errors);
      const newCompleted = new Set(prev.completedCells);

      newBoard[row][col] = num;

      if (num === null) {
        newErrors.delete(cellKey);
        newCompleted.delete(cellKey);
      } else if (!isValidPlacement(prev.initialBoard, row, col, num)) {
        newErrors.add(cellKey);
        newCompleted.delete(cellKey);
      } else {
        newErrors.delete(cellKey);
        if (num === prev.solution[row][col]) {
          newCompleted.add(cellKey);
        } else {
          newCompleted.delete(cellKey);
        }
      }

      let isComplete = false;
      if (isBoardComplete(newBoard) && newErrors.size === 0 && validateBoard(newBoard, prev.solution)) {
        isComplete = true;
      }

      return {
        ...prev,
        board: newBoard,
        errors: newErrors,
        completedCells: newCompleted,
        isComplete,
      };
    });
  }, []);

  const getHint = useCallback(() => {
    setGameState(prev => {
      if (!prev.selectedCell) return prev;

      const [row, col] = prev.selectedCell;
      if (prev.initialBoard[row][col] !== null || prev.board[row][col] !== null) {
        return prev;
      }

      const newBoard = prev.board.map(r => [...r]);
      newBoard[row][col] = prev.solution[row][col];

      const cellKey = `${row}-${col}`;
      const newCompleted = new Set(prev.completedCells);
      newCompleted.add(cellKey);

      return {
        ...prev,
        board: newBoard,
        completedCells: newCompleted,
      };
    });
  }, []);

  const checkSolution = useCallback(() => {
    setGameState(prev => {
      if (!isBoardComplete(prev.board)) {
        alert('Please complete the puzzle first!');
        return prev;
      }

      if (validateBoard(prev.board, prev.solution)) {
        return {
          ...prev,
          isComplete: true,
        };
      } else {
        alert('The solution is incorrect. Check for errors!');
        return prev;
      }
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: prev.initialBoard.map(row => [...row]),
      selectedCell: null,
      errors: new Set(),
      completedCells: new Set(),
      isComplete: false,
    }));
    setElapsedTime(0);
  }, []);

  const newGame = useCallback((difficulty: SudokuDifficulty) => {
    const { board, solution } = generateSudoku(difficulty);
    setGameState({
      board: board.map(row => [...row]),
      solution,
      initialBoard: board.map(row => [...row]),
      selectedCell: null,
      difficulty,
      errors: new Set(),
      completedCells: new Set(),
      startTime: Date.now(),
      isComplete: false,
    });
    setElapsedTime(0);
  }, []);

  return {
    gameState,
    elapsedTime,
    selectCell,
    inputNumber,
    getHint,
    checkSolution,
    resetGame,
    newGame,
  };
};
