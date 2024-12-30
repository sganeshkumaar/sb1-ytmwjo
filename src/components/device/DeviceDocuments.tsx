import React from 'react';
import { FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  url: string;
}

interface DeviceDocumentsProps {
  documents: Document[];
  isEditing: boolean;
  onUpload: () => void;
}

export function DeviceDocuments({ documents, isEditing, onUpload }: DeviceDocumentsProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm text-gray-500">Upload documents</label>
      <div className="space-y-2">
        {documents.map(doc => (
          <a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#DC6B4A] hover:text-[#B24527] transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm">{doc.name}</span>
          </a>
        ))}
        {isEditing && (
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Upload documents"
              className="flex-1 px-3 py-2 text-sm border border-r-0 border-gray-300 rounded-l-lg focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A] outline-none"
              readOnly
            />
            <button
              onClick={onUpload}
              className="px-4 py-2 text-sm border border-gray-300 rounded-r-lg bg-white hover:bg-gray-50 transition-colors"
            >
              Browse
            </button>
          </div>
        )}
      </div>
    </div>
  );
}