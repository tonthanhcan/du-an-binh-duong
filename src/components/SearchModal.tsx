import React, { useMemo } from 'react';
import { Search, X, ArrowRight, FileText, HelpCircle, AlertTriangle, ClipboardCheck, Calendar } from 'lucide-react';
import { 
  RFI_DATA, 
  DOCUMENT_CONTROL_DATA, 
  DEFECT_DATA, 
  INSPECTION_DATA, 
  SCHEDULE_MILESTONES 
} from '../data/projectData';
import { PageMenuId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigate: (pageId: PageMenuId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const query = searchQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];

    const items: {
      type: 'RFI' | 'Document' | 'Defect' | 'Inspection' | 'Milestone';
      code: string;
      title: string;
      page: PageMenuId;
      tag: string;
    }[] = [];

    // Search RFIs
    RFI_DATA.forEach((r) => {
      if (r.rfiCode.toLowerCase().includes(query) || r.title.toLowerCase().includes(query) || r.tower.toLowerCase().includes(query)) {
        items.push({
          type: 'RFI',
          code: r.rfiCode,
          title: r.title,
          page: 'rfi',
          tag: `Tháp ${r.tower} · ${r.status}`,
        });
      }
    });

    // Search Documents
    DOCUMENT_CONTROL_DATA.forEach((d) => {
      if (d.docCode.toLowerCase().includes(query) || d.title.toLowerCase().includes(query) || d.docType.toLowerCase().includes(query)) {
        items.push({
          type: 'Document',
          code: d.docCode,
          title: d.title,
          page: 'document-control',
          tag: `${d.docType} · ${d.status}`,
        });
      }
    });

    // Search Defects
    DEFECT_DATA.forEach((def) => {
      if (def.defectCode.toLowerCase().includes(query) || def.description.toLowerCase().includes(query) || def.tower.toLowerCase().includes(query)) {
        items.push({
          type: 'Defect',
          code: def.defectCode,
          title: def.description,
          page: 'defect',
          tag: `${def.tower} · ${def.severity}`,
        });
      }
    });

    // Search Inspection
    INSPECTION_DATA.forEach((ins) => {
      if (ins.irCode.toLowerCase().includes(query) || ins.workCategory.toLowerCase().includes(query) || ins.tower.toLowerCase().includes(query)) {
        items.push({
          type: 'Inspection',
          code: ins.irCode,
          title: ins.workCategory,
          page: 'inspection',
          tag: `${ins.tower} · ${ins.result}`,
        });
      }
    });

    // Search Milestones
    SCHEDULE_MILESTONES.forEach((m) => {
      if (m.milestone.toLowerCase().includes(query) || m.tower.toLowerCase().includes(query)) {
        items.push({
          type: 'Milestone',
          code: m.id,
          title: m.milestone,
          page: 'schedule',
          tag: `${m.tower} · ${m.status}`,
        });
      }
    });

    return items;
  }, [query]);

  const handleSelectResult = (page: PageMenuId) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] w-full max-w-2xl border border-[#0F1B2D] shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#0F1B2D] text-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#F2A900] shrink-0" />
          <input
            type="text"
            placeholder="Gõ từ khóa: BD-RFI, BD-WKM-MoM, BD-ICIC-WL, tháp TA#2, bê tông, kiểm tra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-[#7B8798] outline-none font-sans"
          />
          <button 
            onClick={onClose}
            className="text-[#7B8798] hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {query === '' ? (
            <div className="text-center py-8 text-xs text-[#7B8798]">
              Nhập mã hồ sơ (ví dụ: <span className="font-mono text-[#0F1B2D]">BD-WKM-MoM</span>, <span className="font-mono text-[#0F1B2D]">BD-ICIC-WL</span>), tên tháp hoặc từ khóa để tìm kiếm nhanh trong toàn bộ cơ sở dữ liệu dự án.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#7B8798]">
              Không tìm thấy kết quả phù hợp với từ khóa <span className="font-bold text-[#0F1B2D]">"{searchQuery}"</span>.
            </div>
          ) : (
            results.map((res, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectResult(res.page)}
                className="p-3 border border-[#EBEFF5] hover:border-[#F2A900] hover:bg-[#FEF9E7] transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0F1B2D] bg-[#F4F5F7] px-1.5 py-0.5 border border-[#DDE1E7]">
                      {res.code}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#7B8798]">
                      {res.type}
                    </span>
                    <span className="text-xs text-[#5A6372]">·</span>
                    <span className="text-xs text-[#5A6372]">{res.tag}</span>
                  </div>
                  <div className="text-xs font-medium text-[#1A1F29] group-hover:text-[#0F1B2D] line-clamp-1">
                    {res.title}
                  </div>
                </div>

                <div className="flex items-center text-xs font-semibold text-[#F2A900] group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal footer shortcut tips */}
        <div className="px-4 py-2.5 bg-[#F9FAFB] border-t border-[#EBEFF5] flex items-center justify-between text-[11px] text-[#7B8798] font-mono">
          <span>Tìm kiếm thông tin theo mã quản lý dự án</span>
          <button 
            onClick={onClose}
            className="hover:text-[#1A1F29] cursor-pointer"
          >
            Đóng [ESC]
          </button>
        </div>

      </div>
    </div>
  );
};
