import React, { useState } from 'react';
import { useTestDetails } from '../../hooks/useTestDetails';

interface TestDetailsProps {
  testId: string;
}

export function TestDetails({ testId }: TestDetailsProps) {
  const { details, updateDetails } = useTestDetails(testId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(details.description);

  const handleSave = () => {
    updateDetails({ description: editedDescription });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1 max-w-2xl">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-500">Test ID</label>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                isEditing
                  ? 'text-white bg-[#DC6B4A] hover:bg-[#B24527]'
                  : 'text-[#DC6B4A] border border-[#DC6B4A] hover:bg-[#FFF9F5]'
              }`}
            >
              {isEditing ? 'Save changes' : 'Edit'}
            </button>
          </div>
          <p className="text-sm text-gray-900">{testId}</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Description</label>
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none"
            placeholder="Enter test description..."
          />
        ) : (
          <p className="text-sm text-gray-900">{details.description}</p>
        )}
      </div>
    </div>
  );
}