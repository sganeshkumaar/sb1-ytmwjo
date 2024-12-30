import React from 'react';
import { Plus } from 'lucide-react';

interface TestGroupHeaderProps {
  onCreateGroup: () => void;
}

export function TestGroupHeader({ onCreateGroup }: TestGroupHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <h2 className="text-base font-medium text-[#44474A]">Tests</h2>
      <button
        onClick={onCreateGroup}
        className="flex items-center gap-1.5 text-sm text-[#DC6B4A] hover:text-[#B24527] font-medium"
      >
        <Plus className="h-4 w-4" />
        Add group
      </button>
    </div>
  );
}