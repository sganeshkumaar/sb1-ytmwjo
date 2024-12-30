import { useState, useCallback } from 'react';
import { TestGroup, Test } from '../types/test';
import { mockTestGroups } from '../data/mockTestData';

export function useTestGroups() {
  const [groups, setGroups] = useState<TestGroup[]>(mockTestGroups);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  }, []);

  const handleCreateGroup = useCallback((name: string) => {
    const newGroup: TestGroup = {
      id: Date.now().toString(),
      name,
      tests: []
    };
    setGroups(prev => [...prev, newGroup]);
  }, []);

  const handleCreateTest = useCallback((groupId: string, test: Test) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId
        ? { ...group, tests: [...group.tests, test] }
        : group
    ));
  }, []);

  const filterGroups = useCallback((searchQuery: string) => {
    if (!searchQuery) return groups;

    const query = searchQuery.toLowerCase();
    return groups.map(group => ({
      ...group,
      tests: group.tests.filter(test => 
        test.name.toLowerCase().includes(query)
      )
    })).filter(group => 
      group.name.toLowerCase().includes(query) || group.tests.length > 0
    );
  }, [groups]);

  return {
    groups,
    expandedGroups,
    selectedTestId,
    setSelectedTestId,
    toggleGroup,
    handleCreateGroup,
    handleCreateTest,
    filterGroups
  };
}