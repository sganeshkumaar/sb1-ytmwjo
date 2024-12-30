import React from 'react';
import { Discussion } from '../../../../types/discussion';
import { DiscussionItem } from './DiscussionItem';

interface DiscussionListProps {
  discussions: Discussion[];
  onDiscussionClick: (discussion: Discussion) => void;
}

export function DiscussionList({ discussions, onDiscussionClick }: DiscussionListProps) {
  return (
    <div className="space-y-4">
      {discussions.map(discussion => (
        <DiscussionItem
          key={discussion.id}
          discussion={discussion}
          onClick={() => onDiscussionClick(discussion)}
        />
      ))}
    </div>
  );
}