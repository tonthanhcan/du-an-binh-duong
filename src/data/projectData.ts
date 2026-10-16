/**
 * =========================================================================================
 * CỔNG THÔNG TIN QUẢN LÝ DỰ ÁN BÌNH DƯƠNG - KHU CĂN HỘ PHÚ HƯNG (PHÚ MỸ HƯNG)
 * FILE DỮ LIỆU TẬP TRUNG TOÀN DIỆN (PROJECT DATA MASTER)
 * =========================================================================================
 * Dành cho: Ban Quản lý Dự án phía Chủ đầu tư, Lãnh đạo Công ty & các bên liên quan.
 * Hướng dẫn cập nhật hàng tuần:
 * 1. Chỉnh sửa số liệu trong các mảng dữ liệu bên dưới theo tuần báo cáo mới nhất.
 * 2. Mọi số liệu chưa có được để dạng chỗ trống trong ngoặc vuông: "[xx%]", "[dd/mm/yyyy]", "[n]", "[x tỷ]".
 *    Tuyệt đối KHÔNG tự ý bịa số liệu khi chưa có xác nhận từ TVGS ICIC và Tổng thầu CSCEC.
 * 3. Khi có số liệu chính xác, chỉ cần thay thế phần trong ngoặc vuông.
 * =========================================================================================
 */

// ==============================
// 1. THÔNG TIN CỐ ĐỊNH DỰ ÁN
// ==============================
export const PROJECT_INFO = {
  name: "Dự án Bình Dương, khu căn hộ Phú Hưng",
  shortName: "Khu căn hộ Phú Hưng · Bình Dương",
  clientName: "Phú Mỹ Hưng",
  clientFullName: "Công ty TNHH Phát triển Phú Mỹ Hưng (Phú Hưng Development)",
  consultantName: "ICIC",
  consultantFullName: "Công ty Cổ phần Tư vấn Đầu tư & Thiết kế Xây dựng (ICIC)",
  contractorName: "CSCEC",
  contractorFullName: "China State Construction Engineering Corporation (CSCEC)",
  towers: ["TA#1", "TA#2", "TA#3", "TA#4", "TA#5"],
  location: "Khu đô thị mới Bình Dương, Tỉnh Bình Dương",
  momCodePrefix: "BD-WKM-MoM-xxx",
  warningLetterCodePrefix: "BD-ICIC-WL-xxx",
  expectedCompletion: "[dd/mm/yyyy]",
  scaleDescription: "05 tháp cao tầng (ký hiệu TA#1, TA#2, TA#3, TA#4, TA#5), khối đế thương mại và 01 tầng hầm liên thông toàn khu.",
  siteOffice: "Văn phòng BQLDA Phú Hưng, Đường D1, P. Hòa Phú, TP. Thủ Dầu Một / TP. Mới Bình Dương",
  hotline: "028 [xxxx xxxx] - 09[xx xxx xxx]",
  email: "bld.binhduong@pmh.com.vn",
  logoUrl: "/src/assets/images/logo_phumyhung_harmonie_1792124714081.jpg",
  brandName: "Phú Mỹ Hưng Harmonie",
};

// ==============================
// 2. DỮ LIỆU TUẦN HIỆN TẠI & LỊCH SỬ TUẦN
// ==============================
export interface WeeklySnapshot {
  weekKey: string;
  weekLabel: string;
  dateRange: string;
  actualProgress: string;
  plannedProgress: string;
  varianceDays: string;
  paidCumulative: string;
  openRfiCount: string;
  overdueRfiCount: string;
  pendingInspectionCount: string;
  openDefectCount: string;
  openNcrCount: string;
  pendingProcurementCount: string;
  siteWorkforce: string;
  projectStatus: 'Xanh' | 'Vàng' | 'Đỏ';
  focusPointTop: string;
}

export const WEEKLY_SNAPSHOTS: Record<string, WeeklySnapshot> = {
  'W42': {
    weekKey: 'W42',
    weekLabel: 'Tuần [W42]',
    dateRange: '[dd/mm – dd/mm/yyyy]',
    actualProgress: '[xx%]',
    plannedProgress: '[xx%]',
    varianceDays: '[-n ngày]',
    paidCumulative: '[x tỷ]',
    openRfiCount: '[n]',
    overdueRfiCount: '[n]',
    pendingInspectionCount: '[n]',
    openDefectCount: '[n]',
    openNcrCount: '[n]',
    pendingProcurementCount: '[n]',
    siteWorkforce: '[xx người]',
    projectStatus: 'Vàng',
    focusPointTop: 'Đôn đốc Tổng thầu CSCEC bổ sung [xx] thợ cốp pha cho Tháp TA#2 và khẩn trương xử lý RFI [xxx] dầm chuyển.',
  },
  'W41': {
    weekKey: 'W41',
    weekLabel: 'Tuần [W41]',
    dateRange: '[dd/mm – dd/mm/yyyy]',
    actualProgress: '[xx%]',
    plannedProgress: '[xx%]',
    varianceDays: '[-n ngày]',
    paidCumulative: '[x tỷ]',
    openRfiCount: '[n]',
    overdueRfiCount: '[0]',
    pendingInspectionCount: '[n]',
    openDefectCount: '[n]',
    openNcrCount: '[0]',
    pendingProcurementCount: '[n]',
    siteWorkforce: '[xx người]',
    projectStatus: 'Xanh',
    focusPointTop: 'Kiểm soát chặt chẽ công tác nghiệm thu cốp pha sàn tầng [xx] tháp TA#1 và tháp TA#3 trước khi đổ bê tông ca đêm.',
  },
  'W40': {
    weekKey: 'W40',
    weekLabel: 'Tuần [W40]',
    dateRange: '[dd/mm – dd/mm/yyyy]',
    actualProgress: '[xx%]',
    plannedProgress: '[xx%]',
    varianceDays: '[0 ngày]',
    paidCumulative: '[x tỷ]',
    openRfiCount: '[n]',
    overdueRfiCount: '[0]',
    pendingInspectionCount: '[n]',
    openDefectCount: '[n]',
    openNcrCount: '[0]',
    pendingProcurementCount: '[n]',
    siteWorkforce: '[xx người]',
    projectStatus: 'Xanh',
    focusPointTop: 'Hoàn tất nghiệm thu chống thấm sàn tầng hầm toàn khu và ký biên bản thanh toán đợt [n].',
  },
  'W39': {
    weekKey: 'W39',
    weekLabel: 'Tuần [W39]',
    dateRange: '[dd/mm – dd/mm/yyyy]',
    actualProgress: '[xx%]',
    plannedProgress: '[xx%]',
    varianceDays: '[0 ngày]',
    paidCumulative: '[x tỷ]',
    openRfiCount: '[n]',
    overdueRfiCount: '[0]',
    pendingInspectionCount: '[n]',
    openDefectCount: '[n]',
    openNcrCount: '[0]',
    pendingProcurementCount: '[n]',
    siteWorkforce: '[xx người]',
    projectStatus: 'Xanh',
    focusPointTop: 'Huy động thiết bị trắc đạc laser toàn đạc điện tử và lập mốc tim trục chuẩn cho 5 khối tháp.',
  },
};

