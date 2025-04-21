import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ClientLayout from "@/components/Common/ClientLayout";
import NextAuthSessionProvider from "@/components/Providers/SessionProvier";
import ToastProvider from "@/components/Providers/ToastProvider";
import AuthSessionProvider from "@/components/Providers/AuthSessionProvider";
const inter = Inter({ subsets: ["latin"],display: 'swap'});

export const metadata: Metadata = {
  title: {
    template: '%s | LIF',
    default: 'LIF - Life, Intelligence, Future',
  },
  description: "Life, Intelligence, Future - 금융 서비스 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <AuthSessionProvider>
        <html lang="ko" suppressHydrationWarning>
          <body className={`dark:bg-black ${inter.className}`}>
            <ClientLayout>{children}</ClientLayout>
            <ToastProvider />
          </body>
        </html>
      </AuthSessionProvider>
    </NextAuthSessionProvider>
  );
}

