import React from 'react';
import { ParameterType } from '../../../../types/test';

interface ParameterTypeSelectProps {
  value: ParameterType;
  onChange: (value: ParameterType) => void;
}

export function ParameterTypeSelect({ value, onChange }: ParameterTypeSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ParameterType)}
      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A]"
    >
      <option value="Discrete">Discrete</option>
      <option value="Range">Range</option>
    </select>
  );
}