// ==============================
// 3. TIẾN ĐỘ THEO 5 THÁP
// ==============================
export interface TowerItem {
  code: string;
  name: string;
  currentItem: string;
  floors: string;
  actualPercent: string;
  plannedPercent: string;
  actualBar: number;
  plannedBar: number;
  status: 'Đúng hạn' | 'Cần theo dõi' | 'Chậm';
  supervisor: string;
  leadContractor: string;
  note: string;
}

export const TOWERS_DATA: TowerItem[] = [
  {
    code: 'TA#1',
    name: 'Khối tháp TA#1',
    currentItem: 'Thi công kết cấu dầm sàn tầng [xx], lắp dựng cốt thép cột vách',
    floors: '[xx] tầng',
    actualPercent: '[xx%]',
    plannedPercent: '[xx%]',
    actualBar: 44,
    plannedBar: 46,
    status: 'Đúng hạn',
    supervisor: 'KS. [Họ và tên] (ICIC)',
    leadContractor: 'KS. [Họ và tên] (CSCEC)',
    note: 'Đạt kiểm tra nghiệm thu giàn giáo bao che mặt ngoài.',
  },
  {
    code: 'TA#2',
    name: 'Khối tháp TA#2',
    currentItem: 'Lắp dựng cốp pha dầm chuyển và cốt thép sàn tầng [xx]',
    floors: '[xx] tầng',
    actualPercent: '[xx%]',
    plannedPercent: '[xx%]',
    actualBar: 39,
    plannedBar: 48,
    status: 'Cần theo dõi',
    supervisor: 'KS. [Họ và tên] (ICIC)',
    leadContractor: 'KS. [Họ và tên] (CSCEC)',
    note: 'Đang thiếu [xx] thợ cốp pha theo cam kết hợp đồng.',
  },
  {
    code: 'TA#3',
    name: 'Khối tháp TA#3',
    currentItem: 'Bảo dưỡng bê tông sàn tầng [xx], kéo cáp dự ứng lực đợt [n]',
    floors: '[xx] tầng',
    actualPercent: '[xx%]',
    plannedPercent: '[xx%]',
    actualBar: 42,
    plannedBar: 42,
    status: 'Đúng hạn',
    supervisor: 'KS. [Họ và tên] (ICIC)',
    leadContractor: 'KS. [Họ và tên] (CSCEC)',
    note: 'Kết quả thử nén bê tông 7 ngày đạt [xx%] cường độ thiết kế.',
  },
  {
    code: 'TA#4',
    name: 'Khối tháp TA#4',
    currentItem: 'Nghiệm thu cốt thép cột vách trục [A-D], chuẩn bị đổ bê tông',
    floors: '[xx] tầng',
    actualPercent: '[xx%]',
    plannedPercent: '[xx%]',
    actualBar: 39,
    plannedBar: 40,
    status: 'Đúng hạn',
    supervisor: 'KS. [Họ và tên] (ICIC)',
    leadContractor: 'KS. [Họ và tên] (CSCEC)',
    note: 'Duy trì ổn định chu kỳ sàn [n] ngày/sàn.',
  },
  {
    code: 'TA#5',
    name: 'Khối tháp TA#5',
    currentItem: 'Gia công cốt thép dầm sàn tầng [xx], gia cố hệ giáo shoring',
    floors: '[xx] tầng',
    actualPercent: '[xx%]',
    plannedPercent: '[xx%]',
    actualBar: 35,
    plannedBar: 45,
    status: 'Chậm',
    supervisor: 'KS. [Họ và tên] (ICIC)',
    leadContractor: 'KS. [Họ và tên] (CSCEC)',
    note: 'Chậm [-n ngày] do vướng giao cắt ống MEP trục kỹ thuật xuyên dầm.',
  },
];

// ==============================
// 4. MỐC TIẾN ĐỘ CHÍNH (SCHEDULE MILESTONES)
// ==============================
export interface MilestoneRow {
  id: string;
  milestone: string;
  tower: string;
  plannedDate: string;
  forecastDate: string;
  status: 'Đúng hạn' | 'Cần theo dõi' | 'Chậm';
  variance: string;
  note: string;
}

export const SCHEDULE_MILESTONES: MilestoneRow[] = [
  {
    id: 'MS-01',
    milestone: 'Hoàn thành toàn bộ cọc khoan nhồi & tường vây D-wall',
    tower: 'Toàn dự án (5 tháp)',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Đúng hạn',
    variance: '0 ngày',
    note: 'Đã ký biên bản nghiệm thu đưa vào giai đoạn hầm.',
  },
  {
    id: 'MS-02',
    milestone: 'Nghiệm thu hoàn thành kết cấu khối hầm liên thông',
    tower: 'Toàn dự án (5 tháp)',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Đúng hạn',
    variance: '0 ngày',
    note: 'Chống thấm vách hầm đạt yêu cầu kỹ thuật.',
  },
  {
    id: 'MS-03',
    milestone: 'Cất nóc khối tháp TA#1 (Topping-out)',
    tower: 'Tháp TA#1',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Đúng hạn',
    variance: '0 ngày',
    note: 'Đang duy trì đúng biểu đồ phụ tải nhân lực.',
  },
  {
    id: 'MS-04',
    milestone: 'Cất nóc khối tháp TA#2 (Topping-out)',
    tower: 'Tháp TA#2',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Cần theo dõi',
    variance: '[-n ngày]',
    note: 'Chậm thi công cốp pha dầm chuyển tầng [xx].',
  },
  {
    id: 'MS-05',
    milestone: 'Cất nóc khối tháp TA#3 (Topping-out)',
    tower: 'Tháp TA#3',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Đúng hạn',
    variance: '0 ngày',
    note: 'Bám sát tiến độ baseline phê duyệt.',
  },
  {
    id: 'MS-06',
    milestone: 'Cất nóc khối tháp TA#4 (Topping-out)',
    tower: 'Tháp TA#4',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Đúng hạn',
    variance: '0 ngày',
    note: 'Chuẩn bị triển khai xây tường ngăn các tầng dưới.',
  },
  {
    id: 'MS-07',
    milestone: 'Cất nóc khối tháp TA#5 (Topping-out)',
    tower: 'Tháp TA#5',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Chậm',
    variance: '[-n ngày]',
    note: 'Yêu cầu CSCEC trình kế hoạch bù tiến độ (Catch-up Plan).',
  },
  {
    id: 'MS-08',
    milestone: 'Hoàn thành phần xây tô thô và lắp dựng mặt dựng kính',
    tower: 'Khối tháp TA#1–TA#5',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Cần theo dõi',
    variance: '[-n ngày]',
    note: 'Đang hoàn tất duyệt mẫu kính Low-E.',
  },
  {
    id: 'MS-09',
    milestone: 'Nghiệm thu PCCC, Môi trường & Bàn giao đưa vào khai thác',
    tower: 'Toàn dự án (5 tháp)',
    plannedDate: '[dd/mm/yyyy]',
    forecastDate: '[dd/mm/yyyy]',
    status: 'Đúng hạn',
    variance: '0 ngày',
    note: 'Hồ sơ pháp lý đang thực hiện đúng tiến độ CĐT.',
  },
];

