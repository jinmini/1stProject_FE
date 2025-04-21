import NextAuth from "next-auth";
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
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.role = (token.role as 'user' | 'subscriber' | 'admin') || 'user';
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 로그인 성공 후 `/dashboard`페이지로 리디렉션
      if (url.startsWith("/dashboard")) return url;
      if (url.startsWith("/")) return `${baseUrl}/dashboard`;
      if (url.startsWith(baseUrl)) return `${baseUrl}/dashboard`;
      return `${baseUrl}/dashboard`;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: "jwt" as const,
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };