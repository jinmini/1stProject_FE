'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { removeAccessToken } from '@/lib/api/authToken';

// 사용자 타입 정의
interface User {
  user_id: string;
  name: string;
  email: string;
}

// 상태 타입 정의
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

// 액션 타입 정의
interface AuthActions {
  signin: (userId: string, userInfo?: { name?: string; email?: string }, token?: string | null) => Promise<void>;
  signout: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

// 전체 스토어 타입 (State + Actions)
type AuthStore = AuthState & AuthActions;

// 선택자 (selectors)
export const getUser = (state: AuthStore) => state.user;
export const getIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const getIsLoading = (state: AuthStore) => state.isLoading;
export const getToken = (state: AuthStore) => state.token;

// Zustand 스토어 생성
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        // 초기 상태
        user: null,
        isAuthenticated: false,
        isLoading: true,
        token: null,
        
        // 액션
        signin: async (userId, userInfo, token) => {
          try {
            const newUser: User = {
              user_id: userId,
              name: userInfo?.name || '사용자',
              email: userInfo?.email || `${userId}@example.com`
            };
            
            set((state) => {
              state.user = newUser;
              state.isAuthenticated = true;
              state.token = token || null;
              state.isLoading = false;
            });
            
            return Promise.resolve();
          } catch (error) {
            console.error('로그인 처리 오류:', error);
            return Promise.reject(error);
          }
        },
        
        signout: () => {
          // 로컬 스토리지에서 토큰 제거
          removeAccessToken();
          console.log('로그아웃: 액세스 토큰이 제거되었습니다.');
          
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
          });
        },
        
        setIsLoading: (isLoading) => {
          set((state) => {
            state.isLoading = isLoading;
          });
        }
      })),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        // 민감한 정보는 제외하고 저장
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          token: state.token,
        }),
      }
    )
  )
);

// 초기화 함수 - 앱 시작 시 호출
export const initializeAuth = () => {
  const state = useAuthStore.getState();
  
  // 이미 인증 상태가 확인되었으면 종료
  if (!state.isLoading) return;
  
  // localStorage 확인 (persist 미들웨어가 자동으로 처리하지만, 
  // isLoading 상태를 관리하기 위해 명시적으로 처리)
  setTimeout(() => {
    useAuthStore.setState({ isLoading: false });
  }, 100);
}; 