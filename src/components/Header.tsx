import React from 'react';
import { 
  Search, 
  Lock, 
  UserCheck, 
  LogOut, 
  Menu, 
  X,
  Users,
  ShieldCheck
} from 'lucide-react';
import { CurrentUser } from '../types';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  currentUser: CurrentUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onSearchClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenUserManagement: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  sidebarOpen,
  currentUser,
  onOpenLogin,
  onLogout,
  onSearchClick,
  searchQuery,
  setSearchQuery,
  onOpenUserManagement,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F1B2D] text-white border-b border-[#1E2D42] shadow-sm select-none">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Left Zone: Hamburger for mobile + Brand logo & title */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-[#CBD2DE] hover:text-white hover:bg-[#16253B] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo Phú Mỹ Hưng Harmonie */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F2A900] shadow-sm bg-[#F49320] shrink-0">
                <img
                  src="/src/assets/images/logo_phumyhung_harmonie_1792124714081.jpg"
                  alt="Phú Mỹ Hưng Harmonie Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-sm tracking-tight text-white leading-tight">
                  DỰ ÁN BÌNH DƯƠNG
                </div>
                <div className="text-[11px] text-[#F2A900] font-medium tracking-wide">
                  Phú Mỹ Hưng Harmonie · Khu căn hộ Phú Hưng
                </div>
              </div>
            </div>
          </div>

          {/* Middle Zone: Global Search Box */}
          <div className="flex-1 max-w-lg mx-2 sm:mx-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8798]" />
              <input
                type="text"
                placeholder="Tìm tài liệu, RFI, mã biên bản..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={onSearchClick}
                className="w-full pl-9 pr-4 py-2 bg-[#16253B] border border-[#2B3C52] text-xs text-white placeholder-[#7B8798] focus:border-[#F2A900] focus:ring-1 focus:ring-[#F2A900] outline-none transition-all font-sans"
              />
            </div>
          </div>

          {/* Right Zone: User Management & Authentication */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* User Management Button */}
            <button
              onClick={onOpenUserManagement}
              title="Quản lý người dùng & Phân quyền RBAC"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#16253B] hover:bg-[#20344F] border border-[#2B3C52] text-xs text-[#CBD2DE] hover:text-white transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-[#F2A900]" />
              <span className="font-mono text-[11px]">Phân quyền RBAC</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#16253B] border border-[#2B3C52] px-3 py-1.5 text-xs">
                <UserCheck className="w-3.5 h-3.5 text-[#F2A900]" />
                <div className="hidden md:block text-left font-mono">
                  <div className="text-white font-medium leading-tight flex items-center gap-1.5">
                    <span>{currentUser.name}</span>
                    <span className={`text-[9px] px-1 py-0.2 font-bold ${
                      currentUser.role === 'Admin'
                        ? 'bg-red-900/60 text-red-200 border border-red-500/40'
                        : currentUser.role === 'ProjectManager'
                        ? 'bg-amber-900/60 text-amber-200 border border-amber-500/40'
                        : 'bg-blue-900/60 text-blue-200 border border-blue-500/40'
                    }`}>
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#A0ABBD]">{currentUser.org}</div>
                </div>
                <button
                  onClick={onLogout}
                  title="Đăng xuất"
                  className="ml-1 sm:ml-2 p-1 text-[#A0ABBD] hover:text-white transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0F1B2D] bg-[#F2A900] hover:bg-[#ffb71a] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Đăng nhập nội bộ</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
