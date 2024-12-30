import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, CheckCircle2, Paperclip } from 'lucide-react';
import { Discussion } from '../../../../types/discussion';
import { Tag } from 'antd';

interface DiscussionItemProps {
  discussion: Discussion;
  onClick: () => void;
}

export function DiscussionItem({ discussion, onClick }: DiscussionItemProps) {
  return (
    <div 
      onClick={onClick}
      className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#DC6B4A] cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img
            src={discussion.author.avatar}
            alt={discussion.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-base font-medium text-gray-900">{discussion.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Started by {discussion.author.name} • {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {discussion.status === 'resolved' && (
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Resolved
            </span>
          )}
          <div className="flex items-center gap-2 text-gray-500">
            {discussion.comments.some(c => c.attachments?.length > 0) && (
              <span className="flex items-center gap-1 text-sm">
                <Paperclip className="w-4 h-4" />
                {discussion.comments.reduce((acc, c) => acc + (c.attachments?.length || 0), 0)}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm">
              <MessageCircle className="w-4 h-4" />
              {discussion.comments.length}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {discussion.tags.map(tag => (
          <Tag key={tag} color="blue">{tag}</Tag>
        ))}
      </div>
    </div>
  );
}