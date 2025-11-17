export type SudokuDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type SudokuBoard = (number | null)[][];

export interface SudokuGameState {
  board: SudokuBoard;
  solution: SudokuBoard;
  initialBoard: SudokuBoard;
  selectedCell: [number, number] | null;
  difficulty: SudokuDifficulty;
  errors: Set<string>;
  completedCells: Set<string>;
  startTime: number;
  isComplete: boolean;
}
