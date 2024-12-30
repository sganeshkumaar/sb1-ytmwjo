import React from 'react';
import { Search } from 'lucide-react';
import { Select } from 'antd';
import { ProcessCorner } from '../../../types/dut';

interface DUTFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedProcessCorner: ProcessCorner | 'all';
  onProcessCornerChange: (value: ProcessCorner | 'all') => void;
  selectedLotId: string | 'all';
  onLotIdChange: (value: string) => void;
  selectedWaferId: string | 'all';
  onWaferIdChange: (value: string) => void;
  lotIds: string[];
  waferIds: string[];
}

export function DUTFilters({
  searchQuery,
  onSearchChange,
  selectedProcessCorner,
  onProcessCornerChange,
  selectedLotId,
  onLotIdChange,
  selectedWaferId,
  onWaferIdChange,
  lotIds,
  waferIds
}: DUTFiltersProps) {
  const processCorners: ProcessCorner[] = [
    'Nominal',
    'Cold',
    'Mid Cold',
    'Strong',
    'Mid Strong'
  ];

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search DUTs..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select
        className="min-w-[180px]"
        placeholder="Process Corner"
        value={selectedProcessCorner}
        onChange={onProcessCornerChange}
      >
        <Select.Option value="all">All Process Corners</Select.Option>
        {processCorners.map(corner => (
          <Select.Option key={corner} value={corner}>{corner}</Select.Option>
        ))}
      </Select>

      <Select
        className="min-w-[180px]"
        placeholder="Lot ID"
        value={selectedLotId}
        onChange={onLotIdChange}
      >
        <Select.Option value="all">All Lot IDs</Select.Option>
        {lotIds.map(id => (
          <Select.Option key={id} value={id}>{id}</Select.Option>
        ))}
      </Select>

      <Select
        className="min-w-[180px]"
        placeholder="Wafer ID"
        value={selectedWaferId}
        onChange={onWaferIdChange}
      >
        <Select.Option value="all">All Wafer IDs</Select.Option>
        {waferIds.map(id => (
          <Select.Option key={id} value={id}>{id}</Select.Option>
        ))}
      </Select>
    </div>
  );
}