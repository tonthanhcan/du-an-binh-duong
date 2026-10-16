import React, { useState } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  Clock, 
  UserCheck, 
  Filter, 
  ArrowRight, 
  CheckCircle,
  Plus 
} from 'lucide-react';
import { FOCUS_POINTS, FocusPointItem } from '../data/projectData';
import { useAuth } from '../context/AuthContext';

export const FocusPointPage: React.FC = () => {
  const { canEdit } = useAuth();
  const [data, setData] = useState<FocusPointItem[]>(FOCUS_POINTS);
  const [towerFilter, setTowerFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredData = data.filter((item) => {
    if (towerFilter !== 'ALL' && !item.tower.includes(towerFilter)) return false;
    if (priorityFilter !== 'ALL' && item.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">10 / FOCUS POINT</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">CÁC ĐIỂM NÓNG CẦN CHỈ ĐẠO GẤP (FOCUS POINTS)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Danh mục các vấn đề trọng điểm về tiến độ, kỹ thuật, an toàn và mẫu vật liệu cần Lãnh đạo Chủ đầu tư và Ban QLDA quyết định
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Tháp:</span>
            <select
              value={towerFilter}
              onChange={(e) => setTowerFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none font-mono"
            >
              <option value="ALL">Tất cả</option>
              <option value="TA#1">TA#1</option>
              <option value="TA#2">TA#2</option>
              <option value="TA#3">TA#3</option>
              <option value="TA#4">TA#4</option>
              <option value="TA#5">TA#5</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Ưu tiên:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none"
            >
              <option value="ALL">Tất cả mức độ</option>
              <option value="Khẩn">Khẩn cấp</option>
              <option value="Cao">Mức độ Cao</option>
              <option value="Trung bình">Trung bình</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Focus Points Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.map((fp) => (
          <div 
            key={fp.id}
            className="bg-white border border-[#DDE1E7] p-5 space-y-4 hover:border-[#F2A900] transition-all relative overflow-hidden shadow-2xs"
          >
            {/* Top Badge Strip */}
            <div className="flex items-center justify-between gap-2 border-b border-[#EBEFF5] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0F1B2D] bg-[#FEF9E7] px-2 py-0.5 border border-[#F2A900]">
                  {fp.tower}
                </span>
                <span className="text-xs font-semibold text-[#5A6372] uppercase tracking-wider font-mono">
                  {fp.category}
                </span>
              </div>

              <span className={`px-2.5 py-0.5 text-xs font-mono font-bold border ${
                fp.priority === 'Khẩn'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : fp.priority === 'Cao'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                Ưu tiên: {fp.priority}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-sm text-[#0F1B2D] leading-snug">
              {fp.title}
            </h3>

            {/* Impact & Consequence */}
            <div className="p-3 bg-[#F9FAFB] border border-[#EBEFF5] text-xs space-y-1">
              <div className="font-semibold text-[#D9383A] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Tác động nếu không xử lý:</span>
              </div>
              <p className="text-[#5A6372] leading-relaxed">
                {fp.impactSummary}
              </p>
            </div>

            {/* Proposed Action */}
            <div className="text-xs space-y-1">
              <span className="font-semibold text-[#0F1B2D]">Hành động đề xuất chỉ đạo:</span>
              <p className="text-[#1A1F29] leading-relaxed bg-[#FEF9E7]/60 p-2.5 border border-[#F2A900]/40">
                {fp.proposedAction}
              </p>
            </div>

            {/* Footer metadata */}
            <div className="pt-3 border-t border-[#F4F5F7] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5A6372] gap-2 font-mono">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#F2A900]" />
                <span>Phụ trách: <strong className="text-[#1A1F29] font-sans">{fp.responsible}</strong></span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D9383A]" />
                <span>Hạn chót: <strong className="text-[#D9383A] font-bold">{fp.deadline}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
