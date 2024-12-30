import React from 'react';
import { TestGroupList } from './TestGroupList';
import { TestGroupSearch } from './TestGroupSearch';
import { TestGroupHeader } from './TestGroupHeader';
import { useTestGroups } from '../../hooks/useTestGroups';

interface TestGroupAccordionProps {
  onTestSelect: (test: { id: string; name: string } | null) => void;
  onGroupSelect: (groupId: string) => void;
}

export function TestGroupAccordion({ onTestSelect, onGroupSelect }: TestGroupAccordionProps) {
  const {
    filteredGroups,
    searchQuery,
    setSearchQuery,
    handleCreateGroup
  } = useTestGroups();

  return (
    <div className="w-[292px] bg-white border-r border-[#F4F6FA] flex flex-col h-full">
      <TestGroupHeader onCreateGroup={handleCreateGroup} />
      <TestGroupSearch
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <TestGroupList
        groups={filteredGroups}
        onTestSelect={onTestSelect}
        onGroupSelect={onGroupSelect}
      />
    </div>
  );
}