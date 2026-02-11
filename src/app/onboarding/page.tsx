"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NicknameModal from "../../components/NicknameModal";

export default function OnboardingPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mocked participant count
  const participantCount = 3670;

  const handleStart = () => {
    setShowModal(true);
  };

  const handleNicknameSubmit = async (nickname: string) => {
    setIsLoading(true);
    try {
      // Create user in database
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) throw new Error("Failed to create user");

      const { userId } = await response.json();

      // Store userId in sessionStorage for later use
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("nickname", nickname);
      sessionStorage.setItem("answers", JSON.stringify({}));

      // Navigate to first question
      router.push("/question/1");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6">
      {/* Main content */}
      <div className="text-center animate-fadeIn">
        {/* Logo placeholder */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          내 AI 역량으로<br />어디까지 가능할까?
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-sm mb-2">
          AI 회사 인턴? CEO? 내 유형은?
        </p>

        {/* Test info */}
        <div className="flex items-center justify-center gap-3 text-white/60 text-sm mb-8">
          <span>6문항</span>
          <span className="w-1 h-1 bg-white/40 rounded-full"></span>
          <span>30초</span>
        </div>

        {/* Participant count */}
        <div className="bg-white/10 rounded-full px-4 py-2 inline-flex items-center gap-2 mb-10">
          <span className="text-white/80 text-sm">
            🔥 <strong className="text-white">{participantCount.toLocaleString()}명</strong>이 참여했어요
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStart}
          className="w-full max-w-xs bg-white text-[#1e3a5f] font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200"
        >
          내 유형 확인하기
        </button>

        {/* Footer */}
        <p className="mt-8 text-white/40 text-xs">
          CREAI+IT | 연세대학교 AI 스타트업 학회
        </p>
      </div>

      {/* Nickname Modal */}
      {showModal && (
        <NicknameModal
          onSubmit={handleNicknameSubmit}
          onClose={() => setShowModal(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
