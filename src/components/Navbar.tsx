import React from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Lock, 
  UserCheck, 
  LogOut, 
  ShieldCheck, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

export type PageId = 
  | 'home' 
  | 'overview' 
  | 'progress' 
  | 'documents' 
  | 'photos' 
  | 'hse' 
  | 'stakeholders' 
  | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentUser: { name: string; role: string; org: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: PageId; label: string; number: string }[] = [
    { id: 'home', label: 'Trang chủ', number: '01' },
    { id: 'overview', label: 'Tổng quan dự án', number: '02' },
    { id: 'progress', label: 'Tiến độ', number: '03' },
    { id: 'documents', label: 'Báo cáo & tài liệu', number: '04' },
    { id: 'photos', label: 'Hình ảnh hiện trường', number: '05' },
    { id: 'hse', label: 'HSE & Chất lượng', number: '06' },
    { id: 'stakeholders', label: 'Đơn vị tham gia', number: '07' },
    { id: 'contact', label: 'Liên hệ', number: '08' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F1B2D] text-white border-b border-[#22334B] shadow-sm">
      {/* Top micro bar for project confidential notice */}
      <div className="bg-[#09121F] border-b border-[#1E2D42] text-[11px] text-[#A0ABBD] px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#F2A900] font-medium">[LƯU HÀNH NỘI BỘ]</span>
            <span className="hidden sm:inline">Khu căn hộ Phú Hưng · Chủ đầu tư Phú Mỹ Hưng · TVGS ICIC · Tổng thầu CSCEC</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Tuần [W42]</span>
            <span className="text-[#3E4F66]">|</span>
            <span>Trạng thái: [Đang thi công]</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Brand Logo Zone */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            {/* Yellow Square Logo with BD */}
            <div className="w-10 h-10 bg-[#F2A900] text-[#0F1B2D] flex items-center justify-center font-bold text-lg tracking-wider font-mono shadow-sm group-hover:bg-[#ffb71a] transition-colors">
              BD
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-white leading-tight">
                DỰ ÁN BÌNH DƯƠNG
              </div>
              <div className="text-xs text-[#A0ABBD] font-normal tracking-wide">
                Căn hộ Phú Hưng · Phú Mỹ Hưng
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-xs 2xl:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#F2A900]'
                      : 'text-[#DDE1E7] hover:text-white hover:bg-[#16253B]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2A900]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Internal Login / User Profile */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#16253B] border border-[#22334B] px-3 py-1.5 text-xs">
                <UserCheck className="w-3.5 h-3.5 text-[#F2A900]" />
                <div className="text-left font-mono">
                  <div className="text-white font-medium leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-[#A0ABBD]">{currentUser.org} · {currentUser.role}</div>
                </div>
                <button
                  onClick={onLogout}
                  title="Đăng xuất"
                  className="ml-2 p-1 text-[#A0ABBD] hover:text-white transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#0F1B2D] bg-[#F2A900] hover:bg-[#ffb71a] transition-colors whitespace-nowrap font-sans font-semibold cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Đăng nhập nội bộ</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={onOpenLogin}
                className="px-2.5 py-1.5 text-xs font-semibold text-[#0F1B2D] bg-[#F2A900] flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3" />
                <span>Đăng nhập</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#DDE1E7] hover:text-white hover:bg-[#16253B] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F1B2D] border-b border-[#22334B] px-4 pt-2 pb-6 space-y-1">
          {currentUser && (
            <div className="p-3 mb-3 bg-[#16253B] border border-[#22334B] flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">{currentUser.name}</div>
                <div className="text-xs text-[#A0ABBD] font-mono">{currentUser.org} · {currentUser.role}</div>
              </div>
              <button
                onClick={onLogout}
                className="px-2.5 py-1 text-xs bg-[#22334B] text-white flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between border-l-2 transition-colors ${
                    isActive
                      ? 'border-[#F2A900] bg-[#16253B] text-[#F2A900] font-semibold'
                      : 'border-transparent text-[#DDE1E7] hover:bg-[#16253B] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#5A6372]">{item.number}</span>
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#5A6372]" />
                </button>
              );
            })}
          </div>

          {!currentUser && (
            <div className="pt-3 border-t border-[#22334B]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 bg-[#F2A900] text-[#0F1B2D] font-bold text-center text-sm flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Đăng nhập nội bộ Ban QLDA</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
