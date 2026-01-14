import { http, HttpResponse, delay } from "msw";
import { mockTokens, mockUser } from "../data/auth.data";
import { shouldEnableMocking } from "../initMocks";

const MOCK_DELAY = Number(process.env.NEXT_PUBLIC_MOCK_DELAY) || 300;

/**
 * 인증 관련 API 핸들러
 */
export const authHandlers = [
  /**
   * OAuth 코드를 토큰으로 교환
   * GET /v1/auth/exchange?code=xxx
   */
  http.get("/v1/auth/exchange", async ({ request }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    // 코드가 없으면 에러 반환
    if (!code) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "코드가 필요합니다.",
          result: null,
        },
        { status: 400 }
      );
    }

    // 성공 응답
    await delay(MOCK_DELAY);
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

  /**
   * 토큰 갱신
   * POST /v1/auth/refresh-token
   */
  http.post("/v1/auth/refresh-token", async ({ request }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { refreshToken: requestRefreshToken } = body as {
      refreshToken?: string;
    };

    // refreshToken이 없거나 유효하지 않으면 에러 반환
    if (
      !requestRefreshToken ||
      requestRefreshToken !== mockTokens.refreshToken
    ) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 401,
          message: "유효하지 않은 refresh token입니다.",
          result: null,
        },
        { status: 401 }
      );
    }

    // 새로운 토큰 생성 (실제로는 서버에서 생성)
    const newAccessToken = `mock-access-token-${Date.now()}`;
    const newRefreshToken = `mock-refresh-token-${Date.now()}`;

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  }),

  /**
   * 로그아웃
   * POST /v1/auth/logout
   */
  http.post("/v1/auth/logout", async () => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: "로그아웃되었습니다.",
    });
  }),
];
