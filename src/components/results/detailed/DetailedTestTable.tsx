import React from 'react';
import { Download } from 'lucide-react';
import { TestResults } from '../../../types/detailedResults';
import { tableStyles } from './styles/tableStyles';
import { exportDetailedResultsToCSV } from '../../../utils/csvExport';

interface DetailedTestTableProps {
  results: TestResults;
}

export function DetailedTestTable({ results }: DetailedTestTableProps) {
  if (!results.headers || !results.data) {
    return (
      <div className="text-center py-8 text-gray-500">
        No test results available
      </div>
    );
  }

  const handleExport = () => {
    exportDetailedResultsToCSV(results);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-[#DC6B4A] border border-[#DC6B4A] rounded-lg hover:bg-[#FFF9F5] transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className={tableStyles.header.base}>
              <th className={tableStyles.header.testCase}>
                Test Case
              </th>
              {/* Conditional Parameters Group */}
              <th 
                colSpan={results.headers.conditions.params.length} 
                className={`${tableStyles.header.group.base} ${tableStyles.header.group.conditions}`}
              >
                {results.headers.conditions.title}
              </th>
              {/* Measurement Parameters Group */}
              <th 
                colSpan={results.headers.measurement.params.length} 
                className={`${tableStyles.header.group.base} ${tableStyles.header.group.measurement}`}
              >
                {results.headers.measurement.title}
              </th>
              <th className={tableStyles.header.testCase}>
                Result
              </th>
            </tr>
            <tr className={tableStyles.subHeader.base}>
              <th className={tableStyles.subHeader.testCase}></th>
              {/* Conditional Parameters */}
              {results.headers.conditions.params.map((header, index) => (
                <th 
                  key={header} 
                  className={`${tableStyles.subHeader.column.base} ${tableStyles.subHeader.column.conditions}`}
                >
                  {header}
                </th>
              ))}
              {/* Measurement Parameters */}
              {results.headers.measurement.params.map((header, index) => (
                <th 
                  key={header} 
                  className={`${tableStyles.subHeader.column.base} ${tableStyles.subHeader.column.measurement}`}
                >
                  {header}
                </th>
              ))}
              <th className={tableStyles.subHeader.testCase}></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  Test case {String(index + 1).padStart(2, '0')}
                </td>
                {/* Conditional Parameters */}
                {results.headers.conditions.params.map((header, paramIndex) => (
                  <td 
                    key={header} 
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${
                      paramIndex === results.headers.conditions.params.length - 1 ? 'border-r border-gray-200' : ''
                    }`}
                  >
                    {row.conditions[header]}
                  </td>
                ))}
                {/* Measurement Value */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium border-r border-gray-200">
                  {row.measurement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    row.result === 'Pass'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {row.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}