import React, { useState, useEffect } from 'react';
import { 
  CalculatorState, 
  FrequencyUnit, 
  SpeedUnit, 
  LengthUnit, 
  CalculationResult 
} from './types';
import { DEFAULT_VALUES } from './constants';
import { calculateLaserParams } from './utils/math';
import { Visualizer } from './components/Visualizer';
import { ResultsCard } from './components/ResultsCard';
import { Settings, RefreshCw, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(DEFAULT_VALUES);
  const [results, setResults] = useState<CalculationResult>({
    pulsesPerSpot: 0,
    overlapPercentage: 0,
    pulsePitch: 0,
    spotDiameterMm: 0,
    pulseEnergyMj: 0,
    fluenceJcm2: 0,
  });

  // Calculate whenever state changes
  useEffect(() => {
    const res = calculateLaserParams(state);
    setResults(res);
  }, [state]);

  const handleReset = () => {
    setState(DEFAULT_VALUES);
  };

  const updateState = <K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-rose-500 p-1.5 rounded-lg text-white">
                <Zap className="w-5 h-5" fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">LaserPulse<span className="text-rose-500">Calc</span></h1>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            title="Reset to defaults"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro */}
        <div className="text-center md:text-left">
           <p className="text-slate-500 max-w-2xl">
            Determine the <span className="font-semibold text-slate-700">Pulse Number per Spot</span>, <span className="font-semibold text-slate-700">Overlap</span>, and <span className="font-semibold text-slate-700">Fluence</span> for pulsed laser material processing.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-slate-400" />
                Parameters
              </h2>

              <div className="space-y-6">
                {/* Average Power */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Average Power (Watts)</label>
                  <input
                      type="number"
                      min="0"
                      step="any"
                      value={state.power}
                      onChange={(e) => updateState('power', parseFloat(e.target.value) || 0)}
                      className="block w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-slate-900 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  />
                </div>

                {/* Repetition Rate */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Repetition Rate</label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={state.frequency}
                      onChange={(e) => updateState('frequency', parseFloat(e.target.value) || 0)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-slate-300 bg-white text-slate-900 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    />
                    <select
                      value={state.frequencyUnit}
                      onChange={(e) => updateState('frequencyUnit', e.target.value as FrequencyUnit)}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-slate-300 bg-slate-100 text-slate-700 sm:text-sm rounded-r-md hover:bg-slate-200 focus:ring-rose-500 focus:border-rose-500"
                    >
                      {Object.values(FrequencyUnit).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* Scanning Speed */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Scanning Speed</label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={state.speed}
                      onChange={(e) => updateState('speed', parseFloat(e.target.value) || 0)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-slate-300 bg-white text-slate-900 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    />
                    <select
                      value={state.speedUnit}
                      onChange={(e) => updateState('speedUnit', e.target.value as SpeedUnit)}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-slate-300 bg-slate-100 text-slate-700 sm:text-sm rounded-r-md hover:bg-slate-200 focus:ring-rose-500 focus:border-rose-500"
                    >
                      {Object.values(SpeedUnit).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* Spot Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Spot Diameter</label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={state.spotSize}
                      onChange={(e) => updateState('spotSize', parseFloat(e.target.value) || 0)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-slate-300 bg-white text-slate-900 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    />
                    <select
                      value={state.spotSizeUnit}
                      onChange={(e) => updateState('spotSizeUnit', e.target.value as LengthUnit)}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-slate-300 bg-slate-100 text-slate-700 sm:text-sm rounded-r-md hover:bg-slate-200 focus:ring-rose-500 focus:border-rose-500"
                    >
                      {Object.values(LengthUnit).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results & Visualization */}
          <div className="lg:col-span-7 space-y-6">
            <ResultsCard results={results} />
            <Visualizer results={results} />
            
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm text-slate-600 space-y-2">
                <h4 className="font-semibold text-slate-800">Key Formulas</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 font-mono text-xs bg-slate-50 p-3 rounded">
                    <div>
                        <span className="block text-slate-400 mb-1">Pulses Per Spot</span>
                        PPS = (Spot × Freq) / Speed
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-1">Overlap %</span>
                        (1 - Speed/(Freq × Spot)) × 100
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-1">Pulse Energy</span>
                        Ep = Power / Freq
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-1">Fluence</span>
                        F = Ep / (π × (Spot/2)²)
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;