import React from 'react';
import { SpecificationDetails } from '../test-details/SpecificationDetails';
import { TestCondition } from '../../../types/test';

interface TestDetailsProps {
  testId: string;
  testName: string;
  conditions: TestCondition[];
  onUpdateTest: (updates: { testId: string; testName: string; description: string }) => void;
}

export function TestDetails({ testId, testName, conditions, onUpdateTest }: TestDetailsProps) {
  return (
    <SpecificationDetails 
      testId={testId}
      testName={testName}
      conditions={conditions}
      onUpdateTest={onUpdateTest}
    />
  );
}