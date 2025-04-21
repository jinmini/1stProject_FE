'use client';

import { create } from 'zustand';

interface CompanyState {
  currentCompany: string;
  setCurrentCompany: (company: string) => void;
  clearCompany: () => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  currentCompany: '',
  setCurrentCompany: (company) => {
    console.log(`검색된 기업: ${company}`);
    set({ currentCompany: company });
  },
  clearCompany: () => set({ currentCompany: '' }),
})); 