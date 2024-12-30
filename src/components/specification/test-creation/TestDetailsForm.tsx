import React from 'react';
import { FormField } from './FormField';

interface TestDetailsFormProps {
  data: {
    testName: string;
    testId: string;
    description: string;
  };
  onChange: (updates: Partial<TestDetailsFormProps['data']>) => void;
}

export function TestDetailsForm({ data, onChange }: TestDetailsFormProps) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField
          label="Test"
          value={data.testName}
          onChange={(value) => onChange({ testName: value })}
          placeholder="Enter test name"
        />
        <FormField
          label="Test ID"
          value={data.testId}
          onChange={(value) => onChange({ testId: value })}
          placeholder="e.g., T00SP01"
          helperText="Format: T00SP01"
        />
      </div>

      <FormField
        label="Test Details"
        value={data.description}
        onChange={(value) => onChange({ description: value })}
        placeholder="Enter test details..."
        multiline
        rows={8}
      />
    </div>
  );
}