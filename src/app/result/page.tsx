"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getResultByScore, MAX_SCORE, type ResultType } from "../../data/results";
import ShareModal from "../../components/ShareModal";
import EventPopup from "../../components/EventPopup";

export default function ResultPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<ResultType | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    const storedNickname = sessionStorage.getItem("nickname");
    const storedScore = sessionStorage.getItem("totalScore");

    if (!storedNickname || !storedScore) {
      router.push("/onboarding");
      return;
    }

    setNickname(storedNickname);
    const scoreNum = parseInt(storedScore);
    setScore(scoreNum);
    setResult(getResultByScore(scoreNum));

    const popupTimer = setTimeout(() => {
      setShowEventPopup(true);
    }, 2500);

    return () => clearTimeout(popupTimer);
  }, [router]);

  const handleRetry = () => {
    sessionStorage.clear();
    router.push("/onboarding");
  };

  if (!result) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="bg-white rounded-3xl p-6 card-shadow animate-fadeIn">
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm mb-1">
            <strong className="text-[#1e3a5f]">{nickname}</strong>님의 결과
          </p>
          <h1 className="text-lg text-gray-600">지금 당신의 AI 역량이면</h1>
        </div>

        <div className="text-center mb-8 animate-slideUp">
          <div className="text-5xl mb-3">{result.emoji}</div>
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            👉 {result.title}
          </h2>
          <p className="text-gray-600">{result.summary}</p>
        </div>

        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] rounded-2xl p-4 text-center mb-6">
          <p className="text-white/70 text-sm mb-1">AI 역량 점수</p>
          <p className="text-white text-3xl font-bold">
            {score}점 <span className="text-lg font-normal">/ {MAX_SCORE}점</span>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-[#1e3a5f] mb-3">
            📋 이런 이유로 진단됐어요
          </h3>
          <ul className="space-y-2">
            {result.reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                <span className="text-[#1e3a5f] mt-0.5">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-[#1e3a5f] mb-3">
            💡 다음 단계 추천
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                <span className="text-[#1e3a5f] mt-0.5">{index + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="w-full bg-[#1e3a5f] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[#2a4a6f] transition-colors"
          >
            친구한테 공유하기
          </button>

          <button
            onClick={handleRetry}
            className="w-full bg-gray-100 text-gray-600 font-medium py-3 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            다시 테스트하기
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-white/40 text-xs">
          CREAI+IT | 연세대학교 AI 스타트업 학회
        </p>
      </div>

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}

      {showEventPopup && (
        <EventPopup onClose={() => setShowEventPopup(false)} />
      )}
    </div>
  );
}
