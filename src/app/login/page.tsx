"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Google, KaKao, Naver } from "../../../public";
import ToolTip from "./_components/Tooltip";
import Header from "@/components/common/Header";
import { exchangeCodeForToken } from "@/app/_apis/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

const Page = () => {
  const router = useRouter();
  const [lastProvider, setLastProvider] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLastProvider(localStorage.getItem("socialLogin"));
    }
  }, []);

  const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  // 개발 환경에서 모킹 API를 사용한 테스트 로그인
  const handleMockLogin = async () => {
    try {
      const result = await exchangeCodeForToken("mock-code-123");
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", String(result.userId));
      localStorage.setItem("name", result.name);
      localStorage.setItem("profileImage", result.profileImage);
      localStorage.setItem("socialLogin", result.socialLogin);
      router.replace(result.isOnboarded ? "/home" : "/sign-up");
    } catch (error) {
      alert("모킹 로그인에 실패했습니다.");
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white w-full max-w-[434px] rounded-[20px] px-[47px] py-10 sm:px-[47px] sm:py-[52px] flex flex-col gap-[15px]">
          <p className="text-gray-900 font-T01-SB mb-5"> 로그인 </p>

          {/* 카카오 */}
          <div
            className="relative group flex py-3 w-full items-center justify-between rounded-[10px] bg-[#FEE500] cursor-pointer"
            onClick={() => {
              window.location.href = `${BACKEND_URL}/oauth2/authorization/kakao`;
            }}
          >
            {lastProvider === "KAKAO" && showTooltip && (
              <div className="absolute -top-[44px] right-0 group-hover:block z-10">
                <ToolTip
                  text="마지막으로 로그인한 계정이에요"
                  onClose={onClose}
                />
              </div>
            )}
            <div className="absolute left-5">
              <KaKao />
            </div>
            <div className="text-black/85 text-center font-B02-M w-full">
              카카오 로그인
            </div>
          </div>

          {/* 구글 */}
          <div
            className="relative group flex py-3 w-full items-center justify-between rounded-[10px] bg-[#FFF] border border-[#E7E7E7] cursor-pointer"
            onClick={() => {
              window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
            }}
          >
            {lastProvider === "GOOGLE" && showTooltip && (
              <div className="absolute -top-[44px] right-0 group-hover:block z-10">
                <ToolTip
                  text="마지막으로 로그인한 계정이에요"
                  onClose={onClose}
                />
              </div>
            )}
            <div className="absolute left-4">
              <Google />
            </div>
            <div className="text-black/85 text-center font-B02-M w-full">
              구글 로그인
            </div>
          </div>

          {/* 네이버 */}
          <div
            className="relative group flex py-3 w-full items-center justify-between rounded-[10px] bg-[#03C75A] cursor-pointer"
            onClick={() => {
              window.location.href = `${BACKEND_URL}/oauth2/authorization/naver`;
            }}
          >
            {lastProvider === "NAVER" && showTooltip && (
              <div className="absolute -top-[44px] right-0 group-hover:block z-10">
                <ToolTip
                  text="마지막으로 로그인한 계정이에요"
                  onClose={onClose}
                />
              </div>
            )}
            <div className="absolute left-5">
              <Naver />
            </div>
            <div className="text-white text-center font-B02-M w-full">
              네이버 로그인
            </div>
          </div>

          {/* 개발 환경 모킹 로그인 (MSW 활성화 시에만 표시) */}
          {USE_MOCK_API && process.env.NODE_ENV === "development" && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div
                className="relative group flex py-3 w-full items-center justify-between rounded-[10px] bg-gray-800 cursor-pointer"
                onClick={handleMockLogin}
              >
                <div className="text-white text-center font-B02-M w-full">
                  🧪 개발용 모킹 로그인 (MSW)
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                MSW 모킹 API를 사용하여 로그인합니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
