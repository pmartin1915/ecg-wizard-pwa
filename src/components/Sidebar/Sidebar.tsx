import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { 
  HeartOutlined, 
  FileTextOutlined, 
  DatabaseOutlined, 
  BookOutlined, 
  InfoCircleOutlined,
  AnalyticsOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const StyledSider = styled(Sider)`
  &&& {
    background: var(--medical-background-gray);
    border-right: 1px solid var(--medical-border-light);
    position: fixed;
    left: 0;
    top: 64px;
    height: calc(100vh - 64px);
    z-index: 999;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    
    /* Hide on mobile */
    @media (max-width: 1024px) {
      transform: ${props => props.collapsed ? 'translateX(-100%)' : 'translateX(0)'};
      transition: transform 0.3s ease;
    }
    
    .ant-layout-sider-children {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
`;

const MenuHeader = styled.div`
  padding: 24px 16px 16px;
  border-bottom: 1px solid var(--medical-border-light);
  margin-bottom: 8px;
`;

const MenuTitle = styled(Text)`
  &&& {
    color: var(--medical-text-primary);
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const StyledMenu = styled(Menu)`
  &&& {
    background: transparent;
    border: none;
    flex: 1;
    
    .ant-menu-item {
      margin: 4px 12px;
      border-radius: 6px;
      height: 48px;
      display: flex;
      align-items: center;
      color: var(--medical-text-primary);
      font-weight: 500;
      
      &:hover {
        background-color: var(--medical-info-bg);
        color: var(--medical-primary-blue);
      }
      
      &.ant-menu-item-selected {
        background-color: var(--medical-primary-blue) !important;
        color: white !important;
        
        .ant-menu-item-icon {
          color: white !important;
        }
      }
      
      .ant-menu-item-icon {
        font-size: 18px;
        color: var(--medical-text-secondary);
        transition: color 0.2s ease;
      }
      
      &:hover .ant-menu-item-icon {
        color: var(--medical-primary-blue);
      }
      
      &.ant-menu-item-selected .ant-menu-item-icon {
        color: white !important;
      }
    }
  }
`;

const SystemInfo = styled.div`
  padding: 16px;
  border-top: 1px solid var(--medical-border-light);
  margin-top: auto;
`;

const SystemStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const StatusDot = styled.div<{ status: 'online' | 'offline' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.status === 'online' 
    ? 'var(--medical-clinical-success)' 
    : 'var(--medical-clinical-critical)'
  };
`;

const StatusText = styled(Text)`
  &&& {
    font-size: 0.75rem;
    color: var(--medical-text-secondary);
    font-weight: 500;
  }
`;

const VersionText = styled(Text)`
  &&& {
    font-size: 0.75rem;
    color: var(--medical-text-light);
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine selected menu item based on current route
  const getSelectedKey = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
      case '/ecg-analysis':
        return '1';
      case '/batch-processing':
        return '2';
      case '/training-data':
        return '3';
      case '/clinical-reference':
        return '4';
      case '/system-info':
        return '5';
      default:
        return '1';
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <HeartOutlined />,
      label: 'ECG Analysis',
      onClick: () => navigate('/ecg-analysis')
    },
    {
      key: '2',
      icon: <AnalyticsOutlined />,
      label: 'Batch Processing',
      onClick: () => navigate('/batch-processing')
    },
    {
      key: '3',
      icon: <DatabaseOutlined />,
      label: 'Training Data Explorer',
      onClick: () => navigate('/training-data')
    },
    {
      key: '4',
      icon: <BookOutlined />,
      label: 'Clinical Reference',
      onClick: () => navigate('/clinical-reference')
    },
    {
      key: '5',
      icon: <InfoCircleOutlined />,
      label: 'System Information',
      onClick: () => navigate('/system-info')
    }
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = menuItems.find(item => item.key === key);
    if (item?.onClick) {
      item.onClick();
      
      // Close sidebar on mobile after selection
      if (window.innerWidth <= 1024) {
        onCollapse(true);
      }
    }
  };

  // Check online status
  const isOnline = navigator.onLine;

  return (
    <StyledSider
      width={280}
      collapsedWidth={0}
      collapsed={collapsed}
      collapsible
      trigger={null}
      breakpoint="lg"
      onBreakpoint={(broken) => {
        onCollapse(broken);
      }}
    >
      <MenuHeader>
        <MenuTitle>
          Medical Platform
        </MenuTitle>
      </MenuHeader>
      
      <StyledMenu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        onClick={handleMenuClick}
      />
      
      <SystemInfo>
        <SystemStatus>
          <StatusDot status={isOnline ? 'online' : 'offline'} />
          <StatusText>
            System {isOnline ? 'Online' : 'Offline'}
          </StatusText>
        </SystemStatus>
        <VersionText>
          Version 1.0.0
        </VersionText>
      </SystemInfo>
    </StyledSider>
  );
};

export default Sidebar;