'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';

/**
 * 사용자 역할(role)에 따라 적절한 대시보드로 리다이렉션하는 커스텀 훅
 * 
 * - admin: /admin/dashboard
 * - user/subscriber: /dashboard
 * - 인증되지 않음: /auth/login
 */
export const useAuthRedirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { role } = useAuthStore();

  useEffect(() => {
    // 세션이 로딩 중이면 아무것도 하지 않음
    if (status === 'loading') {
      console.log('useAuthRedirect - 세션 로딩 중...');
      return;
    }

    // 세션이 없으면 로그인 페이지로 리다이렉션
    if (status === 'unauthenticated') {
      console.log('useAuthRedirect - 인증되지 않음: 로그인 페이지로 이동');
      router.replace('/auth/login');
      return;
    }

    // 인증된 경우, 역할에 따라 적절한 대시보드로 리다이렉션
    if (status === 'authenticated') {
      const userRole = session?.user?.role || role || 'user';
      console.log('useAuthRedirect - 인증됨: 사용자 역할', userRole);

      if (userRole === 'admin') {
        console.log('useAuthRedirect - 관리자 역할: 관리자 대시보드로 이동');
        router.replace('/admin/dashboard');
      } else {
        // user 또는 subscriber 역할
        console.log('useAuthRedirect - 일반/구독자 역할: 일반 대시보드로 이동');
        router.replace('/dashboard');
      }
    }
  }, [status, session, role, router]);

  return { status, role: session?.user?.role || role };
}; 