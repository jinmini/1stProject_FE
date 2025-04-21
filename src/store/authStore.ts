import { create } from 'zustand';
import { setAccessToken, removeAccessToken } from '@/lib/api/authToken';

interface AuthState {
  userId: string;
  name: string;
  email: string;
  role: 'user' | 'subscriber' | 'admin';
  accessToken: string;
  setAuth: (auth: { userId: string; name: string; email: string; role: 'user' | 'subscriber' | 'admin'; accessToken: string }) => void;
  resetAuth: () => void;
  signin: (userId: string, userInfo: { name?: string; email?: string; role?: 'user' | 'subscriber' | 'admin' }, token?: string) => Promise<void>;
  signout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: '',
  name: '',
  email: '',
  role: 'user',
  accessToken: '',
  
  setAuth: ({ userId, name, email, role, accessToken }) => 
    set({ userId, name, email, role, accessToken }),
  
  resetAuth: () => 
    set({ userId: '', name: '', email: '', role: 'user', accessToken: '' }),
  
  signin: async (userId, userInfo, token) => {
    try {
      // 토큰이 제공되면 저장
      if (token) {
        setAccessToken(token);
      }
      
      set({ 
        userId, 
        name: userInfo?.name || '사용자', 
        email: userInfo?.email || '', 
        role: userInfo?.role || 'user',
        accessToken: token || ''
      });
      
      console.log('Auth 스토어: 로그인 성공');
      return Promise.resolve();
    } catch (error) {
      console.error('Auth 스토어: 로그인 실패', error);
      return Promise.reject(error);
    }
  },
  
  signout: () => {
    // 토큰 제거
    removeAccessToken();
    
    // 상태 초기화
    set({ userId: '', name: '', email: '', role: 'user', accessToken: '' });
    console.log('Auth 스토어: 로그아웃 완료');
  }
}));