// ==============================
// 5. INSPECTION DOCUMENT (HỒ SƠ NGHIỆM THU / IR)
// ==============================
export interface InspectionRow {
  id: string;
  irCode: string;
  tower: string;
  location: string;
  workCategory: string;
  contractor: string;
  inspector: string;
  inspectionDate: string;
  result: 'Đạt (Approved)' | 'Chờ nghiệm thu' | 'Không đạt (Rejected)' | 'Đạt có điều kiện';
  remarks: string;
}

export const INSPECTION_DATA: InspectionRow[] = [
  {
    id: 'IR-001',
    irCode: 'BD-IR-STR-[089]',
    tower: 'TA#1',
    location: 'Sàn tầng [xx], trục [1-6/A-D]',
    workCategory: 'Nghiệm thu cốt thép & cáp dự ứng lực dầm sàn',
    contractor: 'CSCEC',
    inspector: 'Đoàn TVGS ICIC & Kỹ sư CĐT',
    inspectionDate: '[dd/mm/yyyy]',
    result: 'Đạt (Approved)',
    remarks: 'Cho phép đổ bê tông ca đêm, lấy [xx] tổ mẫu nén.',
  },
  {
    id: 'IR-002',
    irCode: 'BD-IR-STR-[090]',
    tower: 'TA#2',
    location: 'Dầm chuyển tầng [xx], trục [D-E]',
    workCategory: 'Nghiệm thu cốp pha và hệ giáo chống tải trọng lớn',
    contractor: 'CSCEC',
    inspector: 'Đoàn TVGS ICIC & Kỹ sư CĐT',
    inspectionDate: '[dd/mm/yyyy]',
    result: 'Đạt có điều kiện',
    remarks: 'Cần siết chặt thêm giằng chéo giáo và vệ sinh đáy dầm trước 16h.',
  },
  {
    id: 'IR-003',
    irCode: 'BD-IR-MEP-[045]',
    tower: 'TA#3',
    location: 'Sàn tầng [xx], khu kỹ thuật',
    workCategory: 'Nghiệm thu ống luồn MEP âm sàn & ống chờ thoát nước',
    contractor: 'Thầu phụ MEP CSCEC',
    inspector: 'Kỹ sư MEP ICIC',
    inspectionDate: '[dd/mm/yyyy]',
    result: 'Đạt (Approved)',
    remarks: 'Đã thử áp lực và bịt đầu ống chống dị vật xâm nhập.',
  },
  {
    id: 'IR-004',
    irCode: 'BD-IR-STR-[091]',
    tower: 'TA#4',
    location: 'Cột vách lõi thang máy tầng [xx]',
    workCategory: 'Nghiệm thu kích thước hình học & độ thẳng đứng cốp pha',
    contractor: 'CSCEC',
    inspector: 'Tổ trắc đạc & nghiệm thu ICIC',
    inspectionDate: '[dd/mm/yyyy]',
    result: 'Đạt (Approved)',
    remarks: 'Sai số tim trục nằm trong giới hạn cho phép TCVN.',
  },
  {
    id: 'IR-005',
    irCode: 'BD-IR-SAF-[028]',
    tower: 'TA#5',
    location: 'Mặt ngoài tầng [xx]',
    workCategory: 'Kiểm tra an toàn lưới chống rơi và giàn giáo treo',
    contractor: 'Ban An toàn CSCEC',
    inspector: 'Kỹ sư HSE ICIC',
    inspectionDate: '[dd/mm/yyyy]',
    result: 'Không đạt (Rejected)',
    remarks: 'Phát hiện rách lưới tầng [xx], yêu cầu thay mới và nghiệm thu lại.',
  },
  {
    id: 'IR-006',
    irCode: 'BD-IR-CIV-[012]',
    tower: 'Hạ tầng',
    location: 'Đường nội bộ D1 phân khu cảnh quan',
    workCategory: 'Nghiệm thu cao độ đáy mương & gối cống bê tông thoát nước',
    contractor: 'CSCEC Hạ tầng',
    inspector: 'Kỹ sư Hạ tầng BQLDA PMH',
    inspectionDate: '[dd/mm/yyyy]',
    result: 'Chờ nghiệm thu',
    remarks: 'Đang tập kết cống tròn D800 chờ kiểm tra chứng chỉ xuất xưởng.',
  },
];

// ==============================
// 6. PAYMENT (ĐỀ NGHỊ & DUYỆT THANH TOÁN)
// ==============================
export interface PaymentRow {
  id: string;
  batchNo: string;
  contractor: string;
  scopeOfWork: string;
  requestedValue: string;
  approvedValue: string;
  retentionValue: string;
  cumulativePaid: string;
  submittedDate: string;
  approvedDate: string;
  status: 'Đã giải ngân' | 'Đang trình CĐT phê duyệt' | 'TVGS đang thẩm định' | 'Yêu cầu làm rõ';
}

export const PAYMENT_DATA: PaymentRow[] = [
  {
    id: 'PAY-01',
    batchNo: 'Đợt [01]',
    contractor: 'CSCEC (Tổng thầu)',
    scopeOfWork: 'Tạm ứng hợp đồng thi công xây dựng 5 khối tháp',
    requestedValue: '[x tỷ]',
    approvedValue: '[x tỷ]',
    retentionValue: '[0 tỷ]',
    cumulativePaid: '[x tỷ]',
    submittedDate: '[dd/mm/yyyy]',
    approvedDate: '[dd/mm/yyyy]',
    status: 'Đã giải ngân',
  },
  {
    id: 'PAY-02',
    batchNo: 'Đợt [02]',
    contractor: 'CSCEC (Tổng thầu)',
    scopeOfWork: 'Thanh toán hoàn thành cọc khoan nhồi và tường vây D-wall',
    requestedValue: '[x tỷ]',
    approvedValue: '[x tỷ]',
    retentionValue: '[x tỷ]',
    cumulativePaid: '[x tỷ]',
    submittedDate: '[dd/mm/yyyy]',
    approvedDate: '[dd/mm/yyyy]',
    status: 'Đã giải ngân',
  },
  {
    id: 'PAY-03',
    batchNo: 'Đợt [03]',
    contractor: 'CSCEC (Tổng thầu)',
    scopeOfWork: 'Thanh toán hoàn thành kết cấu sàn đáy và vách hầm',
    requestedValue: '[x tỷ]',
    approvedValue: '[x tỷ]',
    retentionValue: '[x tỷ]',
    cumulativePaid: '[x tỷ]',
    submittedDate: '[dd/mm/yyyy]',
    approvedDate: '[dd/mm/yyyy]',
    status: 'Đã giải ngân',
  },
  {
    id: 'PAY-04',
    batchNo: 'Đợt [04]',
    contractor: 'CSCEC (Tổng thầu)',
    scopeOfWork: 'Khối lượng thi công kết cấu thân tầng [xx] đến [xx] 5 tháp',
    requestedValue: '[x tỷ]',
    approvedValue: '[x tỷ]',
    retentionValue: '[x tỷ]',
    cumulativePaid: '[x tỷ]',
    submittedDate: '[dd/mm/yyyy]',
    approvedDate: '[dd/mm/yyyy]',
    status: 'Đang trình CĐT phê duyệt',
  },
  {
    id: 'PAY-05',
    batchNo: 'Đợt [05]',
    contractor: 'ICIC (Tư vấn Giám sát)',
    scopeOfWork: 'Chi phí dịch vụ tư vấn giám sát thi công quý [n]',
    requestedValue: '[x tỷ]',
    approvedValue: '[x tỷ]',
    retentionValue: '[x tỷ]',
    cumulativePaid: '[x tỷ]',
    submittedDate: '[dd/mm/yyyy]',
    approvedDate: '[dd/mm/yyyy]',
    status: 'TVGS đang thẩm định',
  },
];

