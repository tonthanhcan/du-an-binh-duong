import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Plus, 
  Filter, 
  Search 
} from 'lucide-react';
import { INSPECTION_DATA, InspectionRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';

export const InspectionPage: React.FC = () => {
  const [data, setData] = useState<InspectionRow[]>(INSPECTION_DATA);
  const [towerFilter, setTowerFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (towerFilter !== 'ALL' && item.tower !== towerFilter) return false;
    if (statusFilter !== 'ALL' && !item.result.includes(statusFilter)) return false;
    if (searchTerm && !item.irCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.workCategory.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Mã IR', 'Khối tháp', 'Vị trí', 'Hạng mục nghiệm thu', 'Đơn vị thực hiện', 'Người kiểm tra', 'Ngày kiểm tra', 'Kết quả', 'Ghi chú'];
    const rows = filteredData.map(i => [
      i.irCode,
      i.tower,
      i.location,
      i.workCategory,
      i.contractor,
      i.inspector,
      i.inspectionDate,
      i.result,
      i.remarks,
    ]);
    exportToCsv('Ho_so_nghiem_thu_IR', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: InspectionRow = {
      id: `IR-${Date.now()}`,
      irCode: newItem.code || 'BD-IR-STR-[xxx]',
      tower: newItem.tower || 'TA#1',
      location: 'Khu vực thi công sàn',
      workCategory: newItem.title || 'Nghiệm thu cốp pha cốt thép',
      contractor: 'CSCEC',
      inspector: newItem.responsible || 'Đoàn TVGS ICIC & Kỹ sư CĐT',
      inspectionDate: newItem.date || '[dd/mm/yyyy]',
      result: 'Chờ nghiệm thu',
      remarks: 'Đã lập phiếu yêu cầu, chờ bàn giao hiện trường.',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">03 / INSPECTION DOCUMENT</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">HỒ SƠ NGHIỆM THU (INSPECTION REQUEST - IR)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Quản lý phiếu yêu cầu kiểm tra cốt thép, cốp pha, bê tông, MEP và nghiệm thu chất lượng hiện trường
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Thêm mới IR</span>
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
          <div className="text-xs text-[#5A6372]">Tổng số đợt nghiệm thu (IR)</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[xx] đợt</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Lũy kế từ ngày khởi công</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Tỷ lệ nghiệm thu Đạt lần đầu</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[xx%]</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Đạt chỉ tiêu QA/QC đề ra</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">IR đang chờ kiểm tra tuần này</div>
          <div className="text-2xl font-bold font-mono text-[#D97706] mt-1">[n] IR</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Cần TVGS bố trí kiểm tra ngay</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">IR Không đạt (Cần sửa chữa)</div>
          <div className="text-2xl font-bold font-mono text-[#D9383A] mt-1">[n] IR</div>
          <div className="text-[11px] text-[#D9383A] font-mono mt-0.5">Đang yêu cầu CSCEC khắc phục</div>
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
              <option value="Hạ tầng">Hạ tầng & Cảnh quan</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Kết quả:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
            >
              <option value="ALL">Tất cả kết quả</option>
              <option value="Đạt">Đạt (Approved)</option>
              <option value="Chờ">Chờ nghiệm thu</option>
              <option value="Không đạt">Không đạt (Rejected)</option>
              <option value="điều kiện">Đạt có điều kiện</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo mã IR, hạng mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#DDE1E7] text-xs outline-none font-sans"
          />
        </div>
      </div>

      {/* 4. Table */}
      <div className="bg-white border border-[#DDE1E7] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#F4F5F7] text-[#1A1F29] border-b border-[#DDE1E7] font-semibold">
                <th className="py-2.5 px-3 font-mono">MÃ IR</th>
                <th className="py-2.5 px-3 font-mono">THÁP</th>
                <th className="py-2.5 px-3">VỊ TRÍ</th>
                <th className="py-2.5 px-3">HẠNG MỤC NGHIỆM THU</th>
                <th className="py-2.5 px-3">ĐƠN VỊ THỰC HIỆN</th>
                <th className="py-2.5 px-3">NGƯỜI KIỂM TRA</th>
                <th className="py-2.5 px-3 font-mono">NGÀY KT</th>
                <th className="py-2.5 px-3 text-center">KẾT QUẢ</th>
                <th className="py-2.5 px-3">GHI CHÚ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.irCode}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-[#5A6372]">{item.tower}</td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.location}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29]">{item.workCategory}</td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.contractor}</td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.inspector}</td>
                  <td className="py-2.5 px-3 font-mono text-[#5A6372] whitespace-nowrap">{item.inspectionDate}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      item.result.includes('Approved') || item.result.includes('Đạt') && !item.result.includes('điều kiện')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : item.result.includes('Chờ')
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : item.result.includes('Rejected') || item.result.includes('Không')
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      {item.result}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#5A6372] text-[11px]">{item.remarks}</td>
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
        pageType="inspection"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
