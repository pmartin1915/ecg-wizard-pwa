import React from 'react';
import { Button, Card, Typography } from 'antd';
import { DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Text } = Typography;

interface InstallPromptProps {
  onInstall: () => void;
}

const PromptContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1001;
  max-width: 320px;
`;

const StyledCard = styled(Card)`
  &&& {
    border: 1px solid var(--medical-primary-blue);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(30, 58, 138, 0.15);
    
    .ant-card-body {
      padding: 16px;
    }
  }
`;

const InstallButton = styled(Button)`
  &&& {
    background-color: var(--medical-primary-blue);
    border-color: var(--medical-primary-blue);
    width: 100%;
    margin-top: 12px;
    
    &:hover {
      background-color: var(--medical-primary-blue-light);
      border-color: var(--medical-primary-blue-light);
    }
  }
`;

const InstallPrompt: React.FC<InstallPromptProps> = ({ onInstall }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <PromptContainer>
      <StyledCard
        size="small"
        actions={[
          <InstallButton
            key="install"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={onInstall}
          >
            Install PWA
          </InstallButton>
        ]}
        extra={
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => setIsVisible(false)}
          />
        }
      >
        <Text strong style={{ color: 'var(--medical-primary-blue)' }}>
          Install ECG Classification
        </Text>
        <br />
        <Text type="secondary" style={{ fontSize: '0.875rem' }}>
          Add to device for offline access and better experience
        </Text>
      </StyledCard>
    </PromptContainer>
  );
};

export default InstallPrompt;