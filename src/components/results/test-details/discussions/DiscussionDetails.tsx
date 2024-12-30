import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Tag } from 'antd';
import { Discussion } from '../../../../types/discussion';
import { CommentItem } from './CommentItem';
import { RichTextEditor } from './RichTextEditor';

interface DiscussionDetailsProps {
  discussion: Discussion;
  onBack: () => void;
  onAddComment: (discussionId: string, content: string, files?: File[]) => void;
  onEditComment: (discussionId: string, commentId: string, content: string) => void;
  onDeleteComment: (discussionId: string, commentId: string) => void;
  onReply: (discussionId: string, commentId: string, content: string, files?: File[]) => void;
}

export function DiscussionDetails({
  discussion,
  onBack,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onReply
}: DiscussionDetailsProps) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (files?: File[]) => {
    if (newComment.trim()) {
      onAddComment(discussion.id, newComment.trim(), files);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to discussions
      </button>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={discussion.author.avatar}
            alt={discussion.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{discussion.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">
                {discussion.author.name} opened this discussion {' '}
                {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-gray-500 text-sm">
                <MessageCircle className="w-4 h-4" />
                {discussion.comments.length} comments
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {discussion.tags.map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-900">{discussion.content}</p>
        </div>

        <div className="space-y-4">
          {discussion.comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              discussionId={discussion.id}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
              onReply={onReply}
            />
          ))}
        </div>

        <div className="mt-6">
          <RichTextEditor
            value={newComment}
            onChange={setNewComment}
            onSubmit={handleAddComment}
            placeholder="Write a comment..."
            submitText="Comment"
          />
        </div>
      </div>
    </div>
  );
}