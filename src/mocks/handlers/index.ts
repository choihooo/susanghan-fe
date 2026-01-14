import { authHandlers } from "./auth.handlers";
import { userHandlers } from "./user.handlers";
import { reportHandlers } from "./report.handlers";
import { applyHandlers } from "./apply.handlers";

/**
 * 모든 API 핸들러를 통합하여 export
 */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...reportHandlers,
  ...applyHandlers,
];
