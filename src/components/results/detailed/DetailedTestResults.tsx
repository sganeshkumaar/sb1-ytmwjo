import React from 'react';
import { useDetailedTestResults } from '../../../hooks/useDetailedTestResults';
import { DetailedTestTable } from './DetailedTestTable';

interface DetailedTestResultsProps {
  testId: string;
}

export function DetailedTestResults({ testId }: DetailedTestResultsProps) {
  const { results } = useDetailedTestResults(testId);

  return <DetailedTestTable results={results} />;
}