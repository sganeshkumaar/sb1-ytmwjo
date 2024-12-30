import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@mui/material';

interface UploadButtonProps {
  onUpload: (file: File) => void;
  accept?: string;
  label?: string;
}

export function UploadButton({ onUpload, accept = '.csv,.xlsx,.xls', label = 'Upload results' }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Upload className="h-4 w-4" />}
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }}
      >
        {label}
      </Button>
    </>
  );
}