import React from 'react';
import { SpecVersion } from '../../../types/specification';

interface VersionBadgeProps {
  version: SpecVersion;
  className?: string;
}

export function VersionBadge({ version, className = '' }: VersionBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ${className}`}>
      v{version.major}.{version.minor}.{version.patch}
    </span>
  );
}