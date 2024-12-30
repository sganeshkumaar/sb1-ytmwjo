import React from 'react';

interface DeviceHeaderProps {
  device: string;
  displayName: string;
  description: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onUpdateDescription?: (value: string) => void;
}

export function DeviceHeader({
  device,
  displayName,
  description,
  isEditing,
  onEdit,
  onSave,
  onUpdateDescription
}: DeviceHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-4 flex-1 max-w-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">{device}</h1>
          {isEditing ? (
            <input
              type="text"
              defaultValue={displayName}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A] outline-none"
            />
          ) : (
            <h2 className="text-gray-500">{displayName}</h2>
          )}
        </div>
        {isEditing ? (
          <textarea
            defaultValue={description}
            onChange={(e) => onUpdateDescription?.(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A] outline-none resize-none"
          />
        ) : (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
      <div className="ml-8">
        {isEditing ? (
          <button
            onClick={onSave}
            className="px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#B24527] transition-colors"
          >
            Save changes
          </button>
        ) : (
          <button
            onClick={onEdit}
            className="px-4 py-2 text-[#DC6B4A] border border-[#DC6B4A] rounded-lg hover:bg-[#DC6B4A] hover:text-white transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}