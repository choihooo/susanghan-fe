import { http, HttpResponse, delay } from "msw";
import { shouldEnableMocking } from "../initMocks";
import {
  mockReportList,
  mockDcaBriefEvaluation,
  mockDcaEvaluation,
  mockYccEvaluation,
  mockStrengths,
  mockWeaknesses,
  mockSummary,
  mockShareCode,
} from "../data/report.data";

const MOCK_DELAY = Number(process.env.NEXT_PUBLIC_MOCK_DELAY) || 300;

/**
 * 리포트 관련 API 핸들러
 */
export const reportHandlers = [
  /**
   * 리포트 목록 조회
   * GET /v1/reports?page=0
   */
  http.get("/v1/reports", async ({ request }) => {
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

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const pageSize = 10;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedList = mockReportList.slice(startIndex, endIndex);

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: {
        responseList: paginatedList,
        size: paginatedList.length,
        hasNext: endIndex < mockReportList.length,
        isFirst: page === 0,
        isLast: endIndex >= mockReportList.length,
      },
    });
  }),

  /**
   * 리포트 상세 조회
   * GET /v1/reports/:workId
   */
  http.get("/v1/reports/:workId", async ({ request, params }) => {
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

    const { workId } = params as { workId: string };
    const workIdNum = Number(workId);
    const report = mockReportList.find((r) => r.workId === workIdNum);

    if (!report) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 404,
          message: "리포트를 찾을 수 없습니다.",
          result: null,
        },
        { status: 404 }
      );
    }

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: report,
    });
  }),

  /**
   * 리포트 공유
   * POST /v1/reports/:workId
   */
  http.post("/v1/reports/:workId", async ({ request, params }) => {
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

    const { workId } = params as { workId: string };
    const workIdNum = Number(workId);

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: {
        workId: workIdNum,
        link: `https://soosanghan.site/reports/${workIdNum}?code=${mockShareCode}`,
        code: mockShareCode,
      },
    });
  }),

  /**
   * 리포트 코드 인증
   * POST /v1/reports/:workId/verify-code
   */
  http.post("/v1/reports/:workId/verify-code", async ({ request, params }) => {
    if (!shouldEnableMocking()) {
      return HttpResponse.json(
        { error: "Mocking is disabled" },
        { status: 500 }
      );
    }

    const { workId } = params as { workId: string };
    const body = (await request.json().catch(() => ({}))) as {
      code?: string;
    };

    if (!body.code) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "코드를 입력해주세요.",
          result: null,
        },
        { status: 400 }
      );
    }

    // 모킹: 올바른 코드는 mockShareCode
    if (body.code !== mockShareCode) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 401,
          message: "유효하지 않은 코드입니다.",
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
      result: {
        workId: Number(workId),
      },
    });
  }),

  /**
   * 리포트 공개 설정 변경
   * PATCH /v1/reports/:workId/visibility
   */
  http.patch("/v1/reports/:workId/visibility", async ({ request, params }) => {
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
      title?: string;
    };

    if (!body.title) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "제목을 입력해주세요.",
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
      result: "리포트 공개 설정이 변경되었습니다.",
    });
  }),

  /**
   * DCA 브리프 해석 조회
   * GET /v1/personal-works/dca/:workId/brief-evaluation
   */
  http.get(
    "/v1/personal-works/dca/:workId/brief-evaluation",
    async ({ request }) => {
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

      await delay(MOCK_DELAY);
      return HttpResponse.json({
        isSuccess: true,
        code: 200,
        message: "성공",
        result: mockDcaBriefEvaluation,
      });
    }
  ),

  /**
   * DCA 전체 평가 조회
   * GET /v1/personal-works/dca/:workId/evaluation
   */
  http.get("/v1/personal-works/dca/:workId/evaluation", async ({ request }) => {
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

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: mockDcaEvaluation,
    });
  }),

  /**
   * YCC 전체 평가 조회
   * GET /v1/personal-works/ycc/:workId/evaluation
   */
  http.get("/v1/personal-works/ycc/:workId/evaluation", async ({ request }) => {
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

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: mockYccEvaluation,
    });
  }),

  /**
   * 강점 조회
   * GET /v1/personal-works/:workId/strengths
   */
  http.get("/v1/personal-works/:workId/strengths", async ({ request }) => {
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

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: mockStrengths,
    });
  }),

  /**
   * 약점 조회
   * GET /v1/personal-works/:workId/weaknesses
   */
  http.get("/v1/personal-works/:workId/weaknesses", async ({ request }) => {
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

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: mockWeaknesses,
    });
  }),

  /**
   * 요약 조회
   * GET /v1/personal-works/:workId/summary
   */
  http.get("/v1/personal-works/:workId/summary", async ({ request }) => {
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

    await delay(MOCK_DELAY);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "성공",
      result: mockSummary,
    });
  }),

  /**
   * 상세 평가 조회
   * GET /v1/personal-works/:workId/evaluation/:type
   */
  http.get(
    "/v1/personal-works/:workId/evaluation/:type",
    async ({ request, params }) => {
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

      const { type } = params as { type: string };
      const evaluationTypes = [
        "TARGET_FITNESS",
        "BRAND_UNDERSTANDING",
        "DCA_MEDIA_SELECTION",
        "PROBLEM_DEFINITION",
        "DCA_FEASIBILITY",
        "YCC_FEASIBILITY",
        "YCC_MEDIA_SELECTION",
        "AGENDA_SELECTION",
        "INFLUENCE",
        "DELIVERY",
      ];

      if (!evaluationTypes.includes(type)) {
        await delay(MOCK_DELAY);
        return HttpResponse.json(
          {
            isSuccess: false,
            code: 400,
            message: "유효하지 않은 평가 타입입니다.",
            result: null,
          },
          { status: 400 }
        );
      }

      // 타입에 따라 다른 평가 데이터 반환 (간단한 모킹)
      const mockDetailEvaluation = {
        code: type,
        label: type.replace(/_/g, " "),
        score: 85,
        description: `${type}에 대한 상세 평가입니다.`,
      };

      await delay(MOCK_DELAY);
      return HttpResponse.json({
        isSuccess: true,
        message: "성공",
        result: {
          detailEvaluations: mockDetailEvaluation,
        },
      });
    }
  ),

  /**
   * 피드백 제출
   * POST /v1/feedback/:workId
   */
  http.post("/v1/feedback/:workId", async ({ request, params }) => {
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
      score?: number;
      content?: string;
    };

    if (!body.score || body.score < 1 || body.score > 5) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "점수는 1~5 사이여야 합니다.",
          result: null,
        },
        { status: 400 }
      );
    }

    if (!body.content || body.content.trim() === "") {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "피드백 내용을 입력해주세요.",
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
    });
  }),
];
