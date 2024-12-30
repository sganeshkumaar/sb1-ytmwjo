import React from 'react';
import { ComplianceTest } from '../../../types/compliance';
import { CompliancePhaseMetrics } from './CompliancePhaseMetrics';

interface ComplianceTableRowProps {
  test: ComplianceTest;
}

export function ComplianceTableRow({ test }: ComplianceTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100">
        {test.id}
      </td>
      <td className="sticky left-[150px] z-10 bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100">
        {test.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.specMax}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.specMin}</td>
      
      <CompliancePhaseMetrics metrics={test.design} />
      <CompliancePhaseMetrics metrics={test.simulation} />
      <CompliancePhaseMetrics metrics={test.validation} />
    </tr>
  );
}