import React from 'react';
import { PhaseMetrics } from '../../../types/compliance';

interface CompliancePhaseMetricsProps {
  metrics: PhaseMetrics;
}

export function CompliancePhaseMetrics({ metrics }: CompliancePhaseMetricsProps) {
  const getHealthColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {metrics.coverage}%
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getHealthColor(metrics.health)}`}>
        {metrics.health}%
      </td>
    </>
  );
}