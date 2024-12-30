import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResultsLayout } from './layout/ResultsLayout';
import { DetailedTestAccordion } from './detailed/DetailedTestAccordion';
import { DetailedTestContent } from './detailed/DetailedTestContent';
import { EmptyTestState } from '../common/EmptyTestState';

export function DetailedResults() {
  const { deviceId, dutId } = useParams();
  const [selectedTest, setSelectedTest] = useState<{ id: string; name: string } | null>(null);
  
  const breadcrumbItems = [
    { label: 'Results', path: `/project/${deviceId}/results` },
    { label: dutId || '', path: `/project/${deviceId}/results/dut/${dutId}` },
    { label: 'Detailed Test Results' }
  ];

  return (
    <ResultsLayout
      breadcrumbItems={breadcrumbItems}
      title="Detailed Test Results"
    >
      <div className="flex h-full gap-1">
        <DetailedTestAccordion
          onTestSelect={setSelectedTest}
          selectedTestId={selectedTest?.id || null}
        />
        <div className="flex-1 overflow-auto">
          {selectedTest ? (
            <DetailedTestContent
              testId={selectedTest.id}
              testName={selectedTest.name}
            />
          ) : (
            <EmptyTestState
              message="No test selected"
              description="Choose a test from the list to view its results"
            />
          )}
        </div>
      </div>
    </ResultsLayout>
  );
}