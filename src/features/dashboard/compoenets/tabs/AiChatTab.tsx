"use client";

import React from 'react';

const AiChatTab = () => {
  return (
    <div>
      <div className="mt-4 p-6 border border-stroke rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-blacksection">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">데이터 분석 및 요약 메일 전송</h3>
        <p className="text-waterloo dark:text-manatee">AI 챗봇 인터페이스가 표시됩니다.</p>
        <div className="mt-4 flex items-center border border-stroke rounded p-2 dark:border-strokedark">
          <input 
            type="text" 
            placeholder="AI 챗봇에게 질문하기..." 
            className="flex-1 bg-transparent outline-none text-black dark:text-white" 
          />
          <button className="bg-primary text-white p-2 rounded-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
            </svg>
          </button>
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-medium text-black dark:text-white mb-2">대화 내역</h4>
          <div className="space-y-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-black dark:text-white"><strong>사용자:</strong> 이 회사의 ESG 점수가 어떻게 변화했나요?</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-black dark:text-white"><strong>AI 챗봇:</strong> 해당 회사의 ESG 등급은 최근 3년간 지속적으로 향상되었습니다. 종합 점수는 2022년 B+에서 2024년 A로 상승했으며, 특히 환경(E) 부문에서 가장 큰 개선을 보였습니다. 환경 점수는 2022년 B에서 2024년 A+로 상승했습니다. 사회(S) 부문은 C+에서 B로, 지배구조(G) 부문은 B에서 A로 상승했습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatTab; 