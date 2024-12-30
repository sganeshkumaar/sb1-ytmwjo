import React, { useState, useEffect } from 'react';
import { useTestDetails } from '../../../hooks/useTestDetails';
import { OutputParameterDisplay } from '../../common/test-details/OutputParameterDisplay';
import { TestCondition } from '../../../types/test';

interface SpecificationDetailsProps {
  testId: string;
  testName: string;
  conditions: TestCondition[];
  onUpdateTest: (updates: { testId: string; testName: string; description: string }) => void;
}

export function SpecificationDetails({ 
  testId, 
  testName,
  conditions,
  onUpdateTest 
}: SpecificationDetailsProps) {
  const { details, updateDetails } = useTestDetails(testId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(details.description);

  useEffect(() => {
    setEditedDescription(details.description);
  }, [details.description]);

  const handleSave = () => {
    updateDetails({ description: editedDescription });
    onUpdateTest({
      testId,
      testName,
      description: editedDescription
    });
    setIsEditing(false);
  };

  const outputParameter = conditions?.[0]?.outputs?.[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
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

      {outputParameter && (
        <OutputParameterDisplay
          parameter={{
            name: outputParameter.name,
            min: outputParameter.min,
            max: outputParameter.max,
            unit: outputParameter.unit
          }}
        />
      )}

      <div className="space-y-2">
        <label className="text-sm text-gray-500">Description</label>
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A]"
            placeholder="Enter test description..."
          />
        ) : (
          <div className="w-full px-4 py-3 text-sm bg-gray-50 rounded-lg whitespace-pre-wrap">
            {details.description || 'No description available.'}
          </div>
        )}
      </div>
    </div>
  );
}