// Questions and scoring data for the AI Skill Test
// Each question has 3 options: A (5 points), B (10 points), C (15 points)

export interface Answer {
  id: string
  text: string
  score: number
}

export interface Question {
  id: number
  situation: string
  question: string
  answers: Answer[]
}

export const questions: Question[] = [
  {
    id: 1,
    situation: "팀플을 할 때",
    question: "AI를 주로 어디에 쓰나요?",
    answers: [
      { id: "1a", text: "자료 리서치", score: 5 },
      { id: "1b", text: "계획 세우기", score: 10 },
      { id: "1c", text: "회의록 작성", score: 15 },
    ],
  },
  {
    id: 2,
    situation: "AI 툴 사용에 대해",
    question: "내가 가장 많이 쓰는 AI툴은?",
    answers: [
      { id: "2a", text: "ChatGPT", score: 5 },
      { id: "2b", text: "Gemini", score: 10 },
      { id: "2c", text: "Claude", score: 15 },
    ],
  },
  {
    id: 3,
    situation: "AI 활용 상황에 대해",
    question: "나에게 AI가 필수적인 상황은?",
    answers: [
      { id: "3a", text: "교수님한테 메일 보내기", score: 5 },
      { id: "3b", text: "자료 조사", score: 10 },
      { id: "3c", text: "자소서 쓰기", score: 15 },
    ],
  },
  {
    id: 4,
    situation: "AI에 대한 생각",
    question: "나에게 AI는 어떤 존재인가요?",
    answers: [
      { id: "4a", text: "문제 해결사", score: 5 },
      { id: "4b", text: "심리상담가", score: 10 },
      { id: "4c", text: "나만의 비서", score: 15 },
    ],
  },
  {
    id: 5,
    situation: "문제 상황이 발생했을 때",
    question: "AI를 사용하시겠어요?",
    answers: [
      { id: "5a", text: "AI는 못 쓰겠다", score: 5 },
      { id: "5b", text: "상황 봐서 쓴다", score: 10 },
      { id: "5c", text: "일단 AI 써서라도 해결한다", score: 15 },
    ],
  },
  {
    id: 6,
    situation: "AI 활용 경험에 대해",
    question: "AI로 만들어 본 경험이 있나요?",
    answers: [
      { id: "6a", text: "아직 채팅뿐", score: 5 },
      { id: "6b", text: "시각 자료 제작", score: 10 },
      { id: "6c", text: "수익화된 프로젝트", score: 15 },
    ],
  },
]

// Get question by ID (1-indexed)
export function getQuestionById(id: number): Question | undefined {
  return questions.find((q) => q.id === id)
}

// Total number of questions
export const TOTAL_QUESTIONS = questions.length
