import React from 'react';
import { DUTResultCard } from './dut/DUTResultCard';
import { DUTFilters } from './filters/DUTFilters';
import { OverallResults } from './overall/OverallResults';
import { ResultsLayout } from './layout/ResultsLayout';
import { useFilteredDUTs } from '../../hooks/useFilteredDUTs';
import { mockDUTResults } from '../../data/mockDUTResults';

export function DUTResultsOverview() {
  const {
    filteredDUTs,
    searchQuery,
    setSearchQuery,
    selectedProcessCorner,
    setSelectedProcessCorner,
    selectedLotId,
    setSelectedLotId,
    selectedWaferId,
    setSelectedWaferId,
    lotIds,
    waferIds
  } = useFilteredDUTs(mockDUTResults);

  const breadcrumbItems = [
    { label: 'Results' }
  ];

  return (
    <ResultsLayout
      breadcrumbItems={breadcrumbItems}
      title="Results"
    >
      <DUTFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProcessCorner={selectedProcessCorner}
        onProcessCornerChange={setSelectedProcessCorner}
        selectedLotId={selectedLotId}
        onLotIdChange={setSelectedLotId}
        selectedWaferId={selectedWaferId}
        onWaferIdChange={setSelectedWaferId}
        lotIds={lotIds}
        waferIds={waferIds}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
        {filteredDUTs.map((dut) => (
          <div key={dut.id} className="min-w-[350px] max-w-[600px] w-full">
            <DUTResultCard dut={dut} />
          </div>
        ))}
      </div>

      <OverallResults />
    </ResultsLayout>
  );
}