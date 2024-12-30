import { ChangeEvent } from 'react';

export function useSpecFileUpload() {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock file upload - in a real app, this would handle the file
      console.log('Selected file:', file.name);
    }
    // Reset the input
    event.target.value = '';
  };

  return { handleFileUpload };
}