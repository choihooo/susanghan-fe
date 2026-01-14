# 수상한 녀석들 (Susanghan FE)

광고 공모전 출품작을 AI와 전문가가 분석하여 제공하는 실전형 수상 리포트 플랫폼입니다.

## 🎯 프로젝트 소개

**수상한 녀석들**은 광고 공모전(DCA, YCC) 출품작을 AI와 전문가가 심층 분석하여 제공하는 실전형 수상 리포트 서비스입니다.

### 주요 특징

- 🎨 **공모전 출품작 제출 및 관리**: DCA, YCC 공모전 지원서 제출 및 관리
- 📊 **AI 기반 평가 리포트**: 출품작의 평가 기준, 강점/약점을 레이더 차트와 점수로 시각화
- 📈 **트렌드 분석**: 수상작 트렌드 분석 및 비교 기능
- 💬 **전문가 피드백**: 현업자의 수상작 분석 및 피드백 제공
- 🔐 **소셜 로그인**: 구글, 카카오, 네이버 OAuth 인증 지원
- 📱 **반응형 디자인**: 모바일/데스크톱 최적화

## 🛠 기술 스택

### 프레임워크 & 라이브러리

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4**

### 상태 관리 & 데이터 페칭

- **TanStack React Query 5** - 서버 상태 관리 및 캐싱
- **Zustand** - 클라이언트 상태 관리

### 폼 & 검증

- **Zod** - 스키마 기반 폼 검증
- **@use-funnel/browser** - 다단계 폼 플로우 관리

### UI/UX

- **Framer Motion** - 애니메이션
- **Lottie React** - 로딩 애니메이션
- **Recharts** - 데이터 시각화 (레이더 차트)

### 개발 도구

- **MSW (Mock Service Worker)** - API 모킹
- **ESLint** - 코드 품질 관리
- **pnpm** - 패키지 관리자

## 📁 프로젝트 구조

```
susanghan-fe/
├── src/
│   ├── app/               # Next.js App Router 페이지
│   │   ├── _apis/         # API 클라이언트 및 스키마
│   │   ├── application/   # 공모전 지원 페이지
│   │   ├── home/          # 홈/랜딩 페이지
│   │   ├── login/         # 로그인 페이지
│   │   ├── mypage/        # 마이페이지
│   │   ├── oauth/         # OAuth 콜백
│   │   ├── reports/       # 리포트 조회 페이지
│   │   └── sign-up/       # 회원가입 페이지
│   ├── components/        # 공통 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── libs/              # 라이브러리 설정
│   ├── store/             # Zustand 스토어
│   └── utils/             # 유틸리티 함수
```

## ✨ 주요 구현 내용

### 1. 인증/인가 시스템

- JWT 기반 인증 (Access Token, Refresh Token)
- Axios 인터셉터를 통한 자동 토큰 갱신 및 동시 요청 큐잉 처리
- 토큰 만료 시 자동 로그아웃 및 리다이렉션
- OAuth 소셜 로그인 (구글, 카카오, 네이버)
- `AuthGuard` 컴포넌트로 라우트 보호

### 2. 다단계 폼 플로우

- `@use-funnel/browser`를 활용한 신청서/회원가입 다단계 플로우
- URL 기반 상태 관리로 뒤로가기/새로고침 대응
- Zod 스키마를 활용한 단계별 검증

### 3. 반응형 디자인

- 커스텀 훅 `useIsMobile`로 디바이스 감지
- User Agent, 터치 디바이스, 화면 크기 종합 판단
- 디바운싱을 통한 리사이즈 이벤트 최적화

### 4. 데이터 시각화

- Recharts를 활용한 레이더 차트 구현
- DCA/YCC 대회별 평가 항목 시각화
- 반응형 차트 (모바일/데스크톱 대응)

### 5. 애니메이션

- Framer Motion을 활용한 Hero 섹션 캐러셀
- Intersection Observer를 활용한 스크롤 기반 애니메이션

### 6. 성능 최적화

- React Query 캐싱 전략으로 불필요한 네트워크 요청 감소
- Next.js App Router를 활용한 서버 사이드 렌더링
- Turbopack을 활용한 빠른 개발 빌드

---

**수상한 녀석들** - 공모전 수상의 비밀을 파헤치다 🔍
