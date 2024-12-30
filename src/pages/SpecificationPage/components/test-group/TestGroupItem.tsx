import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useTestGroupItem } from '../../hooks/useTestGroupItem';
import { TestGroup } from '../../types';

interface TestGroupItemProps {
  group: TestGroup;
  onTestSelect: (test: { id: string; name: string } | null) => void;
  onGroupSelect: (groupId: string) => void;
}

export function TestGroupItem({ group, onTestSelect, onGroupSelect }: TestGroupItemProps) {
  const {
    isExpanded,
    isSelected,
    selectedTestId,
    toggleExpanded,
    handleTestClick,
    handleAddTest
  } = useTestGroupItem(group.id);

  return (
    <div>
      <div
        className={`relative w-full px-6 py-4 flex items-center justify-between text-sm font-medium hover:bg-gray-50 cursor-pointer ${
          isSelected ? 'text-[#DC6B4A]' : 'text-[#44474A]'
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`h-5 w-5 flex-none transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
          <span>{group.name}</span>
        </div>
        {isSelected && (
          <div className="absolute right-0 top-0 w-0.5 h-full bg-[#DC6B4A]" />
        )}
      </div>
      
      {isExpanded && (
        <div className="py-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddTest(group.id);
            }}
            className="w-full px-14 py-3 text-left text-sm text-[#DC6B4A] hover:text-[#B24527] hover:bg-[#FFF9F5] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add test</span>
          </button>
          {group.tests.map(test => (
            <div
              key={test.id}
              onClick={() => handleTestClick(test)}
              className={`relative w-full px-14 py-3 text-left text-sm hover:bg-[#FFF9F5] cursor-pointer ${
                selectedTestId === test.id
                  ? 'text-[#DC6B4A] bg-[#FFF9F5]'
                  : 'text-[#44474A]'
              }`}
            >
              <span className="line-clamp-1">{test.name}</span>
              {selectedTestId === test.id && (
                <div className="absolute right-0 top-0 w-0.5 h-full bg-[#DC6B4A]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}