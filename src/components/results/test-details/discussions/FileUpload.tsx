import React, { useState, useEffect } from 'react';
import { Upload, Button } from 'antd';
import { Paperclip } from 'lucide-react';
import { Attachment } from '../../../../types/discussion';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  attachments?: Attachment[];
  disabled?: boolean;
  clearFiles?: boolean;
}

export function FileUpload({ 
  onUpload, 
  attachments = [], 
  disabled = false,
  clearFiles = false 
}: FileUploadProps) {
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (clearFiles) {
      setFileList([]);
    }
  }, [clearFiles]);

  useEffect(() => {
    if (attachments.length > 0) {
      setFileList(attachments.map(file => ({
        uid: file.id,
        name: file.name,
        status: 'done',
        url: file.url,
        type: file.type,
        size: file.size
      })));
    }
  }, [attachments]);

  const handleChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    const files = newFileList.map((file: any) => file.originFileObj).filter(Boolean);
    onUpload(files);
  };

  return (
    <Upload
      multiple
      fileList={fileList}
      beforeUpload={(file) => {
        // Create preview URL for images
        if (file.type.startsWith('image/')) {
          file.preview = URL.createObjectURL(file);
        }
        return false; // Prevent auto upload
      }}
      onChange={handleChange}
      disabled={disabled}
      onRemove={(file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
        onUpload(newFileList.map(f => f.originFileObj).filter(Boolean));
        
        // Clean up preview URL
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      }}
      maxCount={5}
      accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx"
    >
      <Button icon={<Paperclip className="w-4 h-4" />}>
        Attach files
      </Button>
    </Upload>
  );
}