// ==============================
// 7. RFI (REQUEST FOR INFORMATION / SITE QUERY)
// ==============================
export interface RfiRow {
  id: string;
  rfiCode: string;
  title: string;
  tower: string;
  sender: string;
  responder: string;
  sentDate: string;
  dueDate: string;
  discipline: 'Kết cấu' | 'Kiến trúc' | 'Cơ điện (MEP)' | 'Quy hoạch hạ tầng';
  status: 'Đã trả lời (Closed)' | 'Đang xử lý (Open)' | 'Quá hạn (Overdue)';
  urgency: 'Khẩn' | 'Bình thường';
}

export const RFI_DATA: RfiRow[] = [
  {
    id: 'RFI-01',
    rfiCode: 'BD-RFI-STR-[042]',
    title: 'Xử lý vị trí giao dầm sàn chuyển và bố trí thép tăng cường nút khung trục D-E',
    tower: 'TA#2',
    sender: 'CSCEC (Kỹ sư trưởng)',
    responder: 'Liên danh TV Thiết kế & TVGS ICIC',
    sentDate: '[dd/mm/yyyy]',
    dueDate: '[dd/mm/yyyy]',
    discipline: 'Kết cấu',
    status: 'Quá hạn (Overdue)',
    urgency: 'Khẩn',
  },
  {
    id: 'RFI-02',
    rfiCode: 'BD-RFI-MEP-[018]',
    title: 'Kích thước lỗ mở kỹ thuật ống hút khói hành lang xuyên dầm sàn tầng [xx]',
    tower: 'TA#5',
    sender: 'Thầu phụ MEP CSCEC',
    responder: 'Chủ trì MEP Tư vấn Thiết kế',
    sentDate: '[dd/mm/yyyy]',
    dueDate: '[dd/mm/yyyy]',
    discipline: 'Cơ điện (MEP)',
    status: 'Đang xử lý (Open)',
    urgency: 'Khẩn',
  },
  {
    id: 'RFI-03',
    rfiCode: 'BD-RFI-ARC-[031]',
    title: 'Chi tiết liên kết khung nhôm kính mặt dựng và gờ giọt nước ban công',
    tower: 'TA#1',
    sender: 'CSCEC (Ban Kỹ thuật)',
    responder: 'KTS Chủ nhiệm Tư vấn Thiết kế',
    sentDate: '[dd/mm/yyyy]',
    dueDate: '[dd/mm/yyyy]',
    discipline: 'Kiến trúc',
    status: 'Đang xử lý (Open)',
    urgency: 'Bình thường',
  },
  {
    id: 'RFI-04',
    rfiCode: 'BD-RFI-STR-[039]',
    title: 'Quy cách neo cốt thép cột chịu lực tháp TA#3 vào dầm sàn chuyển',
    tower: 'TA#3',
    sender: 'CSCEC',
    responder: 'Kỹ sư Kết cấu ICIC & TVTK',
    sentDate: '[dd/mm/yyyy]',
    dueDate: '[dd/mm/yyyy]',
    discipline: 'Kết cấu',
    status: 'Đã trả lời (Closed)',
    urgency: 'Bình thường',
  },
  {
    id: 'RFI-05',
    rfiCode: 'BD-RFI-CIV-[009]',
    title: 'Cao độ đấu nối hố ga thoát nước nội bộ ra cống hộp chính trục đường D1',
    tower: 'Hạ tầng',
    sender: 'CSCEC',
    responder: 'BQLDA Phú Mỹ Hưng (Hạ tầng)',
    sentDate: '[dd/mm/yyyy]',
    dueDate: '[dd/mm/yyyy]',
    discipline: 'Quy hoạch hạ tầng',
    status: 'Đã trả lời (Closed)',
    urgency: 'Bình thường',
  },
];

// ==============================
// 8. DOCUMENT CONTROL (VĂN BẢN, BIÊN BẢN, THƯ CẢNH BÁO, BẢN VẼ)
// ==============================
export interface DocumentRow {
  id: string;
  docCode: string;
  docType: 'Biên bản họp tuần' | 'Thư cảnh báo' | 'Báo cáo QLDA' | 'Công văn CĐT' | 'Bản vẽ thi công' | 'Chỉ dẫn kỹ thuật';
  title: string;
  fromParty: string;
  toParty: string;
  issuedDate: string;
  fileFormat: 'PDF' | 'DWG' | 'DOCX' | 'XLSX';
  fileSize: string;
  status: 'Ban hành chính thức' | 'Chờ phản hồi' | 'Ký duyệt nội bộ';
}

