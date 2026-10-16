import React, { useState } from 'react';
import { X, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { PageMenuId } from '../types';

interface NewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageType: PageMenuId;
  onAddItem: (item: any) => void;
}

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  onClose,
  pageType,
  onAddItem,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    code: '',
    title: '',
    tower: 'TA#1',
    responsible: '',
    date: '[dd/mm/yyyy]',
    status: 'Đang xử lý',
    value: '[x tỷ]',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const getPageConfig = () => {
    switch (pageType) {
      case 'rfi':
        return {
          title: 'TẠO YÊU CẦU LÀM RÕ THIẾT KẾ (RFI / SITE QUERY)',
          codePrefix: 'BD-RFI-STR-[xxx]',
          titleLabel: 'Nội dung câu hỏi / Vấn đề cần làm rõ',
        };
      case 'inspection':
        return {
          title: 'LẬP PHIẾU YÊU CẦU NGHIỆM THU (INSPECTION REQUEST - IR)',
          codePrefix: 'BD-IR-STR-[xxx]',
          titleLabel: 'Hạng mục nghiệm thu công trường',
        };
      case 'payment':
        return {
          title: 'LẬP HỒ SƠ ĐỀ NGHỊ THANH TOÁN (PAYMENT CERTIFICATE)',
          codePrefix: 'Đợt [06]',
          titleLabel: 'Phạm vi & Khối lượng đề nghị thanh toán',
        };
      case 'document-control':
        return {
          title: 'ĐĂNG KÝ VĂN BẢN / BIÊN BẢN HỌP / THƯ CẢNH BÁO MỚI',
          codePrefix: 'BD-WKM-MoM-[xxx] / BD-ICIC-WL-[xxx]',
          titleLabel: 'Tiêu đề văn bản / Trích yếu nội dung',
        };
      case 'procurement':
        return {
          title: 'TRÌNH DUYỆT MẪU VẬT TƯ / THIẾT BỊ MỚI (MATERIAL SUBMITTAL)',
          codePrefix: 'BD-MAT-[xxx]',
          titleLabel: 'Tên vật tư & Tiêu chuẩn quy cách',
        };
      case 'defect':
        return {
          title: 'GHI NHẬN LỖI THI CÔNG / BIÊN BẢN KHÔNG PHÙ HỢP (NCR)',
          codePrefix: 'BD-NCR-[xxx] / BD-DEF-[xxx]',
          titleLabel: 'Mô tả vị trí và lỗi kỹ thuật tồn đọng',
        };
      case 'survey':
        return {
          title: 'CẬP NHẬT KẾT QUẢ QUAN TRẮC TRẮC ĐẠC / LÚN / NGHIÊNG',
          codePrefix: 'M-LUN-TA#-[xx]',
          titleLabel: 'Mốc đo đạc & Vị trí kiểm tra',
        };
      case 'daily-report':
        return {
          title: 'LẬP NHẬT KÝ BÁO CÁO NGÀY (DAILY REPORT)',
          codePrefix: 'BD-DLY-[YYYYMMDD]',
          titleLabel: 'Tóm tắt các hoạt động thi công chính trong ngày',
        };
      case 'weekly-report':
        return {
          title: 'PHÁT HÀNH BÁO CÁO QUẢN LÝ DỰ ÁN TUẦN / BIÊN BẢN HỌP',
          codePrefix: 'BD-PMH-WKR-[W43] / BD-WKM-MoM-[043]',
          titleLabel: 'Tên báo cáo tuần / Biên bản giao ban',
        };
      default:
        return {
          title: 'THÊM MỚI BẢN GHI DỰ ÁN',
          codePrefix: 'BD-REC-[xxx]',
          titleLabel: 'Nội dung bản ghi',
        };
    }
  };

  const config = getPageConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(formData);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] w-full max-w-lg border border-[#0F1B2D] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0F1B2D] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#F2A900] text-[#0F1B2D] flex items-center justify-center font-bold text-xs font-mono">
              +
            </div>
            <h3 className="font-bold text-xs tracking-tight uppercase text-white">
              {config.title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#A0ABBD] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-[#16A34A] mx-auto animate-bounce" />
            <div className="font-bold text-sm text-[#0F1B2D]">ĐÃ LƯU BẢN GHI THÀNH CÔNG!</div>
            <div className="text-xs text-[#5A6372]">Dữ liệu đã được cập nhật vào danh sách của hệ thống.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#1A1F29] font-medium mb-1">Mã tham chiếu (Code)</label>
                <input
                  type="text"
                  placeholder={config.codePrefix}
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#DDE1E7] focus:border-[#0F1B2D] outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[#1A1F29] font-medium mb-1">Khối tháp liên quan</label>
                <select
                  value={formData.tower}
                  onChange={(e) => setFormData({ ...formData, tower: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DDE1E7] focus:border-[#0F1B2D] outline-none font-mono text-xs bg-white"
                >
                  <option value="TA#1">Tháp TA#1</option>
                  <option value="TA#2">Tháp TA#2</option>
                  <option value="TA#3">Tháp TA#3</option>
                  <option value="TA#4">Tháp TA#4</option>
                  <option value="TA#5">Tháp TA#5</option>
                  <option value="Toàn dự án">Toàn dự án (5 tháp)</option>
                  <option value="Hạ tầng">Hạ tầng & Cảnh quan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#1A1F29] font-medium mb-1">{config.titleLabel}</label>
              <textarea
                rows={2}
                placeholder="Nhập chi tiết thông tin hồ sơ..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-[#DDE1E7] focus:border-[#0F1B2D] outline-none text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#1A1F29] font-medium mb-1">Đơn vị / Người phụ trách</label>
                <input
                  type="text"
                  placeholder="CSCEC / ICIC / PMH"
                  value={formData.responsible}
                  onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#DDE1E7] focus:border-[#0F1B2D] outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-[#1A1F29] font-medium mb-1">Hạn xử lý / Ngày trình</label>
                <input
                  type="text"
                  placeholder="[dd/mm/yyyy]"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DDE1E7] focus:border-[#0F1B2D] outline-none font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#EBEFF5] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 border border-[#DDE1E7] text-[#5A6372] hover:bg-[#F4F5F7] transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0F1B2D] text-white font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#F2A900]" />
                <span>LƯU HỒ SƠ</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
