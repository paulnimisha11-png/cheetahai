interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

export const ScoreBoard = ({ score, level, lines }: ScoreBoardProps) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-xl border-2 border-gray-700 space-y-4">
      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider">Score</p>
        <p className="text-white text-3xl font-bold">{score}</p>
      </div>
      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider">Level</p>
        <p className="text-white text-2xl font-bold">{level}</p>
      </div>
      <div>
        <p className="text-gray-400 text-sm uppercase tracking-wider">Lines</p>
        <p className="text-white text-2xl font-bold">{lines}</p>
      </div>
    </div>
  );
};
