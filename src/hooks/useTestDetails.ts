import { useState, useEffect, useCallback } from 'react';
import { TestDetails, TestCondition } from '../types/test';
import { mockTestDetails } from '../data/mockTestData';

export function useTestDetails(testId: string) {
  const [details, setDetails] = useState<TestDetails>({
    description: '',
    conditions: [],
    testCases: []
  });

  useEffect(() => {
    // Mock API call to fetch test details
    const fetchDetails = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      setDetails(mockTestDetails[testId] || {
        description: '',
        conditions: [],
        testCases: []
      });
    };

    fetchDetails();
  }, [testId]);

  const updateDetails = useCallback(async (updates: Partial<TestDetails>) => {
    // Mock API call to update test details
    await new Promise(resolve => setTimeout(resolve, 300));

    setDetails(prev => {
      const newDetails = { ...prev, ...updates };
      return newDetails;
    });
  }, []);

  return {
    details,
    updateDetails
  };
}