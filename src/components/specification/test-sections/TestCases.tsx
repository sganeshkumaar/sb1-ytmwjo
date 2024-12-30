import React from 'react';
import { Download } from 'lucide-react';
import { TestCondition } from '../../../types/test';
import { generateTestCases } from '../../../utils/testCaseGenerator';

interface TestCasesProps {
  testId: string;
  conditions: {
    inputs: Parameter[];
    outputParameter: Parameter | null;
  };
}

export function TestCases({ testId, conditions }: TestCasesProps) {
  if (!conditions.inputs || conditions.inputs.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No test cases available. Add conditions first to generate test cases.</p>
        </div>
      </div>
    );
  }

  const testCases = generateTestCases(conditions.inputs, testId);

  const handleDownload = () => {
    // Create CSV content
    const headers = ['Test Case', 'Test Case ID', ...conditions.inputs.map(p => `${p.name} (${p.unit})`)];
    const rows = testCases.map((testCase, index) => [
      `Test case ${index + 1}`,
      testCase.testCaseId,
      ...conditions.inputs.map(param => testCase.inputs[param.name])
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test_cases_${testId}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-900">Generated Test Cases</h3>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-[#DC6B4A] border border-[#DC6B4A] rounded-lg hover:bg-[#FFF9F5] transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Case
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Case ID
              </th>
              {conditions.inputs.map((param) => (
                <th key={param.name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {param.name} ({param.unit})
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testCases.map((testCase, index) => (
              <tr key={testCase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Test case {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {testCase.testCaseId}
                </td>
                {conditions.inputs.map((param) => (
                  <td key={param.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {testCase.inputs[param.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}