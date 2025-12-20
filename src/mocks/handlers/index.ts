import { authHandlers } from "./auth.handlers";
import { userHandlers } from "./user.handlers";
import { reportHandlers } from "./report.handlers";
// TODO: 각 도메인별 핸들러를 import하여 통합
// import { applyHandlers } from "./apply.handlers";

/**
 * 모든 API 핸들러를 통합하여 export
 */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...reportHandlers,
  // TODO: 각 도메인별 핸들러 추가
  // ...applyHandlers,
];
