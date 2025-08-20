import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  padding: 24px;
`;

const ComingSoonCard = styled(Card)`
  &&& {
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-top: 40px;
  }
`;

const IconContainer = styled.div`
  font-size: 64px;
  color: var(--medical-primary-blue);
  margin-bottom: 24px;
`;

const BatchProcessing: React.FC = () => {
  return (
    <PageContainer>
      <Title level={2}>Batch Processing</Title>
      
      <Alert
        message="Coming in Phase 2"
        description="Batch processing capabilities will be implemented in the next development phase."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <ComingSoonCard>
        <IconContainer>
          <ExperimentOutlined />
        </IconContainer>
        
        <Title level={3}>Batch ECG Analysis</Title>
        
        <Paragraph style={{ maxWidth: 600, margin: '0 auto', color: 'var(--medical-text-secondary)' }}>
          This module will enable bulk analysis of ECG datasets for research and validation purposes.
          Features will include multi-file upload, queue management, progress tracking, and bulk export capabilities.
        </Paragraph>
        
        <div style={{ marginTop: 32, color: 'var(--medical-text-light)' }}>
          <strong>Planned Features:</strong>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
            <li>• Multiple file upload and processing</li>
            <li>• Real-time batch progress tracking</li>
            <li>• Results export (CSV, PDF, JSON)</li>
            <li>• Statistical analysis and reporting</li>
          </ul>
        </div>
      </ComingSoonCard>
    </PageContainer>
  );
};

export default BatchProcessing;