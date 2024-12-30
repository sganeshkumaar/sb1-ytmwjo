import React from 'react';
import { useTestDetails } from '../../../hooks/useTestDetails';
import { OutputParameterDisplay } from '../../common/test-details/OutputParameterDisplay';
import { VOLTAGE_LIMITS } from '../../../utils/testResults/voltageCalculator';

interface ResultsDetailsProps {
  testId: string;
}

export function ResultsDetails({ testId }: ResultsDetailsProps) {
  const { details } = useTestDetails(testId);

  // Mock output parameter for results view
  const outputParameter = {
    name: 'Output Voltage',
    min: VOLTAGE_LIMITS.MIN,
    max: VOLTAGE_LIMITS.MAX,
    unit: 'V'
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Test ID</label>
        <p className="text-sm text-gray-900">{testId}</p>
      </div>

      <OutputParameterDisplay parameter={outputParameter} />

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Description</label>
        <div className="w-full px-4 py-3 text-sm bg-gray-50 rounded-lg whitespace-pre-wrap">
          {details.description || 'No description available.'}
        </div>
      </div>
    </div>
  );
}