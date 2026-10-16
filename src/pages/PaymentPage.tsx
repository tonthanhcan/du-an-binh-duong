import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle,
  FileCheck,
  TrendingUp 
} from 'lucide-react';
import { PAYMENT_DATA, PaymentRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';

export const PaymentPage: React.FC = () => {
  const [data, setData] = useState<PaymentRow[]>(PAYMENT_DATA);
  const [contractorFilter, setContractorFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (contractorFilter !== 'ALL' && !item.contractor.includes(contractorFilter)) return false;
    if (statusFilter !== 'ALL' && !item.status.includes(statusFilter)) return false;
    if (searchTerm && !item.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) && !item.scopeOfWork.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Đợt', 'Đơn vị thụ hưởng', 'Phạm vi công việc', 'Giá trị đề nghị', 'Giá trị duyệt', 'Tạm giữ', 'Lũy kế giải ngân', 'Ngày nộp', 'Ngày duyệt', 'Trạng thái'];
    const rows = filteredData.map(p => [
      p.batchNo,
      p.contractor,
      p.scopeOfWork,
      p.requestedValue,
      p.approvedValue,
      p.retentionValue,
      p.cumulativePaid,
      p.submittedDate,
      p.approvedDate,
      p.status,
    ]);
    exportToCsv('De_nghi_thanh_toan_PMIS', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: PaymentRow = {
      id: `PAY-${Date.now()}`,
      batchNo: newItem.code || 'Đợt [06]',
      contractor: newItem.responsible || 'CSCEC (Tổng thầu)',
      scopeOfWork: newItem.title || 'Thanh toán khối lượng thi công dầm sàn các tháp',
      requestedValue: newItem.value || '[x tỷ]',
      approvedValue: '[Đang duyệt]',
      retentionValue: '[x tỷ]',
      cumulativePaid: '[x tỷ]',
      submittedDate: newItem.date || '[dd/mm/yyyy]',
      approvedDate: '[Chờ duyệt]',
      status: 'Đang trình CĐT phê duyệt',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">04 / PAYMENT</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">ĐỀ NGHỊ & DUYỆT THANH TOÁN (PAYMENT CERTIFICATES)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Kiểm soát dòng tiền, thẩm tra khối lượng nghiệm thu và chứng chỉ thanh toán cho Tổng thầu CSCEC và TVGS ICIC
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Tạo hồ sơ thanh toán</span>
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
          <div className="text-xs text-[#5A6372]">Tổng giá trị hợp đồng phê duyệt</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[x,xxx tỷ]</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Gói thầu xây dựng 5 tháp</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Đã giải ngân thực tế lũy kế</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[x tỷ]</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Đạt [xx%] kế hoạch vốn</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Tạm giữ bảo hành 5% & Tạm ứng</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[x tỷ]</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Khấu trừ theo từng chứng chỉ</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Đang trình CĐT phê duyệt đợt mới</div>
          <div className="text-2xl font-bold font-mono text-[#D97706] mt-1">[x tỷ]</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Đợt [04] - Tiến độ thân tháp</div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white border border-[#DDE1E7] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Đơn vị:</span>
            <select
              value={contractorFilter}
              onChange={(e) => setContractorFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none font-mono"
            >
              <option value="ALL">Tất cả đơn vị</option>
              <option value="CSCEC">Tổng thầu CSCEC</option>
              <option value="ICIC">Tư vấn ICIC</option>
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
              <option value="Đã giải ngân">Đã giải ngân</option>
              <option value="phê duyệt">Đang trình CĐT phê duyệt</option>
              <option value="thẩm định">TVGS đang thẩm định</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo đợt thanh toán, nội dung..."
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
                <th className="py-2.5 px-3 font-mono">ĐỢT</th>
                <th className="py-2.5 px-3">ĐƠN VỊ THỤ HƯỞNG</th>
                <th className="py-2.5 px-3">PHẠM VI CÔNG VIỆC</th>
                <th className="py-2.5 px-3 text-right font-mono">GIÁ TRỊ ĐỀ NGHỊ</th>
                <th className="py-2.5 px-3 text-right font-mono">GIÁ TRỊ DUYỆT</th>
                <th className="py-2.5 px-3 font-mono">NGÀY TRÌNH</th>
                <th className="py-2.5 px-3 font-mono">NGÀY DUYỆT</th>
                <th className="py-2.5 px-3 text-center">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.batchNo}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29] whitespace-nowrap">{item.contractor}</td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.scopeOfWork}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#5A6372] whitespace-nowrap">{item.requestedValue}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.approvedValue}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.submittedDate}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.approvedDate}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      item.status === 'Đã giải ngân'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : item.status.includes('phê duyệt')
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
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
        pageType="payment"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
