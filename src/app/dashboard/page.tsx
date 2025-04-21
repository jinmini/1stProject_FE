'use client';

import { useSession } from 'next-auth/react';
import Dashboard from "@/features/dashboard/compoenets";
import { useAuthRedirect } from '@/features/auth/hooks/useAuthRedirect';

export default function DashboardPage() {
  // 인증 및 역할 기반 리다이렉션 처리
  const { status, role } = useAuthRedirect();
  const { data: session } = useSession();
  
  // 로그 출력
  console.log('대시보드 페이지 - 세션 상태:', status);
  console.log('대시보드 페이지 - 사용자 역할:', role);
  
  // 로딩 중 상태 처리
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">세션 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  // 인증되지 않은 경우 (useAuthRedirect에서 이미 리다이렉션 처리함)
  if (status === 'unauthenticated') {
    return null;
  }
  
  // 관리자인 경우 (useAuthRedirect에서 이미 리다이렉션 처리함)
  if (role === 'admin') {
    return null;
  }
  
  // authenticated 및 일반 사용자/구독자인 경우에만 대시보드 렌더링
  console.log('인증된 일반 사용자: 대시보드 렌더링');
  
  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-4">사용자 대시보드</h1>
      {session?.user?.name && (
        <p className="mb-5">안녕하세요, {session.user.name}님!</p>
      )}
      <Dashboard />
    </div>
  );
} 