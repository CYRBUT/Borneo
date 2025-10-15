
import React from 'react';

interface LineChartProps {
    data: { label: string; value: number }[];
    color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, color = '#4f46e5' }) => {
    if (!data || data.length < 2) {
        return <div className="flex items-center justify-center h-full text-medium-light-text dark:text-medium-text">Not enough data to display chart</div>;
    }
    
    const width = 500;
    const height = 200;
    const padding = 40;

    const maxValue = Math.max(...data.map(p => p.value));
    const xScale = (width - padding * 2) / (data.length - 1);
    const yScale = (height - padding * 2) / maxValue;

    const points = data.map((point, i) => {
        const x = padding + i * xScale;
        const y = height - padding - point.value * yScale;
        return `${x},${y}`;
    }).join(' ');
    
    const areaPoints = `${padding},${height-padding} ${points} ${width - padding},${height - padding}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {/* Y-axis labels */}
            <text x="5" y={padding} dy="5" fontSize="10" fill="currentColor" className="text-medium-light-text dark:text-medium-text">{maxValue}</text>
            <text x="5" y={height - padding} dy="-2" fontSize="10" fill="currentColor" className="text-medium-light-text dark:text-medium-text">0</text>
            
            {/* X-axis labels */}
            {data.map((point, i) => (
                 <text key={i} x={padding + i * xScale} y={height - padding + 15} textAnchor="middle" fontSize="10" fill="currentColor" className="text-medium-light-text dark:text-medium-text">{point.label}</text>
            ))}

            {/* Gradient for Area */}
            <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>

            {/* Area */}
            <polyline
                fill="url(#areaGradient)"
                points={areaPoints}
            />

            {/* Line */}
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={points}
            />
            
            {/* Points */}
            {data.map((point, i) => (
                <circle
                    key={i}
                    cx={padding + i * xScale}
                    cy={height - padding - point.value * yScale}
                    r="3"
                    fill={color}
                />
            ))}
        </svg>
    );
};