import React from 'react';
import { Alert } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const OfflineAlert = styled(Alert)`
  &&& {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1002;
    background-color: var(--medical-warning-bg);
    border: 1px solid var(--medical-clinical-warning);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    .ant-alert-message {
      color: #92400e;
      font-weight: 600;
    }
    
    .ant-alert-description {
      color: #92400e;
    }
  }
`;

const OfflineIndicator: React.FC = () => {
  return (
    <OfflineAlert
      message="Working Offline"
      description="You're offline. Demo files and cached features are still available."
      type="warning"
      icon={<WifiOutlined />}
      showIcon
      closable
    />
  );
};

export default OfflineIndicator;