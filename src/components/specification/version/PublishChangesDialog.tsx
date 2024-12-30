import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import { X } from 'lucide-react';
import { UnpublishedChange, ChangeLevel } from '../../../types/specification';

interface PublishChangesDialogProps {
  open: boolean;
  onClose: () => void;
  changes: UnpublishedChange[];
  onPublish: (selectedChanges: UnpublishedChange[]) => void;
}

export function PublishChangesDialog({
  open,
  onClose,
  changes,
  onPublish
}: PublishChangesDialogProps) {
  const [selectedChanges, setSelectedChanges] = useState<UnpublishedChange[]>(changes);

  const getChangesForLevel = (level: ChangeLevel) => 
    selectedChanges.filter(change => change.level === level);

  const handleToggleChange = (changeId: string) => {
    setSelectedChanges(prev => 
      prev.map(change => 
        change.id === changeId 
          ? { ...change, selected: !change.selected }
          : change
      )
    );
  };

  const renderChangeList = (levelChanges: UnpublishedChange[]) => (
    <div className="space-y-3">
      {levelChanges.map(change => (
        <div key={change.id} className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={change.selected}
            onChange={() => handleToggleChange(change.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-900">{change.description}</p>
            {change.previousValue && change.newValue && (
              <div className="mt-1 text-xs">
                <span className="text-red-500 line-through">{change.previousValue}</span>
                <span className="mx-2">→</span>
                <span className="text-green-500">{change.newValue}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '24px'
        }
      }}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Publish Specification Changes</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Test Level Changes */}
          {getChangesForLevel('test').length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Test Level Changes</h3>
              {renderChangeList(getChangesForLevel('test'))}
            </div>
          )}

          {/* Parameter Level Changes */}
          {getChangesForLevel('parameter').length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Parameter Level Changes</h3>
              {renderChangeList(getChangesForLevel('parameter'))}
            </div>
          )}

          {/* Value Level Changes */}
          {getChangesForLevel('value').length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Value Level Changes</h3>
              {renderChangeList(getChangesForLevel('value'))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onPublish(selectedChanges.filter(c => c.selected))}
            className="px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#B24527]"
          >
            Publish Selected Changes
          </button>
        </div>
      </div>
    </Dialog>
  );
}