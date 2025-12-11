export enum FrequencyUnit {
  Hz = 'Hz',
  kHz = 'kHz',
  MHz = 'MHz'
}

export enum SpeedUnit {
  mmPerSec = 'mm/s',
  cmPerSec = 'cm/s',
  mPerSec = 'm/s'
}

export enum LengthUnit {
  um = 'µm',
  mm = 'mm',
  cm = 'cm'
}

export interface CalculatorState {
  frequency: number;
  frequencyUnit: FrequencyUnit;
  speed: number;
  speedUnit: SpeedUnit;
  spotSize: number;
  spotSizeUnit: LengthUnit;
  power: number; // In Watts
}

export interface CalculationResult {
  pulsesPerSpot: number;
  overlapPercentage: number;
  pulsePitch: number; // mm
  spotDiameterMm: number; // mm
  pulseEnergyMj: number; // mJ
  fluenceJcm2: number; // J/cm²
}