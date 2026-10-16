import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Info } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const WeeklyRfiWarningChart: React.FC = () => {
  const weeks = ['W38', 'W39', 'W40', 'W41', 'W42 (Hiện tại)'];

  const data = {
    labels: weeks,
    datasets: [
      {
        label: 'RFI Đã phản hồi (Closed)',
        data: [6, 8, 9, 7, 5],
        backgroundColor: '#16A34A',
        borderColor: '#15803D',
        borderWidth: 1,
      },
      {
        label: 'RFI Đang xử lý (Open)',
        data: [2, 3, 2, 4, 3],
        backgroundColor: '#F2A900',
        borderColor: '#D97706',
        borderWidth: 1,
      },
      {
        label: 'RFI Quá hạn trả lời (Overdue)',
        data: [0, 0, 0, 1, 1],
        backgroundColor: '#D9383A',
        borderColor: '#B91C1C',
        borderWidth: 1,
      },
      {
        label: 'Thư cảnh báo TVGS (BD-ICIC-WL)',
        data: [1, 1, 0, 0, 0],
        backgroundColor: '#0F1B2D',
        borderColor: '#000000',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          font: {
            family: "'IBM Plex Mono', monospace",
            size: 11,
          },
          color: '#1A1F29',
        },
      },
      tooltip: {
        backgroundColor: '#0F1B2D',
        titleFont: {
          family: "'IBM Plex Mono', monospace",
          size: 12,
          weight: 'bold' as const,
        },
        bodyFont: {
          family: "'IBM Plex Mono', monospace",
          size: 11,
        },
        padding: 10,
        borderColor: '#F2A900',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#E8ECF2',
        },
        ticks: {
          font: {
            family: "'IBM Plex Mono', monospace",
            size: 11,
          },
          color: '#5A6372',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E8ECF2',
        },
        ticks: {
          stepSize: 2,
          font: {
            family: "'IBM Plex Mono', monospace",
            size: 11,
          },
          color: '#5A6372',
        },
      },
    },
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DDE1E7] p-5 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EBEFF5] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#0F1B2D] uppercase tracking-wide">
              Biểu đồ RFI & Thư cảnh báo TVGS theo tuần (Chart.js)
            </h3>
            <span className="text-[10px] font-mono bg-[#FEF9E7] border border-[#F2A900] px-2 py-0.5 text-[#0F1B2D] font-bold">
              Minh họa tương tác
            </span>
          </div>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Số lượng câu hỏi hiện trường phát sinh, tình trạng giải quyết và thư cảnh báo kỷ luật công trường
          </p>
        </div>

        <div className="text-xs font-mono text-[#5A6372]">
          Chu kỳ: <strong className="text-[#0F1B2D]">5 tuần gần nhất</strong>
        </div>
      </div>

      <div className="h-64 w-full">
        <Bar data={data} options={options} />
      </div>

      <div className="pt-2 border-t border-[#F4F5F7] flex items-center justify-between text-xs text-[#5A6372]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#F2A900] shrink-0" />
          <span>Biểu đồ thể hiện biến động số lượng RFI xử lý và mức độ tuân thủ thư cảnh báo BD-ICIC-WL.</span>
        </div>
        <div className="font-mono text-[11px] text-[#7B8798]">
          ICIC & PMH Database
        </div>
      </div>
    </div>
  );
};
