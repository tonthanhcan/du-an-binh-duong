import React, { useState } from 'react';
import { 
  Clock, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  HardHat, 
  ShieldCheck, 
  Sun 
} from 'lucide-react';
import { DAILY_REPORTS, DailyReportRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';
import { useAuth } from '../context/AuthContext';

export const DailyReportPage: React.FC = () => {
  const { canEdit } = useAuth();
  const [data, setData] = useState<DailyReportRow[]>(DAILY_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (searchTerm && !item.reportCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.mainActivities.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Mã báo cáo', 'Ngày', 'Thời tiết', 'Nhân lực CSCEC', 'Nhân lực Thầu phụ', 'Tổng nhân lực', 'Thiết bị chính', 'Hoạt động thi công chính', 'An toàn', 'Người lập'];
    const rows = filteredData.map(d => [
      d.reportCode,
      d.reportDate,
      d.weather,
      d.cscecWorkers,
      d.subContractorWorkers,
      d.totalWorkers,
      d.heavyMachinery,
      d.mainActivities,
      d.safetyIncident,
      d.submittedBy,
    ]);
    exportToCsv('Nhat_ky_bao_cao_ngay_CSCEC', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: DailyReportRow = {
      id: `DR-${Date.now()}`,
      reportCode: newItem.code || `BD-DLY-[${new Date().toISOString().slice(0, 10).replace(/-/g, '')}]`,
      reportDate: newItem.date || '[dd/mm/yyyy]',
      weather: 'Nắng ráo (Sunny)',
      cscecWorkers: '[xx]',
      subContractorWorkers: '[xx]',
      totalWorkers: '[xx người]',
      heavyMachinery: '05 Cần trục tháp, 03 Vận thăng lồng, 02 Bơm bê tông',
      mainActivities: newItem.title || 'Thi công cốt thép dầm sàn và bảo dưỡng bê tông',
      safetyIncident: 'Không có sự cố (0 vụ)',
      submittedBy: newItem.responsible || 'Kỹ sư Báo cáo CSCEC',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">12 / DAILY REPORT</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">NHẬT KÝ BÁO CÁO NGÀY (SITE DAILY REPORT)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Tổng hợp biểu đồ nhân lực, máy móc thiết bị, khối lượng thi công thực hiện và tình hình an toàn công trường hàng ngày
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {canEdit && (
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>Lập báo cáo ngày</span>
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
          <div className="text-xs text-[#5A6372]">Nhân lực Tổng thầu CSCEC</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[xx] người</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Kỹ sư & giám sát trực tiếp</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Nhân lực các tổ đội thầu phụ</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[xx] người</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Thợ sắt, cốp pha, MEP, thợ hồ</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Thiết bị cần trục tháp hoạt động</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">05 / 05</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">100% kiểm định an toàn còn hạn</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Sự cố tai nạn mất ngày (LTI)</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">0 vụ</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Tuyệt đối an toàn công trường</div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white border border-[#DDE1E7] p-4 flex items-center justify-between">
        <div className="text-xs text-[#5A6372] font-medium">
          Danh sách nhật ký thi công gần nhất do Tổng thầu CSCEC đệ trình và TVGS ICIC xác nhận
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo ngày, công việc..."
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
                <th className="py-2.5 px-3 font-mono">MÃ BÁO CÁO</th>
                <th className="py-2.5 px-3 font-mono">NGÀY</th>
                <th className="py-2.5 px-3">THỜI TIẾT</th>
                <th className="py-2.5 px-3 font-mono">TỔNG QUÂN SỐ</th>
                <th className="py-2.5 px-3">THIẾT BỊ HOẠT ĐỘNG CHÍNH</th>
                <th className="py-2.5 px-3">KHỐI LƯỢNG THI CÔNG NỔI BẬT</th>
                <th className="py-2.5 px-3 text-center">AN TOÀN HSE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.reportCode}</td>
                  <td className="py-2.5 px-3 font-mono text-[#5A6372] whitespace-nowrap">{item.reportDate}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-[11px] bg-blue-50 text-blue-700 border border-blue-200">
                      {item.weather}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.totalWorkers}</td>
                  <td className="py-2.5 px-3 text-[#5A6372] max-w-xs">{item.heavyMachinery}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29] max-w-sm">{item.mainActivities}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className="px-2 py-0.5 text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                      {item.safetyIncident}
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
        pageType="daily-report"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
