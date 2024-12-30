import React, { useState } from 'react';
import { LogOut, Settings, User, HelpCircle } from 'lucide-react';
import { Popover, Avatar, Divider } from 'antd';

interface ProfileMenuProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function ProfileMenu({ user }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="w-64 py-2">
      <div className="px-4 py-2">
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <Divider className="my-2" />
      <div className="py-1">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <User className="w-4 h-4" />
          Your Profile
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Help & Support
        </button>
      </div>
      <Divider className="my-2" />
      <div className="py-1">
        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      arrow={false}
    >
      <button className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 transition-colors">
        <Avatar src={user.avatar} size={32} />
      </button>
    </Popover>
  );
}