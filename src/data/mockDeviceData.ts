import { DeviceDetails } from '../types/device';

export const defaultDeviceData: DeviceDetails = {
  device: '',
  displayName: '',
  shortDescription: '',
  inputVoltageRange: {
    from: '',
    to: ''
  },
  outputVoltageRange: {
    from: '',
    to: ''
  },
  chargingCurrent: '',
  efficiency: '',
  quiescentCurrent: '',
  packageType: '',
  operatingTempRange: {
    from: '',
    to: '',
    unit: 'C'
  },
  documents: [],
  images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
};

export const mockDeviceDataMap: Record<string, DeviceDetails> = {
  'ADP5350': {
    device: 'ADP5350',
    displayName: 'Battery Management IC',
    shortDescription: 'Battery charging, Power path management, Voltage regulation etc...',
    inputVoltageRange: {
      from: '4.0',
      to: '6.5'
    },
    outputVoltageRange: {
      from: '3.0',
      to: '4.4'
    },
    chargingCurrent: 'Programmable up to 500 mA',
    efficiency: 'Buck conversion > 90%',
    quiescentCurrent: 'Ultra-low, <1 µA in certain modes',
    packageType: '32-lead, 4 mm × 4 mm LFCSP (Lead Frame Chip Scale Package)',
    operatingTempRange: {
      from: '-40',
      to: '+85',
      unit: 'C'
    },
    documents: [
      { id: '1', name: 'Open data sheet', url: '#' },
      { id: '2', name: 'Open application notes', url: '#' }
    ],
    images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
  },
  'ADP5063A': {
    device: 'ADP5063A',
    displayName: 'Power Management Unit',
    shortDescription: 'Integrated power management solution for portable applications',
    inputVoltageRange: {
      from: '2.7',
      to: '5.5'
    },
    outputVoltageRange: {
      from: '1.8',
      to: '5.0'
    },
    chargingCurrent: 'Up to 1.2A charging current',
    efficiency: 'Up to 95% efficiency',
    quiescentCurrent: '15 µA typical',
    packageType: '24-lead LFCSP',
    operatingTempRange: {
      from: '-40',
      to: '+85',
      unit: 'C'
    },
    documents: [
      { id: '1', name: 'Open data sheet', url: '#' },
      { id: '2', name: 'Open application notes', url: '#' }
    ],
    images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
  },
  'ADP5063': {
    device: 'ADP5063',
    displayName: 'Battery Charger IC',
    shortDescription: 'High-performance battery charging solution with power path',
    inputVoltageRange: {
      from: '3.0',
      to: '5.5'
    },
    outputVoltageRange: {
      from: '2.5',
      to: '4.8'
    },
    chargingCurrent: 'Programmable up to 800 mA',
    efficiency: 'Up to 92% efficiency',
    quiescentCurrent: '25 µA in standby',
    packageType: '20-lead LFCSP',
    operatingTempRange: {
      from: '-40',
      to: '+85',
      unit: 'C'
    },
    documents: [
      { id: '1', name: 'Open data sheet', url: '#' },
      { id: '2', name: 'Open application notes', url: '#' }
    ],
    images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
  },
  'ADP1055': {
    device: 'ADP1055',
    displayName: 'Digital Controller',
    shortDescription: 'Digital power supply controller with PMBus interface',
    inputVoltageRange: {
      from: '4.5',
      to: '14.0'
    },
    outputVoltageRange: {
      from: '0.6',
      to: '5.5'
    },
    chargingCurrent: 'N/A',
    efficiency: 'Up to 96% efficiency',
    quiescentCurrent: '80 mA typical',
    packageType: '40-lead LFCSP',
    operatingTempRange: {
      from: '-40',
      to: '+125',
      unit: 'C'
    },
    documents: [
      { id: '1', name: 'Open data sheet', url: '#' },
      { id: '2', name: 'Open application notes', url: '#' }
    ],
    images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
  },
  'ADP5063-1': {
    device: 'ADP5063-1',
    displayName: 'Enhanced Battery Charger',
    shortDescription: 'Advanced battery charging with safety features',
    inputVoltageRange: {
      from: '3.0',
      to: '5.5'
    },
    outputVoltageRange: {
      from: '2.5',
      to: '4.8'
    },
    chargingCurrent: 'Up to 1.0A charging current',
    efficiency: '93% peak efficiency',
    quiescentCurrent: '20 µA in shutdown',
    packageType: '24-lead LFCSP',
    operatingTempRange: {
      from: '-40',
      to: '+85',
      unit: 'C'
    },
    documents: [
      { id: '1', name: 'Open data sheet', url: '#' },
      { id: '2', name: 'Open application notes', url: '#' }
    ],
    images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
  },
  'ADP5062': {
    device: 'ADP5062',
    displayName: 'USB Power Manager',
    shortDescription: 'USB power management and battery charging solution',
    inputVoltageRange: {
      from: '2.7',
      to: '5.5'
    },
    outputVoltageRange: {
      from: '1.8',
      to: '5.0'
    },
    chargingCurrent: 'Programmable up to 1.5A',
    efficiency: 'Up to 94% efficiency',
    quiescentCurrent: '10 µA in standby',
    packageType: '28-lead LFCSP',
    operatingTempRange: {
      from: '-40',
      to: '+85',
      unit: 'C'
    },
    documents: [
      { id: '1', name: 'Open data sheet', url: '#' },
      { id: '2', name: 'Open application notes', url: '#' }
    ],
    images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
  },
  'ADP1055A': {
    device: 'ADP1055A',
    displayName: 'Advanced Digital Controller',
    shortDescription: 'Enhanced digital power supply controller with advanced features',
    inputVoltageRange: {
      from: '4.5',
      to: '14.0'
    },
    outputVoltageRange: {
      from: '0.6',
      to: '5.5'
    },
    chargingCurrent: 'N/A',
    efficiency: 'Up to 97% efficiency',
    quiescentCurrent: '75 mA typical',
    packageType: '40-lead LFCSP',
    operatingTempRange: {
      from: '-40',
      to: '+125',
      unit: 'C'
    },
    documents: [
      { id: '1', name: 'Open data sheet', url: '#' },
      { id: '2', name: 'Open application notes', url: '#' }
    ],
    images: ['https://cdn-icons-png.flaticon.com/512/5338/5338692.png']
  }
};