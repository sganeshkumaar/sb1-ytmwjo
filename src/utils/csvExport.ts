import { TestResults } from '../types/detailedResults';

export function exportDetailedResultsToCSV(results: TestResults): void {
  if (!results.headers || !results.data) return;

  // Create CSV header rows with clear groupings
  const headerRows = [
    // Group headers with separators
    [
      '=== Metadata ===', '',  // Metadata group
      '=== ' + results.headers.conditions.title + ' ===', ...Array(results.headers.conditions.params.length - 1).fill(''),  // Conditions group
      '=== ' + results.headers.measurement.title + ' ===', ...Array(results.headers.measurement.params.length - 1).fill(''),  // Measurements group
      '=== Result ==='  // Result group
    ].join(','),
    
    // Column names with group indicators
    [
      '[M] Test Case',
      '[M] Test Case ID',
      ...results.headers.conditions.params.map(param => `[C] ${param}`),
      ...results.headers.measurement.params.map(param => `[O] ${param}`),
      '[R] Result'
    ].join(','),
    
    // Separator row
    Array(results.headers.conditions.params.length + results.headers.measurement.params.length + 3).fill('---').join(',')
  ];

  // Create data rows
  const dataRows = results.data.map((row, index) => [
    `Test case ${String(index + 1).padStart(2, '0')}`,
    `TC${String(index + 1).padStart(2, '0')}`,
    ...Object.values(row.conditions),
    row.measurement,
    row.result
  ].join(','));

  // Combine all rows
  const csvContent = [...headerRows, ...dataRows].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `test_results_${new Date().toISOString().split('T')[0]}.csv`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}