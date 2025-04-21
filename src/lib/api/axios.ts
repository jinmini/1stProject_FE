'use client';
import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

// axios 인스턴스 생성 및 내보내기
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 기존 코드에서는 이 인스턴스를 사용하도록 수정
const api = axiosInstance;
export default api;

interface UserState {
  user_id: string;
  name: string;
  email: string;
  isLoading: boolean;
  error: string | null;
}


export type UserActions = {
  
  setUserId: (user_id: UserState['user_id']) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  
  
  updateName: (name: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  fetchUserData: () => Promise<void>;
}


export type UserStore = UserState & UserActions;


export const getUserId = (state: UserStore) => state.user_id;
export const getUserName = (state: UserStore) => state.name;
export const getUserEmail = (state: UserStore) => state.email;
export const getIsLoading = (state: UserStore) => state.isLoading;
export const getError = (state: UserStore) => state.error;


export const useUserStore = create<UserStore>()(
  subscribeWithSelector( 
    persist(
      immer(
        devtools(
          (set, get) => ({
            
            user_id: '', 
            name: '',
            email: '',
            isLoading: false,
            error: null,
            
           
            setUserId: (user_id) => set((state) => {
              state.user_id = user_id;
            }),
            
            setLoading: (isLoading) => set((state) => {
              state.isLoading = isLoading;
            }),
            
            setError: (error) => set((state) => {
              state.error = error;
            }),
            
            reset: () => set({ 
              user_id: '', 
              name: '', 
              email: '', 
              isLoading: false, 
              error: null 
            }),
            
            
            updateName: async (name) => {
              try {
                set((state) => { state.isLoading = true; state.error = null; });
                
                
                if (get().user_id) {
                  await api.put(`/users/${get().user_id}`, { name });
                }
                
              
                set((state) => { 
                  state.name = name;
                  state.isLoading = false;
                });
              } catch (error) {
                set((state) => { 
                  state.error = error instanceof Error ? error.message : '이름 업데이트 중 오류가 발생했습니다';
                  state.isLoading = false;
                });
                console.error('이름 업데이트 오류:', error);
              }
            },
            
            updateEmail: async (email) => {
              try {
                set((state) => { state.isLoading = true; state.error = null; });
                
              
                if (get().user_id) {
                  await api.put(`/users/${get().user_id}`, { email });
                }
                
               
                set((state) => { 
                  state.email = email;
                  state.isLoading = false;
                });
              } catch (error) {
                set((state) => { 
                  state.error = error instanceof Error ? error.message : '이메일 업데이트 중 오류가 발생했습니다';
                  state.isLoading = false;
                });
                console.error('이메일 업데이트 오류:', error);
              }
            },
            
            fetchUserData: async () => {
              try {
                const userId = get().user_id;
                if (!userId) return;
                
                set((state) => { state.isLoading = true; state.error = null; });
                
               
                const response = await api.get(`/users/${userId}`);
                const userData = response.data as { name: string; email: string };
                
               
                set((state) => { 
                  state.name = userData.name; 
                  state.email = userData.email;
                  state.isLoading = false;
                });
              } catch (error) {
                set((state) => { 
                  state.error = error instanceof Error ? error.message : '사용자 데이터 로드 중 오류가 발생했습니다';
                  state.isLoading = false;
                });
                console.error('사용자 데이터 로드 오류:', error);
              }
            },
          })
        )
      ),
      {
        name: 'setUserInfo', 
        storage: createJSONStorage(() => localStorage),
      
        partialize: (state) => ({
          user_id: state.user_id,
          name: state.name,
          email: state.email,
        }),
      }
    )
  )
);


useUserStore.subscribe(
  getUserId, 
  (userId) => {
    if (userId) {
      
      console.log('사용자 로그인됨:', userId);
    } else {
      
      console.log('사용자 로그아웃됨');
    }
  }
);
