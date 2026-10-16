import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Building, FileCheck } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0F1B2D] text-white border-t border-[#22334B] mt-16 font-sans">
      {/* Top Footer: Notice banner */}
      <div className="border-b border-[#1E2D42] bg-[#09121F] py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-[#A0ABBD] gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F2A900] shrink-0" />
            <span className="font-semibold text-white">LƯU Ý BẢO MẬT THÔNG TIN NỘI BỘ:</span>
            <span>Cổng thông tin dành riêng cho Ban Quản lý Dự án, Lãnh đạo Công ty và các bên liên quan được ủy quyền.</span>
          </div>
          <div className="font-mono text-[11px] text-[#A0ABBD]">
            Mã hệ thống: <span className="text-[#F2A900]">BD-PMIS-v2.6</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Project Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F2A900] shadow-sm bg-[#F49320] shrink-0">
                <img
                  src="/src/assets/images/logo_phumyhung_harmonie_1792124714081.jpg"
                  alt="Phú Mỹ Hưng Harmonie Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight text-white uppercase">DỰ ÁN BÌNH DƯƠNG</h4>
                <p className="text-xs text-[#F2A900]">Phú Mỹ Hưng Harmonie · Phú Hưng</p>
              </div>
            </div>
            <p className="text-xs text-[#CBD2DE] leading-relaxed">
              Cổng thông tin tập trung quản lý tiến độ, chất lượng thi công, an toàn lao động và hồ sơ pháp lý kỹ thuật dự án khu căn hộ Phú Hưng.
            </p>
            <div className="text-[11px] font-mono text-[#A0ABBD] pt-1">
              Quy mô: 05 tháp (TA#1 – TA#5)
            </div>
          </div>

          {/* Col 2: Key Stakeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F2A900] tracking-wider uppercase">
              Đơn vị chủ chốt
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="text-[#A0ABBD] text-[11px]">Chủ đầu tư</div>
                <div className="font-medium text-white">{PROJECT_INFO.clientName}</div>
                <div className="text-[11px] text-[#CBD2DE]">Công ty TNHH Phát triển Phú Mỹ Hưng</div>
              </div>
              <div>
                <div className="text-[#A0ABBD] text-[11px]">Tư vấn giám sát</div>
                <div className="font-medium text-white">{PROJECT_INFO.consultantName}</div>
                <div className="text-[11px] text-[#CBD2DE]">Công ty CP Tư vấn Đầu tư & Thiết kế XD</div>
              </div>
              <div>
                <div className="text-[#A0ABBD] text-[11px]">Tổng thầu thi công</div>
                <div className="font-medium text-white">{PROJECT_INFO.contractorName}</div>
                <div className="text-[11px] text-[#CBD2DE]">China State Construction Eng. Corp.</div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F2A900] tracking-wider uppercase">
              Phân hệ chức năng
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CBD2DE]">
              <li>
                <button onClick={() => onNavigate('progress')} className="hover:text-[#F2A900] transition-colors cursor-pointer">
                  · Báo cáo tiến độ tuần & S-Curve
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('documents')} className="hover:text-[#F2A900] transition-colors cursor-pointer">
                  · Biên bản họp giao ban & Thư cảnh báo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('photos')} className="hover:text-[#F2A900] transition-colors cursor-pointer">
                  · Nhật ký hình ảnh hiện trường 5 tháp
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hse')} className="hover:text-[#F2A900] transition-colors cursor-pointer">
                  · Chỉ số An toàn & Quản lý Chất lượng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stakeholders')} className="hover:text-[#F2A900] transition-colors cursor-pointer">
                  · Danh bạ chỉ huy & Đầu mối liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Management Office Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F2A900] tracking-wider uppercase">
              Ban Quản lý Dự án
            </h4>
            <div className="space-y-2 text-xs text-[#CBD2DE]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2A900] shrink-0 mt-0.5" />
                <span className="leading-snug">{PROJECT_INFO.siteOffice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F2A900] shrink-0" />
                <span className="font-mono">{PROJECT_INFO.hotline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F2A900]" />
                <span className="font-mono">{PROJECT_INFO.email}</span>
              </div>
              <div className="pt-2 text-[11px] text-[#A0ABBD]">
                Thời gian làm việc hiện trường: 07:30 – 17:30 (Thứ 2 – Thứ 7)
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-[#1E2D42] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A0ABBD] gap-3">
          <div>
            © {new Date().getFullYear()} Ban Quản lý Dự án Bình Dương – Công ty TNHH Phát triển Phú Mỹ Hưng. Tất cả quyền được bảo lưu.
          </div>
          <div className="font-mono">
            Hệ thống Quản lý Dự án Nội bộ · Dữ liệu bảo mật cấp CĐT
          </div>
        </div>
      </div>
    </footer>
  );
};
