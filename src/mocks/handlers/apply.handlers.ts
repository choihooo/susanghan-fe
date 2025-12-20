import { http, HttpResponse, delay } from "msw";
import { shouldEnableMocking } from "../initMocks";

const MOCK_DELAY = Number(process.env.NEXT_PUBLIC_MOCK_DELAY) || 300;

/**
 * 지원서 관련 API 핸들러
 */
export const applyHandlers = [
  /**
   * DCA 지원서 제출
   * POST /v1/works/dca
   */
  http.post("/v1/works/dca", async ({ request }) => {
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

    try {
      // FormData 파싱
      const formData = await request.formData();
      
      // 필수 필드 검증
      const title = formData.get("title") as string;
      const number = formData.get("number") as string;
      const category = formData.get("category") as string;
      const brand = formData.get("brand") as string;
      const briefBoardFile = formData.get("briefBoardFile") as File | null;

      if (!title || !number || !category || !brand) {
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

      if (!briefBoardFile || briefBoardFile.size === 0) {
        await delay(MOCK_DELAY);
        return HttpResponse.json(
          {
            isSuccess: false,
            code: 400,
            message: "브리프 보드 파일을 업로드해주세요.",
            result: null,
          },
          { status: 400 }
        );
      }

      // 파일 크기 검증 (예: 10MB 제한)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (briefBoardFile.size > MAX_FILE_SIZE) {
        await delay(MOCK_DELAY);
        return HttpResponse.json(
          {
            isSuccess: false,
            code: 400,
            message: "파일 크기는 10MB를 초과할 수 없습니다.",
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
        result: "DCA 지원서가 제출되었습니다.",
      });
    } catch (error) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "지원서 제출에 실패했습니다.",
          result: null,
        },
        { status: 400 }
      );
    }
  }),

  /**
   * YCC 지원서 제출
   * POST /v1/works/ycc
   */
  http.post("/v1/works/ycc", async ({ request }) => {
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

    try {
      // FormData 파싱
      const formData = await request.formData();
      
      // 필수 필드 검증
      const title = formData.get("title") as string;
      const planFile = formData.get("planFile") as File | null;

      if (!title) {
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

      if (!planFile || planFile.size === 0) {
        await delay(MOCK_DELAY);
        return HttpResponse.json(
          {
            isSuccess: false,
            code: 400,
            message: "계획서 파일을 업로드해주세요.",
            result: null,
          },
          { status: 400 }
        );
      }

      // 파일 크기 검증 (예: 10MB 제한)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (planFile.size > MAX_FILE_SIZE) {
        await delay(MOCK_DELAY);
        return HttpResponse.json(
          {
            isSuccess: false,
            code: 400,
            message: "파일 크기는 10MB를 초과할 수 없습니다.",
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
        result: "YCC 지원서가 제출되었습니다.",
      });
    } catch (error) {
      await delay(MOCK_DELAY);
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "지원서 제출에 실패했습니다.",
          result: null,
        },
        { status: 400 }
      );
    }
  }),
];

