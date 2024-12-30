import React, { useState } from 'react';
import { TestGroupAccordion } from './test-group/TestGroupAccordion';
import { TestContentSection } from './test-content/TestContentSection';
import { useTestSelection } from '../hooks/useTestSelection';

export function SpecificationContent() {
  const { selectedTest, selectedGroupId, handleTestSelect, handleGroupSelect } = useTestSelection();

  return (
    <div className="flex flex-1 min-h-0 gap-1">
      <TestGroupAccordion 
        onTestSelect={handleTestSelect}
        onGroupSelect={handleGroupSelect}
      />
      <TestContentSection
        selectedTest={selectedTest}
        selectedGroupId={selectedGroupId}
      />
    </div>
  );
}