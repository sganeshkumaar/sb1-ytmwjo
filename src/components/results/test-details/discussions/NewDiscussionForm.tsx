import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { RichTextEditor } from './RichTextEditor';

interface NewDiscussionFormProps {
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
}

export function NewDiscussionForm({ onSubmit, onCancel }: NewDiscussionFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Discussion title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg font-medium"
      />
      
      <RichTextEditor
        value={content}
        onChange={setContent}
        onSubmit={handleSubmit}
        placeholder="What would you like to discuss?"
        submitText="Create Discussion"
      />

      <div className="flex justify-end gap-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
        >
          Create Discussion
        </Button>
      </div>
    </div>
  );
}