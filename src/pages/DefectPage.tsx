import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { DEFECT_DATA, DefectRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';
import { useAuth } from '../context/AuthContext';

export const DefectPage: React.FC = () => {
  const { canEdit } = useAuth();
  const [data, setData] = useState<DefectRow[]>(DEFECT_DATA);
  const [towerFilter, setTowerFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (towerFilter !== 'ALL' && item.tower !== towerFilter) return false;
    if (severityFilter !== 'ALL' && !item.severity.includes(severityFilter)) return false;
    if (statusFilter !== 'ALL' && !item.status.includes(statusFilter)) return false;
    if (searchTerm && !item.defectCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Mã lỗi', 'Khối tháp', 'Vị trí', 'Mô tả khuyết tật', 'Mức độ', 'Người ghi nhận', 'Phụ trách khắc phục', 'Ngày ghi nhận', 'Hạn khắc phục', 'Tình trạng'];
    const rows = filteredData.map(d => [
      d.defectCode,
      d.tower,
      d.location,
      d.description,
      d.severity,
      d.reportedBy,
      d.assignedTo,
      d.reportedDate,
      d.rectifyDeadline,
      d.status,
    ]);
    exportToCsv('Danh_sach_loi_thi_cong_NCR', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: DefectRow = {
      id: `DEF-${Date.now()}`,
      defectCode: newItem.code || 'BD-DEF-[xxx]',
      tower: newItem.tower || 'TA#1',
      location: 'Khu vực thi công sàn',
      description: newItem.title || 'Khuyết tật bề mặt bê tông dầm sàn',
      severity: 'Trung bình',
      reportedBy: 'Kỹ sư QA/QC ICIC',
      assignedTo: newItem.responsible || 'Ban Chỉ huy CSCEC',
      reportedDate: newItem.date || '[dd/mm/yyyy]',
      rectifyDeadline: '[dd/mm/yyyy]',
      status: 'Chưa khắc phục',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">08 / DEFECT</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">DANH SÁCH LỖI & BIÊN BẢN KHÔNG PHÙ HỢP (DEFECTS & NCR)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Theo dõi lỗi thi công, biên bản không phù hợp (NCR) của Tư vấn Giám sát ICIC và thời hạn khắc phục của Tổng thầu CSCEC
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {canEdit && (
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>Ghi nhận lỗi mới</span>
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
          <div className="text-xs text-[#5A6372]">Tổng số lỗi ghi nhận lũy kế</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[xx] lỗi</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Trên 5 khối tháp & hầm</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Biên bản NCR Nghiêm trọng mở</div>
          <div className="text-2xl font-bold font-mono text-[#D9383A] mt-1">[01] NCR</div>
          <div className="text-[11px] text-[#D9383A] font-mono mt-0.5">BD-NCR-[004] - An toàn TA#5</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Lỗi đang trong hạn khắc phục</div>
          <div className="text-2xl font-bold font-mono text-[#D97706] mt-1">[02] lỗi</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">CSCEC đang xử lý bề mặt</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Đã nghiệm thu khắc phục (Closed)</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[xx] lỗi</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Đạt kiểm tra nghiệm thu lại</div>
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
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Mức độ:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
            >
              <option value="ALL">Tất cả mức độ</option>
              <option value="NCR">Nghiêm trọng (NCR)</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Nhẹ">Nhẹ</option>
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
              <option value="Chưa khắc phục">Chưa khắc phục</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đã nghiệm thu">Đã nghiệm thu khắc phục</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo mã lỗi, mô tả..."
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
                <th className="py-2.5 px-3 font-mono">MÃ LỖI</th>
                <th className="py-2.5 px-3 font-mono">THÁP</th>
                <th className="py-2.5 px-3">VỊ TRÍ</th>
                <th className="py-2.5 px-3">MÔ TẢ KHUYẾT TẬT</th>
                <th className="py-2.5 px-3">MỨC ĐỘ</th>
                <th className="py-2.5 px-3">PHỤ TRÁCH KHẮC PHỤC</th>
                <th className="py-2.5 px-3 font-mono">HẠN KHẮC PHỤC</th>
                <th className="py-2.5 px-3 text-center">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.defectCode}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-[#5A6372]">{item.tower}</td>
                  <td className="py-2.5 px-3 text-[#5A6372] whitespace-nowrap">{item.location}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29] max-w-sm">{item.description}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[10px] font-mono ${
                      item.severity.includes('NCR')
                        ? 'bg-red-50 text-red-800 border border-red-200 font-bold'
                        : item.severity === 'Trung bình'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.assignedTo}</td>
                  <td className="py-2.5 px-3 font-mono text-[#D9383A] font-semibold whitespace-nowrap">{item.rectifyDeadline}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      item.status === 'Đã nghiệm thu khắc phục'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : item.status === 'Chưa khắc phục'
                        ? 'bg-red-50 text-red-800 border-red-200 font-bold'
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
        pageType="defect"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