export const DOCUMENT_CONTROL_DATA: DocumentRow[] = [
  {
    id: 'DOC-01',
    docCode: 'BD-WKM-MoM-[042]',
    docType: 'Biên bản họp tuần',
    title: 'Biên bản cuộc họp giao ban tuần [W42] giữa CĐT Phú Mỹ Hưng, TVGS ICIC và CSCEC',
    fromParty: 'ICIC (Tư vấn Giám sát)',
    toParty: 'PMH, CSCEC, TVTK',
    issuedDate: '[dd/mm/yyyy]',
    fileFormat: 'PDF',
    fileSize: '[x.x MB]',
    status: 'Ban hành chính thức',
  },
  {
    id: 'DOC-02',
    docCode: 'BD-ICIC-WL-[008]',
    docType: 'Thư cảnh báo',
    title: 'Thư cảnh báo về công tác che chắn an toàn lao động và kỷ luật vệ sinh công trường',
    fromParty: 'ICIC (Tư vấn Giám sát)',
    toParty: 'CSCEC (Chỉ huy trưởng)',
    issuedDate: '[dd/mm/yyyy]',
    fileFormat: 'PDF',
    fileSize: '[x.x MB]',
    status: 'Chờ phản hồi',
  },
  {
    id: 'DOC-03',
    docCode: 'BD-PMH-WKR-[W42]',
    docType: 'Báo cáo QLDA',
    title: 'Báo cáo tiến độ và kiểm soát chất lượng tuần [W42] - Ban QLDA Bình Dương',
    fromParty: 'BQLDA Phú Mỹ Hưng',
    toParty: 'Ban Tổng Giám đốc PMH',
    issuedDate: '[dd/mm/yyyy]',
    fileFormat: 'PDF',
    fileSize: '[x.x MB]',
    status: 'Ban hành chính thức',
  },
  {
    id: 'DOC-04',
    docCode: 'BD-PMH-OUT-[067]',
    docType: 'Công văn CĐT',
    title: 'Thông báo nhắc nhở tiến độ thi công và yêu cầu tăng cường nhân lực Tháp TA#2',
    fromParty: 'BQLDA Phú Mỹ Hưng',
    toParty: 'CSCEC (Tổng thầu)',
    issuedDate: '[dd/mm/yyyy]',
    fileFormat: 'PDF',
    fileSize: '[x.x MB]',
    status: 'Ban hành chính thức',
  },
  {
    id: 'DOC-05',
    docCode: 'BD-DWG-ARCH-TA1-[01]',
    docType: 'Bản vẽ thi công',
    title: 'Bản vẽ phát hành thi công (IFC) mặt bằng kiến trúc căn hộ tháp TA#1',
    fromParty: 'Tư vấn Thiết kế',
    toParty: 'BQLDA, ICIC, CSCEC',
    issuedDate: '[dd/mm/yyyy]',
    fileFormat: 'DWG',
    fileSize: '[xx.x MB]',
    status: 'Ban hành chính thức',
  },
  {
    id: 'DOC-06',
    docCode: 'BD-WKM-MoM-[041]',
    docType: 'Biên bản họp tuần',
    title: 'Biên bản cuộc họp giao ban tuần [W41] giữa CĐT Phú Mỹ Hưng, TVGS ICIC và CSCEC',
    fromParty: 'ICIC',
    toParty: 'PMH, CSCEC',
    issuedDate: '[dd/mm/yyyy]',
    fileFormat: 'PDF',
    fileSize: '[x.x MB]',
    status: 'Ban hành chính thức',
  },
  {
    id: 'DOC-07',
    docCode: 'BD-ICIC-WL-[007]',
    docType: 'Thư cảnh báo',
    title: 'Thư cảnh báo về việc bố trí thợ cốp pha không đủ số lượng định mức hợp đồng',
    fromParty: 'ICIC',
    toParty: 'CSCEC',
    issuedDate: '[dd/mm/yyyy]',
    fileFormat: 'PDF',
    fileSize: '[x.x MB]',
    status: 'Ban hành chính thức',
  },
];

// ==============================
// 9. PROCUREMENT (MUA SẮM & PHÊ DUYỆT VẬT TƯ)
// ==============================
export interface ProcurementRow {
  id: string;
  matCode: string;
  materialName: string;
  specification: string;
  supplier: string;
  towerApplied: string;
  submissionDate: string;
  targetDeliveryDate: string;
  status: 'Đã phê duyệt' | 'Đang thẩm tra mẫu' | 'Chờ trình mẫu vật liệu' | 'Đã về công trường';
  approvalCode: string;
}

export const PROCUREMENT_DATA: ProcurementRow[] = [
  {
    id: 'MAT-01',
    matCode: 'BD-MAT-[031]',
    materialName: 'Thép xây dựng CB400/CB500 (Hòa Phát / Pomina)',
    specification: 'Đường kính D10 - D32 mác cao chịu động đất',
    supplier: 'Đại lý cấp 1 Tập đoàn Hòa Phát',
    towerApplied: 'Toàn bộ 5 tháp (TA#1–TA#5)',
    submissionDate: '[dd/mm/yyyy]',
    targetDeliveryDate: '[dd/mm/yyyy]',
    status: 'Đã về công trường',
    approvalCode: 'APP-MAT-021',
  },
  {
    id: 'MAT-02',
    matCode: 'BD-MAT-[032]',
    materialName: 'Bê tông thương phẩm mác R28 B30/B40',
    specification: 'Sử dụng phụ gia giảm nước kéo dài độ sụt',
    supplier: 'Trạm trộn Bê tông [xxx]',
    towerApplied: 'Toàn bộ 5 tháp',
    submissionDate: '[dd/mm/yyyy]',
    targetDeliveryDate: '[dd/mm/yyyy]',
    status: 'Đã phê duyệt',
    approvalCode: 'APP-MAT-022',
  },
  {
    id: 'MAT-03',
    matCode: 'BD-MAT-[033]',
    materialName: 'Kính hộp Low-E dán an toàn mặt ngoài',
    specification: 'Chiều dày 24mm (6mm Low-E + 12mm Air + 6mm Clear)',
    supplier: 'Nhà sản xuất Kính [xxx]',
    towerApplied: 'Khối tháp TA#1, TA#2',
    submissionDate: '[dd/mm/yyyy]',
    targetDeliveryDate: '[dd/mm/yyyy]',
    status: 'Đang thẩm tra mẫu',
    approvalCode: '[Đang duyệt]',
  },
  {
    id: 'MAT-04',
    matCode: 'BD-MAT-[034]',
    materialName: 'Đá tự nhiên Granite ốp sảnh thương mại & thang máy',
    specification: 'Kích thước 800x800mm, hoàn thiện bề mặt mài bóng',
    supplier: 'Công ty Cổ phần Đá [xxx]',
    towerApplied: 'Khối đế thương mại',
    submissionDate: '[dd/mm/yyyy]',
    targetDeliveryDate: '[dd/mm/yyyy]',
    status: 'Chờ trình mẫu vật liệu',
    approvalCode: '[Chờ trình]',
  },
  {
    id: 'MAT-05',
    matCode: 'BD-MAT-[035]',
    materialName: 'Thang máy hành khách tốc độ cao 2.5m/s (Mitsubishi/Schindler)',
    specification: 'Tải trọng 1350kg, hệ thống điều khiển thông minh',
    supplier: 'Công ty Thang máy [xxx]',
    towerApplied: 'Toàn bộ 5 tháp',
    submissionDate: '[dd/mm/yyyy]',
    targetDeliveryDate: '[dd/mm/yyyy]',
    status: 'Đã phê duyệt',
    approvalCode: 'APP-MAT-025',
  },
];

// ==============================
// 10. DEFECT (DANH SÁCH LỖI & NCR)
// ==============================
export interface DefectRow {
  id: string;
  defectCode: string;
  tower: string;
  location: string;
  description: string;
  severity: 'Nghiêm trọng (NCR)' | 'Trung bình' | 'Nhẹ';
  reportedBy: string;
  assignedTo: string;
  reportedDate: string;
  rectifyDeadline: string;
  status: 'Chưa khắc phục' | 'Đang xử lý' | 'Đã nghiệm thu khắc phục';
}

