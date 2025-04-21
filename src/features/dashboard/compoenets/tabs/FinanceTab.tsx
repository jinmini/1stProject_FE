"use client";

import React from 'react';

const FinanceTab = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4">
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          상세 재무 데이터
        </h4>
        <p className="text-base text-waterloo dark:text-manatee mb-4">
          이 섹션에서는 회사의 상세 재무 데이터를 조회하고 분석할 수 있습니다.
        </p>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">재무 비율</h5>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">부채비율:</span>
                <span className="font-medium text-black dark:text-white">35.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">유동비율:</span>
                <span className="font-medium text-black dark:text-white">245.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">ROE:</span>
                <span className="font-medium text-black dark:text-white">12.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">ROA:</span>
                <span className="font-medium text-black dark:text-white">8.7%</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">성장 지표</h5>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">매출 성장률:</span>
                <span className="font-medium text-success">+15.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">순이익 성장률:</span>
                <span className="font-medium text-success">+8.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">자산 성장률:</span>
                <span className="font-medium text-success">+5.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">시장점유율 변화:</span>
                <span className="font-medium text-success">+2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTab; 