import React from 'react';
import { useParams } from 'react-router-dom';
import { ResultsLayout } from './layout/ResultsLayout';

export function AnalysisReports() {
  const { deviceId, dutId } = useParams();
  
  const breadcrumbItems = [
    { label: 'Results', path: `/project/${deviceId}/results` },
    { label: dutId || '', path: `/project/${deviceId}/results/dut/${dutId}` },
    { label: 'Analysis Reports' }
  ];

  return (
    <ResultsLayout
      breadcrumbItems={breadcrumbItems}
      title="Analysis Reports"
    >
      {/* Content will be added in next iteration */}
    </ResultsLayout>
  );
}