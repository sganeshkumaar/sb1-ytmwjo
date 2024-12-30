import { useState, useEffect } from 'react';
import { DeviceDetails, DeviceState } from '../types/device';
import { useProject } from '../context/ProjectContext';
import { defaultDeviceData, mockDeviceDataMap } from '../data/mockDeviceData';

export function useDeviceDetails(deviceId: string) {
  const { currentProject } = useProject();
  const [deviceState, setDeviceState] = useState<DeviceState>({
    ...defaultDeviceData,
    isEditing: false
  });

  useEffect(() => {
    if (currentProject) {
      const mockData = mockDeviceDataMap[currentProject.device] || defaultDeviceData;
      setDeviceState(prev => ({
        ...mockData,
        isEditing: prev.isEditing
      }));
    }
  }, [currentProject]);

  const toggleEditMode = () => {
    setDeviceState(prev => ({
      ...prev,
      isEditing: !prev.isEditing
    }));
  };

  const updateDeviceDetails = (updates: Partial<DeviceDetails>) => {
    setDeviceState(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleSave = async () => {
    // Mock API call to save changes
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleEditMode();
  };

  const handleUploadImage = async (file: File) => {
    // Mock image upload
    const imageUrl = URL.createObjectURL(file);
    setDeviceState(prev => ({
      ...prev,
      images: [imageUrl, ...prev.images]
    }));
  };

  const handleUploadDocument = async (file: File) => {
    // Mock document upload
    const newDoc = {
      id: Date.now().toString(),
      name: file.name,
      url: '#'
    };
    setDeviceState(prev => ({
      ...prev,
      documents: [...prev.documents, newDoc]
    }));
  };

  return {
    deviceState,
    toggleEditMode,
    updateDeviceDetails,
    handleSave,
    handleUploadImage,
    handleUploadDocument
  };
}