export const DEFECT_DATA: DefectRow[] = [
  {
    id: 'DEF-01',
    defectCode: 'BD-NCR-[004]',
    tower: 'TA#5',
    location: 'Tầng biên tầng [xx], trục [B-C]',
    description: 'Bao che giàn giáo mặt ngoài thiếu lưới chống bụi và mất chốt khóa lan can an toàn',
    severity: 'Nghiêm trọng (NCR)',
    reportedBy: 'Kỹ sư HSE ICIC',
    assignedTo: 'Ban An toàn CSCEC',
    reportedDate: '[dd/mm/yyyy]',
    rectifyDeadline: '[dd/mm/yyyy]',
    status: 'Chưa khắc phục',
  },
  {
    id: 'DEF-02',
    defectCode: 'BD-DEF-[017]',
    tower: 'TA#2',
    location: 'Dầm trục [3], tầng [xx]',
    description: 'Mặt bê tông bị rỗ tổ ong cục bộ tại góc đáy dầm diện tích khoảng 0.05m2',
    severity: 'Trung bình',
    reportedBy: 'Kỹ sư QA/QC ICIC',
    assignedTo: 'Đội thi công kết cấu CSCEC',
    reportedDate: '[dd/mm/yyyy]',
    rectifyDeadline: '[dd/mm/yyyy]',
    status: 'Đang xử lý',
  },
  {
    id: 'DEF-03',
    defectCode: 'BD-DEF-[018]',
    tower: 'TA#1',
    location: 'Sàn tầng [xx], khu vực ban công',
    description: 'Chưa dọn dẹp vệ sinh mẩu thép vụn và đầu que hàn thừa trước khi chuyển bước thi công',
    severity: 'Nhẹ',
    reportedBy: 'Giám sát hiện trường PMH',
    assignedTo: 'Tổ vệ sinh công nghiệp CSCEC',
    reportedDate: '[dd/mm/yyyy]',
    rectifyDeadline: '[dd/mm/yyyy]',
    status: 'Đã nghiệm thu khắc phục',
  },
  {
    id: 'DEF-04',
    defectCode: 'BD-DEF-[019]',
    tower: 'TA#3',
    location: 'Mặt sàn tầng hầm B1',
    description: 'Đọng nước cục bộ do độ dốc thoát nước đáy rãnh thu nước chưa đảm bảo 1%',
    severity: 'Trung bình',
    reportedBy: 'Kỹ sư Giám sát ICIC',
    assignedTo: 'Chỉ huy trưởng CSCEC',
    reportedDate: '[dd/mm/yyyy]',
    rectifyDeadline: '[dd/mm/yyyy]',
    status: 'Đang xử lý',
  },
];

// ==============================
// 11. SURVEY WORK (TRẮC ĐẠC, QUAN TRẮC LÚN & NGHIÊNG)
// ==============================
export interface SurveyRow {
  id: string;
  pointCode: string;
  tower: string;
  surveyType: 'Quan trắc lún' | 'Quan trắc nghiêng' | 'Tim trục & cao độ' | 'Trục đứng thang máy';
  measuredValue: string;
  allowableValue: string;
  equipmentUsed: string;
  surveyDate: string;
  evaluation: 'Đạt chuẩn (Normal)' | 'Cần theo dõi' | 'Vượt giới hạn cảnh báo';
  surveyor: string;
}

export const SURVEY_DATA: SurveyRow[] = [
  {
    id: 'SRV-01',
    pointCode: 'M-LUN-TA1-01',
    tower: 'TA#1',
    surveyType: 'Quan trắc lún',
    measuredValue: '[x.xx mm]',
    allowableValue: '[< xx mm]',
    equipmentUsed: 'Máy thủy bình điện tử Leica DNA03 + Mia Invar',
    surveyDate: '[dd/mm/yyyy]',
    evaluation: 'Đạt chuẩn (Normal)',
    surveyor: 'Đơn vị Quan trắc Độc lập [xxx]',
  },
  {
    id: 'SRV-02',
    pointCode: 'M-LUN-TA2-03',
    tower: 'TA#2',
    surveyType: 'Quan trắc lún',
    measuredValue: '[x.xx mm]',
    allowableValue: '[< xx mm]',
    equipmentUsed: 'Máy thủy bình điện tử Leica DNA03',
    surveyDate: '[dd/mm/yyyy]',
    evaluation: 'Đạt chuẩn (Normal)',
    surveyor: 'Đơn vị Quan trắc Độc lập [xxx]',
  },
  {
    id: 'SRV-03',
    pointCode: 'M-NGH-TA3-02',
    tower: 'TA#3',
    surveyType: 'Quan trắc nghiêng',
    measuredValue: '[x.x mm/H]',
    allowableValue: '[< H/1000]',
    equipmentUsed: 'Máy toàn đạc điện tử độ chính xác cao Leica TS09',
    surveyDate: '[dd/mm/yyyy]',
    evaluation: 'Đạt chuẩn (Normal)',
    surveyor: 'Tổ Trắc đạc Tổng thầu CSCEC',
  },
  {
    id: 'SRV-04',
    pointCode: 'M-TIM-TA4-04',
    tower: 'TA#4',
    surveyType: 'Tim trục & cao độ',
    measuredValue: 'Sai số [±x mm]',
    allowableValue: '[± 5 mm]',
    equipmentUsed: 'Máy chiếu thiên đỉnh thẳng đứng & Toàn đạc',
    surveyDate: '[dd/mm/yyyy]',
    evaluation: 'Đạt chuẩn (Normal)',
    surveyor: 'TVGS ICIC kiểm tra đối chứng',
  },
  {
    id: 'SRV-05',
    pointCode: 'M-LUN-TA5-02',
    tower: 'TA#5',
    surveyType: 'Quan trắc lún',
    measuredValue: '[x.xx mm]',
    allowableValue: '[< xx mm]',
    equipmentUsed: 'Máy thủy bình điện tử Leica DNA03',
    surveyDate: '[dd/mm/yyyy]',
    evaluation: 'Cần theo dõi',
    surveyor: 'Đơn vị Quan trắc Độc lập [xxx]',
  },
];

// ==============================
// 12. FOCUS POINT (ĐIỂM NÓNG CẦN CHỈ ĐẠO TUẦN)
// ==============================
export interface FocusPointItem {
  id: string;
  title: string;
  tower: string;
  responsible: string;
  deadline: string;
  priority: 'Khẩn' | 'Cao' | 'Trung bình';
  category: 'Tiến độ' | 'Chất lượng' | 'An toàn HSE' | 'Vật tư & Pháp lý';
  impactSummary: string;
  proposedAction: string;
  status: 'Chưa giải quyết' | 'Đang xử lý';
}

