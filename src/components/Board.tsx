import { Board as BoardType, Tetromino } from '../types/tetris';

interface BoardProps {
  board: BoardType;
  currentPiece: Tetromino | null;
}

export const Board = ({ board, currentPiece }: BoardProps) => {
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);

    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  const displayBoard = renderBoard();

  return (
    <div className="inline-block bg-gray-900 p-2 rounded-lg shadow-2xl border-4 border-gray-700">
      <div className="grid gap-[1px] bg-gray-800" style={{ gridTemplateColumns: `repeat(10, 1fr)` }}>
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="w-7 h-7 transition-all duration-100"
              style={{
                backgroundColor: cell || '#1a1a2e',
                boxShadow: cell
                  ? `inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 8px ${cell}40`
                  : 'inset 0 0 0 1px rgba(255,255,255,0.03)',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
