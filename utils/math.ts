import { CalculatorState, CalculationResult } from '../types';
import { MULTIPLIERS } from '../constants';

export const calculateLaserParams = (state: CalculatorState): CalculationResult => {
  // Normalize everything to Base Units: Hz, mm/s, mm
  const freqHz = state.frequency * MULTIPLIERS[state.frequencyUnit];
  const speedMmS = state.speed * MULTIPLIERS[state.speedUnit];
  const spotMm = state.spotSize * MULTIPLIERS[state.spotSizeUnit];
  const powerWatts = state.power;

  // Avoid division by zero
  if (freqHz === 0 || speedMmS === 0 || spotMm === 0) {
    return {
      pulsesPerSpot: 0,
      overlapPercentage: 0,
      pulsePitch: 0,
      spotDiameterMm: 0,
      pulseEnergyMj: 0,
      fluenceJcm2: 0,
    };
  }

  // 1. Pulse Pitch (Distance between consecutive pulses)
  // Distance = Velocity / Frequency
  const pulsePitchMm = speedMmS / freqHz;

  // 2. Pulses per Spot (Residence Time * Frequency)
  // Residence Time = Spot Diameter / Velocity
  // PPS = (Diameter / Velocity) * Frequency = Diameter / Pitch
  const pulsesPerSpot = spotMm / pulsePitchMm;

  // 3. Overlap Percentage
  // Overlap = (1 - Pitch / Diameter) * 100
  const overlapPercentage = (1 - (pulsePitchMm / spotMm)) * 100;

  // 4. Pulse Energy (mJ)
  // E = Power (W) / Frequency (Hz) * 1000 (to get mJ)
  const pulseEnergyMj = (powerWatts / freqHz) * 1000;

  // 5. Fluence (J/cm²)
  // Fluence = Pulse Energy (J) / Area (cm²)
  // Radius in cm
  const radiusCm = (spotMm / 10) / 2;
  const areaCm2 = Math.PI * Math.pow(radiusCm, 2);
  const pulseEnergyJoules = pulseEnergyMj / 1000;
  
  // Guard against tiny spot sizes causing infinity
  const fluenceJcm2 = areaCm2 > 0 ? pulseEnergyJoules / areaCm2 : 0;

  return {
    pulsesPerSpot: Number(pulsesPerSpot.toFixed(2)),
    overlapPercentage: Number(overlapPercentage.toFixed(2)),
    pulsePitch: pulsePitchMm,
    spotDiameterMm: spotMm,
    pulseEnergyMj: Number(pulseEnergyMj.toFixed(3)),
    fluenceJcm2: Number(fluenceJcm2.toFixed(2)),
  };
};