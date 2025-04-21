'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/authSlice';
import ClientLayout from '@/components/Common/ClientLayout';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  
  // 로그인 상태가 아니면 로그인 페이지로 리디렉션
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null; // 로그인 상태가 아니면 아무것도 렌더링하지 않음
  }
  
  return (
    <ClientLayout>
      <section className="py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-black p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">환영합니다, {user?.name || '사용자'}님!</h1>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>
              <div className="space-y-2">
                <p><strong>이메일:</strong> {user?.email || '-'}</p>
                <p><strong>사용자 ID:</strong> {user?.user_id || '-'}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg mb-4">
                대시보드 페이지입니다. 로그인에 성공했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
} 