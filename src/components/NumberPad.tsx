interface NumberPadProps {
  onNumberClick: (num: number | null) => void;
}

export const NumberPad = ({ onNumberClick }: NumberPadProps) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-xl border-2 border-gray-700">
      <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">Numbers</p>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="bg-gray-800 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => onNumberClick(null)}
          className="bg-gray-800 hover:bg-red-600 text-white font-bold py-2 px-3 rounded col-span-5 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
