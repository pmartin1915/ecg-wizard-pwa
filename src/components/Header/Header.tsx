import React from 'react';
import { Layout, Button, Typography, Space } from 'antd';
import { MenuOutlined, HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

interface HeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const StyledHeader = styled(AntHeader)`
  background: linear-gradient(135deg, var(--medical-primary-blue) 0%, var(--medical-primary-blue-light) 100%);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuButton = styled(Button)`
  background: transparent !important;
  border: none !important;
  color: white !important;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
  
  @media (min-width: 1025px) {
    display: none;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled(HeartOutlined)`
  font-size: 32px;
  color: white;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MainTitle = styled(Title)`
  &&& {
    color: white !important;
    margin: 0 !important;
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    line-height: 1.2 !important;
  }
`;

const Subtitle = styled(Text)`
  &&& {
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: 0.875rem !important;
    font-weight: 400 !important;
    margin-top: -4px !important;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusIndicator = styled.div<{ status: 'online' | 'offline' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: ${props => props.status === 'online' 
    ? 'rgba(5, 150, 105, 0.9)' 
    : 'rgba(220, 38, 38, 0.9)'
  };
  border-radius: 12px;
  font-size: 0.75rem;
  color: white;
  font-weight: 500;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileTitle = styled(Title)`
  &&& {
    color: white !important;
    margin: 0 !important;
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    
    @media (min-width: 769px) {
      display: none;
    }
  }
`;

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onToggleSidebar }) => {
  // Check online status
  const isOnline = navigator.onLine;

  return (
    <StyledHeader>
      <LeftSection>
        <MenuButton 
          icon={<MenuOutlined />}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar menu"
        />
        
        <LogoSection>
          <LogoIcon />
          
          {/* Desktop Title */}
          <TitleSection>
            <MainTitle level={2}>
              ECG Classification System
            </MainTitle>
            <Subtitle>
              Professional Medical PWA for Healthcare Professionals
            </Subtitle>
          </TitleSection>
          
          {/* Mobile Title */}
          <MobileTitle level={3}>
            ECG Classification
          </MobileTitle>
        </LogoSection>
      </LeftSection>
      
      <RightSection>
        <StatusIndicator status={isOnline ? 'online' : 'offline'}>
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </StatusIndicator>
      </RightSection>
    </StyledHeader>
  );
};

export default Header;