import { ThemeConfig } from 'antd';

// Professional Medical Color Palette (matching Streamlit theme)
export const medicalColors = {
  // Primary Blues (from Streamlit theme)
  primaryBlue: '#1e3a8a',      // Main header blue
  primaryBlueLight: '#3b82f6',  // Button blue
  primaryBlueDark: '#1e40af',   // Hover states
  
  // Background Colors
  backgroundLight: '#f8f9fa',   // Main background
  backgroundWhite: '#ffffff',   // Card backgrounds
  backgroundGray: '#f1f5f9',    // Sidebar background
  
  // Text Colors
  textPrimary: '#1e293b',       // Primary text
  textSecondary: '#64748b',     // Secondary text
  textLight: '#94a3b8',         // Light text
  
  // Border Colors
  borderLight: '#e2e8f0',       // Light borders
  borderMedium: '#cbd5e1',      // Medium borders
  
  // Clinical Alert Colors (matching Streamlit)
  clinicalCritical: '#dc2626',  // Critical alerts
  clinicalWarning: '#f59e0b',   // Warning alerts
  clinicalInfo: '#0ea5e9',      // Info alerts
  clinicalSuccess: '#059669',   // Success alerts
  
  // Clinical Alert Backgrounds
  criticalBg: '#fef2f2',        // Critical background
  warningBg: '#fffbeb',         // Warning background
  infoBg: '#f0f9ff',            // Info background
  successBg: '#f0fdf4',         // Success background
};

// Professional Medical Theme Configuration
export const medicalTheme: ThemeConfig = {
  token: {
    // Primary Color Scheme
    colorPrimary: medicalColors.primaryBlue,
    colorPrimaryHover: medicalColors.primaryBlueLight,
    colorPrimaryActive: medicalColors.primaryBlueDark,
    
    // Background Colors
    colorBgBase: medicalColors.backgroundWhite,
    colorBgContainer: medicalColors.backgroundWhite,
    colorBgElevated: medicalColors.backgroundWhite,
    colorBgLayout: medicalColors.backgroundLight,
    
    // Text Colors
    colorText: medicalColors.textPrimary,
    colorTextSecondary: medicalColors.textSecondary,
    colorTextTertiary: medicalColors.textLight,
    
    // Border Colors
    colorBorder: medicalColors.borderLight,
    colorBorderSecondary: medicalColors.borderMedium,
    
    // Success/Error Colors
    colorSuccess: medicalColors.clinicalSuccess,
    colorWarning: medicalColors.clinicalWarning,
    colorError: medicalColors.clinicalCritical,
    colorInfo: medicalColors.clinicalInfo,
    
    // Typography
    fontFamily: '"Inter", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingXL: 32,
    
    // Border Radius
    borderRadius: 6,
    borderRadiusLG: 8,
    
    // Box Shadow
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    boxShadowSecondary: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  
  components: {
    // Button Component
    Button: {
      primaryColor: medicalColors.backgroundWhite,
      defaultColor: medicalColors.textPrimary,
      defaultBorderColor: medicalColors.borderLight,
      colorPrimaryHover: medicalColors.primaryBlueLight,
      fontWeight: 500,
    },
    
    // Layout Component
    Layout: {
      headerBg: medicalColors.primaryBlue,
      headerColor: medicalColors.backgroundWhite,
      siderBg: medicalColors.backgroundGray,
      bodyBg: medicalColors.backgroundLight,
    },
    
    // Menu Component
    Menu: {
      itemBg: 'transparent',
      itemColor: medicalColors.textPrimary,
      itemHoverBg: medicalColors.infoBg,
      itemHoverColor: medicalColors.primaryBlue,
      itemSelectedBg: medicalColors.primaryBlue,
      itemSelectedColor: medicalColors.backgroundWhite,
    },
    
    // Card Component
    Card: {
      colorBgContainer: medicalColors.backgroundWhite,
      colorBorderSecondary: medicalColors.borderLight,
      paddingLG: 24,
    },
    
    // Input Component
    Input: {
      colorBorder: medicalColors.borderLight,
      colorPrimaryHover: medicalColors.primaryBlueLight,
    },
    
    // Upload Component
    Upload: {
      colorPrimary: medicalColors.primaryBlue,
      colorPrimaryHover: medicalColors.primaryBlueLight,
    },
    
    // Progress Component
    Progress: {
      defaultColor: medicalColors.primaryBlue,
      remainingColor: medicalColors.backgroundGray,
    },
    
    // Alert Component
    Alert: {
      colorErrorBg: medicalColors.criticalBg,
      colorErrorBorder: medicalColors.clinicalCritical,
      colorWarningBg: medicalColors.warningBg,
      colorWarningBorder: medicalColors.clinicalWarning,
      colorInfoBg: medicalColors.infoBg,
      colorInfoBorder: medicalColors.clinicalInfo,
      colorSuccessBg: medicalColors.successBg,
      colorSuccessBorder: medicalColors.clinicalSuccess,
    },
    
    // Table Component
    Table: {
      colorBgContainer: medicalColors.backgroundWhite,
      colorBorderSecondary: medicalColors.borderLight,
      headerBg: medicalColors.backgroundGray,
    },
    
    // Tabs Component
    Tabs: {
      colorPrimary: medicalColors.primaryBlue,
      itemHoverColor: medicalColors.primaryBlueLight,
      itemSelectedColor: medicalColors.primaryBlue,
    },
  },
};

// CSS Custom Properties for use in styled-components
export const cssVariables = `
  :root {
    --medical-primary-blue: ${medicalColors.primaryBlue};
    --medical-primary-blue-light: ${medicalColors.primaryBlueLight};
    --medical-primary-blue-dark: ${medicalColors.primaryBlueDark};
    --medical-background-light: ${medicalColors.backgroundLight};
    --medical-background-white: ${medicalColors.backgroundWhite};
    --medical-background-gray: ${medicalColors.backgroundGray};
    --medical-text-primary: ${medicalColors.textPrimary};
    --medical-text-secondary: ${medicalColors.textSecondary};
    --medical-text-light: ${medicalColors.textLight};
    --medical-border-light: ${medicalColors.borderLight};
    --medical-border-medium: ${medicalColors.borderMedium};
    --medical-clinical-critical: ${medicalColors.clinicalCritical};
    --medical-clinical-warning: ${medicalColors.clinicalWarning};
    --medical-clinical-info: ${medicalColors.clinicalInfo};
    --medical-clinical-success: ${medicalColors.clinicalSuccess};
    --medical-critical-bg: ${medicalColors.criticalBg};
    --medical-warning-bg: ${medicalColors.warningBg};
    --medical-info-bg: ${medicalColors.infoBg};
    --medical-success-bg: ${medicalColors.successBg};
  }
`;