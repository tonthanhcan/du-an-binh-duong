import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  AlertTriangle, 
  Download, 
  FileText, 
  CheckCircle,
  Filter,
  ArrowRight
} from 'lucide-react';
import { 
  WEEKLY_SNAPSHOTS, 
  SCHEDULE_MILESTONES, 
  FOCUS_POINTS, 
  DOCUMENT_CONTROL_DATA 
} from '../data/projectData';
import { InteractiveSCurveChart } from '../components/charts/InteractiveSCurveChart';
import { exportToCsv } from '../utils/exportCsv';
import { PageMenuId } from '../types';
import { useAuth } from '../context/AuthContext';

interface SchedulePageProps {
  onNavigate: (pageId: PageMenuId) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onNavigate }) => {
  const [selectedWeek, setSelectedWeek] = useState<'W39' | 'W40' | 'W41' | 'W42'>('W42');
  const [towerFilter, setTowerFilter] = useState('ALL');

  const currentSnapshot = WEEKLY_SNAPSHOTS[selectedWeek];

  const filteredMilestones = SCHEDULE_MILESTONES.filter((m) => {
    if (towerFilter === 'ALL') return true;
    return m.tower.includes(towerFilter);
  });

  const handleExportMilestones = () => {
    const headers = ['Mã mốc', 'Tên mốc tiến độ', 'Hạng mục/Tháp', 'Kế hoạch', 'Dự báo', 'Trạng thái', 'Độ lệch', 'Ghi chú'];
    const rows = filteredMilestones.map(m => [
      m.id,
      m.milestone,
      m.tower,
      m.plannedDate,
      m.forecastDate,
      m.status,
      m.variance,
      m.note,
    ]);
    exportToCsv(`Tien_do_Moc_Chinh_${selectedWeek}`, headers, rows);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header with Week Selector */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">02 / SCHEDULE</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">
            {currentSnapshot.weekLabel} · {currentSnapshot.dateRange}
          </h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Theo dõi tiến độ tổng thể, đường cong S và các mốc hoàn thành kết cấu 5 tháp
          </p>
        </div>

        {/* Week Buttons: W39, W40, W41, W42 */}
        <div className="flex items-center gap-1.5 bg-[#F4F5F7] p-1 border border-[#DDE1E7] self-start sm:self-auto">
          <span className="text-[11px] font-mono text-[#5A6372] px-2 font-medium">Chọn tuần:</span>
          {(['W39', 'W40', 'W41', 'W42'] as const).map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`px-3 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedWeek === w
                  ? 'bg-[#0F1B2D] text-[#F2A900] shadow-xs'
                  : 'text-[#5A6372] hover:text-[#0F1B2D] hover:bg-[#E8ECF2]'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 3 Number Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="flex items-center justify-between text-[#5A6372]">
            <span className="text-xs font-semibold">TIẾN ĐỘ THỰC TẾ / KẾ HOẠCH</span>
            <Calendar className="w-4 h-4 text-[#F2A900]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#0F1B2D]">{currentSnapshot.actualProgress}</span>
            <span className="text-xs font-mono text-[#7B8798]">/ KH: {currentSnapshot.plannedProgress}</span>
          </div>
          <div className="text-[11px] text-[#7B8798] mt-1 font-mono">
            Trạng thái dự án: <span className="font-bold text-[#D97706]">{currentSnapshot.projectStatus}</span>
          </div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="flex items-center justify-between text-[#5A6372]">
            <span className="text-xs font-semibold">SỐ NGÀY CHẬM SO VỚI BASELINE</span>
            <Clock className="w-4 h-4 text-[#F2A900]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#D9383A]">{currentSnapshot.varianceDays}</span>
          </div>
          <div className="text-[11px] text-[#7B8798] mt-1 font-mono">
            Chậm chủ yếu tại Tháp TA#2 & TA#5
          </div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="flex items-center justify-between text-[#5A6372]">
            <span className="text-xs font-semibold">NHÂN LỰC CÔNG TRƯỜNG</span>
            <Users className="w-4 h-4 text-[#F2A900]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#0F1B2D]">{currentSnapshot.siteWorkforce}</span>
          </div>
          <div className="text-[11px] text-[#7B8798] mt-1">
            Tổng thầu CSCEC và các đơn vị thầu phụ
          </div>
        </div>
      </div>

      {/* 3. S-CURVE BIỂU ĐỒ CHART.JS (DỮ LIỆU MINH HỌA TƯƠNG TÁC) */}
      <InteractiveSCurveChart />

      {/* 4. BẢNG MỐC TIẾN ĐỘ CHÍNH */}
      <div className="bg-white border border-[#DDE1E7] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBEFF5] pb-3">
          <div>
            <h3 className="font-bold text-sm text-[#0F1B2D] uppercase tracking-wide">
              Bảng mốc tiến độ chính (Master Key Milestones)
            </h3>
            <p className="text-xs text-[#5A6372]">Theo dõi các mốc quan trọng cất nóc và bàn giao dự án</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter by Tower */}
            <div className="flex items-center gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-[#7B8798]" />
              <select
                value={towerFilter}
                onChange={(e) => setTowerFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none font-mono"
              >
                <option value="ALL">Tất cả các tháp</option>
                <option value="TA#1">Tháp TA#1</option>
                <option value="TA#2">Tháp TA#2</option>
                <option value="TA#3">Tháp TA#3</option>
                <option value="TA#4">Tháp TA#4</option>
                <option value="TA#5">Tháp TA#5</option>
                <option value="Toàn dự án">Toàn dự án</option>
              </select>
            </div>

            {/* Export Excel */}
            <button
              onClick={handleExportMilestones}
              className="px-3 py-1.5 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>Xuất Excel</span>
            </button>
          </div>
        </div>

        {/* Table responsive scrollable */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F5F7] text-[#1A1F29] border-b border-[#DDE1E7] font-semibold">
                <th className="py-2.5 px-3 font-mono">MÃ MỐC</th>
                <th className="py-2.5 px-3">MỐC TIẾN ĐỘ</th>
                <th className="py-2.5 px-3 font-mono">THÁP</th>
                <th className="py-2.5 px-3 font-mono">KẾ HOẠCH</th>
                <th className="py-2.5 px-3 font-mono">DỰ BÁO</th>
                <th className="py-2.5 px-3 text-center">TRẠNG THÁI</th>
                <th className="py-2.5 px-3">GHI CHÚ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredMilestones.map((m) => (
                <tr key={m.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D]">{m.id}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29]">{m.milestone}</td>
                  <td className="py-2.5 px-3 font-mono text-[#5A6372]">{m.tower}</td>
                  <td className="py-2.5 px-3 font-mono text-[#5A6372]">{m.plannedDate}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-[#0F1B2D]">{m.forecastDate}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      m.status === 'Đúng hạn'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : m.status === 'Cần theo dõi'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. KHỐI VẤN ĐỀ CẦN CHỈ ĐẠO & KHỐI TẢI BÁO CÁO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Vấn đề cần chỉ đạo */}
        <div className="lg:col-span-7 bg-white border border-[#DDE1E7] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EBEFF5] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F2A900]" />
              <h3 className="font-bold text-sm text-[#0F1B2D] uppercase">
                Vấn đề cần chỉ đạo gấp trong tuần
              </h3>
            </div>
            <button
              onClick={() => onNavigate('focus-point')}
              className="text-xs text-[#0F1B2D] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Trang Focus point</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {FOCUS_POINTS.slice(0, 3).map((fp) => (
              <div key={fp.id} className="p-3 bg-[#F9FAFB] border border-[#EBEFF5] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0F1B2D]">{fp.title}</span>
                  <span className="font-mono text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 border border-red-200">
                    {fp.priority}
                  </span>
                </div>
                <div className="text-xs text-[#5A6372]">{fp.proposedAction}</div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#7B8798] pt-1 border-t border-[#F0F2F5]">
                  <span>Phụ trách: {fp.responsible}</span>
                  <span className="text-[#D9383A]">Hạn: {fp.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Khối Tải báo cáo tuần */}
        <div className="lg:col-span-5 bg-white border border-[#DDE1E7] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EBEFF5] pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F2A900]" />
              <h3 className="font-bold text-sm text-[#0F1B2D] uppercase">
                Tải báo cáo & tài liệu tuần
              </h3>
            </div>
            <button
              onClick={() => onNavigate('weekly-report')}
              className="text-xs text-[#0F1B2D] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {DOCUMENT_CONTROL_DATA.slice(0, 4).map((doc) => (
              <div key={doc.id} className="p-3 border border-[#EBEFF5] hover:border-[#F2A900] transition-colors flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-mono text-[11px] font-bold text-[#0F1B2D]">{doc.docCode}</div>
                  <div className="text-xs text-[#5A6372] line-clamp-1">{doc.title}</div>
                  <div className="text-[10px] text-[#7B8798] font-mono">Ban hành: {doc.issuedDate} · {doc.fileSize}</div>
                </div>

                <a
                  href={`#download-${doc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Đang tải tài liệu: ${doc.docCode} (${doc.fileFormat})`);
                  }}
                  className="px-2.5 py-1 bg-[#F4F5F7] hover:bg-[#0F1B2D] hover:text-white text-[#0F1B2D] text-xs font-mono font-medium border border-[#DDE1E7] transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#F2A900]" />
                  <span>{doc.fileFormat}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
