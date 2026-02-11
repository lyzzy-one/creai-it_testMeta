"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { questions, TOTAL_QUESTIONS, type Answer } from "../../../data/questions";
import ProgressBar from "../../../components/ProgressBar";

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = parseInt(params.id as string);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions.find((q) => q.id === questionId);

  useEffect(() => {
    if (!question || questionId < 1 || questionId > TOTAL_QUESTIONS) {
      router.push("/onboarding");
    }
  }, [question, questionId, router]);

  const handleAnswerSelect = (answer: Answer) => {
    if (isAnimating) return;

    setSelectedAnswer(answer.id);
    setIsAnimating(true);

    const answersJson = sessionStorage.getItem("answers") || "{}";
    const answers = JSON.parse(answersJson);
    answers[questionId] = { id: answer.id, score: answer.score };
    sessionStorage.setItem("answers", JSON.stringify(answers));

    setTimeout(() => {
      if (questionId < TOTAL_QUESTIONS) {
        router.push("/question/" + (questionId + 1));
      } else {
        router.push("/analyzing");
      }
    }, 400);
  };

  if (!question) return null;

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <ProgressBar current={questionId} total={TOTAL_QUESTIONS} />

      <div className="flex-1 flex flex-col justify-center p-4">
        <div className="bg-white rounded-3xl p-6 card-shadow animate-fadeIn">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-[#1e3a5f]/60">
              Q{questionId}
            </span>
          </div>

          <p className="text-gray-500 text-sm text-center mb-2">
            {question.situation}
          </p>

          <h2 className="text-xl font-bold text-[#1e3a5f] text-center mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.answers.map((answer, index) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(answer)}
                disabled={isAnimating}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
                  selectedAnswer === answer.id
                    ? "bg-[#1e3a5f] text-white scale-[0.98]"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100 active:scale-[0.98]"
                } ${isAnimating && selectedAnswer !== answer.id ? "opacity-50" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium">{answer.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
        <p className="text-white/40 text-xs">
          답변을 선택하면 자동으로 다음 문항으로 넘어갑니다
        </p>
      </div>
    </div>
  );
}
