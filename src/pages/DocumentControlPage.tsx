import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  FileCheck, 
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { DOCUMENT_CONTROL_DATA, DocumentRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';

export const DocumentControlPage: React.FC = () => {
  const [data, setData] = useState<DocumentRow[]>(DOCUMENT_CONTROL_DATA);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (typeFilter !== 'ALL' && item.docType !== typeFilter) return false;
    if (searchTerm && !item.docCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Mã văn bản', 'Loại hồ sơ', 'Tiêu đề trích yếu', 'Bên gửi', 'Bên nhận', 'Ngày ban hành', 'Định dạng', 'Dung lượng', 'Tình trạng'];
    const rows = filteredData.map(d => [
      d.docCode,
      d.docType,
      d.title,
      d.fromParty,
      d.toParty,
      d.issuedDate,
      d.fileFormat,
      d.fileSize,
      d.status,
    ]);
    exportToCsv('So_quan_ly_van_ban_PMIS', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: DocumentRow = {
      id: `DOC-${Date.now()}`,
      docCode: newItem.code || 'BD-PMH-OUT-[xxx]',
      docType: 'Công văn CĐT',
      title: newItem.title || 'Công văn chỉ đạo về an toàn và tiến độ',
      fromParty: 'BQLDA Phú Mỹ Hưng',
      toParty: newItem.responsible || 'CSCEC & ICIC',
      issuedDate: newItem.date || '[dd/mm/yyyy]',
      fileFormat: 'PDF',
      fileSize: '[x.x MB]',
      status: 'Ban hành chính thức',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">06 / DOCUMENT CONTROL</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">QUẢN LÝ VĂN BẢN & HỒ SƠ DỰ ÁN (DOCUMENT CONTROL)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Lưu trữ sổ công văn đến/đi, biên bản họp giao ban BD-WKM-MoM-xxx, thư cảnh báo tư vấn BD-ICIC-WL-xxx và bản vẽ phát hành thi công (IFC)
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Đăng ký văn bản mới</span>
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
          <div className="text-xs text-[#5A6372]">Biên bản họp tuần (BD-WKM-MoM)</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[42] BB</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Phát hành chính thức hàng tuần</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Thư cảnh báo TVGS (BD-ICIC-WL)</div>
          <div className="text-2xl font-bold font-mono text-[#D9383A] mt-1">[08] WL</div>
          <div className="text-[11px] text-[#D9383A] font-mono mt-0.5">Đã xử lý: [07] · Tồn: [01]</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Báo cáo QLDA tuần (PMH-WKR)</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[42] BC</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Lưu trữ đầy đủ trên server</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Bản vẽ thi công IFC duyệt</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[xxx] bản</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Bao gồm Kiến trúc, Kết cấu, MEP</div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white border border-[#DDE1E7] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#5A6372] font-medium">Loại hồ sơ:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
          >
            <option value="ALL">Tất cả loại hồ sơ</option>
            <option value="Biên bản họp tuần">Biên bản họp tuần (BD-WKM-MoM)</option>
            <option value="Thư cảnh báo">Thư cảnh báo tư vấn (BD-ICIC-WL)</option>
            <option value="Báo cáo QLDA">Báo cáo QLDA</option>
            <option value="Công văn CĐT">Công văn CĐT</option>
            <option value="Bản vẽ thi công">Bản vẽ thi công (IFC)</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo mã văn bản, trích yếu..."
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
                <th className="py-2.5 px-3 font-mono">MÃ VĂN BẢN</th>
                <th className="py-2.5 px-3">LOẠI HỒ SƠ</th>
                <th className="py-2.5 px-3">TIÊU ĐỀ TRÍCH YẾU NỘI DUNG</th>
                <th className="py-2.5 px-3">TỪ / ĐẾN</th>
                <th className="py-2.5 px-3 font-mono">NGÀY BAN HÀNH</th>
                <th className="py-2.5 px-3 font-mono text-center">FILE</th>
                <th className="py-2.5 px-3 text-center">TÌNH TRẠNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.docCode}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[10px] font-mono ${
                      item.docType === 'Thư cảnh báo'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : item.docType === 'Biên bản họp tuần'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.docType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29] max-w-sm">{item.title}</td>
                  <td className="py-2.5 px-3 text-[#5A6372] whitespace-nowrap">{item.fromParty} → {item.toParty}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.issuedDate}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => alert(`Đang tải tệp tin: ${item.docCode} (${item.fileFormat})`)}
                      className="px-2 py-0.5 bg-[#F4F5F7] hover:bg-[#0F1B2D] hover:text-white text-[#0F1B2D] font-mono text-[11px] font-bold border border-[#DDE1E7] transition-colors cursor-pointer"
                    >
                      {item.fileFormat}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      item.status === 'Ban hành chính thức'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
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
        pageType="document-control"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
