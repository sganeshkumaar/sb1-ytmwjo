import { useState, useCallback } from 'react';
import { message } from 'antd';
import { discussionsApi } from '../api/discussions';
import { Discussion } from '../types/discussion';

export function useDiscussionActions(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const handleAction = useCallback(async (
    action: () => Promise<any>,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      setLoading(true);
      await action();
      message.success(successMessage);
      onSuccess?.();
    } catch (err) {
      message.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const addComment = useCallback((discussionId: string, content: string, userId: string) => {
    return handleAction(
      () => discussionsApi.addComment(discussionId, content, userId),
      'Comment added successfully',
      'Failed to add comment'
    );
  }, [handleAction]);

  const editComment = useCallback((discussionId: string, commentId: string, content: string) => {
    return handleAction(
      () => discussionsApi.editComment(discussionId, commentId, content),
      'Comment updated successfully',
      'Failed to update comment'
    );
  }, [handleAction]);

  const deleteComment = useCallback((discussionId: string, commentId: string) => {
    return handleAction(
      () => discussionsApi.deleteComment(discussionId, commentId),
      'Comment deleted successfully',
      'Failed to delete comment'
    );
  }, [handleAction]);

  const createDiscussion = useCallback((discussion: Omit<Discussion, 'id' | 'createdAt'>) => {
    return handleAction(
      () => discussionsApi.addDiscussion(discussion),
      'Discussion created successfully',
      'Failed to create discussion'
    );
  }, [handleAction]);

  return {
    loading,
    addComment,
    editComment,
    deleteComment,
    createDiscussion
  };
}