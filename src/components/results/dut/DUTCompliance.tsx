import React from 'react';
import { CircularProgress } from '@mui/material';

interface DUTComplianceProps {
  value: number;
}

export function DUTCompliance({ value }: DUTComplianceProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-900">Compliance: {value}%</span>
      <CircularProgress
        variant="determinate"
        value={value}
        size={20}
        thickness={4}
        sx={{
          color: '#22C55E',
          '.MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
    </div>
  );
}