import React, { useState } from 'react';
import { TabNavigation } from '../../device-details/TabNavigation';
import { TestDetailsForm } from './TestDetailsForm';
import { TestCasesForm } from './TestCasesForm';

const tabs = [
  { id: 'details', label: 'Details' },
  { id: 'test-cases', label: 'Test Cases' }
];

interface TestCreationFormProps {
  groupId: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function TestCreationForm({ groupId, onSave, onCancel }: TestCreationFormProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    testName: '',
    testId: '',
    description: ''
  });

  const handleFormChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.testName.trim() || !formData.testId.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate test ID format
    const testIdPattern = /^T\d{2}SP\d{2}$/;
    if (!testIdPattern.test(formData.testId)) {
      alert('Test ID must follow the format T00SP01');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-none px-6 pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">New Test</h2>
          <div className="space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#B24527] font-medium"
            >
              Save changes
            </button>
          </div>
        </div>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'details' && (
          <TestDetailsForm
            data={formData}
            onChange={handleFormChange}
          />
        )}
        {activeTab === 'test-cases' && (
          <TestCasesForm />
        )}
      </div>
    </div>
  );
}