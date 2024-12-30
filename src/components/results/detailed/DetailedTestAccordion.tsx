import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useTestGroups } from '../../../hooks/useTestGroups';
import { CollapsibleSidebar } from '../../common/CollapsibleSidebar';

interface DetailedTestAccordionProps {
  onTestSelect: (test: { id: string; name: string } | null) => void;
  selectedTestId: string | null;
}

export function DetailedTestAccordion({ onTestSelect, selectedTestId }: DetailedTestAccordionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    groups,
    expandedGroups,
    toggleGroup,
    filterGroups
  } = useTestGroups();

  const filteredGroups = filterGroups(searchQuery);

  const handleTestClick = (test: { id: string; name: string }) => {
    onTestSelect(test);
  };

  return (
    <CollapsibleSidebar className="bg-white border-r border-[#F4F6FA]">
      <div className="flex flex-col h-full">
        <div className="flex-none px-5 py-4 border-b border-[#F4F6FA] space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-[#44474A]">Tests</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredGroups.map(group => {
            const isGroupSelected = !expandedGroups.includes(group.id) && 
              group.tests.some(t => t.id === selectedTestId);
              
            return (
              <div key={group.id}>
                <div
                  className={`relative w-full px-6 py-4 flex items-center justify-between text-sm font-medium hover:bg-gray-50 cursor-pointer ${
                    isGroupSelected ? 'text-[#DC6B4A]' : 'text-[#44474A]'
                  }`}
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-5 w-5 flex-none transition-transform ${
                        expandedGroups.includes(group.id) ? 'rotate-180' : ''
                      }`}
                    />
                    <span>{group.name}</span>
                  </div>
                  {isGroupSelected && (
                    <div className="absolute right-0 top-0 w-0.5 h-full bg-[#DC6B4A]" />
                  )}
                </div>
                {expandedGroups.includes(group.id) && (
                  <div className="py-1">
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
          })}
        </div>
      </div>
    </CollapsibleSidebar>
  );
}