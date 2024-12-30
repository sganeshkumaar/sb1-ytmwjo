import React from 'react';
import { TestGroupItem } from './TestGroupItem';
import { TestGroup } from '../../types';

interface TestGroupListProps {
  groups: TestGroup[];
  onTestSelect: (test: { id: string; name: string } | null) => void;
  onGroupSelect: (groupId: string) => void;
}

export function TestGroupList({ groups, onTestSelect, onGroupSelect }: TestGroupListProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      {groups.map(group => (
        <TestGroupItem
          key={group.id}
          group={group}
          onTestSelect={onTestSelect}
          onGroupSelect={onGroupSelect}
        />
      ))}
    </div>
  );
}