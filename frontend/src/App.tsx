import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { NotificationToast } from './components/NotificationToast';
import { LandingPage } from './components/LandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { SkillAnalyzer } from './components/SkillAnalyzer';
import { CareerMatcher } from './components/CareerMatcher';
import { RoadmapView } from './components/RoadmapView';
import { AssessmentCenter } from './components/AssessmentCenter';
import { AdaptiveEngineView } from './components/AdaptiveEngineView';
import { AIMentor } from './components/AIMentor';
import { AnalyticsView } from './components/AnalyticsView';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();

  // If user selected Landing Page, render full landing view
  if (activeView === 'landing') {
    return (
      <div className="min-h-screen bg-[#070B13] text-slate-100 flex flex-col font-sans">
        <NotificationToast />
        <Navbar />
        <main className="flex-1">
          <LandingPage />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B13] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      <NotificationToast />
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Collapsible Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeView === 'dashboard' && <DashboardOverview />}
          {activeView === 'skills' && <SkillAnalyzer />}
          {activeView === 'careers' && <CareerMatcher />}
          {activeView === 'roadmap' && <RoadmapView />}
          {activeView === 'mentor' && <AIMentor />}
          {activeView === 'assessments' && <AssessmentCenter />}
          {activeView === 'adaptive' && <AdaptiveEngineView />}
          {activeView === 'analytics' && <AnalyticsView />}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
