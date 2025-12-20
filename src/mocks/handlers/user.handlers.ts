import { http, HttpResponse, delay } from "msw";
import { mockUserProfile } from "../data/user.data";
import { shouldEnableMocking } from "../initMocks";

const MOCK_DELAY = Number(process.env.NEXT_PUBLIC_MOCK_DELAY) || 300;

/**
 * 사용자 관련 API 핸들러
 */
export const userHandlers = [
  /**
   * 이용 약관 동의
   * POST /v1/user/agreement
   */
  http.post("/v1/user/agreement", async ({ request }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      isServiceAgreement?: boolean;
      isUserInfoAgreement?: boolean;
      isMarketingAgreement?: boolean;
    };

    // 필수 약관 동의 확인
    if (!body.isServiceAgreement || !body.isUserInfoAgreement) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "필수 약관에 동의해주세요.",
          result: null,
        },
        { status: 400 }
      );
    }

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: "약관 동의가 완료되었습니다.",
    });
  }),

  /**
   * 사용자 온보딩
   * POST /v1/user/onboarding
   */
  http.post("/v1/user/onboarding", async ({ request }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      name?: string;
      role?: string[];
      purpose?: string;
      purposeEtc?: string;
      channel?: string;
      channelEtc?: string;
    };

    // 필수 필드 검증
    if (!body.name || !body.role || !body.purpose || !body.channel) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "필수 정보를 모두 입력해주세요.",
          result: null,
        },
        { status: 400 }
      );
    }

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: "온보딩이 완료되었습니다.",
    });
  }),

  /**
   * 사용자 정보 조회
   * GET /v1/user/me
   */
  http.get("/v1/user/me", async ({ request }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    // Authorization 헤더 확인 (선택적)
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 401,
          message: "인증이 필요합니다.",
          result: null,
        },
        { status: 401 }
      );
    }

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: mockUserProfile,
    });
  }),

  /**
   * 사용자 프로필 업데이트
   * PATCH /v1/user/me
   */
  http.patch("/v1/user/me", async ({ request }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 401,
          message: "인증이 필요합니다.",
          result: null,
        },
        { status: 401 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      name?: string;
    };

    if (!body.name || body.name.trim() === "") {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "이름을 입력해주세요.",
          result: null,
        },
        { status: 400 }
      );
    }

    // 업데이트된 프로필 반환
    const updatedProfile = {
      ...mockUserProfile,
      name: body.name,
    };

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: updatedProfile,
    });
  }),

  /**
   * 사용자 탈퇴
   * DELETE /v1/user/me/withdrawal
   */
  http.delete("/v1/user/me/withdrawal", async ({ request }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 401,
          message: "인증이 필요합니다.",
          result: null,
        },
        { status: 401 }
      );
    }

    // DELETE 요청의 body는 request.json()으로 읽을 수 있음
    const body = (await request.json().catch(() => ({}))) as {
      withdrawalReasons?: string[];
      etc?: string;
    };

    if (!body.withdrawalReasons || body.withdrawalReasons.length === 0) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "탈퇴 사유를 선택해주세요.",
          result: null,
        },
        { status: 400 }
      );
    }

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: "탈퇴가 완료되었습니다.",
    });
  }),
];

