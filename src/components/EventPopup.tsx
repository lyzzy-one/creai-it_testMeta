"use client";

import { useState } from "react";

interface EventPopupProps {
  onClose: () => void;
}

export default function EventPopup({ onClose }: EventPopupProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.length < 10 || cleanNumber.length > 11) {
      alert("올바른 전화번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await fetch("/api/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: cleanNumber }),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error saving phone:", error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      if (value.length <= 3) {
        setPhoneNumber(value);
      } else if (value.length <= 7) {
        setPhoneNumber(value.slice(0, 3) + "-" + value.slice(3));
      } else {
        setPhoneNumber(value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7));
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-end justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl rounded-b-xl p-6 w-full max-w-sm card-shadow animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="닫기"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">☕</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
              🎁 이벤트 참여하기
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              AI 역량 테스트 공유하면<br />
              <strong className="text-[#1e3a5f]">스타벅스 3만원권</strong> 추첨!
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="전화번호 (010-0000-0000)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#1e3a5f] focus:outline-none transition-colors text-center text-lg"
                autoFocus
              />

              <button
                type="submit"
                disabled={isLoading || phoneNumber.length < 12}
                className="w-full mt-4 bg-[#1e3a5f] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#2a4a6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    제출 중...
                  </span>
                ) : (
                  "이벤트 참여하기"
                )}
              </button>
            </form>

            <p className="text-gray-400 text-xs text-center mt-4">
              당첨자 발표: 인스타그램 @yonsei_creai_it
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              이벤트 참여 완료!
            </h2>
            <p className="text-gray-500 text-sm">
              당첨 결과는 인스타그램에서 발표됩니다
            </p>

            <button
              onClick={onClose}
              className="w-full mt-6 bg-[#1e3a5f] text-white font-bold py-4 rounded-xl hover:bg-[#2a4a6f] transition-colors"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
