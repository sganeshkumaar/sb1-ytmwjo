import React from 'react';
import { Search } from 'lucide-react';

interface TestGroupSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TestGroupSearch({ value, onChange }: TestGroupSearchProps) {
  return (
    <div className="px-5 py-4 border-b border-[#F4F6FA]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search tests..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}