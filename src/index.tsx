import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { medicalTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import App from './App';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// Hide loading screen when React app loads
const hideLoadingScreen = () => {
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingContainer) {
    (loadingContainer as HTMLElement).style.display = 'none';
  }
  document.body.classList.add('app-loaded');
};

// Hide loading screen once React renders
hideLoadingScreen();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider theme={medicalTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);

// Register service worker for PWA offline support
serviceWorkerRegistration.register({
  onSuccess: () => console.log('ECG PWA content cached for offline use.'),
  onUpdate: () => console.log('New ECG PWA content available; close all tabs to update.'),
});

// Performance monitoring
reportWebVitals();
