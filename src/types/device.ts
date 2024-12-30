export interface DeviceDetails {
  device: string;
  displayName: string;
  shortDescription: string;
  inputVoltageRange: {
    from: string;
    to: string;
  };
  outputVoltageRange: {
    from: string;
    to: string;
  };
  chargingCurrent: string;
  efficiency: string;
  quiescentCurrent: string;
  packageType: string;
  operatingTempRange: {
    from: string;
    to: string;
    unit: 'C' | 'F' | 'K';
  };
  documents: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  images: string[];
}

export interface DeviceState extends DeviceDetails {
  isEditing: boolean;
}