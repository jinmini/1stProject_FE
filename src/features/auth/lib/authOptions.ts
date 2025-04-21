import GoogleProvider from "next-auth/providers/google";

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
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log('NextAuth JWT 콜백: 계정 정보로 토큰 업데이트');
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('NextAuth 세션 콜백: 토큰 정보로 세션 업데이트');
      session.accessToken = token.accessToken as string;
      session.user.role = (token.role as 'user' | 'subscriber' | 'admin') || 'user';
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth 리다이렉션 콜백:', { url, baseUrl });
      
      // 대시보드 경로가 포함된 URL이면 그대로 사용
      if (url.includes('/dashboard')) {
        console.log('-> 대시보드 URL로 리다이렉션:', url);
        return url;
      }
      
      // 루트 경로나 세션 콜백 URL인 경우 대시보드로 리다이렉션
      if (url === baseUrl || url.startsWith(`${baseUrl}/api/auth/session`)) {
        console.log('-> 대시보드로 리다이렉션:', `${baseUrl}/dashboard`);
        return `${baseUrl}/dashboard`;
      }
      
      // 기본 URL인 경우 대시보드로 리다이렉션
      if (url.startsWith(baseUrl)) {
        console.log('-> 대시보드로 리다이렉션:', `${baseUrl}/dashboard`);
        return `${baseUrl}/dashboard`;
      }
      
      // 외부 URL은 허용하지 않고 대시보드로 리다이렉션
      console.log('-> 외부 URL 차단, 대시보드로 리다이렉션:', `${baseUrl}/dashboard`);
      return `${baseUrl}/dashboard`;
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