import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@mui/material';
import { useSpecFileUpload } from '../hooks/useSpecFileUpload';

export function SpecificationHeader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileUpload } = useSpecFileUpload();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-none px-6 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Specification</h1>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Upload className="h-4 w-4" />}
            onClick={handleUploadClick}
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
  );
}