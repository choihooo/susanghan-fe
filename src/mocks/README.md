# MSW 모킹 가이드

## 개요

이 프로젝트는 MSW (Mock Service Worker)를 사용하여 API를 모킹합니다.

## 설정

### 1. 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 추가하세요:

```env
# API 모킹 활성화 (개발 환경에서만 사용)
NEXT_PUBLIC_USE_MOCK_API=true

# 모킹 응답 지연 시간 (ms) - 선택사항
NEXT_PUBLIC_MOCK_DELAY=300
```

### 2. 모킹 활성화

- `NEXT_PUBLIC_USE_MOCK_API=true`로 설정하면 모킹이 활성화됩니다.
- 개발 환경(`NODE_ENV=development`)에서만 동작합니다.

## 프로젝트 구조

```
src/mocks/
├── browser.ts              # 브라우저 환경 MSW 초기화
├── server.ts              # 서버 환경 MSW 초기화 (향후 사용)
├── initMocks.ts           # 모킹 활성화 여부 확인 유틸리티
├── handlers/
│   ├── index.ts           # 모든 핸들러 통합
│   ├── auth.handlers.ts   # 인증 API 핸들러 (예정)
│   ├── user.handlers.ts   # 사용자 API 핸들러 (예정)
│   ├── report.handlers.ts # 리포트 API 핸들러 (예정)
│   └── apply.handlers.ts  # 지원서 API 핸들러 (예정)
└── data/
    ├── auth.data.ts       # 인증 모킹 데이터
    ├── user.data.ts       # 사용자 모킹 데이터
    ├── report.data.ts     # 리포트 모킹 데이터
    └── apply.data.ts      # 지원서 모킹 데이터
```

## 핸들러 추가 방법

1. `src/mocks/handlers/` 디렉토리에 새로운 핸들러 파일 생성
2. MSW의 `http` 헬퍼를 사용하여 핸들러 작성
3. `src/mocks/handlers/index.ts`에서 핸들러를 import하여 통합

### 예시

```typescript
// src/mocks/handlers/auth.handlers.ts
import { http, HttpResponse } from "msw";
import { mockTokens, mockUser } from "../data/auth.data";

export const authHandlers = [
  http.get("/v1/auth/exchange", () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: {
        ...mockUser,
        ...mockTokens,
      },
    });
  }),
];
```

```typescript
// src/mocks/handlers/index.ts
import { authHandlers } from "./auth.handlers";

export const handlers = [...authHandlers];
```

## 사용 방법

1. 개발 서버 실행: `pnpm dev`
2. 브라우저에서 개발자 도구 열기
3. Network 탭에서 모킹된 요청 확인

## 주의사항

- 모킹은 개발 환경에서만 사용하세요.
- 프로덕션 빌드에는 모킹이 포함되지 않습니다.
- 모킹되지 않은 요청은 그대로 실제 API로 전달됩니다 (`onUnhandledRequest: "bypass"`).
