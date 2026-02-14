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

      <div className="flex-1 flex flex-col justify-center px-5 py-6">
        {/* Question Section */}
        <div className="text-center mb-8 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-white/80 text-sm font-medium mb-4">
            Q{questionId}
          </span>

          <p className="text-white/60 text-sm mb-3">
            {question.situation}
          </p>

          <h2 className="text-xl font-bold text-white leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Answer Options - Vertical List */}
        <div className="flex flex-col gap-3 animate-slideUp">
          {question.answers.map((answer, index) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer)}
              disabled={isAnimating}
              className={`w-full px-5 py-4 rounded-2xl text-left transition-all duration-200 border-2 ${
                selectedAnswer === answer.id
                  ? "bg-white text-[#1e3a5f] border-white scale-[0.98]"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
              } ${isAnimating && selectedAnswer !== answer.id ? "opacity-40" : ""}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="font-medium text-base leading-snug">{answer.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6 pt-2 text-center">
        <p className="text-white/40 text-xs">
          답변을 선택하면 자동으로 다음 문항으로 넘어갑니다
        </p>
      </div>
    </div>
  );
}
