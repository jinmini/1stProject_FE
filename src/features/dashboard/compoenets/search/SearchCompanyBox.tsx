'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useCompanyStore } from '../../store/companyStore';

interface SearchCompanyBoxProps {
  onSearch?: (company: string) => void;
}

// 기업 목록 데이터
const companyList = [
  '삼성전자',
  'LG전자',
  'LG화학',
  'SK하이닉스',
  'SK이노베이션',
  '현대자동차',
  '기아자동차',
  'NAVER',
  '카카오',
  '네이버',
  '포스코',
  '삼성바이오로직스', 
  '삼성SDI',
  '삼성화재',
  '신한금융지주',
  '하나금융지주',
  'KB금융지주',
  '셀트리온',
  'LG생활건강',
  '롯데케미칼'
];

// 초성 매핑 (한글 자음-초성 매핑)
const HANGUL_INITIAL_CONSONANTS = {
  'ㄱ': /[가-깋]/g,
  'ㄲ': /[까-낗]/g,
  'ㄴ': /[나-닣]/g,
  'ㄷ': /[다-딯]/g,
  'ㄸ': /[따-띻]/g,
  'ㄹ': /[라-맇]/g,
  'ㅁ': /[마-밓]/g,
  'ㅂ': /[바-빟]/g,
  'ㅃ': /[빠-삗]/g,
  'ㅅ': /[사-싷]/g,
  'ㅆ': /[싸-앃]/g,
  'ㅇ': /[아-잏]/g,
  'ㅈ': /[자-짛]/g,
  'ㅉ': /[짜-찧]/g,
  'ㅊ': /[차-칳]/g,
  'ㅋ': /[카-킿]/g,
  'ㅌ': /[타-팋]/g,
  'ㅍ': /[파-핗]/g,
  'ㅎ': /[하-힣]/g
};

const SearchCompanyBox: React.FC<SearchCompanyBoxProps> = ({ onSearch }) => {
  // Zustand 스토어 사용
  const { currentCompany, setCurrentCompany } = useCompanyStore();
  
  const [searchText, setSearchText] = useState<string>(currentCompany || '');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    '삼성전자',
    'LG화학',
    'SK하이닉스',
    '현대자동차',
    'NAVER'
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 초성 검색을 포함한 검색어 필터링 함수
  const filterCompanies = (input: string): string[] => {
    if (!input.trim()) return [];
    
    const query = input.toLowerCase();
    
    // 초성인지 확인
    const isInitialConsonant = Object.keys(HANGUL_INITIAL_CONSONANTS).includes(query);
    
    return companyList.filter(company => {
      // 초성 검색일 경우
      if (isInitialConsonant) {
        return HANGUL_INITIAL_CONSONANTS[query as keyof typeof HANGUL_INITIAL_CONSONANTS].test(company);
      }
      
      // 일반 검색 (포함 여부)
      return company.toLowerCase().includes(query);
    });
  };

  const handleSearch = () => {
    if (searchText.trim() === '') return;
    
    // Zustand 스토어 업데이트
    setCurrentCompany(searchText);
    
    // Props 콜백도 유지 (옵션)
    if (onSearch) {
      onSearch(searchText);
    }
    
    // 최근 검색어에 추가
    if (!recentSearches.includes(searchText)) {
      setRecentSearches(prev => [searchText, ...prev.slice(0, 4)]);
    }
    
    // 검색 후 자동완성 닫기
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      // 아래 화살표 키: 자동완성 목록으로 포커스 이동
      if (suggestionsRef.current) {
        const firstSuggestion = suggestionsRef.current.querySelector('button');
        if (firstSuggestion) {
          (firstSuggestion as HTMLButtonElement).focus();
        }
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      // 다음 제안으로 이동
      const nextSuggestion = suggestionsRef.current?.querySelectorAll('button')[index + 1];
      if (nextSuggestion) {
        (nextSuggestion as HTMLButtonElement).focus();
      }
    } else if (e.key === 'ArrowUp') {
      if (index === 0) {
        // 첫 번째 제안에서 위로 이동하면 입력 필드로 돌아감
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } else {
        // 이전 제안으로 이동
        const prevSuggestion = suggestionsRef.current?.querySelectorAll('button')[index - 1];
        if (prevSuggestion) {
          (prevSuggestion as HTMLButtonElement).focus();
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectSuggestion(suggestions[index]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const selectSuggestion = (company: string) => {
    setSearchText(company);
    
    // Zustand 스토어 업데이트
    setCurrentCompany(company);
    
    // Props 콜백도 유지 (옵션)
    if (onSearch) {
      onSearch(company);
    }
    
    setShowSuggestions(false);
    
    // 최근 검색어에 추가
    if (!recentSearches.includes(company)) {
      setRecentSearches(prev => [company, ...prev.slice(0, 4)]);
    }
  };

  const selectRecentSearch = (company: string) => {
    setSearchText(company);
    
    // Zustand 스토어 업데이트
    setCurrentCompany(company);
    
    // Props 콜백도 유지 (옵션)
    if (onSearch) {
      onSearch(company);
    }
  };

  // currentCompany가 변경되면 searchText도 업데이트
  useEffect(() => {
    if (currentCompany && currentCompany !== searchText) {
      setSearchText(currentCompany);
    }
  }, [currentCompany]);

  // 검색어 변경 시 자동 완성 업데이트
  useEffect(() => {
    if (searchText.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = filterCompanies(searchText);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchText]);
  
  // 외부 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 mb-6 border border-stroke rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-blacksection">
      <div className="flex flex-col">
        <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
          기업 검색
        </h4>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="기업명을 입력하세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2.5 border border-stroke rounded-lg bg-transparent outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-waterloo hover:text-primary dark:text-manatee dark:hover:text-white"
              onClick={handleSearch}
            >
              <Search size={18} />
            </button>
            
            {/* 자동완성 목록 */}
            {showSuggestions && (
              <div 
                ref={suggestionsRef}
                className="absolute z-10 w-full mt-1 bg-white border border-stroke rounded-lg shadow-lg dark:bg-blacksection dark:border-strokedark"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    onKeyDown={(e) => handleSuggestionKeyDown(e, index)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-1 dark:hover:bg-meta-4 text-black dark:text-white transition-colors duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {recentSearches.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-waterloo dark:text-manatee mb-2">최근 검색 기업</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((company, index) => (
                <button
                  key={index}
                  onClick={() => selectRecentSearch(company)}
                  className="px-3 py-1 text-xs bg-gray-1 dark:bg-meta-4 rounded-md text-black dark:text-white hover:bg-gray-2 dark:hover:bg-meta-5"
                >
                  {company}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCompanyBox; 