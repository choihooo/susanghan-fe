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
];

