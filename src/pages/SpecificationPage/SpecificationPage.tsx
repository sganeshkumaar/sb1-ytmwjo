import React from 'react';
import { SpecificationHeader } from './components/SpecificationHeader';
import { SpecificationContent } from './components/SpecificationContent';

export function SpecificationPage() {
  return (
    <div className="flex flex-col h-full">
      <SpecificationHeader />
      <SpecificationContent />
    </div>
  );
}