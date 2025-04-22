import axios from 'axios';
import { DashboardData } from '@/features/dashboard/hooks/useDashboardData';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// API 엔드포인트
const ENDPOINTS = {
  COMPANY_DATA: '/dashboard/company',
  COMPANY_LIST: '/dashboard/companies',
};

/**
 * 회사 데이터 조회 API 함수
 * @param companyName 조회할 회사명
 * @returns 회사 대시보드 데이터
 */
export const getCompanyData = async (companyName: string): Promise<DashboardData> => {
  try {
    const response = await axios.get<DashboardData>(
      `${API_BASE_URL}${ENDPOINTS.COMPANY_DATA}/${encodeURIComponent(companyName)}`
    );
    return response.data;
  } catch (error) {
    console.error('대시보드 데이터 조회 실패:', error);
    throw error;
  }
};

/**
 * 회사 목록 조회 API 함수
 * @returns 회사 목록
 */
export const getCompanyList = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_BASE_URL}${ENDPOINTS.COMPANY_LIST}`);
    return response.data;
  } catch (error) {
    console.error('회사 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * ESG 등급 조회 API 함수
 * @param companyName 조회할 회사명
 * @returns ESG 등급 데이터
 */
export const getEsgGrades = async (companyName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.DASHBOARD.ESG_GRADES}/${encodeURIComponent(companyName)}`);
    return response.data;
  } catch (error) {
    console.error('ESG 등급 조회 실패:', error);
    throw error;
  }
};

/**
 * 재무 지표 조회 API 함수
 * @param companyName 조회할 회사명
 * @returns 재무 지표 데이터
 */
export const getFinancialMetrics = async (companyName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.DASHBOARD.FINANCIAL_METRICS}/${encodeURIComponent(companyName)}`);
    return response.data;
  } catch (error) {
    console.error('재무 지표 조회 실패:', error);
    throw error;
  }
};

/**
 * 분석 결과 조회 API 함수
 * @param companyName 조회할 회사명
 * @returns 분석 결과 데이터
 */
export const getCompanyAnalysis = async (companyName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.DASHBOARD.COMPANY_ANALYSIS}/${encodeURIComponent(companyName)}`);
    return response.data;
  } catch (error) {
    console.error('분석 결과 조회 실패:', error);
    throw error;
  }
};
