import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SCURVE_DATA } from '../../data/projectData';
import { Info, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const InteractiveSCurveChart: React.FC = () => {
  const labels = SCURVE_DATA.map(d => d.label);
  const plannedData = SCURVE_DATA.map(d => d.planned);
  const actualData = SCURVE_DATA.map(d => d.actual);

  const data = {
    labels,
    datasets: [
      {
        label: 'Tiến độ Kế hoạch (Baseline V2)',
        data: plannedData,
        borderColor: '#8896AB',
        backgroundColor: 'rgba(136, 150, 171, 0.08)',
        borderWidth: 2,
        borderDash: [4, 4],
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#8896AB',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.35,
      },
      {
        label: 'Tiến độ Thực tế (Actual Cumulative)',
        data: actualData,
        borderColor: '#F2A900',
        backgroundColor: 'rgba(242, 169, 0, 0.12)',
        borderWidth: 3.5,
        pointBackgroundColor: '#0F1B2D',
        pointBorderColor: '#F2A900',
        pointBorderWidth: 2.5,
        pointRadius: 5.5,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 14,
          boxHeight: 14,
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
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '%';
            } else {
              label += 'Chưa tới kỳ báo cáo';
            }
            return label;
          },
          afterBody: function (contexts: any[]) {
            const actualVal = contexts.find(c => c.datasetIndex === 1)?.parsed.y;
            const plannedVal = contexts.find(c => c.datasetIndex === 0)?.parsed.y;
            if (actualVal !== null && actualVal !== undefined && plannedVal !== undefined) {
              const diff = (actualVal - plannedVal).toFixed(1);
              const sign = Number(diff) >= 0 ? '+' : '';
              return [`Độ lệch (Variance): ${sign}${diff}%`];
            }
            return [];
          },
        },
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
        min: 0,
        max: 100,
        grid: {
          color: '#E8ECF2',
        },
        ticks: {
          stepSize: 20,
          font: {
            family: "'IBM Plex Mono', monospace",
            size: 11,
          },
          color: '#5A6372',
          callback: function (value: any) {
            return value + '%';
          },
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
              Đường cong S toàn dự án (Interactive S-Curve · Chart.js)
            </h3>
            <span className="text-[10px] font-mono bg-[#FEF9E7] border border-[#F2A900] px-2 py-0.5 text-[#0F1B2D] font-bold">
              Biểu đồ tương tác
            </span>
          </div>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Dữ liệu lũy kế tiến độ kế hoạch baseline so với tiến độ nghiệm thu thực tế từng tuần
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="bg-[#F4F5F7] px-2.5 py-1 border border-[#DDE1E7] text-[#0F1B2D]">
            Mốc hiện tại: <strong className="text-[#D9383A]">Tuần [W42]</strong>
          </span>
        </div>
      </div>

      {/* Chart.js Container */}
      <div className="h-72 w-full">
        <Line data={data} options={options} />
      </div>

      {/* Footer Info & Milestones Indicator */}
      <div className="pt-3 border-t border-[#F4F5F7] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#5A6372] gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#F2A900] shrink-0" />
          <span>Rê chuột lên điểm biểu đồ để xem chi tiết % và độ lệch tiến độ giữa kế hoạch và thực tế.</span>
        </div>
        <div className="font-mono text-[11px] text-[#7B8798]">
          Ghi chú: <strong className="text-[#0F1B2D]">Dữ liệu minh họa</strong> · Trọng số WBS 5 tháp
        </div>
      </div>
    </div>
  );
};
