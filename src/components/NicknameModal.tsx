"use client";

import { useState } from "react";

interface NicknameModalProps {
  onSubmit: (nickname: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function NicknameModal({
  onSubmit,
  onClose,
  isLoading,
}: NicknameModalProps) {
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim().length < 2) {
      alert("닉네임은 2자 이상 입력해주세요.");
      return;
    }
    onSubmit(nickname.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm card-shadow animate-slideUp relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="닫기"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          닉네임을 입력해주세요
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          결과 화면에 표시됩니다
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 (2자 이상)"
            maxLength={20}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#1e3a5f] focus:outline-none transition-colors text-center text-lg"
            autoFocus
          />

          <button
            type="submit"
            disabled={isLoading || nickname.trim().length < 2}
            className="w-full mt-4 bg-[#1e3a5f] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#2a4a6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                처리 중...
              </span>
            ) : (
              "시작하기"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
