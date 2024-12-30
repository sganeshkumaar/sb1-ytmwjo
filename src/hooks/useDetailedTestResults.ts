import { useState, useEffect } from 'react';
import { TestResults, DetailedTestStats } from '../types/detailedResults';
import { mockDetailedTestResults } from '../data/mockDetailedTestResults';

const defaultHeaders = {
  conditions: {
    title: 'Conditional Parameters',
    params: []
  },
  measurement: {
    title: 'Measurement Parameters',
    params: []
  }
};

const defaultStats: DetailedTestStats = {
  total: 0,
  passed: 0,
  failed: 0,
  bugs: 0,
  compliance: 0
};

export function useDetailedTestResults(testId: string) {
  const [stats, setStats] = useState<DetailedTestStats>(defaultStats);
  const [results, setResults] = useState<TestResults>({
    headers: defaultHeaders,
    data: []
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockData = mockDetailedTestResults[testId];
    if (mockData) {
      setStats(mockData.stats);
      setResults(mockData.results);
    }
  }, [testId]);

  return {
    stats,
    results
  };
}