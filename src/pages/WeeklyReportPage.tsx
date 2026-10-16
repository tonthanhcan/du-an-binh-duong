import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  FileCheck, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { WEEKLY_REPORTS, WeeklyReportRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';
import { WeeklyRfiWarningChart } from '../components/charts/WeeklyRfiWarningChart';
import { useAuth } from '../context/AuthContext';

export const WeeklyReportPage: React.FC = () => {
  const { canEdit } = useAuth();
  const [data, setData] = useState<WeeklyReportRow[]>(WEEKLY_REPORTS);
  const [authorFilter, setAuthorFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (authorFilter !== 'ALL' && item.authorOrg !== authorFilter) return false;
    if (searchTerm && !item.officialCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Tuần', 'Mã tài liệu', 'Tiêu đề báo cáo / Biên bản', 'Thời gian', 'Đơn vị phát hành', 'Tóm tắt nội dung', 'Tình trạng'];
    const rows = filteredData.map(w => [
      w.weekCode,
      w.officialCode,
      w.title,
      w.datePeriod,
      w.authorOrg,
      w.summary,
      w.status,
    ]);
    exportToCsv('Bao_cao_tuan_va_Bien_ban_MoM', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: WeeklyReportRow = {
      id: `WR-${Date.now()}`,
      weekCode: 'Tuần [W43]',
      title: newItem.title || 'Biên bản cuộc họp giao ban tuần mới',
      datePeriod: newItem.date || '[dd/mm – dd/mm/yyyy]',
      authorOrg: 'TVGS ICIC',
      officialCode: newItem.code || 'BD-WKM-MoM-[043]',
      status: 'Đã phát hành chính thức',
      summary: 'Ghi nhận kết luận giao ban tuần về tiến độ 5 tháp và an toàn lao động.',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">13 / WEEKLY REPORT</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">BÁO CÁO QLDA & BIÊN BẢN HỌP TUẦN (WEEKLY REPORT & MoM)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Lưu trữ Báo cáo Quản lý Dự án định kỳ của Phú Mỹ Hưng và Biên bản họp giao ban tuần chuẩn mã BD-WKM-MoM-xxx
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {canEdit && (
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>Phát hành tài liệu tuần</span>
            </button>
          )}

          <button
            onClick={handleExport}
            className="px-3 py-2 bg-white border border-[#DDE1E7] text-[#0F1B2D] text-xs font-semibold hover:bg-[#F4F5F7] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Báo cáo QLDA tuần (PMH-WKR)</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[42] kỳ</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Lập bởi BQLDA Bình Dương</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Biên bản họp giao ban (BD-WKM-MoM)</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[42] BB</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">100% có chữ ký đại diện 3 bên</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Thư cảnh báo TVGS (BD-ICIC-WL)</div>
          <div className="text-2xl font-bold font-mono text-[#D9383A] mt-1">[08] WL</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Tuần này: [0 WL] phát sinh</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Tỷ lệ hoàn thành nhiệm vụ giao ban</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[xx%]</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Duy trì bám sát chỉ đạo CĐT</div>
        </div>
      </div>

      {/* 3. Interactive Chart.js for RFI & Warning Letters */}
      <WeeklyRfiWarningChart />

      {/* 4. Filter Bar */}
      <div className="bg-white border border-[#DDE1E7] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#5A6372] font-medium">Đơn vị phát hành:</span>
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
          >
            <option value="ALL">Tất cả đơn vị</option>
            <option value="BQLDA PMH">BQLDA Phú Mỹ Hưng</option>
            <option value="TVGS ICIC">Tư vấn Giám sát ICIC</option>
            <option value="Tổng thầu CSCEC">Tổng thầu CSCEC</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo mã tài liệu, tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#DDE1E7] text-xs outline-none font-sans"
          />
        </div>
      </div>

      {/* 5. Table */}
      <div className="bg-white border border-[#DDE1E7] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#F4F5F7] text-[#1A1F29] border-b border-[#DDE1E7] font-semibold">
                <th className="py-2.5 px-3 font-mono">TUẦN</th>
                <th className="py-2.5 px-3 font-mono">MÃ TÀI LIỆU</th>
                <th className="py-2.5 px-3">TIÊU ĐỀ BÁO CÁO / BIÊN BẢN</th>
                <th className="py-2.5 px-3 font-mono">THỜI GIAN</th>
                <th className="py-2.5 px-3">ĐƠN VỊ PHÁT HÀNH</th>
                <th className="py-2.5 px-3">TÓM TẮT NỘI DUNG</th>
                <th className="py-2.5 px-3 text-center">TÌNH TRẠNG</th>
                <th className="py-2.5 px-3 text-center">TẢI VỀ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.weekCode}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.officialCode}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29] max-w-xs">{item.title}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.datePeriod}</td>
                  <td className="py-2.5 px-3 text-[#5A6372] whitespace-nowrap">{item.authorOrg}</td>
                  <td className="py-2.5 px-3 text-[#5A6372] max-w-sm text-[11px]">{item.summary}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className="px-2 py-0.5 text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => alert(`Đang tải tệp tin: ${item.officialCode} (PDF)`)}
                      className="px-2.5 py-1 bg-[#F4F5F7] hover:bg-[#0F1B2D] hover:text-white text-[#0F1B2D] text-xs font-mono font-semibold border border-[#DDE1E7] transition-colors flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-[#F2A900]" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Item Modal */}
      <NewItemModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        pageType="weekly-report"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
