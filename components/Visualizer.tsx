import React, { useMemo, useRef, useEffect, useState } from 'react';
import { CalculationResult } from '../types';

interface VisualizerProps {
  results: CalculationResult;
}

export const Visualizer: React.FC<VisualizerProps> = ({ results }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const visualizationData = useMemo(() => {
    const { spotDiameterMm, pulsePitch } = results;
    
    // Safety check
    if (spotDiameterMm <= 0 || pulsePitch <= 0) return null;

    // We want to visualize a standardized view where the spot size is relatively constant visually,
    // and the overlap changes.
    const VISUAL_DIAMETER = 60;
    const VISUAL_RADIUS = VISUAL_DIAMETER / 2;
    
    // Calculate the ratio of pitch to diameter
    // Pitch / Diameter
    const pitchRatio = pulsePitch / spotDiameterMm;

    // The visual pitch is the visual diameter * ratio
    const visualPitch = VISUAL_DIAMETER * pitchRatio;

    // How many spots fit in the width?
    // Cap at 200 to prevent performance issues and solid block rendering on high overlap
    const maxSpots = 200;
    const calculatedSpots = Math.ceil(width / (visualPitch || 1)) + 2;
    const numberOfSpots = Math.max(5, Math.min(calculatedSpots, maxSpots));

    const spots = Array.from({ length: numberOfSpots }).map((_, i) => ({
      cx: 20 + (i * visualPitch), // Start with some padding
      cy: 60, // Vertical center
      r: VISUAL_RADIUS,
    }));

    return { spots, visualPitch };
  }, [results, width]);

  return (
    <div className="w-full bg-slate-900 rounded-lg p-4 overflow-hidden border border-slate-700 shadow-inner">
      <div className="flex justify-between items-center mb-2 text-xs text-slate-400 font-mono">
        <span>BEAM PATH VISUALIZATION (Top Down)</span>
        <span>{results.overlapPercentage.toFixed(1)}% OVERLAP</span>
      </div>
      <div ref={containerRef} className="h-32 w-full relative flex items-center">
        {visualizationData ? (
          <svg width="100%" height="100%" className="overflow-visible" style={{ maskImage: 'linear-gradient(to right, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, black 90%, transparent)' }}>
            {/* Direction Arrow */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                markerWidth="6" markerHeight="6"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
            <line 
              x1="10" y1="20" 
              x2={Math.min(width - 10, 300)} y2="20" 
              stroke="#64748b" 
              strokeWidth="1" 
              markerEnd="url(#arrow)" 
            />
            <text x="10" y="15" fill="#64748b" fontSize="10" fontFamily="monospace">SCAN DIRECTION</text>

            {/* Spots */}
            {visualizationData.spots.map((spot, idx) => (
              <circle
                key={idx}
                cx={spot.cx}
                cy={spot.cy}
                r={spot.r}
                fill="none" 
                stroke="rgba(244, 63, 94, 0.7)"
                strokeWidth="1"
              />
            ))}
            
            {/* Center points */}
             {visualizationData.spots.map((spot, idx) => (
              <circle
                key={`c-${idx}`}
                cx={spot.cx}
                cy={spot.cy}
                r={1.5}
                fill="#fb7185"
                opacity={0.8}
              />
            ))}
          </svg>
        ) : (
          <div className="text-slate-500 text-sm w-full text-center">Enter parameters to visualize</div>
        )}
      </div>
    </div>
  );
};