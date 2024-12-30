import React, { useState } from 'react';
import { Mentions, Button } from 'antd';
import { FileUpload } from './FileUpload';
import { Attachment } from '../../../../types/discussion';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (files?: File[]) => void;
  placeholder?: string;
  submitText?: string;
  minRows?: number;
  disabled?: boolean;
  attachments?: Attachment[];
}

export function RichTextEditor({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type your message...',
  submitText = 'Submit',
  minRows = 3,
  disabled = false,
  attachments = []
}: RichTextEditorProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [clearFiles, setClearFiles] = useState(false);

  const handleFileUpload = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    onSubmit(files);
    setFiles([]);
    setClearFiles(true);
  };

  const handleMentionChange = (text: string) => {
    const cleanedText = text.replace(/@@/g, '@');
    onChange(cleanedText);
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Mentions
        value={value}
        onChange={handleMentionChange}
        autoSize={{ minRows }}
        placeholder={`${placeholder} (Type @ to mention someone)`}
        prefix={['@']}
        options={[
          { value: 'john', label: 'John Smith' },
          { value: 'emily', label: 'Emily Chen' },
          { value: 'tim', label: 'Tim Martin' }
        ]}
        disabled={disabled}
        split=" "
      />
      <div className="flex items-center justify-between">
        <FileUpload
          onUpload={handleFileUpload}
          attachments={attachments}
          disabled={disabled}
          clearFiles={clearFiles}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={disabled || (!value.trim() && files.length === 0)}
        >
          {submitText}
        </Button>
      </div>
    </div>
  );
}