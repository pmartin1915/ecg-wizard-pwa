import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { cssVariables } from './theme';

const GlobalStylesComponent = createGlobalStyle`
  ${cssVariables}

  /* Reset and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: var(--medical-background-light);
    color: var(--medical-text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* Prevent text size adjustment on iOS */
    -webkit-text-size-adjust: 100%;
    
    /* Improve touch targets on mobile */
    touch-action: manipulation;
  }

  /* Professional Medical Typography */
  h1, h2, h3, h4, h5, h6 {
    color: var(--medical-text-primary);
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.125rem;
  }

  p {
    margin-bottom: 1em;
    color: var(--medical-text-primary);
  }

  /* Professional Medical Link Styles */
  a {
    color: var(--medical-primary-blue);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--medical-primary-blue-light);
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid var(--medical-primary-blue);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  /* Professional Button Reset */
  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    
    &:focus {
      outline: 2px solid var(--medical-primary-blue);
      outline-offset: 2px;
    }
  }

  /* Input Reset */
  input, textarea, select {
    font-family: inherit;
    border: 1px solid var(--medical-border-light);
    border-radius: 6px;
    padding: 8px 12px;
    
    &:focus {
      outline: none;
      border-color: var(--medical-primary-blue);
      box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.1);
    }
  }

  /* Clinical Alert Classes (matching Streamlit theme) */
  .clinical-critical {
    background-color: var(--medical-critical-bg);
    border-left: 4px solid var(--medical-clinical-critical);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    color: var(--medical-critical-text);
  }

  .clinical-warning {
    background-color: var(--medical-warning-bg);
    border-left: 4px solid var(--medical-clinical-warning);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    color: var(--medical-warning-text);
  }

  .clinical-info {
    background-color: var(--medical-info-bg);
    border-left: 4px solid var(--medical-clinical-info);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    color: var(--medical-info-text);
  }

  .clinical-success {
    background-color: var(--medical-success-bg);
    border-left: 4px solid var(--medical-clinical-success);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    color: var(--medical-success-text);
  }

  /* Professional Metric Container */
  .metric-container {
    background-color: var(--medical-background-white);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin: 0.5rem 0;
    border: 1px solid var(--medical-border-light);
  }

  /* Medical Disclaimer Styling */
  .medical-disclaimer {
    background-color: var(--medical-warning-bg-alt);
    border: 1px solid var(--medical-clinical-warning);
    border-radius: 6px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 0.95rem;
    color: var(--medical-warning-text);
  }

  /* Professional Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--medical-background-gray);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--medical-border-medium);
    border-radius: 4px;
    
    &:hover {
      background: var(--medical-text-secondary);
    }
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--medical-border-medium) var(--medical-background-gray);
  }

  /* Professional Focus Styles */
  .ant-btn:focus,
  .ant-input:focus,
  .ant-upload:focus {
    box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.2) !important;
  }

  /* Remove Ant Design branding */
  .ant-back-top {
    display: none;
  }

  /* Professional Loading States */
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--medical-border-light);
    border-top: 3px solid var(--medical-primary-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Professional Error States */
  .error-boundary {
    padding: 2rem;
    text-align: center;
    background-color: var(--medical-critical-bg);
    border: 1px solid var(--medical-clinical-critical);
    border-radius: 8px;
    margin: 1rem;
  }

  /* Responsive Design for Medical Tablets */
  @media (max-width: 1024px) {
    body {
      font-size: 16px; /* Larger for tablet readability */
    }
    
    .metric-container {
      padding: 1.25rem;
    }
    
    /* Larger touch targets for clinical environments */
    button, .ant-btn {
      min-height: 44px;
      min-width: 44px;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }
    
    h2 {
      font-size: 1.375rem;
    }
    
    .metric-container {
      padding: 1rem;
      margin: 0.75rem 0;
    }
  }

  /* High contrast mode support for accessibility */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor !important;
    }
    
    .clinical-info,
    .clinical-warning,
    .clinical-critical,
    .clinical-success {
      border-width: 2px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Print styles for medical reports */
  @media print {
    body {
      background: white !important;
      color: black !important;
    }
    
    .no-print {
      display: none !important;
    }
    
    .clinical-critical,
    .clinical-warning,
    .clinical-info,
    .clinical-success {
      border: 2px solid currentColor !important;
      background: transparent !important;
    }
  }
`;

export const GlobalStyles: React.FC = () => {
  return <GlobalStylesComponent />;
};