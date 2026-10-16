import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardCheck, 
  CreditCard, 
  HelpCircle, 
  FileText, 
  ShoppingCart, 
  AlertTriangle, 
  Compass, 
  Flame, 
  Camera, 
  Clock, 
  BookOpen, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';
import { PageMenuId, MenuItem } from '../types';

interface SidebarProps {
  currentPage: PageMenuId;
  onNavigate: (pageId: PageMenuId) => void;
  isOpenOnMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpenOnMobile,
  onCloseMobile,
}) => {
  // State for expanding dashboard sub-menu
  const [dashboardExpanded, setDashboardExpanded] = useState(true);

  const menuItems: {
    id: PageMenuId;
    number: string;
    label: string;
    icon: React.ReactNode;
    hasSubmenu?: boolean;
    subItems?: { id: PageMenuId; label: string }[];
  }[] = [
    {
      id: 'dashboard',
      number: '01',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
      hasSubmenu: true,
      subItems: [
        { id: 'dashboard-summary', label: 'Tổng hợp dự án' },
        { id: 'dashboard-towers', label: 'Tiến độ theo tháp' },
        { id: 'dashboard-finance', label: 'Tài chính' },
      ],
    },
    {
      id: 'schedule',
      number: '02',
      label: 'Schedule',
      icon: <Calendar className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'inspection',
      number: '03',
      label: 'Inspection document',
      icon: <ClipboardCheck className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'payment',
      number: '04',
      label: 'Payment',
      icon: <CreditCard className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'rfi',
      number: '05',
      label: 'RFI',
      icon: <HelpCircle className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'document-control',
      number: '06',
      label: 'Document control',
      icon: <FileText className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'procurement',
      number: '07',
      label: 'Procurement',
      icon: <ShoppingCart className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'defect',
      number: '08',
      label: 'Defect',
      icon: <AlertTriangle className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'survey',
      number: '09',
      label: 'Survey work',
      icon: <Compass className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'focus-point',
      number: '10',
      label: 'Focus point',
      icon: <Flame className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'site-picture',
      number: '11',
      label: 'Site picture',
      icon: <Camera className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'daily-report',
      number: '12',
      label: 'Daily report',
      icon: <Clock className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'weekly-report',
      number: '13',
      label: 'Weekly report',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.hasSubmenu) {
      if (item.id === currentPage) {
        setDashboardExpanded(!dashboardExpanded);
      } else {
        onNavigate('dashboard');
        setDashboardExpanded(true);
      }
    } else {
      onNavigate(item.id);
    }
    onCloseMobile();
  };

  const handleSubItemClick = (subId: PageMenuId, e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(subId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenOnMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#FFFFFF] border-r border-[#DDE1E7] z-30 transition-transform duration-200 ease-in-out overflow-y-auto ${
          isOpenOnMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Project Header Indicator inside sidebar */}
        <div className="p-3 border-b border-[#EBEFF5] bg-[#F9FAFB] text-[11px] text-[#5A6372] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#F2A900] bg-[#F49320] shrink-0">
            <img
              src="/src/assets/images/logo_phumyhung_harmonie_1792124714081.jpg"
              alt="Phú Mỹ Hưng Harmonie"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="font-semibold text-[#1A1F29] uppercase tracking-wider text-[11px]">
              HỆ THỐNG ĐIỀU HÀNH
            </div>
            <div className="font-mono text-[10px] text-[#D97706] font-medium">
              Phú Mỹ Hưng Harmonie
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-2 space-y-0.5">
          {menuItems.map((item) => {
            const isParentActive = 
              currentPage === item.id || 
              (item.subItems && item.subItems.some(sub => sub.id === currentPage));
            const isExactActive = currentPage === item.id;

            return (
              <div key={item.id} className="select-none">
                <div
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center justify-between px-3 py-2.5 text-xs font-medium cursor-pointer transition-colors ${
                    isExactActive
                      ? 'bg-[#FEF9E7] text-[#0F1B2D] border-l-4 border-[#F2A900] font-semibold'
                      : isParentActive
                      ? 'bg-[#F9FAFB] text-[#0F1B2D]'
                      : 'text-[#5A6372] hover:bg-[#F4F5F7] hover:text-[#1A1F29] border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Index Number 01-13 */}
                    <span
                      className={`font-mono text-[11px] w-5 text-left ${
                        isExactActive ? 'text-[#F2A900] font-bold' : 'text-[#7B8798]'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.hasSubmenu && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDashboardExpanded(!dashboardExpanded);
                      }}
                      className="p-1 text-[#7B8798] hover:text-[#1A1F29]"
                    >
                      {dashboardExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu for Dashboard */}
                {item.hasSubmenu && dashboardExpanded && (
                  <div className="pl-9 pr-2 py-1 space-y-0.5 bg-[#FAFBFD] border-y border-[#F0F2F5]">
                    {item.subItems?.map((sub) => {
                      const isSubActive = currentPage === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={(e) => handleSubItemClick(sub.id, e)}
                          className={`w-full text-left px-3 py-1.5 text-xs rounded-none transition-colors cursor-pointer flex items-center justify-between ${
                            isSubActive
                              ? 'bg-[#FEF9E7] text-[#0F1B2D] font-bold border-l-2 border-[#F2A900]'
                              : 'text-[#5A6372] hover:text-[#1A1F29] hover:bg-[#F0F2F5]'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {isSubActive && <span className="w-1.5 h-1.5 bg-[#F2A900]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-3 m-2 border-t border-[#EBEFF5] bg-[#F9FAFB] text-[10px] text-[#7B8798] font-mono">
          <div>Phiên bản: <span className="text-[#1A1F29] font-medium">BD-PMIS 2026</span></div>
          <div>Bảo mật: <span className="text-[#F2A900]">CĐT Phú Mỹ Hưng</span></div>
        </div>
      </aside>
    </>
  );
};
