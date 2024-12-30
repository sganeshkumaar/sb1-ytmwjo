import React, { useState } from 'react';
import { Dialog, IconButton } from '@mui/material';
import { X } from 'lucide-react';

interface CreateTestDialogProps {
  open: boolean;
  groupId: string | null;
  onClose: () => void;
  onCreateTest: (groupId: string, name: string) => void;
}

export function CreateTestDialog({ open, groupId, onClose, onCreateTest }: CreateTestDialogProps) {
  const [testName, setTestName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testName.trim() && groupId) {
      onCreateTest(groupId, testName.trim());
      setTestName('');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '24px'
        }
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Create Test</h2>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#64748B',
            '&:hover': {
              backgroundColor: '#F1F5F9'
            }
          }}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Test Name
          </label>
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Enter test name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#C85E41] font-medium"
          >
            Create
          </button>
        </div>
      </form>
    </Dialog>
  );
}