import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PageMenuId } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { SearchModal } from './components/SearchModal';
import { UserManagementModal } from './components/UserManagementModal';
import { PhotoModal } from './components/PhotoModal';
import { SitePhoto } from './data/projectData';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { SchedulePage } from './pages/SchedulePage';
import { InspectionPage } from './pages/InspectionPage';
import { PaymentPage } from './pages/PaymentPage';
import { RfiPage } from './pages/RfiPage';
import { DocumentControlPage } from './pages/DocumentControlPage';
import { ProcurementPage } from './pages/ProcurementPage';
import { DefectPage } from './pages/DefectPage';
import { SurveyWorkPage } from './pages/SurveyWorkPage';
import { FocusPointPage } from './pages/FocusPointPage';
import { SitePicturePage } from './pages/SitePicturePage';
import { DailyReportPage } from './pages/DailyReportPage';
import { WeeklyReportPage } from './pages/WeeklyReportPage';

function AppContent() {
  const { currentUser, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageMenuId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userManagementModalOpen, setUserManagementModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<SitePhoto | null>(null);

  const handleNavigate = (pageId: PageMenuId) => {
    setCurrentPage(pageId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPhoto = (photo: SitePhoto) => {
    setActivePhoto(photo);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1A1F29] flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={logout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchClick={() => setSearchModalOpen(true)}
        onOpenUserManagement={() => setUserManagementModalOpen(true)}
      />

      {/* Main Body Area: Left Sidebar + Content Area */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar Navigation */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isOpenOnMobile={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
        />

        {/* Center Main Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* Page Routing */}
          {currentPage === 'dashboard' && (
            <DashboardPage
              currentSubPage="dashboard"
              onNavigate={handleNavigate}
              onOpenPhoto={handleOpenPhoto}
            />
          )}

          {currentPage === 'dashboard-summary' && (
            <DashboardPage
              currentSubPage="dashboard-summary"
              onNavigate={handleNavigate}
              onOpenPhoto={handleOpenPhoto}
            />
          )}

          {currentPage === 'dashboard-towers' && (
            <DashboardPage
              currentSubPage="dashboard-towers"
              onNavigate={handleNavigate}
              onOpenPhoto={handleOpenPhoto}
            />
          )}

          {currentPage === 'dashboard-finance' && (
            <DashboardPage
              currentSubPage="dashboard-finance"
              onNavigate={handleNavigate}
              onOpenPhoto={handleOpenPhoto}
            />
          )}

          {currentPage === 'schedule' && (
            <SchedulePage onNavigate={handleNavigate} />
          )}

          {currentPage === 'inspection' && (
            <InspectionPage />
          )}

          {currentPage === 'payment' && (
            <PaymentPage />
          )}

          {currentPage === 'rfi' && (
            <RfiPage />
          )}

          {currentPage === 'document-control' && (
            <DocumentControlPage />
          )}

          {currentPage === 'procurement' && (
            <ProcurementPage />
          )}

          {currentPage === 'defect' && (
            <DefectPage />
          )}

          {currentPage === 'survey' && (
            <SurveyWorkPage />
          )}

          {currentPage === 'focus-point' && (
            <FocusPointPage />
          )}

          {currentPage === 'site-picture' && (
            <SitePicturePage onOpenPhoto={handleOpenPhoto} />
          )}

          {currentPage === 'daily-report' && (
            <DailyReportPage />
          )}

          {currentPage === 'weekly-report' && (
            <WeeklyReportPage />
          )}

        </main>
      </div>

      {/* Footer */}
      <Footer onNavigate={(pageId: any) => handleNavigate(pageId as PageMenuId)} />

      {/* Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={(role, email) => {
          login(role, email);
          setLoginModalOpen(false);
        }}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigate={handleNavigate}
      />

      <UserManagementModal
        isOpen={userManagementModalOpen}
        onClose={() => setUserManagementModalOpen(false)}
      />

      <PhotoModal
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
