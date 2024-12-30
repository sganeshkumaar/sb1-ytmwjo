import React from 'react';
import { useParams } from 'react-router-dom';
import { ComplianceTable } from './compliance/ComplianceTable';
import { mockComplianceTests } from '../../data/mockComplianceData';
import { ResultsLayout } from './layout/ResultsLayout';

export function ComplianceResults() {
  const { deviceId, dutId } = useParams();
  
  const breadcrumbItems = [
    { label: 'Results', path: `/project/${deviceId}/results` },
    { label: dutId || '', path: `/project/${deviceId}/results/dut/${dutId}` },
    { label: 'Compliance Test Results' }
  ];

  return (
    <ResultsLayout
      breadcrumbItems={breadcrumbItems}
      title="Compliance Test Results"
    >
      <div className="overflow-auto">
        <ComplianceTable tests={mockComplianceTests} />
      </div>
    </ResultsLayout>
  );
}