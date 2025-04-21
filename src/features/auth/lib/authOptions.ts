import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// 하드코딩된 계정 정보
const ADMIN_CREDENTIALS = {
  id: 'admin',
  password: 'admin1234',
  name: '관리자',
  role: 'admin'
};

const TEST_USERS = [
  {
    id: 'user1',
    password: 'user1234',
    name: '일반사용자',
    role: 'user'
  },
  {
    id: 'subscriber1',
    password: 'sub1234',
    name: '구독자',
    role: 'subscriber'
  }
];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('인증 정보 없음');
          return null;
        }

        console.log('로그인 시도:', credentials.email);

        // 관리자 계정 확인
        if (credentials.email === ADMIN_CREDENTIALS.id && 
            credentials.password === ADMIN_CREDENTIALS.password) {
          console.log('관리자 계정 로그인 성공');
          return {
            id: ADMIN_CREDENTIALS.id,
            name: ADMIN_CREDENTIALS.name,
            email: ADMIN_CREDENTIALS.id,
            role: ADMIN_CREDENTIALS.role
          };
        }

        // 테스트 사용자 계정 확인
        const testUser = TEST_USERS.find(user => 
          user.id === credentials.email && user.password === credentials.password
        );

        if (testUser) {
          console.log(`${testUser.role} 계정 로그인 성공`);
          return {
            id: testUser.id,
            name: testUser.name,
            email: testUser.id,
            role: testUser.role
          };
        }

        // 임시 처리: 특정 이메일을 관리자로 처리 (테스트용)
        if (credentials.email?.includes('admin@')) {
          console.log('admin@ 포함된 이메일: 관리자 계정으로 처리');
          return {
            id: credentials.email,
            name: '관리자',
            email: credentials.email,
            role: 'admin'
          };
        }

        // 간단한 검증: 이메일과 비밀번호가 있으면 일반 사용자로 로그인 허용 (테스트용)
        if (credentials.email && credentials.password) {
          console.log('기본 인증 성공: 일반 사용자로 처리');
          return {
            id: credentials.email,
            name: '사용자',
            email: credentials.email,
            role: 'user'
          };
        }

        console.log('인증 실패');
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        console.log('NextAuth JWT 콜백: 계정 정보로 토큰 업데이트');
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      
      // user 객체가 있으면 (첫 로그인 시) user 정보에서 역할 가져오기
      if (user) {
        console.log('JWT 콜백: 사용자 정보 확인', { id: user.id, email: user.email, role: user.role });
        
        // CredentialsProvider로 로그인한 경우 직접 설정된 role 사용
        if (user.role) {
          token.role = user.role;
          console.log('JWT 콜백: Credentials에서 역할 설정됨 -', user.role);
        }
        // Google 로그인 등 다른 Provider로 로그인한 경우
        else if (user.email) {
          if (user.email === 'admin' || user.email.includes('admin@')) {
            token.role = 'admin';
          } else if (user.email.includes('subscriber')) {
            token.role = 'subscriber';
          } else {
            token.role = 'user';
          }
          console.log('JWT 콜백: 이메일 기반 역할 설정됨 -', token.role);
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      console.log('NextAuth 세션 콜백: 토큰 정보로 세션 업데이트');
      session.accessToken = token.accessToken as string;
      session.user.role = (token.role as 'user' | 'subscriber' | 'admin') || 'user';
      console.log('세션 콜백: 사용자 역할 -', session.user.role);
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth 리다이렉션 콜백:', { url, baseUrl });
      
      // 단순화된 리다이렉션 규칙:
      // 1. 외부 URL은 허용하지 않음
      // 2. 내부 URL은 그대로 사용
      // 3. 루트 URL은 그대로 사용 (후에 클라이언트에서 처리)
      
      // 외부 URL인 경우 홈으로 리다이렉션
      if (!url.startsWith(baseUrl)) {
        console.log('-> 외부 URL 차단, 홈으로 리다이렉션:', baseUrl);
        return baseUrl;
      }
      
      // 내부 URL은 그대로 유지 (역할 기반 리다이렉션은 클라이언트에서 처리)
      console.log('-> URL 유지:', url);
      return url;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  debug: process.env.NODE_ENV === 'development',
}; 