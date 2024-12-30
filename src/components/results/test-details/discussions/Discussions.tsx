import React, { useState } from 'react';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { Discussion } from '../../../../types/discussion';
import { DiscussionList } from './DiscussionList';
import { DiscussionDetails } from './DiscussionDetails';
import { NewDiscussionForm } from './NewDiscussionForm';
import { useDiscussions } from '../../../../hooks/useDiscussions';

export function Discussions() {
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [isCreatingDiscussion, setIsCreatingDiscussion] = useState(false);
  const {
    discussions,
    loading,
    error,
    addDiscussion,
    addComment,
    editComment,
    deleteComment,
    addReply
  } = useDiscussions();

  const handleCreateDiscussion = async (title: string, content: string, files?: File[]) => {
    const newDiscussion = await addDiscussion({
      title,
      content,
      author: {
        id: 'user-1',
        name: 'Tim Martin',
        avatar: 'https://i.pravatar.cc/150?u=tim'
      },
      status: 'open',
      tags: [],
      comments: []
    }, files);
    setSelectedDiscussion(newDiscussion);
    setIsCreatingDiscussion(false);
  };

  const handleAddComment = async (discussionId: string, content: string, files?: File[]) => {
    const newComment = await addComment(discussionId, content, 'user-1', files);
    setSelectedDiscussion(prev => prev && {
      ...prev,
      comments: [...prev.comments, newComment]
    });
  };

  const handleEditComment = async (discussionId: string, commentId: string, content: string) => {
    await editComment(discussionId, commentId, content);
    setSelectedDiscussion(prev => prev && {
      ...prev,
      comments: prev.comments.map(comment =>
        comment.id === commentId ? { ...comment, content } : comment
      )
    });
  };

  const handleDeleteComment = async (discussionId: string, commentId: string) => {
    await deleteComment(discussionId, commentId);
    setSelectedDiscussion(prev => prev && {
      ...prev,
      comments: prev.comments.filter(comment => comment.id !== commentId)
    });
  };

  const handleReply = async (discussionId: string, commentId: string, content: string, files?: File[]) => {
    const newReply = await addReply(discussionId, commentId, content, 'user-1', files);
    setSelectedDiscussion(prev => prev && {
      ...prev,
      comments: prev.comments.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : comment
      )
    });
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading discussions...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-8">{error}</div>;
  }

  if (isCreatingDiscussion) {
    return (
      <div className="max-w-4xl">
        <NewDiscussionForm
          onSubmit={handleCreateDiscussion}
          onCancel={() => setIsCreatingDiscussion(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {selectedDiscussion ? (
        <DiscussionDetails
          discussion={selectedDiscussion}
          onBack={() => setSelectedDiscussion(null)}
          onAddComment={handleAddComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
          onReply={handleReply}
        />
      ) : (
        <>
          <div className="flex justify-end items-end w-full mb-6">
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreatingDiscussion(true)}
            >
              New Discussion
            </Button>
          </div>
          <DiscussionList
            discussions={discussions}
            onDiscussionClick={setSelectedDiscussion}
          />
        </>
      )}
    </div>
  );
}