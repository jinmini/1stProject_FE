"use client";

import React from 'react';
import EsgGradeCard from '../cards/EsgGradeCard';
import ProfitabilityChart from '../charts/ProfitabilityChart';
import GrowthChart from '../charts/GrowthChart';
import DebtLiquidityChart from '../charts/DebtLiquidityChart';
import { useCompanyStore } from '../../store/companyStore';

const SummaryTab = () => {
  // 필요한 경우 회사 정보 접근
  const { currentCompany } = useCompanyStore();
  
  return (
    <>
      {/* 선택된 회사 정보 표시 (옵션) */}
      {currentCompany && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            '{currentCompany}' 기업 분석 결과
          </h3>
        </div>
      )}
    
      {/* 대시보드 메트릭 섹션 - ESG 등급 카드 */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <EsgGradeCard 
          title="종합 등급" 
          grades={[
            { year: 2022, grade: 'B+' },
            { year: 2023, grade: 'B+' },
            { year: 2024, grade: 'A' }
          ]}
        />
        <EsgGradeCard 
          title="환경(E)" 
          grades={[
            { year: 2022, grade: 'B' },
            { year: 2023, grade: 'A' },
            { year: 2024, grade: 'A+' }
          ]}
        />
        <EsgGradeCard 
          title="사회(S)" 
          grades={[
            { year: 2022, grade: 'C+' },
            { year: 2023, grade: 'C+' },
            { year: 2024, grade: 'B' }
          ]}
        />
        <EsgGradeCard 
          title="지배구조(G)" 
          grades={[
            { year: 2022, grade: 'B' },
            { year: 2023, grade: 'B+' },
            { year: 2024, grade: 'A' }
          ]}
        />
      </div>
      
      {/* 성장성 지표 차트 */}
      <div className="mb-8 grid grid-cols-1 gap-4">
        <ProfitabilityChart />
      </div>

      {/* 차트 섹션 */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <GrowthChart />
        <DebtLiquidityChart />
      </div>
      
      {/* 금융 및 ESG 데이터 분석 보고 */}
      <DataAnalysisReport />
    </>
  );
};

// 데이터 분석 보고서 컴포넌트 - 더 세분화된 구조
const DataAnalysisReport = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-blacksection">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        금융 및 ESG 데이터 분석 보고
      </h4>
      
      <div className="flex flex-col gap-4">
        <AnalysisSection 
          title="요약 분석"
          content="분석 대상 기업은 최근 3년간 ESG 등급이 지속적으로 향상되었으며, 특히 환경(E) 부문에서 두드러진 개선을 보였습니다. 재무 건전성과 ESG 성과 간 양의 상관관계가 확인되었습니다."
        />
        
        <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
          <h5 className="mb-3 text-lg font-medium text-black dark:text-white">금융-ESG 통합 분석</h5>
          <div className="flex flex-col gap-2">
            <p className="text-base text-waterloo dark:text-manatee">
              <span className="font-medium text-black dark:text-white">투자 위험도 평가:</span> ESG 개선 추세와 안정적인 재무지표를 고려할 때, 중장기 투자에 적합한 위험 수준을 보유하고 있습니다.
            </p>
            <p className="text-base text-waterloo dark:text-manatee">
              <span className="font-medium text-black dark:text-white">지속가능성 전망:</span> 탄소 배출량 감소와 에너지 효율성 향상으로 인한 운영비 절감 효과가 예상됩니다.
            </p>
          </div>
        </div>
        
        <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
          <h5 className="mb-3 text-lg font-medium text-black dark:text-white">추천 사항</h5>
          <ul className="list-disc pl-5 text-base text-waterloo dark:text-manatee">
            <li className="mb-1">사회(S) 부문 개선을 위한 직원 복지 및 지역사회 투자 확대</li>
            <li className="mb-1">지배구조(G) 강화를 위한 이사회 독립성 증진 방안 고려</li>
            <li>ESG 성과와 재무 데이터의 상관관계에 대한 정기적인 모니터링 체계 구축</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 분석 섹션 컴포넌트 - 재사용 가능한 컴포넌트
interface AnalysisSectionProps {
  title: string;
  content: string;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, content }) => {
  return (
    <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
      <h5 className="mb-3 text-lg font-medium text-black dark:text-white">{title}</h5>
      <p className="text-base text-waterloo dark:text-manatee">{content}</p>
    </div>
  );
};

export default SummaryTab; 