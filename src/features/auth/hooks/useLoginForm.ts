import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '@/lib/api/authToken';
import { useAuthStore } from '@/store/auth/authSlice';

// Mock API 구현 (실제 서버 API 없이 테스트용)
const mockApi = {
  post: async (url: string, data: any) => {
    console.log('Mock API called:', url, data);
    
    // /auth/login 엔드포인트 시뮬레이션
    if (url === '/auth/login') {
      // 간단한 검증 (테스트용)
      if (data.email && data.password) {
        // 성공 응답 시뮬레이션
        return {
          data: {
            success: true,
            message: '로그인 성공',
            token: 'mock-jwt-token-' + Date.now(),
            refresh_token: 'mock-refresh-token',
            user_id: data.email
          }
        };
      } else {
        // 실패 응답 시뮬레이션
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
    
    throw new Error('지원되지 않는 API 엔드포인트');
  }
};

interface LoginFormState { 
  id: string;
  password: string;
  error: string;
  success: string;
  isLoading: boolean;
}

// 유저 스토어 모킹 (실제 스토어가 없는 경우를 위한 임시 구현)
const mockUserStore = {
  setUserId: (id: string) => console.log('Mock setUserId:', id),
  updateEmail: (email: string) => console.log('Mock updateEmail:', email),
  updateName: (name: string) => console.log('Mock updateName:', name)
};

export const useLoginForm = () => { 
  const router = useRouter();
  
  // 실제 useUserStore 대신 Mock 사용
  const { setUserId, updateEmail, updateName } = mockUserStore;
  const signin = useAuthStore(state => state.signin);
  
  const [formState, setFormState] = useState<LoginFormState>({ 
    id: '', 
    password: '', 
    error: '',
    success: '',
    isLoading: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formState.id || !formState.password) {
      setFormState(prev => ({ 
        ...prev, 
        error: '아이디와 비밀번호를 모두 입력해주세요.' 
      }));
      return;
    }

    console.log(`로그인 시도: ${formState.id}, ${formState.password}`);

    try {
      setFormState(prev => ({ ...prev, isLoading: true, error: '' }));

      // 실제 API 대신 Mock API 사용
      const response = await mockApi.post('/auth/login', { 
        email: formState.id,
        password: formState.password
      });

      console.log('로그인 응답:', response.data);
      
      const responseData = response.data as { 
        success: boolean; 
        message: string;
        token?: string;
        refresh_token?: string;
        user_id?: string;
      };
      
      if (responseData.success) {
        const userId = responseData.user_id || formState.id;
        
        // 액세스 토큰 저장
        if (responseData.token) {
          setAccessToken(responseData.token);
          console.log('Access token이 저장되었습니다.');
        }
        
        // Mock 유저 스토어 업데이트
        setUserId(userId);
        updateEmail(formState.id);
        updateName('사용자');

        // AuthStore로 로그인 처리
        await signin(userId, {
          name: '사용자',
          email: formState.id
        }, responseData.token);

        // 성공 메시지 설정
        setFormState(prev => ({
          ...prev,
          success: '로그인에 성공했습니다.',
          isLoading: false
        }));

        // 대시보드로 이동
        router.push('/dashboard');
      } else {
        throw new Error(responseData.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      
      // 에러 메시지 표시
      const errorMessage = error instanceof Error 
        ? error.message 
        : '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
      
      setFormState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
    }
  };

  return {
    formState,
    handleChange,
    handleLogin
  };
};

