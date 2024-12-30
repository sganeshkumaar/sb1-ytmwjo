import React, { useState, useEffect } from 'react';
import { FormField } from '../../test-creation/FormField';
import { Condition } from '../../../../types/test';

interface ConditionFormProps {
  condition?: Condition;
  onSave: (condition: Omit<Condition, 'id'>) => void;
  onCancel: () => void;
}

export function ConditionForm({ condition, onSave, onCancel }: ConditionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: '',
    unit: ''
  });

  useEffect(() => {
    if (condition) {
      setFormData({
        name: condition.name,
        description: condition.description,
        value: condition.value || '',
        unit: condition.unit || ''
      });
    }
  }, [condition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Condition Name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
        placeholder="Enter condition name"
      />

      <FormField
        label="Description"
        value={formData.description}
        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
        placeholder="Enter condition description"
        multiline
        rows={4}
      />

      <div className="grid grid-cols-2 gap-6">
        <FormField
          label="Value"
          value={formData.value}
          onChange={(value) => setFormData(prev => ({ ...prev, value: value }))}
          placeholder="Enter value"
        />
        <FormField
          label="Unit"
          value={formData.unit}
          onChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
          placeholder="Enter unit (optional)"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#B24527] font-medium"
        >
          Save
        </button>
      </div>
    </form>
  );
}