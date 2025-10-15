
import React, { useState } from 'react';

interface PieChartProps {
    data: { [key: string]: number };
}

const COLORS = ['#4f46e5', '#7c3aed', '#a855f7', '#d8b4fe', '#818cf8'];

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // FIX: Refactored to use Object.keys() to avoid potential type inference issues with Object.values().
    // Accessing data[key] directly ensures the value is correctly typed as a number.
    const total = Object.keys(data).reduce((acc, key) => acc + data[key], 0);

    if (total === 0) {
        return <div className="flex items-center justify-center h-full text-medium-light-text dark:text-medium-text">No data available</div>;
    }

    let cumulative = 0;
    // FIX: Refactored to use Object.keys().map() for type safety. This ensures `numericValue` is a number
    // without needing explicit type conversions or assertions, resolving arithmetic operation errors.
    const slices = Object.keys(data).map((key, index) => {
        const numericValue = data[key];
        const percentage = numericValue / total;
        const startAngle = (cumulative / total) * 360;
        cumulative += numericValue;
        const endAngle = (cumulative / total) * 360;

        const largeArcFlag = percentage > 0.5 ? 1 : 0;
        const startX = 50 + 40 * Math.cos(Math.PI * (startAngle - 90) / 180);
        const startY = 50 + 40 * Math.sin(Math.PI * (startAngle - 90) / 180);
        const endX = 50 + 40 * Math.cos(Math.PI * (endAngle - 90) / 180);
        const endY = 50 + 40 * Math.sin(Math.PI * (endAngle - 90) / 180);

        const pathData = `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

        return {
            key,
            value: numericValue,
            percentage: (percentage * 100).toFixed(1),
            color: COLORS[index % COLORS.length],
            pathData,
        };
    });

    const activeSlice = activeIndex !== null ? slices[activeIndex] : null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center h-full w-full">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {slices.map((slice, index) => (
                        <path
                            key={slice.key}
                            d={slice.pathData}
                            fill={slice.color}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="transition-transform duration-300 cursor-pointer"
                            style={{ transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)', transformOrigin: '50% 50%' }}
                        />
                    ))}
                </svg>
                {activeSlice && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold">{activeSlice.percentage}%</span>
                        <span className="text-sm text-medium-light-text dark:text-medium-text">{activeSlice.key}</span>
                    </div>
                )}
            </div>
            <ul className="mt-4 sm:mt-0 sm:ml-8 space-y-1 text-sm">
                {slices.map((slice, index) => (
                    <li key={slice.key} className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: slice.color }}></span>
                        <span>{slice.key}: {slice.value} ({slice.percentage}%)</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};