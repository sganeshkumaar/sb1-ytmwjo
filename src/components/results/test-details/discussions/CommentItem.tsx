import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Trash2, MessageCircle, Paperclip } from 'lucide-react';
import { Button, Popconfirm } from 'antd';
import { Comment, Attachment } from '../../../../types/discussion';
import { RichTextEditor } from './RichTextEditor';

interface CommentItemProps {
  comment: Comment;
  discussionId: string;
  onEdit: (discussionId: string, commentId: string, content: string) => void;
  onDelete: (discussionId: string, commentId: string) => void;
  onReply: (discussionId: string, commentId: string, content: string, files?: File[]) => void;
}

export function CommentItem({
  comment,
  discussionId,
  onEdit,
  onDelete,
  onReply
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState('');

  const handleSave = () => {
    onEdit(discussionId, comment.id, editedContent);
    setIsEditing(false);
  };

  const handleReply = (files?: File[]) => {
    if (replyContent.trim() || files?.length) {
      onReply(discussionId, comment.id, replyContent, files);
      setIsReplying(false);
      setReplyContent('');
    }
  };

  const renderAttachments = (attachments?: Attachment[]) => {
    if (!attachments?.length) return null;

    return (
      <div className="mt-2 space-y-2">
        {attachments.map(file => (
          <a
            key={file.id}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg w-fit"
          >
            <Paperclip className="w-4 h-4" />
            <span className="truncate max-w-xs">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="pl-4 border-l-2 border-gray-200">
      <div className="mt-4">
        {isEditing ? (
          <RichTextEditor
            value={editedContent}
            onChange={setEditedContent}
            onSubmit={handleSave}
            submitText="Save"
            attachments={comment.attachments}
          />
        ) : (
          <div className="group">
            <p className="text-sm text-gray-900">{comment.content}</p>
            {renderAttachments(comment.attachments)}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
              <div className="hidden group-hover:flex items-center gap-2">
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-gray-400 hover:text-gray-600 flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  Reply
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <Popconfirm
                  title="Delete comment"
                  description="Are you sure you want to delete this comment?"
                  onConfirm={() => onDelete(discussionId, comment.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        )}

        {isReplying && (
          <div className="mt-3 ml-4">
            <RichTextEditor
              value={replyContent}
              onChange={setReplyContent}
              onSubmit={handleReply}
              submitText="Reply"
              placeholder="Write a reply..."
            />
          </div>
        )}
      </div>

      {comment.replies?.map(reply => (
        <div key={reply.id} className="ml-8 mt-3 border-l-2 border-gray-100 pl-4">
          <p className="text-sm text-gray-900">{reply.content}</p>
          {renderAttachments(reply.attachments)}
          <span className="text-xs text-gray-500 mt-2 inline-block">
            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
          </span>
        </div>
      ))}
    </div>
  );
}