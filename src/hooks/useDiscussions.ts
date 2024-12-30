import { useState, useCallback, useEffect } from 'react';
import { Discussion } from '../types/discussion';
import { discussionsApi } from '../api/discussions';

export function useDiscussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await discussionsApi.getDiscussions();
      setDiscussions(data);
    } catch (err) {
      setError('Failed to fetch discussions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  const addDiscussion = useCallback(async (discussion: Omit<Discussion, 'id' | 'createdAt'>) => {
    const newDiscussion = await discussionsApi.addDiscussion(discussion);
    setDiscussions(prev => [...prev, newDiscussion]);
    return newDiscussion;
  }, []);

  const addComment = useCallback(async (discussionId: string, content: string, userId: string) => {
    const newComment = await discussionsApi.addComment(discussionId, content, userId);
    setDiscussions(prev => prev.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: [...disc.comments, newComment]
        };
      }
      return disc;
    }));
    return newComment;
  }, []);

  const addReply = useCallback(async (discussionId: string, commentId: string, content: string, userId: string) => {
    const newReply = await discussionsApi.addReply(discussionId, commentId, content, userId);
    setDiscussions(prev => prev.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: disc.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
              };
            }
            return comment;
          })
        };
      }
      return disc;
    }));
    return newReply;
  }, []);

  const editComment = useCallback(async (discussionId: string, commentId: string, content: string) => {
    await discussionsApi.editComment(discussionId, commentId, content);
    setDiscussions(prev => prev.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: disc.comments.map(comment =>
            comment.id === commentId ? { ...comment, content } : comment
          )
        };
      }
      return disc;
    }));
  }, []);

  const deleteComment = useCallback(async (discussionId: string, commentId: string) => {
    await discussionsApi.deleteComment(discussionId, commentId);
    setDiscussions(prev => prev.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: disc.comments.filter(comment => comment.id !== commentId)
        };
      }
      return disc;
    }));
  }, []);

  return {
    discussions,
    loading,
    error,
    addDiscussion,
    addComment,
    addReply,
    editComment,
    deleteComment
  };
}