"use client";

interface ShareModalProps {
  onClose: () => void;
}

export default function ShareModal({ onClose }: ShareModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 w-full max-w-sm card-shadow animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="text-center mb-4">
          <span className="text-4xl">📸</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          공유하는 방법
        </h2>

        <div className="space-y-4 mt-6">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <p className="text-gray-600 text-sm pt-1">
              이 결과 화면을 <strong>캡처</strong>해주세요
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <p className="text-gray-600 text-sm pt-1">
              인스타그램 <strong>스토리</strong>에 올려주세요
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              3
            </div>
            <p className="text-gray-600 text-sm pt-1">
              <strong>@yonsei_creai_it</strong> 멘션해주세요
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gray-100 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs mb-1">멘션 계정</p>
          <p className="text-[#1e3a5f] font-bold">@yonsei_creai_it</p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#1e3a5f] text-white font-bold py-4 rounded-xl hover:bg-[#2a4a6f] transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}
