import React, { useState } from 'react';
import { SCURVE_DATA } from '../data/projectData';
import { Info } from 'lucide-react';

export const SCurveChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<{
    week: string;
    planned: number;
    actual: number | null;
    x: number;
    yPlanned: number;
    yActual: number | null;
  } | null>(null);

  // Chart coordinates calculation
  const width = 800;
  const height = 300;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const dataLength = SCURVE_DATA.length;
  const getX = (index: number) => paddingLeft + (index / (dataLength - 1)) * chartWidth;
  const getY = (val: number) => paddingTop + chartHeight - (val / 100) * chartHeight;

  // Planned Path
  const plannedPathD = SCURVE_DATA.reduce((acc, curr, index) => {
    const x = getX(index);
    const y = getY(curr.planned);
    return `${acc} ${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }, '');

  // Actual Path (only up to current week where actual is not null)
  const actualPoints = SCURVE_DATA.filter((d) => d.actual !== null);
  const actualPathD = actualPoints.reduce((acc, curr, index) => {
    const originalIndex = SCURVE_DATA.findIndex((item) => item.week === curr.week);
    const x = getX(originalIndex);
    const y = getY(curr.actual!);
    return `${acc} ${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }, '');

  const currentWeekIndex = SCURVE_DATA.findIndex((d) => d.current);
  const currentWeekX = currentWeekIndex !== -1 ? getX(currentWeekIndex) : null;

  return (
    <div className="bg-[#FFFFFF] border border-[#DDE1E7] p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#EBEFF5] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#0F1B2D] uppercase tracking-wide">
              Đường cong S toàn dự án (S-Curve Cumulative Progress)
            </h3>
            <span className="text-[11px] font-mono bg-[#F4F5F7] border border-[#DDE1E7] px-2 py-0.5 text-[#5A6372]">
              Biểu đồ minh họa
            </span>
          </div>
          <p className="text-xs text-[#5A6372] mt-0.5">
            So sánh lũy kế Tiến độ Kế hoạch (Baseline V2) và Tiến độ Thực tế theo chu kỳ tuần
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-[#8896AB] inline-block" />
            <span className="text-[#5A6372]">Kế hoạch (Baseline)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 bg-[#F2A900] inline-block" />
            <span className="text-[#0F1B2D] font-semibold">Thực tế</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0 border-t-2 border-dashed border-[#D9383A] inline-block" />
            <span className="text-[#D9383A]">Tuần hiện tại [W42]</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative overflow-x-auto">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full min-w-[650px] h-auto select-none"
        >
          {/* Grid lines and Y-axis marks */}
          {[0, 20, 40, 60, 80, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#E8ECF2"
                  strokeWidth="1"
                  strokeDasharray={val === 0 ? undefined : "3 3"}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#7B8798"
                  className="font-mono tabular-nums"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Current Week Vertical Dashed Line */}
          {currentWeekX !== null && (
            <g>
              <line
                x1={currentWeekX}
                y1={paddingTop - 10}
                x2={currentWeekX}
                y2={height - paddingBottom}
                stroke="#D9383A"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <rect
                x={currentWeekX - 38}
                y={paddingTop - 25}
                width={76}
                height={18}
                fill="#D9383A"
              />
              <text
                x={currentWeekX}
                y={paddingTop - 12}
                textAnchor="middle"
                fontSize="10"
                fill="#FFFFFF"
                className="font-mono font-bold tracking-tight"
              >
                TUẦN W42
              </text>
            </g>
          )}

          {/* Planned Path Line */}
          <path
            d={plannedPathD}
            fill="none"
            stroke="#8896AB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Actual Path Line */}
          <path
            d={actualPathD}
            fill="none"
            stroke="#F2A900"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points for Planned */}
          {SCURVE_DATA.map((item, idx) => {
            const cx = getX(idx);
            const cy = getY(item.planned);
            return (
              <circle
                key={`p-${idx}`}
                cx={cx}
                cy={cy}
                r="3.5"
                fill="#FFFFFF"
                stroke="#8896AB"
                strokeWidth="2"
              />
            );
          })}

          {/* Points for Actual */}
          {actualPoints.map((item) => {
            const idx = SCURVE_DATA.findIndex((d) => d.week === item.week);
            const cx = getX(idx);
            const cy = getY(item.actual!);
            const isCurrent = item.current;
            return (
              <g 
                key={`a-${idx}`}
                className="cursor-pointer"
                onMouseEnter={() => {
                  setHoveredPoint({
                    week: item.week,
                    planned: item.planned,
                    actual: item.actual,
                    x: cx,
                    yPlanned: getY(item.planned),
                    yActual: cy,
                  });
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isCurrent ? "6" : "4.5"}
                  fill={isCurrent ? "#F2A900" : "#0F1B2D"}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* X Axis labels */}
          {SCURVE_DATA.map((item, idx) => {
            const x = getX(idx);
            const isCurrent = item.current;
            return (
              <text
                key={`label-${idx}`}
                x={x}
                y={height - paddingBottom + 18}
                textAnchor="middle"
                fontSize="11"
                fill={isCurrent ? "#D9383A" : "#4A5568"}
                className={`font-mono ${isCurrent ? 'font-bold' : ''}`}
              >
                {item.week}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip display */}
        {hoveredPoint && (
          <div 
            className="absolute bg-[#0F1B2D] text-white p-2.5 text-xs font-mono shadow-lg border border-[#22334B] pointer-events-none z-10"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: '20%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-bold text-[#F2A900] border-b border-[#22334B] pb-1 mb-1">
              Tuần {hoveredPoint.week}
            </div>
            <div>Thực tế: <span className="font-bold text-[#F2A900]">{hoveredPoint.actual}%</span></div>
            <div>Kế hoạch: <span className="text-[#A0ABBD]">{hoveredPoint.planned}%</span></div>
            <div className="text-[10px] text-[#A0ABBD] pt-0.5">
              Độ lệch: {hoveredPoint.actual! - hoveredPoint.planned >= 0 ? '+' : ''}{(hoveredPoint.actual! - hoveredPoint.planned).toFixed(1)}%
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#7B8798] border-t border-[#F4F5F7] pt-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#F2A900]" />
          <span>Đường cong S được tính toán tự động dựa trên trọng số WBS của 5 khối tháp và hạ tầng kỹ thuật.</span>
        </div>
        <div className="font-mono text-[11px]">
          Mã kiểm soát: <span className="text-[#0F1B2D]">BD-MST-SCURVE-2026</span>
        </div>
      </div>
    </div>
  );
};
