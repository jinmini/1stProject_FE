"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import RoleSelector from '@/components/RoleSelector';

// 임시 사용자 역할 정의 (실제 구현 시 인증 시스템에서 가져옴)
const getUserRole = (): 'user' | 'subscriber' | 'admin' | null => {
  // 로컬 스토리지에서 사용자 역할 가져오기 (클라이언트 사이드에서만 동작)
  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('userRole');
    if (role === 'user' || role === 'subscriber' || role === 'admin') {
      return role;
    }
  }
  
  return 'user';
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }
    
    if (status === 'authenticated') {
      const role = session?.user?.role || getUserRole();
      
      // admin이 아닌 사용자는 일반 대시보드로 리디렉션
      if (role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [router, status, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="admin-layout">
      {status === 'authenticated' && children}
      <RoleSelector />
    </div>
  );
} 