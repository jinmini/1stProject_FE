"use client";

import React from 'react';

const EsgTab = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4">
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          ESG 분석 데이터
        </h4>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">환경(E)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-success" style={{ width: '82%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">82/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">탄소배출:</span>
                <span className="font-medium text-success">-15% YoY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">재활용률:</span>
                <span className="font-medium text-black dark:text-white">76%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">에너지 효율:</span>
                <span className="font-medium text-success">+12%</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">사회(S)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-primary" style={{ width: '75%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">75/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">직원 만족도:</span>
                <span className="font-medium text-black dark:text-white">84%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">성별 다양성:</span>
                <span className="font-medium text-black dark:text-white">42% 여성</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">지역사회 투자:</span>
                <span className="font-medium text-success">+8%</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">지배구조(G)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-warning" style={{ width: '68%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">68/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">이사회 독립성:</span>
                <span className="font-medium text-black dark:text-white">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">투명성 지수:</span>
                <span className="font-medium text-black dark:text-white">72/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">윤리 강령 준수:</span>
                <span className="font-medium text-success">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsgTab; 