export const FOCUS_POINTS: FocusPointItem[] = [
  {
    id: 'FP-01',
    title: 'Huy động gấp [xx] thợ cốp pha tay nghề cao phục vụ thi công dầm chuyển Tháp TA#2',
    tower: 'Tháp TA#2',
    responsible: 'Chỉ huy trưởng Tổng thầu CSCEC',
    deadline: '[dd/mm/yyyy]',
    priority: 'Khẩn',
    category: 'Tiến độ',
    impactSummary: 'Nếu không bổ sung trước [dd/mm/yyyy], nguy cơ làm chậm mốc cất nóc tháp TA#2 [-n ngày].',
    proposedAction: 'Yêu cầu CSCEC điều chuyển đội thợ chuyên nghiệp từ dự án lân cận về ngay công trường Phú Hưng.',
    status: 'Đang xử lý',
  },
  {
    id: 'FP-02',
    title: 'Phê duyệt phương án xử lý RFI [042] giao cắt cốt thép dầm chuyển trục D-E',
    tower: 'Tháp TA#2',
    responsible: 'Chủ nhiệm Đồ án TV Thiết kế & Kỹ sư trưởng ICIC',
    deadline: '[dd/mm/yyyy]',
    priority: 'Khẩn',
    category: 'Chất lượng',
    impactSummary: 'Tháp TA#2 đang dừng nghiệm thu cốt thép để chờ bản vẽ hiệu chỉnh chính thức.',
    proposedAction: 'Tổ chức họp khẩn trực tuyến 3 bên (PMH - ICIC - TVTK) để chốt bản vẽ kỹ thuật trước 15:00.',
    status: 'Đang xử lý',
  },
  {
    id: 'FP-03',
    title: 'Khắc phục dứt điểm tồn tại an toàn bao che tầng biên tháp TA#5 theo thư cảnh báo BD-ICIC-WL-[008]',
    tower: 'Tháp TA#5',
    responsible: 'Trưởng ban An toàn lao động CSCEC',
    deadline: '[dd/mm/yyyy]',
    priority: 'Cao',
    category: 'An toàn HSE',
    impactSummary: 'Nguy cơ mất an toàn rơi vật thể từ trên cao khi thi công ca ngày và đêm.',
    proposedAction: 'Tạm đình chỉ đổ bê tông sàn tầng [xx] TA#5 cho đến khi thay mới toàn bộ lưới rách và TVGS ký biên bản.',
    status: 'Chưa giải quyết',
  },
  {
    id: 'FP-04',
    title: 'Chốt phê duyệt mẫu vật liệu kính Low-E và ký hợp đồng đặt hàng gia công kính hộp',
    tower: 'Tháp TA#1 - TA#5',
    responsible: 'BQLDA Phú Mỹ Hưng (Phòng Đấu thầu & Kỹ thuật)',
    deadline: '[dd/mm/yyyy]',
    priority: 'Trung bình',
    category: 'Vật tư & Pháp lý',
    impactSummary: 'Thời gian gia công kính và phụ kiện nhôm nhập khẩu kéo dài [xx] tuần.',
    proposedAction: 'BQLDA hoàn tất thủ tục phê duyệt mẫu đối chứng trình Ban TGĐ phê duyệt chính thức trong tuần.',
    status: 'Đang xử lý',
  },
];

// ==============================
// 13. SITE PICTURE (THƯ VIỆN ẢNH CÔNG TRƯỜNG THEO TUẦN VÀ THÁP)
// ==============================
export interface SitePhoto {
  id: string;
  tower: 'TA#1' | 'TA#2' | 'TA#3' | 'TA#4' | 'TA#5' | 'Toàn cảnh';
  week: string;
  title: string;
  location: string;
  capturedDate: string;
  imageUrl: string;
  photographer: string;
  tag: string;
  caption: string;
}

export const SITE_PICTURES: SitePhoto[] = [
  {
    id: 'PIC-01',
    tower: 'Toàn cảnh',
    week: 'W42',
    title: 'Toàn cảnh flycam công trường 5 tháp Phú Hưng',
    location: 'Góc nhìn trên cao hướng Đông Nam toàn khu dự án',
    capturedDate: '[dd/mm/yyyy]',
    imageUrl: '/src/assets/images/hero_phuhung_flycam_1792123320031.jpg',
    photographer: 'Đội Flycam BQLDA PMH',
    tag: 'Flycam toàn cảnh',
    caption: 'Hiện trạng thi công đồng bộ kết cấu thân 5 khối tháp và hạ tầng kỹ thuật bao quanh.',
  },
  {
    id: 'PIC-02',
    tower: 'TA#1',
    week: 'W42',
    title: 'Thi công kết cấu dầm sàn tầng [xx] Tháp TA#1',
    location: 'Sàn tầng [xx], Khối tháp TA#1',
    capturedDate: '[dd/mm/yyyy]',
    imageUrl: '/src/assets/images/site_tower_structure_1792123320783.jpg',
    photographer: 'Giám sát viên ICIC',
    tag: 'Kết cấu bê tông',
    caption: 'Công tác lắp đặt cốp pha và cốt thép dầm sàn chuẩn bị nghiệm thu đổ bê tông.',
  },
  {
    id: 'PIC-03',
    tower: 'TA#2',
    week: 'W42',
    title: 'Hệ giáo shoring và dầm chuyển Tháp TA#2',
    location: 'Khu vực dầm chuyển tầng [xx], Tháp TA#2',
    capturedDate: '[dd/mm/yyyy]',
    imageUrl: '/src/assets/images/site_tower_structure_1792123320783.jpg',
    photographer: 'Kỹ sư hiện trường CSCEC',
    tag: 'Dầm sàn chuyển',
    caption: 'Lắp dựng giàn giáo chịu lực nặng và kiểm tra độ ổn định thanh chống.',
  },
  {
    id: 'PIC-04',
    tower: 'TA#3',
    week: 'W42',
    title: 'Nghiệm thu cốt thép dầm sàn Tháp TA#3',
    location: 'Sàn tầng [xx], Tháp TA#3',
    capturedDate: '[dd/mm/yyyy]',
    imageUrl: '/src/assets/images/site_tower_structure_1792123320783.jpg',
    photographer: 'TVGS ICIC',
    tag: 'Nghiệm thu cốt thép',
    caption: 'Kiểm tra mật độ cốt thép, khoảng cách con kê và vệ sinh mặt sàn trước khi đổ.',
  },
  {
    id: 'PIC-05',
    tower: 'TA#4',
    week: 'W42',
    title: 'Bơm bê tông cột vách Tháp TA#4',
    location: 'Cột vách lõi thang máy tầng [xx], Tháp TA#4',
    capturedDate: '[dd/mm/yyyy]',
    imageUrl: '/src/assets/images/site_tower_structure_1792123320783.jpg',
    photographer: 'Ban An toàn CSCEC',
    tag: 'Đổ bê tông ca đêm',
    caption: 'Kiểm soát tốc độ đổ và tần số đầm dùi bê tông theo đúng quy trình chỉ dẫn kỹ thuật.',
  },
  {
    id: 'PIC-06',
    tower: 'TA#5',
    week: 'W42',
    title: 'Kiểm tra giàn giáo và bao che mặt ngoài Tháp TA#5',
    location: 'Mặt ngoài tầng [xx], Tháp TA#5',
    capturedDate: '[dd/mm/yyyy]',
    imageUrl: '/src/assets/images/site_tower_structure_1792123320783.jpg',
    photographer: 'HSE TVGS ICIC',
    tag: 'An toàn lao động',
    caption: 'Hiện trạng khắc phục và gia cố lưới chắn rơi theo thư cảnh báo của TVGS.',
  },
];

