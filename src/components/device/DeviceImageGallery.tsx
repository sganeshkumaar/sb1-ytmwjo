import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { ImagePreviewModal } from './ImagePreviewModal';

interface DeviceImageGalleryProps {
  images: string[];
  isEditing: boolean;
  onUpload: () => void;
}

export function DeviceImageGallery({ images, isEditing, onUpload }: DeviceImageGalleryProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const defaultImage = 'https://w7.pngwing.com/pngs/731/688/png-transparent-cpu-processor-computer-technology-circuit-hardware-electronic-microchip-component-microprocessor.png';
  const currentImage = images[0] || defaultImage;
  
  return (
    <>
      <div className="relative w-full max-w-md aspect-square bg-white rounded-lg border border-gray-200">
        <img
          src={currentImage}
          alt="Device"
          className="w-full h-full object-contain p-4"
        />
        <button 
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsPreviewOpen(true)}
          aria-label="Maximize"
        >
          <Maximize2 className="w-5 h-5 text-gray-500" />
        </button>
        {isEditing && (
          <button
            onClick={onUpload}
            className="absolute bottom-4 left-4 px-4 py-2 text-sm text-[#DC6B4A] bg-white border border-[#DC6B4A] rounded-lg hover:bg-[#DC6B4A] hover:text-white transition-colors"
          >
            Upload images
          </button>
        )}
      </div>

      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={currentImage}
      />
    </>
  );
}