import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

// Components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import InstallPrompt from './components/PWA/InstallPrompt';
import OfflineIndicator from './components/PWA/OfflineIndicator';

// Pages
import ECGAnalysis from './pages/ECGAnalysis/ECGAnalysis';
import BatchProcessing from './pages/BatchProcessing/BatchProcessing';
import TrainingDataExplorer from './pages/TrainingDataExplorer/TrainingDataExplorer';
import ClinicalReference from './pages/ClinicalReference/ClinicalReference';
import SystemInformation from './pages/SystemInformation/SystemInformation';

// Hooks
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { usePWAInstall } from './hooks/usePWAInstall';

const { Content } = Layout;

const AppContainer = styled(Layout)`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled(Content)`
  margin-left: 280px;
  padding: 24px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 64px);
  
  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 112px);
`;

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isOnline } = useNetworkStatus();
  const { isInstallable, showInstallPrompt } = usePWAInstall();

  useEffect(() => {
    // Hide loading screen when React app loads
    document.body.classList.add('app-loaded');
    
    // Initialize PWA features
    console.log('ECG Classification PWA initialized');
    
    // Check if running as installed PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      console.log('Running as installed PWA');
    }
  }, []);

  return (
    <AppContainer>
      <Header 
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <Layout>
        <Sidebar 
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />
        
        <MainContent>
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Navigate to="/ecg-analysis" replace />} />
              <Route path="/ecg-analysis" element={<ECGAnalysis />} />
              <Route path="/batch-processing" element={<BatchProcessing />} />
              <Route path="/training-data" element={<TrainingDataExplorer />} />
              <Route path="/clinical-reference" element={<ClinicalReference />} />
              <Route path="/system-info" element={<SystemInformation />} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/ecg-analysis" replace />} />
            </Routes>
          </ContentWrapper>
        </MainContent>
      </Layout>
      
      {/* PWA Components */}
      {isInstallable && <InstallPrompt onInstall={showInstallPrompt} />}
      {!isOnline && <OfflineIndicator />}
    </AppContainer>
  );
}

export default App;