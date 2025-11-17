import { SudokuBoard, SudokuDifficulty } from '../types/sudoku';

const isValid = (board: SudokuBoard, row: number, col: number, num: number): boolean => {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
};

const solveSudoku = (board: SudokuBoard): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
              return true;
            }

            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const generateEmptyBoard = (): SudokuBoard => {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
};

const generateSolution = (): SudokuBoard => {
  const board = generateEmptyBoard();
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const shuffled = nums.sort(() => Math.random() - 0.5);
      let index = 0;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          board[i * 3 + row][j * 3 + col] = shuffled[index++];
        }
      }
    }
  }

  return board;
};

export const generateSudoku = (difficulty: SudokuDifficulty): { board: SudokuBoard; solution: SudokuBoard } => {
  let solution = generateSolution();
  const solutionCopy = solution.map(row => [...row]);

  const board = solution.map(row => [...row]);

  const cellsToRemove: Record<SudokuDifficulty, number> = {
    easy: 30,
    medium: 40,
    hard: 50,
    expert: 60,
  };

  let removed = 0;
  const target = cellsToRemove[difficulty];

  while (removed < target) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row][col] !== null) {
      board[row][col] = null;
      removed++;
    }
  }

  return { board, solution: solutionCopy };
};

export const isValidPlacement = (board: SudokuBoard, row: number, col: number, num: number): boolean => {
  for (let x = 0; x < 9; x++) {
    if (x !== col && board[row][x] === num) return false;
  }

  for (let x = 0; x < 9; x++) {
    if (x !== row && board[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = i + startRow;
      const c = j + startCol;
      if ((r !== row || c !== col) && board[r][c] === num) return false;
    }
  }

  return true;
};

export const isBoardComplete = (board: SudokuBoard): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const validateBoard = (board: SudokuBoard, solution: SudokuBoard): boolean => {
  if (!isBoardComplete(board)) return false;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }

  return true;
};
