"use client";

import { useEffect, useState } from "react";
import { shouldEnableMocking } from "@/mocks/initMocks";

/**
 * MSW Provider 컴포넌트
 * 브라우저 환경에서 MSW를 초기화합니다.
 */
export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMsw = async () => {
      if (!shouldEnableMocking()) {
        setMswReady(true);
        return;
      }

      const { worker } = await import("@/mocks/browser");
      await worker.start({
        onUnhandledRequest: "bypass", // 모킹되지 않은 요청은 그대로 통과
      });
      setMswReady(true);
    };

    initMsw();
  }, []);

  if (!mswReady) {
    return null; // 또는 로딩 스피너
  }

  return <>{children}</>;
}
