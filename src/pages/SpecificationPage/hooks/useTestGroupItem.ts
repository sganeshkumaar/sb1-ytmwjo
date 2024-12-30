import { useState, useCallback } from 'react';
import { Test } from '../types';

export function useTestGroupItem(groupId: string) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleTestClick = useCallback((test: Test) => {
    setSelectedTestId(test.id);
  }, []);

  const handleAddTest = useCallback((groupId: string) => {
    // Implementation for adding test
    console.log('Adding test to group:', groupId);
  }, []);

  return {
    isExpanded,
    isSelected: selectedTestId !== null,
    selectedTestId,
    toggleExpanded,
    handleTestClick,
    handleAddTest
  };
}