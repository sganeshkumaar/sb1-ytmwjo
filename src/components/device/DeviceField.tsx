import React from 'react';

interface DeviceFieldProps {
  label: string;
  value: string;
  editable?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function DeviceField({ 
  label, 
  value, 
  isEditing = false,
  className = ''
}: DeviceFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <span className="text-sm text-gray-500">{label}</span>
      {isEditing ? (
        <input
          type="text"
          defaultValue={value}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A] outline-none"
        />
      ) : (
        <p className="text-sm text-gray-900">{value}</p>
      )}
    </div>
  );
}