# AI 역량 테스트 | CREAI+IT

대학생 대상 AI 역량 테스트 웹사이트입니다.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL (Neon)
- Prisma ORM

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 `.env`로 복사하고 Neon 데이터베이스 URL을 입력하세요:

```bash
cp .env.example .env
```

```
DATABASE_URL="postgresql://user:password@your-neon-host.neon.tech/neondb?sslmode=require"
```

### 3. 데이터베이스 설정

```bash
npm run db:push
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/           # API 라우트
│   │   ├── user/      # 사용자 생성
│   │   ├── result/    # 결과 저장
│   │   └── phone/     # 전화번호 저장 (이벤트)
│   ├── onboarding/    # 온보딩 페이지
│   ├── question/[id]/ # 질문 페이지 (Q1-Q6)
│   ├── analyzing/     # 로딩/분석 페이지
│   └── result/        # 결과 페이지
├── components/        # 재사용 컴포넌트
├── data/              # 질문 및 결과 데이터
└── lib/               # 유틸리티 (Prisma 클라이언트)
```

## 사용자 흐름

1. `/onboarding` - 테스트 소개 및 닉네임 입력
2. `/question/1~6` - 6개의 상황형 질문
3. `/analyzing` - 결과 분석 로딩
4. `/result` - 결과 확인 및 공유

## 점수 체계

- 각 질문당 3개 선택지 (5점, 10점, 15점)
- 총점: 30~90점
- 6개 결과 유형으로 분류

## Vercel 배포

1. Vercel에 프로젝트 연결
2. 환경 변수에 `DATABASE_URL` 추가
3. 자동 배포

## 라이선스

CREAI+IT - 연세대학교 AI 스타트업 학회
