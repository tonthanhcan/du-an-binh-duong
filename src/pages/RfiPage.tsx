import React, { useState } from 'react';
import { 
  HelpCircle, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';
import { RFI_DATA, RfiRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';

export const RfiPage: React.FC = () => {
  const [data, setData] = useState<RfiRow[]>(RFI_DATA);
  const [towerFilter, setTowerFilter] = useState('ALL');
  const [disciplineFilter, setDisciplineFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (towerFilter !== 'ALL' && item.tower !== towerFilter) return false;
    if (disciplineFilter !== 'ALL' && item.discipline !== disciplineFilter) return false;
    if (statusFilter !== 'ALL' && !item.status.includes(statusFilter)) return false;
    if (searchTerm && !item.rfiCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Số RFI', 'Tiêu đề câu hỏi', 'Khối tháp', 'Bộ môn', 'Người hỏi', 'Người trả lời', 'Ngày gửi', 'Hạn trả lời', 'Trạng thái'];
    const rows = filteredData.map(r => [
      r.rfiCode,
      r.title,
      r.tower,
      r.discipline,
      r.sender,
      r.responder,
      r.sentDate,
      r.dueDate,
      r.status,
    ]);
    exportToCsv('Danh_sach_RFI_SiteQuery', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: RfiRow = {
      id: `RFI-${Date.now()}`,
      rfiCode: newItem.code || 'BD-RFI-STR-[xxx]',
      title: newItem.title || 'Làm rõ chi tiết thiết kế liên kết kết cấu',
      tower: newItem.tower || 'TA#1',
      sender: 'CSCEC (Ban Kỹ thuật)',
      responder: newItem.responsible || 'Liên danh TV Thiết kế & TVGS ICIC',
      sentDate: newItem.date || '[dd/mm/yyyy]',
      dueDate: '[dd/mm/yyyy]',
      discipline: 'Kết cấu',
      status: 'Đang xử lý (Open)',
      urgency: 'Khẩn',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">05 / RFI</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">YÊU CẦU LÀM RÕ THIẾT KẾ (REQUEST FOR INFORMATION - RFI)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Quản lý câu hỏi hiện trường, vướng mắc bản vẽ giữa Tổng thầu CSCEC, TVGS ICIC và Tư vấn Thiết kế
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Tạo RFI mới</span>
          </button>

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
          <div className="text-xs text-[#5A6372]">Tổng số RFI đã phát hành</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[n] RFI</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Lũy kế toàn dự án 5 tháp</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">RFI đã phản hồi & đóng (Closed)</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[n] RFI</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Đã cập nhật vào bản vẽ IFC</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">RFI đang xử lý (Open)</div>
          <div className="text-2xl font-bold font-mono text-[#D97706] mt-1">[n] RFI</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Đang chờ TVTK trả lời</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">RFI Quá hạn xử lý (&gt;5 ngày)</div>
          <div className="text-2xl font-bold font-mono text-[#D9383A] mt-1">[n] RFI</div>
          <div className="text-[11px] text-[#D9383A] font-mono mt-0.5">Cần BQLDA đôn đốc khẩn cấp</div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white border border-[#DDE1E7] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Lọc tháp:</span>
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
              <option value="Hạ tầng">Hạ tầng</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Bộ môn:</span>
            <select
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
            >
              <option value="ALL">Tất cả bộ môn</option>
              <option value="Kết cấu">Kết cấu</option>
              <option value="Kiến trúc">Kiến trúc</option>
              <option value="Cơ điện (MEP)">Cơ điện (MEP)</option>
              <option value="Quy hoạch hạ tầng">Quy hoạch hạ tầng</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="Closed">Đã trả lời (Closed)</option>
              <option value="Open">Đang xử lý (Open)</option>
              <option value="Overdue">Quá hạn (Overdue)</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo số RFI, tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#DDE1E7] text-xs outline-none font-sans"
          />
        </div>
      </div>

      {/* 4. Table */}
      <div className="bg-white border border-[#DDE1E7] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#F4F5F7] text-[#1A1F29] border-b border-[#DDE1E7] font-semibold">
                <th className="py-2.5 px-3 font-mono">SỐ RFI</th>
                <th className="py-2.5 px-3 font-mono">THÁP</th>
                <th className="py-2.5 px-3">NỘI DUNG YÊU CẦU LÀM RÕ</th>
                <th className="py-2.5 px-3">BỘ MÔN</th>
                <th className="py-2.5 px-3">NGƯỜI HỎI</th>
                <th className="py-2.5 px-3">NGƯỜI TRẢ LỜI</th>
                <th className="py-2.5 px-3 font-mono">NGÀY GỬI</th>
                <th className="py-2.5 px-3 font-mono">HẠN TRẢ LỜI</th>
                <th className="py-2.5 px-3 text-center">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.rfiCode}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-[#5A6372]">{item.tower}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29] max-w-xs">{item.title}</td>
                  <td className="py-2.5 px-3 text-[#5A6372] whitespace-nowrap">{item.discipline}</td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.sender}</td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.responder}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.sentDate}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-[#0F1B2D] whitespace-nowrap">{item.dueDate}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      item.status.includes('Closed')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : item.status.includes('Overdue')
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
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
        pageType="rfi"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
