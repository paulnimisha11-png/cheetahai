import { ArrowLeft, ArrowRight, ArrowDown, RotateCw, Pause, Play } from 'lucide-react';

interface ControlsProps {
  isPaused: boolean;
  onPause: () => void;
}

export const Controls = ({ isPaused, onPause }: ControlsProps) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-xl border-2 border-gray-700">
      <h3 className="text-white text-lg font-bold mb-3">Controls</h3>
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Move Left</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          <span>Move Right</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowDown className="w-4 h-4" />
          <span>Soft Drop</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCw className="w-4 h-4" />
          <span>Rotate (↑ / Space)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 flex items-center justify-center text-xs font-bold border border-gray-500 rounded">P</span>
          <span>Pause</span>
        </div>
      </div>
      <button
        onClick={onPause}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
};
