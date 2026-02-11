// Result types and scoring logic for the AI Skill Test

export interface ResultType {
  id: string
  minScore: number
  maxScore: number
  title: string
  emoji: string
  summary: string
  reasons: string[]
  recommendations: string[]
}

// Score ranges: 0-20, 21-35, 36-50, 51-65, 66-80, 81-90
export const resultTypes: ResultType[] = [
  {
    id: "prehistoric",
    minScore: 0,
    maxScore: 20,
    title: "구석기 시대 사람",
    emoji: "🪨",
    summary: "AI 시대가 온 줄 모르고 있었네요!",
    reasons: [
      "대부분의 업무를 수동으로 처리하는 습관",
      "AI 도구 활용 경험이 적음",
      "디지털 도구보다 아날로그 방식 선호",
    ],
    recommendations: [
      "ChatGPT 무료 버전부터 시작해보세요",
      "간단한 번역이나 요약 작업에 AI를 활용해보세요",
      "CREAI+IT에서 AI 기초 교육을 받아보세요",
    ],
  },
  {
    id: "learner",
    minScore: 21,
    maxScore: 35,
    title: "AI 활용법 배우는 대학생",
    emoji: "📚",
    summary: "AI에 관심은 있지만 아직 초보 단계예요",
    reasons: [
      "AI 도구를 가끔 사용하지만 깊이가 부족",
      "기본적인 검색과 번역 위주로 활용",
      "AI의 잠재력을 아직 완전히 이해하지 못함",
    ],
    recommendations: [
      "다양한 AI 도구(Midjourney, Notion AI 등)를 체험해보세요",
      "프롬프트 엔지니어링 기초를 학습하세요",
      "CREAI+IT 스터디에 참여해 실전 경험을 쌓으세요",
    ],
  },
  {
    id: "intern",
    minScore: 36,
    maxScore: 50,
    title: "당장 AI 회사 인턴 가능",
    emoji: "💼",
    summary: "AI 활용 능력이 실무 수준에 도달했어요!",
    reasons: [
      "AI 도구를 업무에 적극적으로 활용",
      "효율성을 높이기 위한 시도를 함",
      "기본적인 자동화 개념 이해",
    ],
    recommendations: [
      "AI 스타트업 인턴십에 도전해보세요",
      "개인 프로젝트에 AI를 적용해 포트폴리오를 만드세요",
      "CREAI+IT 프로젝트에 참여해 실전 경험을 쌓으세요",
    ],
  },
  {
    id: "pm",
    minScore: 51,
    maxScore: 65,
    title: "AI 실무자 / AI PM 레벨",
    emoji: "🎯",
    summary: "AI를 전략적으로 활용하는 실무 역량을 갖췄어요!",
    reasons: [
      "AI를 문제 해결의 핵심 도구로 인식",
      "다양한 AI 도구를 상황에 맞게 선택 활용",
      "팀 단위 업무에 AI 도입 가능",
    ],
    recommendations: [
      "AI PM 또는 AI 기획자 역할에 도전해보세요",
      "AI 도구 선정 및 도입 프로젝트를 리드해보세요",
      "CREAI+IT에서 AI 프로덕트 개발 경험을 쌓으세요",
    ],
  },
  {
    id: "builder",
    minScore: 66,
    maxScore: 80,
    title: "AI 자동화 / 빌더형 인간",
    emoji: "🔧",
    summary: "AI로 시스템을 구축하고 자동화하는 능력이 있어요!",
    reasons: [
      "반복 업무를 AI로 자동화하는 습관",
      "노코드/로우코드 도구 활용 능력",
      "문제를 보면 자동화 솔루션을 먼저 떠올림",
    ],
    recommendations: [
      "AI 기반 SaaS나 자동화 솔루션을 직접 만들어보세요",
      "스타트업에서 AI 엔지니어 역할에 도전해보세요",
      "CREAI+IT에서 AI 스타트업 창업에 도전해보세요",
    ],
  },
  {
    id: "ceo",
    minScore: 81,
    maxScore: 90,
    title: "AI 스타트업 CEO / 구글 CTO 사고방식",
    emoji: "🚀",
    summary: "AI 시대의 리더가 될 준비가 완료됐어요!",
    reasons: [
      "AI를 비즈니스 전략의 핵심으로 활용",
      "AI로 제품을 직접 만들 수 있는 역량",
      "AI 트렌드를 파악하고 기회를 포착하는 안목",
    ],
    recommendations: [
      "지금 바로 AI 스타트업을 창업해보세요",
      "AI 분야 투자자들과 네트워킹을 시작하세요",
      "CREAI+IT에서 AI 스타트업 CEO로 성장하세요",
    ],
  },
]

// Get result type based on score
export function getResultByScore(score: number): ResultType {
  const result = resultTypes.find(
    (r) => score >= r.minScore && score <= r.maxScore
  )
  // Fallback to highest result if score exceeds max (shouldn't happen)
  return result || resultTypes[resultTypes.length - 1]
}

// Maximum possible score (6 questions * 15 points each = 90)
export const MAX_SCORE = 90
