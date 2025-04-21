'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';

/**
 * NextAuth 세션과 Zustand 전역 상태(useAuthStore)를 동기화하는 커스텀 훅
 * 로그인 상태가 변경될 때마다 자동으로 스토어를 업데이트
 */
export const useAuthSession = () => {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore(state => state.setAuth);
  const resetAuth = useAuthStore(state => state.resetAuth);

  useEffect(() => {
    console.log('useAuthSession - 세션 상태 변경:', status);
    
    // 세션이 인증되면 Zustand 스토어에 사용자 정보 설정
    if (status === 'authenticated' && session?.user) {
      console.log('useAuthSession - 인증된 사용자 정보:', {
        email: session.user.email,
        name: session.user.name, 
        role: session.user.role,
        accessToken: session.accessToken ? '존재함' : '없음'
      });
      
      // setTimeout 제거하여 지연 없이 바로 상태 업데이트
      setAuth({
        userId: session.user.email || '',
        name: session.user.name || '',
        email: session.user.email || '',
        role: session.user.role || 'user',
        accessToken: session.accessToken || ''
      });
      console.log('useAuthSession - 세션 인증됨: 사용자 정보가 스토어에 저장되었습니다.');
    } 
    // 세션이 인증되지 않았다면 스토어 초기화
    else if (status === 'unauthenticated') {
      resetAuth();
      console.log('useAuthSession - 세션 인증 안됨: 스토어에서 사용자 정보가 제거되었습니다.');
    }
    // 로딩 중인 경우
    else if (status === 'loading') {
      console.log('useAuthSession - 세션 로딩 중... 스토어 상태 유지');
    }
  }, [session, status, setAuth, resetAuth]);

  return { session, status };
}; 