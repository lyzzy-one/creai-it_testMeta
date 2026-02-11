"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/60 text-sm font-medium">
          Q{current} / {total}
        </span>
        <span className="text-white/40 text-xs">
          {Math.round(progress)}% 완료
        </span>
      </div>

      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500 ease-out"
          style={{ width: progress + "%" }}
        />
      </div>
    </div>
  );
}
