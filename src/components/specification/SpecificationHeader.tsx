import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@mui/material';
import { VersionBadge } from './version/VersionBadge';
import { PublishChangesDialog } from './version/PublishChangesDialog';
import { useSpecVersioning } from '../../hooks/useSpecVersioning';

export function SpecificationHeader() {
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const { 
    currentVersion, 
    unpublishedChanges,
    publishChanges 
  } = useSpecVersioning();

  const handlePublish = (selectedChanges: UnpublishedChange[]) => {
    publishChanges(selectedChanges);
    setIsPublishDialogOpen(false);
  };

  return (
    <div className="flex-none px-6 pt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Specification</h1>
          <VersionBadge version={currentVersion} />
        </div>
        <div className="flex items-center gap-3">
          {unpublishedChanges.length > 0 && (
            <Button
              variant="outlined"
              onClick={() => setIsPublishDialogOpen(true)}
              sx={{
                borderColor: '#DC6B4A',
                color: '#DC6B4A',
                '&:hover': {
                  borderColor: '#B24527',
                  backgroundColor: '#FFF9F5'
                }
              }}
            >
              Publish Changes ({unpublishedChanges.length})
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<Upload className="h-4 w-4" />}
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

      <PublishChangesDialog
        open={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        changes={unpublishedChanges}
        onPublish={handlePublish}
      />
    </div>
  );
}