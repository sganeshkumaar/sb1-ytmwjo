import { Discussion, Comment, Attachment } from '../types/discussion';
import { mockDiscussions } from '../data/mockDiscussions';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock file upload function
const mockFileUpload = async (file: File): Promise<Attachment> => {
  await delay(1000); // Simulate upload time
  return {
    id: `att-${Date.now()}`,
    name: file.name,
    url: URL.createObjectURL(file),
    type: file.type,
    size: file.size
  };
};

// In-memory store to simulate database
let discussionsStore = [...mockDiscussions];

export const discussionsApi = {
  getDiscussions: async (): Promise<Discussion[]> => {
    await delay(500);
    return [...discussionsStore];
  },

  addDiscussion: async (discussion: Omit<Discussion, 'id' | 'createdAt'>, files?: File[]): Promise<Discussion> => {
    await delay(300);
    
    let attachments: Attachment[] | undefined;
    if (files?.length) {
      attachments = await Promise.all(files.map(mockFileUpload));
    }

    const newDiscussion: Discussion = {
      ...discussion,
      id: `disc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      attachments
    };
    
    discussionsStore = [...discussionsStore, newDiscussion];
    return newDiscussion;
  },

  addComment: async (discussionId: string, content: string, userId: string, files?: File[]): Promise<Comment> => {
    await delay(200);
    
    let attachments: Attachment[] | undefined;
    if (files?.length) {
      attachments = await Promise.all(files.map(mockFileUpload));
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId,
      content,
      createdAt: new Date().toISOString(),
      replies: [],
      attachments
    };

    discussionsStore = discussionsStore.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: [...disc.comments, newComment]
        };
      }
      return disc;
    });

    return newComment;
  },

  addReply: async (discussionId: string, commentId: string, content: string, userId: string, files?: File[]): Promise<Comment> => {
    await delay(200);
    
    let attachments: Attachment[] | undefined;
    if (files?.length) {
      attachments = await Promise.all(files.map(mockFileUpload));
    }

    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      userId,
      content,
      createdAt: new Date().toISOString(),
      attachments
    };

    discussionsStore = discussionsStore.map(disc => {
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
    });

    return newReply;
  },

  editComment: async (discussionId: string, commentId: string, content: string): Promise<void> => {
    await delay(200);
    discussionsStore = discussionsStore.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: disc.comments.map(comment =>
            comment.id === commentId ? { ...comment, content } : comment
          )
        };
      }
      return disc;
    });
  },

  deleteComment: async (discussionId: string, commentId: string): Promise<void> => {
    await delay(200);
    discussionsStore = discussionsStore.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: disc.comments.filter(comment => comment.id !== commentId)
        };
      }
      return disc;
    });
  }
};