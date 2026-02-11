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
    situation: "팀 프로젝트에서 대량의 데이터를 분석해야 하는 상황",
    question: "어떻게 접근하시겠어요?",
    answers: [
      { id: "1a", text: "엑셀로 하나하나 정리한다", score: 5 },
      { id: "1b", text: "ChatGPT에게 분석 방법을 물어본다", score: 10 },
      { id: "1c", text: "AI 분석 도구를 활용해 자동화된 인사이트를 추출한다", score: 15 },
    ],
  },
  {
    id: 2,
    situation: "새로운 사업 아이디어를 발표해야 하는 상황",
    question: "어떻게 준비하시겠어요?",
    answers: [
      { id: "2a", text: "혼자 브레인스토밍으로 아이디어를 구상한다", score: 5 },
      { id: "2b", text: "AI로 시장 조사 자료를 검색하고 참고한다", score: 10 },
      { id: "2c", text: "AI로 아이디어 발굴부터 사업성 검증까지 진행한다", score: 15 },
    ],
  },
  {
    id: 3,
    situation: "외국 클라이언트에게 영문 이메일을 보내야 하는 상황",
    question: "어떻게 작성하시겠어요?",
    answers: [
      { id: "3a", text: "네이버 사전으로 단어를 하나씩 찾아가며 작성한다", score: 5 },
      { id: "3b", text: "ChatGPT로 번역해서 보낸다", score: 10 },
      { id: "3c", text: "AI로 상황에 맞는 톤과 비즈니스 표현까지 최적화한다", score: 15 },
    ],
  },
  {
    id: 4,
    situation: "반복적인 업무가 매일 2시간씩 발생하는 상황",
    question: "어떻게 해결하시겠어요?",
    answers: [
      { id: "4a", text: "그냥 매일 열심히 한다 (성실함이 최고)", score: 5 },
      { id: "4b", text: "효율적인 방법을 검색해서 적용해본다", score: 10 },
      { id: "4c", text: "AI 자동화 도구로 업무를 완전히 대체한다", score: 15 },
    ],
  },
  {
    id: 5,
    situation: "모르는 분야의 지식을 빠르게 습득해야 하는 상황",
    question: "어떻게 학습하시겠어요?",
    answers: [
      { id: "5a", text: "교과서나 전문 서적을 처음부터 읽는다", score: 5 },
      { id: "5b", text: "유튜브나 블로그로 핵심만 빠르게 파악한다", score: 10 },
      { id: "5c", text: "AI에게 맞춤형 학습 커리큘럼을 만들어달라고 한다", score: 15 },
    ],
  },
  {
    id: 6,
    situation: "창업 아이디어의 MVP를 빠르게 만들어야 하는 상황",
    question: "어떻게 접근하시겠어요?",
    answers: [
      { id: "6a", text: "개발자를 구해서 외주를 맡긴다", score: 5 },
      { id: "6b", text: "노코드 툴로 직접 프로토타입을 만들어본다", score: 10 },
      { id: "6c", text: "AI 코딩 도구로 직접 제품을 개발한다", score: 15 },
    ],
  },
]

// Get question by ID (1-indexed)
export function getQuestionById(id: number): Question | undefined {
  return questions.find((q) => q.id === id)
}

// Total number of questions
export const TOTAL_QUESTIONS = questions.length
