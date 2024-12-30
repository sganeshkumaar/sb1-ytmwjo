import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TabNavigation } from '../components/device-details/TabNavigation';
import { DeviceHeader } from '../components/device/DeviceHeader';
import { DeviceImageGallery } from '../components/device/DeviceImageGallery';
import { DeviceField } from '../components/device/DeviceField';
import { RangeField } from '../components/device/RangeField';
import { DeviceDocuments } from '../components/device/DeviceDocuments';
import { DUTsSection } from '../components/device-details/DUTsSection';
import { useDeviceDetails } from '../hooks/useDeviceDetails';

const tabs = [
  { id: 'device', label: 'Device' },
  { id: 'duts', label: 'DUTs' }
];

export function DeviceDetailsPage() {
  const { deviceId = '' } = useParams();
  const [activeTab, setActiveTab] = useState('device');
  const {
    deviceState,
    toggleEditMode,
    updateDeviceDetails,
    handleSave,
    handleUploadImage,
    handleUploadDocument
  } = useDeviceDetails(deviceId);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };

  const handleDocumentUploadClick = () => {
    documentInputRef.current?.click();
  };

  const handleDescriptionUpdate = (value: string) => {
    updateDeviceDetails({ shortDescription: value });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-6 pt-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Device Details</h1>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      {activeTab === 'device' ? (
        <div className="flex-1 p-6 space-y-8">
          <DeviceHeader
            device={deviceState.device}
            displayName={deviceState.displayName}
            description={deviceState.shortDescription}
            isEditing={deviceState.isEditing}
            onEdit={toggleEditMode}
            onSave={handleSave}
            onUpdateDescription={handleDescriptionUpdate}
          />

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5">
              <DeviceImageGallery
                images={deviceState.images}
                isEditing={deviceState.isEditing}
                onUpload={handleImageUploadClick}
              />
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadImage(file);
                }}
              />
            </div>

            <div className="col-span-7 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <RangeField
                    label="Input Voltage Range"
                    fromValue={deviceState.inputVoltageRange.from}
                    toValue={deviceState.inputVoltageRange.to}
                    unit="V"
                    isEditing={deviceState.isEditing}
                    onFromChange={(value) => updateDeviceDetails({
                      inputVoltageRange: {
                        ...deviceState.inputVoltageRange,
                        from: value
                      }
                    })}
                    onToChange={(value) => updateDeviceDetails({
                      inputVoltageRange: {
                        ...deviceState.inputVoltageRange,
                        to: value
                      }
                    })}
                  />
                  <DeviceField
                    label="Charging current"
                    value={deviceState.chargingCurrent}
                    isEditing={deviceState.isEditing}
                  />
                  <DeviceField
                    label="Quiescent current"
                    value={deviceState.quiescentCurrent}
                    isEditing={deviceState.isEditing}
                  />
                  <RangeField
                    label="Operating temp. range"
                    fromValue={deviceState.operatingTempRange.from}
                    toValue={deviceState.operatingTempRange.to}
                    unit={deviceState.operatingTempRange.unit}
                    isEditing={deviceState.isEditing}
                    onFromChange={(value) => updateDeviceDetails({
                      operatingTempRange: {
                        ...deviceState.operatingTempRange,
                        from: value
                      }
                    })}
                    onToChange={(value) => updateDeviceDetails({
                      operatingTempRange: {
                        ...deviceState.operatingTempRange,
                        to: value
                      }
                    })}
                    onUnitChange={(unit) => updateDeviceDetails({
                      operatingTempRange: {
                        ...deviceState.operatingTempRange,
                        unit: unit as 'C' | 'F' | 'K'
                      }
                    })}
                    availableUnits={['C', 'F', 'K']}
                  />
                </div>

                <div className="space-y-6">
                  <RangeField
                    label="Output Voltage Range"
                    fromValue={deviceState.outputVoltageRange.from}
                    toValue={deviceState.outputVoltageRange.to}
                    unit="V"
                    isEditing={deviceState.isEditing}
                    onFromChange={(value) => updateDeviceDetails({
                      outputVoltageRange: {
                        ...deviceState.outputVoltageRange,
                        from: value
                      }
                    })}
                    onToChange={(value) => updateDeviceDetails({
                      outputVoltageRange: {
                        ...deviceState.outputVoltageRange,
                        to: value
                      }
                    })}
                  />
                  <DeviceField
                    label="Efficiency"
                    value={deviceState.efficiency}
                    isEditing={deviceState.isEditing}
                  />
                  <DeviceField
                    label="Package type"
                    value={deviceState.packageType}
                    isEditing={deviceState.isEditing}
                  />
                </div>
              </div>

              <DeviceDocuments
                documents={deviceState.documents}
                isEditing={deviceState.isEditing}
                onUpload={handleDocumentUploadClick}
              />
              <input
                ref={documentInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadDocument(file);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <DUTsSection />
      )}
    </div>
  );
}