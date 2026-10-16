import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Truck 
} from 'lucide-react';
import { PROCUREMENT_DATA, ProcurementRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';

export const ProcurementPage: React.FC = () => {
  const [data, setData] = useState<ProcurementRow[]>(PROCUREMENT_DATA);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (statusFilter !== 'ALL' && !item.status.includes(statusFilter)) return false;
    if (searchTerm && !item.matCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.materialName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Mã vật tư', 'Tên vật tư', 'Quy cách kỹ thuật', 'Nhà cung cấp', 'Phạm vi áp dụng', 'Ngày trình', 'Ngày cấp hàng', 'Tình trạng', 'Mã phê duyệt'];
    const rows = filteredData.map(p => [
      p.matCode,
      p.materialName,
      p.specification,
      p.supplier,
      p.towerApplied,
      p.submissionDate,
      p.targetDeliveryDate,
      p.status,
      p.approvalCode,
    ]);
    exportToCsv('Ke_hoach_mua_sam_vat_tu', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: ProcurementRow = {
      id: `MAT-${Date.now()}`,
      matCode: newItem.code || 'BD-MAT-[xxx]',
      materialName: newItem.title || 'Mẫu gạch ốp lát granite',
      specification: 'Quy cách chuẩn thiết kế',
      supplier: newItem.responsible || 'Nhà cung cấp [xxx]',
      towerApplied: newItem.tower || 'Toàn bộ 5 tháp',
      submissionDate: newItem.date || '[dd/mm/yyyy]',
      targetDeliveryDate: '[dd/mm/yyyy]',
      status: 'Đang thẩm tra mẫu',
      approvalCode: '[Đang duyệt]',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">07 / PROCUREMENT</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">MUA SẮM & PHÊ DUYỆT VẬT TƯ (MATERIAL SUBMITTALS)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Quản lý kế hoạch cung ứng, thẩm định mẫu vật liệu thép, bê tông, nhôm kính và tiến độ hàng về công trường
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Trình duyệt mẫu mới</span>
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
          <div className="text-xs text-[#5A6372]">Vật liệu đã về công trường</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[xx] loại</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Thép Hòa Phát, Bê tông, Cốp pha</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Vật tư đã phê duyệt (Approved)</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[xx] mã</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Sẵn sàng đặt hàng chế tạo</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Đang thẩm tra mẫu đối chứng</div>
          <div className="text-2xl font-bold font-mono text-[#D97706] mt-1">[n] mẫu</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Kính Low-E, Nhôm mặt dựng</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Vật tư chờ CSCEC trình mẫu</div>
          <div className="text-2xl font-bold font-mono text-[#D9383A] mt-1">[n] mã</div>
          <div className="text-[11px] text-[#D9383A] font-mono mt-0.5">Đá ốp sảnh, Gạch ceramic</div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white border border-[#DDE1E7] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#5A6372] font-medium">Tình trạng:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
          >
            <option value="ALL">Tất cả tình trạng</option>
            <option value="Đã về công trường">Đã về công trường</option>
            <option value="Đã phê duyệt">Đã phê duyệt</option>
            <option value="thẩm tra">Đang thẩm tra mẫu</option>
            <option value="Chờ trình">Chờ trình mẫu vật liệu</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo mã vật tư, tên vật liệu..."
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
                <th className="py-2.5 px-3 font-mono">MÃ VẬT TƯ</th>
                <th className="py-2.5 px-3">TÊN VẬT TƯ & QUY CÁCH</th>
                <th className="py-2.5 px-3">NHÀ CUNG CẤP / XUẤT XỨ</th>
                <th className="py-2.5 px-3">PHẠM VI ÁP DỤNG</th>
                <th className="py-2.5 px-3 font-mono">NGÀY TRÌNH</th>
                <th className="py-2.5 px-3 font-mono">TIẾN ĐỘ CẤP HÀNG</th>
                <th className="py-2.5 px-3 text-center">TÌNH TRẠNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.matCode}</td>
                  <td className="py-2.5 px-3">
                    <div className="font-medium text-[#1A1F29]">{item.materialName}</div>
                    <div className="text-[11px] text-[#5A6372]">{item.specification}</div>
                  </td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.supplier}</td>
                  <td className="py-2.5 px-3 font-mono text-[#5A6372] whitespace-nowrap">{item.towerApplied}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.submissionDate}</td>
                  <td className="py-2.5 px-3 font-mono text-[#0F1B2D] whitespace-nowrap">{item.targetDeliveryDate}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      item.status === 'Đã về công trường' || item.status === 'Đã phê duyệt'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : item.status.includes('thẩm tra')
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-red-50 text-red-800 border-red-200'
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
        pageType="procurement"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