// ==============================
// 14. DAILY REPORT (BÁO CÁO NGÀY)
// ==============================
export interface DailyReportRow {
  id: string;
  reportCode: string;
  reportDate: string;
  weather: 'Nắng ráo (Sunny)' | 'Mưa rào rải rác' | 'Nhiều mây';
  cscecWorkers: string;
  subContractorWorkers: string;
  totalWorkers: string;
  heavyMachinery: string;
  mainActivities: string;
  safetyIncident: string;
  submittedBy: string;
}

export const DAILY_REPORTS: DailyReportRow[] = [
  {
    id: 'DR-01',
    reportCode: 'BD-DLY-[20261015]',
    reportDate: '[dd/mm/yyyy]',
    weather: 'Nắng ráo (Sunny)',
    cscecWorkers: '[xx]',
    subContractorWorkers: '[xx]',
    totalWorkers: '[xx người]',
    heavyMachinery: '05 Cần trục tháp, 03 Vận thăng lồng, 02 Bơm bê tông tĩnh, 01 Xe cẩu tự hành',
    mainActivities: 'Đổ bê tông sàn tầng [xx] TA#1 ([xxx] m3); Lắp dựng cốt thép TA#3; Gia công thép sàn TA#4.',
    safetyIncident: 'Không có sự cố (0 vụ)',
    submittedBy: 'Kỹ sư Báo cáo CSCEC',
  },
  {
    id: 'DR-02',
    reportCode: 'BD-DLY-[20261014]',
    reportDate: '[dd/mm/yyyy]',
    weather: 'Mưa rào rải rác',
    cscecWorkers: '[xx]',
    subContractorWorkers: '[xx]',
    totalWorkers: '[xx người]',
    heavyMachinery: '05 Cần trục tháp, 03 Vận thăng lồng, 01 Máy xúc đào mương hạ tầng',
    mainActivities: 'Nghiệm thu cốt thép dầm sàn TA#3; Đổ bê tông lót mương cáp ngầm ngoài nhà.',
    safetyIncident: 'Không có sự cố (0 vụ)',
    submittedBy: 'Kỹ sư Báo cáo CSCEC',
  },
  {
    id: 'DR-03',
    reportCode: 'BD-DLY-[20261013]',
    reportDate: '[dd/mm/yyyy]',
    weather: 'Nắng ráo (Sunny)',
    cscecWorkers: '[xx]',
    subContractorWorkers: '[xx]',
    totalWorkers: '[xx người]',
    heavyMachinery: '05 Cần trục tháp, 03 Vận thăng lồng, 02 Bơm bê tông',
    mainActivities: 'Gia cố giàn giáo shoring TA#2; Kéo cáp dự ứng lực đợt [n] tháp TA#3.',
    safetyIncident: 'Không có sự cố (0 vụ)',
    submittedBy: 'Kỹ sư Báo cáo CSCEC',
  },
];

// ==============================
// 15. WEEKLY REPORT (BÁO CÁO TUẦN & BIÊN BẢN HỌP GIAO BAN)
// ==============================
export interface WeeklyReportRow {
  id: string;
  weekCode: string;
  title: string;
  datePeriod: string;
  authorOrg: 'BQLDA PMH' | 'TVGS ICIC' | 'Tổng thầu CSCEC';
  officialCode: string;
  status: 'Đã phát hành chính thức' | 'Chờ CĐT ký duyệt';
  summary: string;
}

export const WEEKLY_REPORTS: WeeklyReportRow[] = [
  {
    id: 'WR-01',
    weekCode: 'Tuần [W42]',
    title: 'Báo cáo Quản lý Dự án tuần [W42] - Ban QLDA Bình Dương (Phú Mỹ Hưng)',
    datePeriod: '[dd/mm – dd/mm/yyyy]',
    authorOrg: 'BQLDA PMH',
    officialCode: 'BD-PMH-WKR-[W42]',
    status: 'Đã phát hành chính thức',
    summary: 'Đánh giá tổng thể tiến độ 5 tháp, cảnh báo chậm tháp TA#2 và TA#5, tổng hợp số liệu nhân lực và chất lượng thi công.',
  },
  {
    id: 'WR-02',
    weekCode: 'Tuần [W42]',
    title: 'Biên bản cuộc họp giao ban tuần [W42] giữa CĐT, TVGS ICIC và CSCEC',
    datePeriod: '[dd/mm/yyyy]',
    authorOrg: 'TVGS ICIC',
    officialCode: 'BD-WKM-MoM-[042]',
    status: 'Đã phát hành chính thức',
    summary: 'Kết luận chỉ đạo của CĐT: yêu cầu CSCEC cam kết bổ sung nhân lực tháp TA#2, TVTK hoàn tất trả lời RFI [042].',
  },
  {
    id: 'WR-03',
    weekCode: 'Tuần [W41]',
    title: 'Báo cáo Quản lý Dự án tuần [W41] - Ban QLDA Bình Dương',
    datePeriod: '[dd/mm – dd/mm/yyyy]',
    authorOrg: 'BQLDA PMH',
    officialCode: 'BD-PMH-WKR-[W41]',
    status: 'Đã phát hành chính thức',
    summary: 'Tổng hợp nghiệm thu bê tông sàn các tháp, nghiệm thu chống thấm sàn hầm đạt 100%.',
  },
  {
    id: 'WR-04',
    weekCode: 'Tuần [W41]',
    title: 'Biên bản cuộc họp giao ban tuần [W41]',
    datePeriod: '[dd/mm/yyyy]',
    authorOrg: 'TVGS ICIC',
    officialCode: 'BD-WKM-MoM-[041]',
    status: 'Đã phát hành chính thức',
    summary: 'Rà soát kế hoạch đổ bê tông tuần W42 và công tác an toàn lao động ca đêm.',
  },
];

// ==============================
// 16. S-CURVE BIỂU ĐỒ MINH HỌA
// ==============================
export const SCURVE_DATA = [
  { week: 'W34', planned: 18, actual: 18, label: 'W34' },
  { week: 'W36', planned: 24, actual: 23, label: 'W36' },
  { week: 'W38', planned: 31, actual: 30, label: 'W38' },
  { week: 'W40', planned: 38, actual: 37, label: 'W40' },
  { week: 'W42', planned: 45, actual: 42, label: 'W42 (Hiện tại)', current: true },
  { week: 'W44', planned: 52, actual: null, label: 'W44 (Dự báo)' },
  { week: 'W46', planned: 60, actual: null, label: 'W46 (Dự báo)' },
  { week: 'W48', planned: 68, actual: null, label: 'W48 (Dự báo)' },
  { week: 'W50', planned: 76, actual: null, label: 'W50 (Dự báo)' },
  { week: 'W52', planned: 84, actual: null, label: 'W52 (Dự báo)' },
];
