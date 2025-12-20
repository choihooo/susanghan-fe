/**
 * MSW 초기화 유틸리티
 * 개발 환경에서만 모킹을 활성화
 */

const isDevelopment = process.env.NODE_ENV === "development";
const useMock = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const shouldEnableMocking = () => {
  return isDevelopment && useMock;
};
