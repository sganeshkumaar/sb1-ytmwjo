import React from 'react';

interface TestProgressProps {
  total: number;
  passed: number;
  failed: number;
}

export function TestProgressChart({ total, passed, failed }: TestProgressProps) {
  const passedPercentage = (passed / total) * 100;
  const failedPercentage = (failed / total) * 100;
  const remainingPercentage = 100 - passedPercentage - failedPercentage;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Progress</h2>
      <div className="relative pt-1">
        <div className="flex h-4 overflow-hidden rounded-full bg-gray-100">
          <div
            style={{ width: `${passedPercentage}%` }}
            className="bg-green-500 transition-all duration-300"
          />
          <div
            style={{ width: `${failedPercentage}%` }}
            className="bg-red-500 transition-all duration-300"
          />
          <div
            style={{ width: `${remainingPercentage}%` }}
            className="bg-gray-200 transition-all duration-300"
          />
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <div>
            <span className="text-gray-600">Passed: </span>
            <span className="font-medium text-gray-900">{passed}</span>
          </div>
          <div>
            <span className="text-gray-600">Failed: </span>
            <span className="font-medium text-gray-900">{failed}</span>
          </div>
          <div>
            <span className="text-gray-600">Remaining: </span>
            <span className="font-medium text-gray-900">{total - passed - failed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}