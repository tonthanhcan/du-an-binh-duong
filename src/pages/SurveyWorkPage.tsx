import React, { useState } from 'react';
import { 
  Compass, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { SURVEY_DATA, SurveyRow } from '../data/projectData';
import { exportToCsv } from '../utils/exportCsv';
import { NewItemModal } from '../components/NewItemModal';
import { useAuth } from '../context/AuthContext';

export const SurveyWorkPage: React.FC = () => {
  const { canEdit } = useAuth();
  const [data, setData] = useState<SurveyRow[]>(SURVEY_DATA);
  const [towerFilter, setTowerFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredData = data.filter((item) => {
    if (towerFilter !== 'ALL' && item.tower !== towerFilter) return false;
    if (typeFilter !== 'ALL' && item.surveyType !== typeFilter) return false;
    if (searchTerm && !item.pointCode.toLowerCase().includes(searchTerm.toLowerCase()) && !item.surveyType.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const headers = ['Mã mốc đo', 'Khối tháp', 'Hạng mục quan trắc', 'Giá trị đo được', 'Giới hạn cho phép', 'Thiết bị đo', 'Ngày đo', 'Đánh giá', 'Đơn vị thực hiện'];
    const rows = filteredData.map(s => [
      s.pointCode,
      s.tower,
      s.surveyType,
      s.measuredValue,
      s.allowableValue,
      s.equipmentUsed,
      s.surveyDate,
      s.evaluation,
      s.surveyor,
    ]);
    exportToCsv('Ket_qua_trac_dac_quan_trac', headers, rows);
  };

  const handleAddNew = (newItem: any) => {
    const row: SurveyRow = {
      id: `SRV-${Date.now()}`,
      pointCode: newItem.code || 'M-LUN-TA1-[xx]',
      tower: newItem.tower || 'TA#1',
      surveyType: 'Quan trắc lún',
      measuredValue: '[x.xx mm]',
      allowableValue: '[< xx mm]',
      equipmentUsed: 'Máy thủy bình điện tử Leica DNA03',
      surveyDate: newItem.date || '[dd/mm/yyyy]',
      evaluation: 'Đạt chuẩn (Normal)',
      surveyor: newItem.responsible || 'Đơn vị quan trắc độc lập',
    };
    setData([row, ...data]);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">09 / SURVEY WORK</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">TRẮC ĐẠC & QUAN TRẮC CÔNG TRÌNH (SURVEY & MONITORING)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Theo dõi độ lún móng, độ nghiêng tháp, tim trục kiến trúc và kiểm soát độ thẳng đứng lõi thang máy 5 tháp
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {canEdit && (
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-3.5 py-2 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>Ghi nhận số liệu đo</span>
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
          <div className="text-xs text-[#5A6372]">Tổng số mốc quan trắc lún móng</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[xx] mốc</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Bố trí quanh chu vi 5 tháp</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Độ lún tích lũy lớn nhất</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[x.xx mm]</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Nằm trong ngưỡng cho phép [&lt; xx mm]</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Độ nghiêng kết cấu thân tháp</div>
          <div className="text-2xl font-bold font-mono text-[#0F1B2D] mt-1">[x.x mm/H]</div>
          <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">Tiêu chuẩn: [&lt; H/1000]</div>
        </div>

        <div className="bg-white border border-[#DDE1E7] p-4">
          <div className="text-xs text-[#5A6372]">Độ lệch tim trục thi công</div>
          <div className="text-2xl font-bold font-mono text-[#16A34A] mt-1">[±x mm]</div>
          <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">Đạt yêu cầu nghiệm thu TCVN</div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white border border-[#DDE1E7] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Khối tháp:</span>
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
            <span className="text-[#5A6372] font-medium">Hạng mục quan trắc:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
            >
              <option value="ALL">Tất cả hạng mục</option>
              <option value="Quan trắc lún">Quan trắc lún</option>
              <option value="Quan trắc nghiêng">Quan trắc nghiêng</option>
              <option value="Tim trục & cao độ">Tim trục & cao độ</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798]" />
          <input
            type="text"
            placeholder="Tìm theo mã mốc, thiết bị..."
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
                <th className="py-2.5 px-3 font-mono">MÃ MỐC</th>
                <th className="py-2.5 px-3 font-mono">THÁP</th>
                <th className="py-2.5 px-3">HẠNG MỤC QUAN TRẮC</th>
                <th className="py-2.5 px-3 font-mono">GIÁ TRỊ ĐO ĐƯỢC</th>
                <th className="py-2.5 px-3 font-mono">GIỚI HẠN CHO PHÉP</th>
                <th className="py-2.5 px-3">THIẾT BỊ ĐO KIỂM</th>
                <th className="py-2.5 px-3 font-mono">NGÀY ĐO</th>
                <th className="py-2.5 px-3 text-center">ĐÁNH GIÁ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEFF5]">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.pointCode}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-[#5A6372]">{item.tower}</td>
                  <td className="py-2.5 px-3 font-medium text-[#1A1F29] whitespace-nowrap">{item.surveyType}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D] whitespace-nowrap">{item.measuredValue}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.allowableValue}</td>
                  <td className="py-2.5 px-3 text-[#5A6372]">{item.equipmentUsed}</td>
                  <td className="py-2.5 px-3 font-mono text-[#7B8798] whitespace-nowrap">{item.surveyDate}</td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                      item.evaluation === 'Đạt chuẩn (Normal)'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {item.evaluation}
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
        pageType="survey"
        onAddItem={handleAddNew}
      />

    </div>
  );
};
