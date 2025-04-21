import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { signIn } from 'next-auth/react';

// 하드코딩된 관리자 계정 정보
const ADMIN_CREDENTIALS = {
  id: 'admin',
  password: 'admin1234',
  name: '관리자',
  role: 'admin' as const
};

// 하드코딩된 테스트 계정
const TEST_USERS = [
  {
    id: 'user1',
    password: 'user1234',
    name: '일반사용자',
    role: 'user' as const
  },
  {
    id: 'subscriber1',
    password: 'sub1234',
    name: '구독자',
    role: 'subscriber' as const
  }
];

// Mock API 구현 (실제 서버 API 없이 테스트용)
const mockApi = {
  post: async (url: string, data: any) => {
    console.log('Mock API called:', url, data);
    
    // /auth/login 엔드포인트 시뮬레이션
    if (url === '/auth/login') {
      // 하드코딩된 관리자 계정 확인
      if (data.email === ADMIN_CREDENTIALS.id && data.password === ADMIN_CREDENTIALS.password) {
        console.log('관리자 계정 로그인 성공');
        return {
          data: {
            success: true,
            message: '관리자 로그인 성공',
            token: 'mock-admin-jwt-token-' + Date.now(),
            refresh_token: 'mock-admin-refresh-token',
            user_id: ADMIN_CREDENTIALS.id,
            role: ADMIN_CREDENTIALS.role,
            name: ADMIN_CREDENTIALS.name
          }
        };
      }
      
      // 테스트 사용자 계정 확인
      const testUser = TEST_USERS.find(user => 
        user.id === data.email && user.password === data.password
      );
      
      if (testUser) {
        console.log(`${testUser.role} 계정 로그인 성공`);
        return {
          data: {
            success: true,
            message: '로그인 성공',
            token: `mock-${testUser.role}-jwt-token-` + Date.now(),
            refresh_token: `mock-${testUser.role}-refresh-token`,
            user_id: testUser.id,
            role: testUser.role,
            name: testUser.name
          }
        };
      }
      
      // 간단한 검증 (기존 코드 유지 - 이메일 포맷으로 admin 체크)
      if (data.email && data.password) {
        // 특정 이메일을 admin으로 처리 (테스트용)
        const isAdmin = data.email.includes('admin@');
        
        // 성공 응답 시뮬레이션
        return {
          data: {
            success: true,
            message: '로그인 성공',
            token: 'mock-jwt-token-' + Date.now(),
            refresh_token: 'mock-refresh-token',
            user_id: data.email,
            role: isAdmin ? 'admin' : 'user', // 관리자 또는 일반 사용자 역할 지정
            name: isAdmin ? '관리자' : '사용자'
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

export const useLoginForm = () => { 
  const router = useRouter();
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

  // 직접 하드코딩된 관리자 계정 체크 함수
  const checkAdminCredentials = (id: string, password: string) => {
    return id === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password;
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
      
      // NextAuth의 Credentials Provider로 로그인 시도
      const result = await signIn('credentials', {
        redirect: false,
        email: formState.id,
        password: formState.password,
        callbackUrl: '/'
      });
      
      console.log('NextAuth 로그인 결과:', result);
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      if (result?.ok) {
        // 로그인 성공 시 상태 업데이트
        setFormState(prev => ({
          ...prev,
          success: '로그인에 성공했습니다.',
          isLoading: false
        }));
        
        // NextAuth가 자동으로 세션을 설정하므로, 추가 처리 없이 홈으로 이동
        // useAuthRedirect 훅이 역할에 맞는 페이지로 리다이렉션
        console.log('NextAuth 로그인 성공: 홈으로 이동');
        router.push('/');
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

