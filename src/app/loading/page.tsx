"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Calculate score and save result after loading animation
    const timer = setTimeout(async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const answersJson = sessionStorage.getItem("answers") || "{}";
        const answers = JSON.parse(answersJson);

        // Calculate total score
        let totalScore = 0;
        Object.values(answers).forEach((answer: unknown) => {
          const typedAnswer = answer as { score: number };
          totalScore += typedAnswer.score;
        });

        // Save result to database
        const response = await fetch("/api/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, score: totalScore, answers }),
        });

        if (!response.ok) throw new Error("Failed to save result");

        const { resultId } = await response.json();
        sessionStorage.setItem("resultId", resultId);
        sessionStorage.setItem("totalScore", totalScore.toString());

        // Navigate to result page
        router.push("/result");
      } catch (error) {
        console.error("Error saving result:", error);
        // Still navigate to result even if save fails
        router.push("/result");
      }
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6">
      {/* Loading animation */}
      <div className="text-center animate-fadeIn">
        {/* Spinner */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <h2 className="text-xl font-bold text-white mb-2">결과 분석 중…</h2>

        {/* Progress bar */}
        <div className="w-48 mx-auto h-1 bg-white/20 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CREAI+IT intro card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm animate-slideUp">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🚀</span>
          <span className="text-white font-bold text-lg">CREAI+IT</span>
        </div>

        {/* Description */}
        <p className="text-white/80 text-sm text-center leading-relaxed mb-4">
          CREAI+IT는 <strong className="text-white">연세대학교 유일 AI 스타트업 학회</strong>입니다.
          <br />
          매년 <strong className="text-white">5개 이상의 AI 스타트업</strong>이 배출되고 있어요.
        </p>

        {/* CTA button */}
        <a
          href="https://www.instagram.com/yonsei_creai_it/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-xl text-center transition-colors"
        >
          CREAI+IT 더 알아보기 →
        </a>
      </div>
    </div>
  );
}
