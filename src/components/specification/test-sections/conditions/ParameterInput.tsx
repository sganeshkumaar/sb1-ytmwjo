import React from 'react';
import { ParameterType } from '../../../../types/test';

interface ParameterInputProps {
  type: ParameterType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ParameterInput({ type, value, onChange, placeholder }: ParameterInputProps) {
  const getPlaceholder = () => {
    if (type === 'Discrete') {
      return 'e.g., 23,24,25';
    }
    return 'e.g., 23,25,1 (start,end,step)';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow only numbers, commas, and dots
    if (/^[\d,.\s]*$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder || getPlaceholder()}
      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A]"
    />
  );
}