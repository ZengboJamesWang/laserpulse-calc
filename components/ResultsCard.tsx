import React from 'react';
import { CalculationResult } from '../types';
import { Info, Zap, Flame } from 'lucide-react';

interface ResultsCardProps {
  results: CalculationResult;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ results }) => {
  const getOverlapColor = (overlap: number) => {
    if (overlap < 0) return 'text-red-600'; // Gaps
    if (overlap < 30) return 'text-amber-600'; // Low overlap
    if (overlap > 90) return 'text-amber-600'; // Excessive overlap
    return 'text-emerald-600'; // Good overlap
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Result: PPS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center md:items-start">
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Pulses Per Spot</h2>
              <div className="text-5xl font-bold text-slate-800 tracking-tight">
                  {results.pulsesPerSpot}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                  Pulses hitting a single point
              </p>
          </div>

          {/* Secondary Metric: Overlap */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center md:items-start relative overflow-hidden">
              <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 ${results.overlapPercentage < 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Overlap</h2>
              <div className={`text-4xl font-bold tracking-tight ${getOverlapColor(results.overlapPercentage)}`}>
                  {results.overlapPercentage}%
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center">
                  {results.overlapPercentage < 0 ? "Negative (Separated)" : "Area Overlap"}
              </p>
          </div>
      </div>

      {/* Energy Metrics Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
           <div className="flex items-center space-x-2 mb-2">
             <div className="p-1.5 bg-amber-100 rounded-md">
               <Zap className="w-4 h-4 text-amber-600" />
             </div>
             <h3 className="text-xs font-semibold text-slate-500 uppercase">Pulse Energy</h3>
           </div>
           <div className="text-2xl font-bold text-slate-700">{results.pulseEnergyMj} <span className="text-sm font-normal text-slate-500">mJ</span></div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
           <div className="flex items-center space-x-2 mb-2">
             <div className="p-1.5 bg-rose-100 rounded-md">
               <Flame className="w-4 h-4 text-rose-600" />
             </div>
             <h3 className="text-xs font-semibold text-slate-500 uppercase">Fluence</h3>
           </div>
           <div className="text-2xl font-bold text-slate-700">{results.fluenceJcm2} <span className="text-sm font-normal text-slate-500">J/cm²</span></div>
        </div>
      </div>
      
      {/* Tertiary Metric */}
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
          <div>
               <h3 className="text-xs font-semibold text-slate-500 uppercase">Pulse Pitch</h3>
               <p className="text-sm font-mono font-medium text-slate-700">{results.pulsePitch.toFixed(4)} mm</p>
          </div>
           <div className="text-right">
               <p className="text-[10px] text-slate-400">Center-to-center distance</p>
          </div>
      </div>
    </div>
  );
};