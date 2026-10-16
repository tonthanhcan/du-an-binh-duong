import React from 'react';
import { 
  Calendar, 
  CreditCard, 
  HelpCircle, 
  ClipboardCheck, 
  AlertTriangle, 
  ShoppingCart, 
  Flame, 
  Camera, 
  Clock, 
  BookOpen, 
  FileText, 
  Compass, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle,
  Building,
  HardHat,
  Shield,
  Layers
} from 'lucide-react';
import { 
  PROJECT_INFO, 
  WEEKLY_SNAPSHOTS, 
  TOWERS_DATA, 
  SITE_PICTURES,
  SitePhoto,
  PAYMENT_DATA,
  SCURVE_DATA
} from '../data/projectData';
import { PageMenuId } from '../types';

interface DashboardPageProps {
  currentSubPage?: 'dashboard' | 'dashboard-summary' | 'dashboard-towers' | 'dashboard-finance';
  onNavigate: (pageId: PageMenuId) => void;
  onOpenPhoto: (photo: SitePhoto) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentSubPage = 'dashboard',
  onNavigate,
  onOpenPhoto,
}) => {
  const currentWeek = WEEKLY_SNAPSHOTS['W42'];

  // Latest 5 photos for 5 towers
  const towerPhotos = [
    SITE_PICTURES.find(p => p.tower === 'TA#1') || SITE_PICTURES[1],
    SITE_PICTURES.find(p => p.tower === 'TA#2') || SITE_PICTURES[2],
    SITE_PICTURES.find(p => p.tower === 'TA#3') || SITE_PICTURES[3],
    SITE_PICTURES.find(p => p.tower === 'TA#4') || SITE_PICTURES[4],
    SITE_PICTURES.find(p => p.tower === 'TA#5') || SITE_PICTURES[5],
  ];

  // If subpage "dashboard-summary" is selected
  if (currentSubPage === 'dashboard-summary') {
    return (
      <div className="space-y-6">
        {/* Header Breadcrumb */}
        <div className="border-b border-[#DDE1E7] pb-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#7B8798] uppercase">Dashboard / 01.1</div>
            <h1 className="text-xl font-bold text-[#0F1B2D]">TỔNG HỢP TOÀN DIỆN DỰ ÁN (PROJECT SUMMARY)</h1>
            <p className="text-xs text-[#5A6372]">Báo cáo đa chiều các chỉ số vận hành dự án Khu căn hộ Phú Hưng</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-3 py-1.5 border border-[#DDE1E7] text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            ← Quay lại Dashboard chính
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DDE1E7] p-4">
            <div className="text-xs text-[#5A6372]">Tổng tiến độ thực tế</div>
            <div className="text-2xl font-bold text-[#0F1B2D] font-mono mt-1">{currentWeek.actualProgress}</div>
            <div className="text-[11px] text-[#7B8798] mt-1 font-mono">Kế hoạch: {currentWeek.plannedProgress}</div>
          </div>
          <div className="bg-white border border-[#DDE1E7] p-4">
            <div className="text-xs text-[#5A6372]">Giải ngân lũy kế</div>
            <div className="text-2xl font-bold text-[#0F1B2D] font-mono mt-1">{currentWeek.paidCumulative}</div>
            <div className="text-[11px] text-[#16A34A] mt-1 font-mono">Đã thanh toán đúng hạn</div>
          </div>
          <div className="bg-white border border-[#DDE1E7] p-4">
            <div className="text-xs text-[#5A6372]">Nhân lực hiện trường</div>
            <div className="text-2xl font-bold text-[#0F1B2D] font-mono mt-1">{currentWeek.siteWorkforce}</div>
            <div className="text-[11px] text-[#7B8798] mt-1">CSCEC + [xx] Thầu phụ</div>
          </div>
          <div className="bg-white border border-[#DDE1E7] p-4">
            <div className="text-xs text-[#5A6372]">Trạng thái điều hành</div>
            <div className="text-2xl font-bold text-[#D97706] font-mono mt-1">{currentWeek.projectStatus}</div>
            <div className="text-[11px] text-[#7B8798] mt-1">Theo dõi chặt TA#2 & TA#5</div>
          </div>
        </div>

        {/* Matrix Visualization - Illustrated */}
        <div className="bg-white border border-[#DDE1E7] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EBEFF5] pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#0F1B2D] uppercase">Biểu đồ tổng hợp các mặt quản trị</h3>
              <p className="text-xs text-[#5A6372]">Ma trận theo dõi 4 khía cạnh: Tiến độ, Tài chính, Chất lượng (QA), An toàn (HSE)</p>
            </div>
            <span className="text-[11px] font-mono bg-[#F4F5F7] border border-[#DDE1E7] px-2 py-0.5 text-[#5A6372]">
              Biểu đồ minh họa
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border border-[#EBEFF5] p-4 bg-[#F9FAFB] space-y-3">
              <div className="text-xs font-bold text-[#0F1B2D] flex items-center justify-between">
                <span>1. ĐỘ TUÂN THỦ TIẾN ĐỘ THEO KHỐI THÁP</span>
                <span className="font-mono text-[#F2A900]">Baseline V2</span>
              </div>
              {TOWERS_DATA.map(t => (
                <div key={t.code} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span>{t.code} - {t.name}</span>
                    <span>Thực tế {t.actualPercent} / KH {t.plannedPercent}</span>
                  </div>
                  <div className="w-full bg-[#E8ECF2] h-2">
                    <div className="bg-[#F2A900] h-2" style={{ width: `${t.actualBar}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#EBEFF5] p-4 bg-[#F9FAFB] space-y-3">
              <div className="text-xs font-bold text-[#0F1B2D] flex items-center justify-between">
                <span>2. CHẤT LƯỢNG & AN TOÀN LAO ĐỘNG (QA/QC & HSE)</span>
                <span className="font-mono text-[#16A34A]">ICIC Verified</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white border border-[#EBEFF5] flex justify-between">
                  <span>Nghiệm thu đạt lần đầu (First-time Pass):</span>
                  <strong className="font-mono">[xx%]</strong>
                </div>
                <div className="p-2 bg-white border border-[#EBEFF5] flex justify-between">
                  <span>Biên bản không phù hợp (NCR) mở:</span>
                  <strong className="font-mono text-red-600">[n] NCR</strong>
                </div>
                <div className="p-2 bg-white border border-[#EBEFF5] flex justify-between">
                  <span>RFI tồn đọng quá 5 ngày làm việc:</span>
                  <strong className="font-mono text-[#D97706]">[n] RFI</strong>
                </div>
                <div className="p-2 bg-white border border-[#EBEFF5] flex justify-between">
                  <span>Giờ công an toàn không tai nạn mất ngày:</span>
                  <strong className="font-mono text-[#16A34A]">[x,xxx,xxx] giờ</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If subpage "dashboard-towers" is selected
  if (currentSubPage === 'dashboard-towers') {
    return (
      <div className="space-y-6">
        <div className="border-b border-[#DDE1E7] pb-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#7B8798] uppercase">Dashboard / 01.2</div>
            <h1 className="text-xl font-bold text-[#0F1B2D]">TIẾN ĐỘ THEO THÁP (TOWERS PROGRESS)</h1>
            <p className="text-xs text-[#5A6372]">Chi tiết kết cấu và chu kỳ thi công sàn của 5 khối tháp TA#1 – TA#5</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-3 py-1.5 border border-[#DDE1E7] text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            ← Quay lại Dashboard chính
          </button>
        </div>

        {/* 5 Towers Grid */}
        <div className="grid grid-cols-1 gap-4">
          {TOWERS_DATA.map((tower) => (
            <div key={tower.code} className="bg-white border border-[#DDE1E7] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBEFF5] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0F1B2D] text-white flex items-center justify-center font-mono font-bold text-xs">
                    {tower.code}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0F1B2D]">{tower.name}</h3>
                    <p className="text-xs text-[#5A6372]">{tower.currentItem}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 font-mono font-medium border ${
                    tower.status === 'Đúng hạn'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : tower.status === 'Cần theo dõi'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}>
                    {tower.status}
                  </span>
                  <button
                    onClick={() => onNavigate('schedule')}
                    className="text-xs text-[#0F1B2D] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Xem mốc</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-1">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#5A6372]">Tiến độ Kế hoạch:</span>
                    <span className="font-mono font-bold text-[#5A6372]">{tower.plannedPercent}</span>
                  </div>
                  <div className="w-full bg-[#E8ECF2] h-2.5">
                    <div className="bg-[#8896AB] h-2.5" style={{ width: `${tower.plannedBar}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#0F1B2D] font-medium">Tiến độ Thực tế:</span>
                    <span className="font-mono font-bold text-[#F2A900]">{tower.actualPercent}</span>
                  </div>
                  <div className="w-full bg-[#E8ECF2] h-2.5">
                    <div className="bg-[#F2A900] h-2.5" style={{ width: `${tower.actualBar}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#F4F5F7] flex flex-col sm:flex-row justify-between text-[11px] text-[#7B8798] gap-2">
                <div>Chỉ đạo hiện trường: <strong className="text-[#1A1F29]">{tower.note}</strong></div>
                <div className="font-mono">TVGS: {tower.supervisor} · CSCEC: {tower.leadContractor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If subpage "dashboard-finance" is selected
  if (currentSubPage === 'dashboard-finance') {
    return (
      <div className="space-y-6">
        <div className="border-b border-[#DDE1E7] pb-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#7B8798] uppercase">Dashboard / 01.3</div>
            <h1 className="text-xl font-bold text-[#0F1B2D]">TÀI CHÍNH & GIẢI NGÂN (FINANCIAL OVERVIEW)</h1>
            <p className="text-xs text-[#5A6372]">Tổng hợp đề nghị thanh toán, giá trị đã giải ngân và dòng tiền thực tế</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-3 py-1.5 border border-[#DDE1E7] text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            ← Quay lại Dashboard chính
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#DDE1E7] p-4">
            <div className="text-xs text-[#5A6372]">Giá trị hợp đồng tổng thầu</div>
            <div className="text-2xl font-bold text-[#0F1B2D] font-mono mt-1">[x,xxx tỷ]</div>
            <div className="text-[11px] text-[#7B8798] mt-1 font-mono">Đã ký kết hợp đồng trọn gói</div>
          </div>
          <div className="bg-white border border-[#DDE1E7] p-4">
            <div className="text-xs text-[#5A6372]">Đã giải ngân lũy kế</div>
            <div className="text-2xl font-bold text-[#0F1B2D] font-mono mt-1">{currentWeek.paidCumulative}</div>
            <div className="text-[11px] text-[#16A34A] mt-1 font-mono">Đạt [xx%] tổng giá trị</div>
          </div>
          <div className="bg-white border border-[#DDE1E7] p-4">
            <div className="text-xs text-[#5A6372]">Đang trình duyệt đợt mới</div>
            <div className="text-2xl font-bold text-[#D97706] font-mono mt-1">[x tỷ]</div>
            <div className="text-[11px] text-[#7B8798] mt-1 font-mono">Đợt [04] - Khối lượng thân</div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white border border-[#DDE1E7] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EBEFF5] pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#0F1B2D] uppercase">Bảng tổng hợp thanh toán các đợt</h3>
              <p className="text-xs text-[#5A6372]">Chi tiết các chứng chỉ thanh toán theo tiến độ nghiệm thu</p>
            </div>
            <button
              onClick={() => onNavigate('payment')}
              className="text-xs text-[#0F1B2D] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Xem trang Payment đầy đủ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F4F5F7] text-[#1A1F29] border-b border-[#DDE1E7] font-semibold">
                  <th className="py-2.5 px-3 font-mono">ĐỢT</th>
                  <th className="py-2.5 px-3">ĐƠN VỊ THỤ HƯỞNG</th>
                  <th className="py-2.5 px-3">NỘI DUNG</th>
                  <th className="py-2.5 px-3 text-right font-mono">GIÁ TRỊ ĐỀ NGHỊ</th>
                  <th className="py-2.5 px-3 text-right font-mono">GIÁ TRỊ DUYỆT</th>
                  <th className="py-2.5 px-3 text-center">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEFF5]">
                {PAYMENT_DATA.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F9FAFB]">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D]">{p.batchNo}</td>
                    <td className="py-2.5 px-3">{p.contractor}</td>
                    <td className="py-2.5 px-3 text-[#5A6372]">{p.scopeOfWork}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{p.requestedValue}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0F1B2D]">{p.approvedValue}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 text-[11px] font-mono ${
                        p.status === 'Đã giải ngân'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // DEFAULT DASHBOARD VIEW
  // ==============================
  return (
    <div className="space-y-8 select-none">
      
      {/* 1. HERO INTRODUCTION BLOCK (NỀN NAVY) */}
      <div className="bg-[#0F1B2D] text-white p-6 sm:p-8 border border-[#22334B] shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#F2A900] shadow-md bg-[#F49320] shrink-0">
                <img
                  src="/src/assets/images/logo_phumyhung_harmonie_1792124714081.jpg"
                  alt="Phú Mỹ Hưng Harmonie Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="inline-block bg-[#16253B] text-[#F2A900] px-3 py-0.5 text-xs font-mono font-semibold tracking-wider border border-[#2B3C52] mb-1">
                  CỔNG THÔNG TIN QUẢN LÝ DỰ ÁN · CHỦ ĐẦU TƯ
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                  Khu căn hộ Phú Hưng · Bình Dương
                </h1>
                <div className="text-xs text-[#F2A900] font-mono mt-0.5 font-medium">
                  Phú Mỹ Hưng Harmonie · Dự án Căn hộ Bình Dương
                </div>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-[#CBD2DE] leading-relaxed max-w-2xl">
              Hệ thống theo dõi điều hành tập trung phục vụ Ban Quản lý Dự án phía Chủ đầu tư Phú Mỹ Hưng, Ban Lãnh đạo Công ty, Tư vấn giám sát ICIC và Tổng thầu CSCEC.
            </p>

            {/* 4 Quick Info Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#16253B] p-2.5 border border-[#2B3C52]">
                <div className="text-[10px] text-[#A0ABBD] uppercase">Chủ đầu tư</div>
                <div className="font-bold text-xs text-white mt-0.5">{PROJECT_INFO.clientName}</div>
              </div>

              <div className="bg-[#16253B] p-2.5 border border-[#2B3C52]">
                <div className="text-[10px] text-[#A0ABBD] uppercase">Quy mô</div>
                <div className="font-bold text-xs text-white mt-0.5">5 tháp (TA#1–TA#5)</div>
              </div>

              <div className="bg-[#16253B] p-2.5 border border-[#2B3C52]">
                <div className="text-[10px] text-[#A0ABBD] uppercase">Tư vấn giám sát</div>
                <div className="font-bold text-xs text-white mt-0.5">{PROJECT_INFO.consultantName}</div>
              </div>

              <div className="bg-[#16253B] p-2.5 border border-[#2B3C52]">
                <div className="text-[10px] text-[#A0ABBD] uppercase">Tổng thầu</div>
                <div className="font-bold text-xs text-white mt-0.5">{PROJECT_INFO.contractorName}</div>
              </div>
            </div>
          </div>

          {/* Right Hero Flycam Photo Frame */}
          <div className="lg:col-span-5">
            <div className="relative border-2 border-[#2B3C52] bg-black overflow-hidden group">
              <img
                src="/src/assets/images/hero_phuhung_flycam_1792123320031.jpg"
                alt="Ảnh phối cảnh / flycam dự án Phú Hưng"
                className="w-full h-56 sm:h-64 object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#0F1B2D]/90 p-2.5 text-[11px] font-mono text-[#CBD2DE] border-t border-[#2B3C52] flex items-center justify-between">
                <span>[Ảnh phối cảnh / flycam dự án]</span>
                <span className="text-[#F2A900]">Cập nhật: {currentWeek.dateRange}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. CHỈ SỐ CHÍNH TUẦN NÀY (6 CLICKABLE KPI CARDS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider font-mono">
            CHỈ SỐ CHÍNH TUẦN NÀY · TUẦN [W42]
          </div>
          <span className="text-[11px] text-[#5A6372] font-mono">
            Khoảng ngày: {currentWeek.dateRange}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Schedule */}
          <div
            onClick={() => onNavigate('schedule')}
            className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[#5A6372]">
              <span className="text-[11px] font-semibold">SCHEDULE</span>
              <Calendar className="w-4 h-4 text-[#F2A900]" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold font-mono text-[#0F1B2D] group-hover:text-[#F2A900] transition-colors">
                {currentWeek.actualProgress}
              </div>
              <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">
                Kế hoạch: {currentWeek.plannedProgress}
              </div>
            </div>
          </div>

          {/* Card 2: Payment */}
          <div
            onClick={() => onNavigate('payment')}
            className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[#5A6372]">
              <span className="text-[11px] font-semibold">PAYMENT</span>
              <CreditCard className="w-4 h-4 text-[#F2A900]" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold font-mono text-[#0F1B2D] group-hover:text-[#F2A900] transition-colors">
                {currentWeek.paidCumulative}
              </div>
              <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">
                Đã thanh toán lũy kế
              </div>
            </div>
          </div>

          {/* Card 3: RFI */}
          <div
            onClick={() => onNavigate('rfi')}
            className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[#5A6372]">
              <span className="text-[11px] font-semibold">RFI MỞ</span>
              <HelpCircle className="w-4 h-4 text-[#F2A900]" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold font-mono text-[#0F1B2D] group-hover:text-[#F2A900] transition-colors">
                {currentWeek.openRfiCount} RFI
              </div>
              <div className="text-[11px] text-[#D9383A] font-mono mt-0.5">
                Quá hạn: {currentWeek.overdueRfiCount}
              </div>
            </div>
          </div>

          {/* Card 4: Inspection */}
          <div
            onClick={() => onNavigate('inspection')}
            className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[#5A6372]">
              <span className="text-[11px] font-semibold">INSPECTION</span>
              <ClipboardCheck className="w-4 h-4 text-[#F2A900]" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold font-mono text-[#0F1B2D] group-hover:text-[#F2A900] transition-colors">
                {currentWeek.pendingInspectionCount} IR
              </div>
              <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">
                Chờ nghiệm thu
              </div>
            </div>
          </div>

          {/* Card 5: Defect */}
          <div
            onClick={() => onNavigate('defect')}
            className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[#5A6372]">
              <span className="text-[11px] font-semibold">DEFECT MỞ</span>
              <AlertTriangle className="w-4 h-4 text-[#F2A900]" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold font-mono text-[#0F1B2D] group-hover:text-[#F2A900] transition-colors">
                {currentWeek.openDefectCount} lỗi
              </div>
              <div className="text-[11px] text-[#D9383A] font-mono mt-0.5">
                NCR mở: {currentWeek.openNcrCount}
              </div>
            </div>
          </div>

          {/* Card 6: Procurement */}
          <div
            onClick={() => onNavigate('procurement')}
            className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[#5A6372]">
              <span className="text-[11px] font-semibold">PROCUREMENT</span>
              <ShoppingCart className="w-4 h-4 text-[#F2A900]" />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold font-mono text-[#0F1B2D] group-hover:text-[#F2A900] transition-colors">
                {currentWeek.pendingProcurementCount} vật tư
              </div>
              <div className="text-[11px] text-[#7B8798] font-mono mt-0.5">
                Chờ CĐT phê duyệt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOCUS POINT STRIP (NỀN VÀNG NHẠT) */}
      <div className="bg-[#FEF9E7] border-l-4 border-[#F2A900] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <Flame className="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider font-mono">
              FOCUS POINT TUẦN NÀY (ĐIỂM NÓNG CẦN CHỈ ĐẠO)
            </div>
            <div className="text-xs text-[#1A1F29] font-medium mt-0.5">
              {currentWeek.focusPointTop}
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate('focus-point')}
          className="px-3 py-1.5 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <span>Xem chi tiết Focus point</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F2A900]" />
        </button>
      </div>

      {/* 4. CÁC MỤC MENU HIỂN THỊ THÀNH THẺ (CHIA 4 NHÓM) */}
      <div className="space-y-6">
        
        {/* Nhóm 1: Tiến độ & Báo cáo */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F2A900]" />
            <span>NHÓM 1: TIẾN ĐỘ & BÁO CÁO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Schedule */}
            <div
              onClick={() => onNavigate('schedule')}
              className="bg-white border border-[#DDE1E7] p-4 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#7B8798]">02 / SCHEDULE</span>
                <Calendar className="w-4 h-4 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-sm text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Tiến độ tổng & S-Curve
              </h4>
              <p className="text-xs text-[#5A6372] mt-1 line-clamp-2">
                Đường cong S toàn dự án, mốc tiến độ chính và tình trạng chu kỳ thi công 5 tháp.
              </p>
              <div className="mt-3 pt-2 border-t border-[#F0F2F5] text-xs font-mono text-[#0F1B2D] font-bold">
                Thực tế: {currentWeek.actualProgress} · Độ lệch: {currentWeek.varianceDays}
              </div>
            </div>

            {/* Daily report */}
            <div
              onClick={() => onNavigate('daily-report')}
              className="bg-white border border-[#DDE1E7] p-4 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#7B8798]">12 / DAILY REPORT</span>
                <Clock className="w-4 h-4 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-sm text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Báo cáo ngày
              </h4>
              <p className="text-xs text-[#5A6372] mt-1 line-clamp-2">
                Nhân lực, thiết bị cần trục tháp, thời tiết và khối lượng thi công thực hiện mỗi ngày.
              </p>
              <div className="mt-3 pt-2 border-t border-[#F0F2F5] text-xs font-mono text-[#0F1B2D] font-bold">
                Nhân lực hiện trường: {currentWeek.siteWorkforce}
              </div>
            </div>

            {/* Weekly report */}
            <div
              onClick={() => onNavigate('weekly-report')}
              className="bg-white border border-[#DDE1E7] p-4 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#7B8798]">13 / WEEKLY REPORT</span>
                <BookOpen className="w-4 h-4 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-sm text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Báo cáo QLDA & Biên bản họp
              </h4>
              <p className="text-xs text-[#5A6372] mt-1 line-clamp-2">
                Báo cáo QLDA tuần của Phú Mỹ Hưng và biên bản họp giao ban tuần mã BD-WKM-MoM-xxx.
              </p>
              <div className="mt-3 pt-2 border-t border-[#F0F2F5] text-xs font-mono text-[#0F1B2D] font-bold">
                Đã phát hành: BD-WKM-MoM-[042]
              </div>
            </div>
          </div>
        </div>

        {/* Nhóm 2: Kỹ thuật & Chất lượng */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F2A900]" />
            <span>NHÓM 2: KỸ THUẬT & CHẤT LƯỢNG</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Inspection */}
            <div
              onClick={() => onNavigate('inspection')}
              className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#7B8798]">03 / INSPECTION</span>
                <ClipboardCheck className="w-3.5 h-3.5 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-xs text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Hồ sơ nghiệm thu (IR)
              </h4>
              <p className="text-[11px] text-[#5A6372] mt-1">Yêu cầu kiểm tra cốt thép, cốp pha dầm sàn.</p>
              <div className="mt-2 pt-1.5 border-t border-[#F0F2F5] text-[11px] font-mono font-bold text-[#0F1B2D]">
                Chờ duyệt: {currentWeek.pendingInspectionCount} IR
              </div>
            </div>

            {/* RFI */}
            <div
              onClick={() => onNavigate('rfi')}
              className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#7B8798]">05 / RFI</span>
                <HelpCircle className="w-3.5 h-3.5 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-xs text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Site Query (RFI)
              </h4>
              <p className="text-[11px] text-[#5A6372] mt-1">Câu hỏi hiện trường gửi tư vấn thiết kế.</p>
              <div className="mt-2 pt-1.5 border-t border-[#F0F2F5] text-[11px] font-mono font-bold text-[#D9383A]">
                Quá hạn: {currentWeek.overdueRfiCount} RFI
              </div>
            </div>

            {/* Defect */}
            <div
              onClick={() => onNavigate('defect')}
              className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#7B8798]">08 / DEFECT</span>
                <AlertTriangle className="w-3.5 h-3.5 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-xs text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Danh sách lỗi (NCR)
              </h4>
              <p className="text-[11px] text-[#5A6372] mt-1">Biên bản không phù hợp và khắc phục.</p>
              <div className="mt-2 pt-1.5 border-t border-[#F0F2F5] text-[11px] font-mono font-bold text-[#0F1B2D]">
                Mở: {currentWeek.openDefectCount} lỗi
              </div>
            </div>

            {/* Survey work */}
            <div
              onClick={() => onNavigate('survey')}
              className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#7B8798]">09 / SURVEY</span>
                <Compass className="w-3.5 h-3.5 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-xs text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Trắc đạc & Quan trắc
              </h4>
              <p className="text-[11px] text-[#5A6372] mt-1">Đo lún, nghiêng và tim trục 5 tháp.</p>
              <div className="mt-2 pt-1.5 border-t border-[#F0F2F5] text-[11px] font-mono font-bold text-[#16A34A]">
                100% trong chuẩn
              </div>
            </div>

            {/* Focus point */}
            <div
              onClick={() => onNavigate('focus-point')}
              className="bg-white border border-[#DDE1E7] p-3.5 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#7B8798]">10 / FOCUS</span>
                <Flame className="w-3.5 h-3.5 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-xs text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Điểm nóng tuần
              </h4>
              <p className="text-[11px] text-[#5A6372] mt-1">Vấn đề cần lãnh đạo chỉ đạo gấp.</p>
              <div className="mt-2 pt-1.5 border-t border-[#F0F2F5] text-[11px] font-mono font-bold text-[#F2A900]">
                4 điểm ưu tiên
              </div>
            </div>
          </div>
        </div>

        {/* Nhóm 3: Thương mại */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F2A900]" />
            <span>NHÓM 3: THƯƠNG MẠI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Payment */}
            <div
              onClick={() => onNavigate('payment')}
              className="bg-white border border-[#DDE1E7] p-4 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#7B8798]">04 / PAYMENT</span>
                <CreditCard className="w-4 h-4 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-sm text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Đề nghị & Duyệt thanh toán
              </h4>
              <p className="text-xs text-[#5A6372] mt-1">
                Theo dõi giá trị đề nghị, chứng chỉ thanh toán duyệt và giải ngân cho Tổng thầu CSCEC và Tư vấn ICIC.
              </p>
              <div className="mt-3 pt-2 border-t border-[#F0F2F5] text-xs font-mono text-[#0F1B2D] font-bold">
                Lũy kế đã duyệt: {currentWeek.paidCumulative}
              </div>
            </div>

            {/* Procurement */}
            <div
              onClick={() => onNavigate('procurement')}
              className="bg-white border border-[#DDE1E7] p-4 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#7B8798]">07 / PROCUREMENT</span>
                <ShoppingCart className="w-4 h-4 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-sm text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Mua sắm & Phê duyệt vật tư
              </h4>
              <p className="text-xs text-[#5A6372] mt-1">
                Kế hoạch phê duyệt vật liệu xây thô, thép, bê tông, kính Low-E, đá granite và thiết bị thang máy.
              </p>
              <div className="mt-3 pt-2 border-t border-[#F0F2F5] text-xs font-mono text-[#0F1B2D] font-bold">
                Chờ trình mẫu: {currentWeek.pendingProcurementCount} chủng loại
              </div>
            </div>
          </div>
        </div>

        {/* Nhóm 4: Hồ sơ & Hình ảnh */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F2A900]" />
            <span>NHÓM 4: HỒ SƠ & HÌNH ẢNH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Document control */}
            <div
              onClick={() => onNavigate('document-control')}
              className="bg-white border border-[#DDE1E7] p-4 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#7B8798]">06 / DOCUMENT CONTROL</span>
                <FileText className="w-4 h-4 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-sm text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Quản lý văn bản & Thư cảnh báo
              </h4>
              <p className="text-xs text-[#5A6372] mt-1">
                Lưu trữ công văn đến/đi, biên bản họp mã BD-WKM-MoM-xxx, thư cảnh báo tư vấn BD-ICIC-WL-xxx và bản vẽ IFC.
              </p>
              <div className="mt-3 pt-2 border-t border-[#F0F2F5] text-xs font-mono text-[#0F1B2D] font-bold">
                Thư cảnh báo tuần: [0 WL]
              </div>
            </div>

            {/* Site picture */}
            <div
              onClick={() => onNavigate('site-picture')}
              className="bg-white border border-[#DDE1E7] p-4 hover:border-[#F2A900] hover:bg-[#FAFBFD] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#7B8798]">11 / SITE PICTURE</span>
                <Camera className="w-4 h-4 text-[#F2A900]" />
              </div>
              <h4 className="font-bold text-sm text-[#0F1B2D] mt-1 group-hover:text-[#F2A900] transition-colors">
                Thư viện ảnh công trường
              </h4>
              <p className="text-xs text-[#5A6372] mt-1">
                Nhật ký hình ảnh hiện trường chụp định kỳ hàng tuần cho 5 khối tháp và hạ tầng kỹ thuật.
              </p>
              <div className="mt-3 pt-2 border-t border-[#F0F2F5] text-xs font-mono text-[#0F1B2D] font-bold">
                Mới nhất: Tuần [W42]
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. KHỐI SITE PICTURE (5 ẢNH MỚI NHẤT CỦA 5 THÁP) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider font-mono">
            HÌNH ẢNH HIỆN TRƯỜNG MỚI NHẤT · 5 KHỐI THÁP (SITE PICTURE)
          </div>
          <button
            onClick={() => onNavigate('site-picture')}
            className="text-xs text-[#0F1B2D] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Xem toàn bộ thư viện</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {towerPhotos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => onOpenPhoto(photo)}
              className="bg-white border border-[#DDE1E7] overflow-hidden group cursor-pointer hover:border-[#F2A900] transition-all"
            >
              <div className="relative h-36 bg-black overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#0F1B2D] text-white px-2 py-0.5 text-[10px] font-mono font-bold">
                  {photo.tower}
                </div>
              </div>
              <div className="p-2.5 space-y-1">
                <div className="font-bold text-xs text-[#0F1B2D] line-clamp-1">{photo.title}</div>
                <div className="text-[11px] text-[#5A6372] line-clamp-1">{photo.location}</div>
                <div className="text-[10px] font-mono text-[#7B8798] pt-1 border-t border-[#F4F5F7] flex justify-between">
                  <span>Chụp: {photo.capturedDate}</span>
                  <span className="text-[#F2A900] font-semibold">Xem lớn</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
