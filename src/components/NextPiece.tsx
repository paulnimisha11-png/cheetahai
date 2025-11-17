import { Tetromino } from '../types/tetris';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

export const NextPiece = ({ nextPiece }: NextPieceProps) => {
  if (!nextPiece) return null;

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-xl border-2 border-gray-700">
      <h3 className="text-white text-lg font-bold mb-3 text-center">Next</h3>
      <div className="flex items-center justify-center min-h-[80px]">
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 1fr)` }}>
          {nextPiece.shape.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className="w-6 h-6"
                style={{
                  backgroundColor: cell ? nextPiece.color : 'transparent',
                  boxShadow: cell ? `inset 0 0 0 1px rgba(255,255,255,0.2), 0 0 8px ${nextPiece.color}40` : 'none',
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
