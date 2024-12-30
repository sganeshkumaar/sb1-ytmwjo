import React from 'react';
import { DUTResultCard } from '../dut/DUTResultCard';
import { OverallResults } from '../overall/OverallResults';
import { ResultsLayout } from '../layout/ResultsLayout';
import { mockDUTResults } from '@/data/mockDUTResults';

export function DUTResultsOverview() {
  const breadcrumbItems = [
    { label: 'Results' }
  ];

  return (
    <ResultsLayout
      breadcrumbItems={breadcrumbItems}
      title="Results"
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
        {mockDUTResults.map((dut) => (
          <div key={dut.id} className="min-w-[350px] max-w-[600px] w-full">
            <DUTResultCard dut={dut} />
          </div>
        ))}
      </div>

      <OverallResults />
    </ResultsLayout>
  );
}