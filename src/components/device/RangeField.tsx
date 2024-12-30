import React from 'react';
import { ChevronDown } from 'lucide-react';

interface RangeFieldProps {
  label: string;
  fromValue: string;
  toValue: string;
  unit?: string;
  isEditing: boolean;
  onFromChange?: (value: string) => void;
  onToChange?: (value: string) => void;
  onUnitChange?: (unit: string) => void;
  availableUnits?: string[];
  className?: string;
}

export function RangeField({
  label,
  fromValue,
  toValue,
  unit = 'V',
  isEditing,
  onFromChange,
  onToChange,
  onUnitChange,
  availableUnits,
  className = ''
}: RangeFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm text-gray-500">{label}</label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">From</div>
          {isEditing ? (
            <div className="relative">
              <input
                type="text"
                value={fromValue}
                onChange={(e) => onFromChange?.(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A] outline-none pr-8"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-sm text-gray-500">{unit}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-900">{fromValue} {unit}</p>
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">To</div>
          {isEditing ? (
            <div className="relative">
              <input
                type="text"
                value={toValue}
                onChange={(e) => onToChange?.(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A] outline-none pr-8"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-sm text-gray-500">{unit}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-900">{toValue} {unit}</p>
          )}
        </div>
        {availableUnits && isEditing && (
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Unit</div>
            <div className="relative">
              <select
                value={unit}
                onChange={(e) => onUnitChange?.(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A] outline-none appearance-none bg-white"
              >
                {availableUnits.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}