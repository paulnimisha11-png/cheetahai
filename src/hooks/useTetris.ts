import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState } from '../types/tetris';
import {
  initializeGame,
  isValidMove,
  mergePieceToBoard,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
} from '../utils/gameLogic';
import { createTetromino, rotateTetromino } from '../utils/tetrominoes';

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const dropIntervalRef = useRef<number>();
  const lastDropTimeRef = useRef<number>(Date.now());

  const movePiece = useCallback((offsetX: number, offsetY: number) => {
    setGameState(prev => {
      if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev;

      if (isValidMove(prev.board, prev.currentPiece, offsetX, offsetY)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: {
              x: prev.currentPiece.position.x + offsetX,
              y: prev.currentPiece.position.y + offsetY,
            },
          },
        };
      }

      return prev;
    });
  }, []);

  const rotatePiece = useCallback(() => {
    setGameState(prev => {
      if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev;

      const rotated = rotateTetromino(prev.currentPiece);

      if (isValidMove(prev.board, rotated)) {
        return {
          ...prev,
          currentPiece: rotated,
        };
      }

      return prev;
    });
  }, []);

  const dropPiece = useCallback(() => {
    setGameState(prev => {
      if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev;

      if (isValidMove(prev.board, prev.currentPiece, 0, 1)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: {
              ...prev.currentPiece.position,
              y: prev.currentPiece.position.y + 1,
            },
          },
        };
      }

      const mergedBoard = mergePieceToBoard(prev.board, prev.currentPiece);
      const { newBoard, linesCleared } = clearLines(mergedBoard);
      const newLines = prev.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const scoreGained = calculateScore(linesCleared, prev.level);

      const nextPiece = prev.nextPiece || createTetromino();

      if (!isValidMove(newBoard, nextPiece)) {
        return {
          ...prev,
          board: mergedBoard,
          gameOver: true,
        };
      }

      return {
        ...prev,
        board: newBoard,
        currentPiece: nextPiece,
        nextPiece: createTetromino(),
        score: prev.score + scoreGained,
        level: newLevel,
        lines: newLines,
      };
    });
  }, []);

  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev;

      let piece = prev.currentPiece;
      while (isValidMove(prev.board, piece, 0, 1)) {
        piece = {
          ...piece,
          position: { ...piece.position, y: piece.position.y + 1 },
        };
      }

      const mergedBoard = mergePieceToBoard(prev.board, piece);
      const { newBoard, linesCleared } = clearLines(mergedBoard);
      const newLines = prev.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const scoreGained = calculateScore(linesCleared, prev.level);

      const nextPiece = prev.nextPiece || createTetromino();

      if (!isValidMove(newBoard, nextPiece)) {
        return {
          ...prev,
          board: mergedBoard,
          gameOver: true,
        };
      }

      return {
        ...prev,
        board: newBoard,
        currentPiece: nextPiece,
        nextPiece: createTetromino(),
        score: prev.score + scoreGained,
        level: newLevel,
        lines: newLines,
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const restartGame = useCallback(() => {
    setGameState(initializeGame());
    lastDropTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          if (e.key === ' ') {
            hardDrop();
          } else {
            rotatePiece();
          }
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameOver, movePiece, rotatePiece, hardDrop, togglePause]);

  useEffect(() => {
    const gameLoop = () => {
      const now = Date.now();
      const dropSpeed = getDropSpeed(gameState.level);

      if (!gameState.isPaused && !gameState.gameOver && now - lastDropTimeRef.current > dropSpeed) {
        dropPiece();
        lastDropTimeRef.current = now;
      }

      dropIntervalRef.current = requestAnimationFrame(gameLoop);
    };

    dropIntervalRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (dropIntervalRef.current) {
        cancelAnimationFrame(dropIntervalRef.current);
      }
    };
  }, [gameState.level, gameState.isPaused, gameState.gameOver, dropPiece]);

  return {
    gameState,
    togglePause,
    restartGame,
  };
};
