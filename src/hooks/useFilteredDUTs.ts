import { useState, useMemo } from 'react';
import { DUTResult, ProcessCorner } from '../types/dut';

export function useFilteredDUTs(duts: DUTResult[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcessCorner, setSelectedProcessCorner] = useState<ProcessCorner | 'all'>('all');
  const [selectedLotId, setSelectedLotId] = useState<string>('all');
  const [selectedWaferId, setSelectedWaferId] = useState<string>('all');

  // Get unique Lot IDs and Wafer IDs
  const lotIds = useMemo(() => 
    Array.from(new Set(duts.map(dut => dut.lotId))).sort(),
    [duts]
  );

  const waferIds = useMemo(() => 
    Array.from(new Set(duts.map(dut => dut.waferId))).sort(),
    [duts]
  );

  // Filter DUTs based on all criteria
  const filteredDUTs = useMemo(() => {
    return duts.filter(dut => {
      const matchesSearch = dut.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProcessCorner = selectedProcessCorner === 'all' || dut.processCorner === selectedProcessCorner;
      const matchesLotId = selectedLotId === 'all' || dut.lotId === selectedLotId;
      const matchesWaferId = selectedWaferId === 'all' || dut.waferId === selectedWaferId;

      return matchesSearch && matchesProcessCorner && matchesLotId && matchesWaferId;
    });
  }, [duts, searchQuery, selectedProcessCorner, selectedLotId, selectedWaferId]);

  return {
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
  };
}