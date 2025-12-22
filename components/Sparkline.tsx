
import React from 'react';

interface SparklineProps {
  data: number[];
  color?: string;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color = "#10b981" }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const width = 80;
  const height = 30;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path
        d={`M ${points}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
      />
    </svg>
  );
};

export default Sparkline;
