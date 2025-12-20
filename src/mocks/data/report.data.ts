/**
 * 리포트 관련 모킹 데이터
 */

export const mockReportList = [
  {
    contestName: "대홍제",
    title: "대홍제 출품작",
    workName: "혁신적인 브랜딩 캠페인",
    category: "브랜딩",
    brand: "샘플 브랜드",
    workMembers: ["홍길동", "김철수"],
    workId: 1,
    reportStatus: "DONE" as const,
    isDeletable: true,
    hasFeedback: false,
  },
  {
    contestName: "HSAD",
    title: "HSAD 출품작",
    workName: "디지털 마케팅 전략",
    category: "마케팅",
    brand: "샘플 브랜드 2",
    workMembers: ["이영희"],
    workId: 2,
    reportStatus: "IN_PROGRESS" as const,
    isDeletable: true,
    hasFeedback: true,
  },
  {
    contestName: "YCC",
    title: "YCC 출품작",
    workName: "소셜 임팩트 캠페인",
    category: "소셜",
    brand: "샘플 브랜드 3",
    workMembers: ["박민수", "최지영", "정수진"],
    workId: 3,
    reportStatus: "COMPLETED" as const,
    isDeletable: false,
    hasFeedback: true,
  },
];

export const mockDcaBriefEvaluation = {
  interpretation: "브리프를 잘 이해하고 있으며, 타겟 고객에 대한 인사이트가 명확합니다.",
  consistency: "브랜드 아이덴티티와 일관성 있게 표현되었습니다.",
  weakness: "미디어 선택의 근거가 다소 부족합니다.",
};

export const mockDcaEvaluation = {
  totalScore: 85,
  targetScore: 90,
  target: "타겟 고객 분석이 매우 우수합니다.",
  brandScore: 88,
  brand: "브랜드 이해도가 높습니다.",
  mediaScore: 82,
  media: "미디어 선택이 적절합니다.",
  problemScore: 85,
  problem: "문제 정의가 명확합니다.",
  feasibilityScore: 80,
  feasibility: "실현 가능성이 높습니다.",
};

export const mockYccEvaluation = {
  totalScore: 88,
  feasibilityScore: 85,
  feasibility: "실현 가능성이 매우 높습니다.",
  mediaScore: 90,
  media: "미디어 선택이 탁월합니다.",
  agendaScore: 88,
  agenda: "아젠다 선택이 적절합니다.",
  influenceScore: 87,
  influence: "영향력이 큽니다.",
  deliveryScore: 86,
  delivery: "전달력이 우수합니다.",
};

export const mockStrengths = {
  code: "TARGET_FITNESS",
  label: "타겟 적합성",
  score: 95,
  description: "타겟 고객에 대한 이해도가 매우 높고, 그들의 니즈를 정확히 파악했습니다.",
};

export const mockWeaknesses = {
  code: "MEDIA_SELECTION",
  label: "미디어 선택",
  score: 75,
  description: "미디어 선택의 근거가 다소 부족하며, 대안적 미디어 채널에 대한 고려가 필요합니다.",
};

export const mockSummary = {
  target: "20-30대 직장인",
  insight: "시간 부족으로 인한 건강 관리의 어려움",
  solution: "간편한 건강 관리 솔루션 제공",
};

export const mockShareCode = "ABC123";

