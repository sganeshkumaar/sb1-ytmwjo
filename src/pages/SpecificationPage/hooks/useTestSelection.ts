import { useState } from 'react';
import { Test } from '../types';

export function useTestSelection() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const handleTestSelect = (test: Test | null) => {
    setSelectedTest(test);
  };

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  return {
    selectedTest,
    selectedGroupId,
    handleTestSelect,
    handleGroupSelect
  };
}