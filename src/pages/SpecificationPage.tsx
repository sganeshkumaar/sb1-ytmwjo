import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@mui/material';
import { TestGroupAccordion } from '../components/specification/TestGroupAccordion';
import { TestContent } from '../components/specification/TestContent';
import { TestCreationForm } from '../components/specification/test-creation/TestCreationForm';
import { EmptyTestState } from '../components/common/EmptyTestState';
import { useTestGroups } from '../hooks/useTestGroups';
import { Test } from '../types/test';

export function SpecificationPage() {
  const [selectedTest, setSelectedTest] = useState<{ id: string; name: string } | null>(null);
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleCreateTest: createTest } = useTestGroups();

  const handleUploadSpec = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
    event.target.value = '';
  };

  const handleInitiateTestCreation = (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsCreatingTest(true);
  };

  const handleSaveTest = (data: { testId: string; testName: string; description: string }) => {
    if (selectedGroupId) {
      const newTest: Test = {
        id: data.testId,
        name: data.testName,
        description: data.description
      };
      createTest(selectedGroupId, newTest);
      setIsCreatingTest(false);
      setSelectedGroupId(null);
    }
  };

  const handleCancelTestCreation = () => {
    setIsCreatingTest(false);
    setSelectedGroupId(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-6 pt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Specification</h1>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Upload className="h-4 w-4" />}
              onClick={handleUploadSpec}
              sx={{
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              Upload spec
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 min-h-0 gap-1">
        <TestGroupAccordion 
          onTestSelect={setSelectedTest}
          onCreateTest={handleInitiateTestCreation}
        />
        <div className="flex-1 overflow-auto">
          {isCreatingTest && selectedGroupId ? (
            <TestCreationForm
              groupId={selectedGroupId}
              onSave={handleSaveTest}
              onCancel={handleCancelTestCreation}
            />
          ) : selectedTest ? (
            <TestContent testName={selectedTest.name} testId={selectedTest.id} />
          ) : (
            <EmptyTestState
              message="No test selected"
              description="Choose a test from the list to view its specifications"
            />
          )}
        </div>
      </div>
    </div>
  );
}