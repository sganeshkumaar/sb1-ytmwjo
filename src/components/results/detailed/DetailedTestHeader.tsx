import React from 'react';
import { useDetailedTestResults } from '../../../hooks/useDetailedTestResults';

interface DetailedTestHeaderProps {
  testId: string;
  testName: string;
}

export function DetailedTestHeader({ testId, testName }: DetailedTestHeaderProps) {
  const { stats } = useDetailedTestResults(testId);

  const metrics = [
    { label: 'Total test cases', value: stats.total },
    { label: 'Passed test cases', value: stats.passed },
    { label: 'Failed test cases', value: stats.failed },
    { label: 'Bugs detected', value: stats.bugs },
    { label: 'Compliance', value: `${stats.compliance}%` }
  ];

  return (
    <div className="space-y-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900">{testName}</h2>
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="text-sm text-gray-600">{metric.label}</div>
            <div className="text-xl font-semibold text-gray-900 mt-1">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}