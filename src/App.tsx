import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { SearchModal } from './components/common/SearchModal';

// Public views
import { LandingPage } from './views/LandingPage';
import { AboutPage } from './views/AboutPage';
import { HowItWorksPage } from './views/HowItWorksPage';
import { ResourcesPage } from './views/ResourcesPage';
import { ReportPage } from './views/ReportPage';
import { EmergencyHelpPage } from './views/EmergencyHelpPage';
import { AuthPage } from './views/AuthPage';

// Dashboard views
import { ChildDashboard } from './views/child/ChildDashboard';
import { SafetyCheckPage } from './views/child/SafetyCheckPage';
import { ChildLearnPage } from './views/child/ChildLearnPage';
import { ChildSettingsPage } from './views/child/ChildSettingsPage';
import { ParentDashboard } from './views/parent/ParentDashboard';
import { SchoolDashboard } from './views/school/SchoolDashboard';
import { AdminDashboard } from './views/admin/AdminDashboard';

export const AppContent: React.FC = () => {
  const { currentRoute, role } = useApp();

  const isDashboardRoute = currentRoute.startsWith('/dashboard');

  const renderCurrentView = () => {
    // 1. Public Routes
    if (currentRoute === '/' || currentRoute === '') return <LandingPage />;
    if (currentRoute === '/about') return <AboutPage />;
    if (currentRoute === '/how-it-works') return <HowItWorksPage />;
    if (currentRoute === '/resources') return <ResourcesPage />;
    if (currentRoute === '/report') return <ReportPage />;
    if (currentRoute === '/emergency-help') return <EmergencyHelpPage />;
    if (currentRoute === '/login') return <AuthPage isRegister={false} />;
    if (currentRoute === '/register') return <AuthPage isRegister={true} />;

    // 2. Child Dashboard Subroutes
    if (currentRoute === '/dashboard/child') return <ChildDashboard />;
    if (currentRoute === '/dashboard/child/safety-check') return <SafetyCheckPage />;
    if (currentRoute === '/dashboard/child/report') return <ReportPage />;
    if (currentRoute === '/dashboard/child/learn') return <ChildLearnPage />;
    if (currentRoute === '/dashboard/child/settings') return <ChildSettingsPage />;

    // 3. Parent Dashboard Subroutes
    if (currentRoute.startsWith('/dashboard/parent')) return <ParentDashboard />;

    // 4. School Dashboard Subroutes
    if (currentRoute.startsWith('/dashboard/school')) return <SchoolDashboard />;

    // 5. Admin Dashboard Subroutes
    if (currentRoute.startsWith('/dashboard/admin')) return <AdminDashboard />;

    // Fallback to active role's dashboard or Landing Page
    if (isDashboardRoute) {
      if (role === 'child') return <ChildDashboard />;
      if (role === 'parent') return <ParentDashboard />;
      if (role === 'school') return <SchoolDashboard />;
      if (role === 'admin') return <AdminDashboard />;
    }

    return <LandingPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B18] text-slate-100 cyber-grid">
      <Navbar />

      {isDashboardRoute ? (
        <div className="flex flex-1 relative">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8">
            {renderCurrentView()}
          </main>
        </div>
      ) : (
        <div className="flex-1 pb-16 md:pb-0">
          <main>{renderCurrentView()}</main>
          <Footer />
        </div>
      )}

      {/* Global Utilities */}
      <MobileNav />
      <ToastContainer />
      <SearchModal />
    </div>
  );
};
