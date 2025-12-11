import { FrequencyUnit, SpeedUnit, LengthUnit } from './types';

export const DEFAULT_VALUES = {
  frequency: 20,
  frequencyUnit: FrequencyUnit.kHz,
  speed: 1000,
  speedUnit: SpeedUnit.mmPerSec,
  spotSize: 50,
  spotSizeUnit: LengthUnit.um,
  power: 20, // Watts
};

export const MULTIPLIERS = {
  [FrequencyUnit.Hz]: 1,
  [FrequencyUnit.kHz]: 1000,
  [FrequencyUnit.MHz]: 1000000,
  
  [SpeedUnit.mmPerSec]: 1, // Base unit: mm/s
  [SpeedUnit.cmPerSec]: 10,
  [SpeedUnit.mPerSec]: 1000,

  [LengthUnit.um]: 0.001, // Base unit: mm
  [LengthUnit.mm]: 1,
  [LengthUnit.cm]: 10,
};