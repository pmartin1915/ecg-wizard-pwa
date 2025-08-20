import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
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

const TrainingDataExplorer: React.FC = () => {
  return (
    <PageContainer>
      <Title level={2}>Training Data Explorer</Title>
      
      <Alert
        message="Coming in Phase 2"
        description="Training data exploration features will be implemented in the next development phase."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <ComingSoonCard>
        <IconContainer>
          <DatabaseOutlined />
        </IconContainer>
        
        <Title level={3}>66,540 Patient Records</Title>
        
        <Paragraph style={{ maxWidth: 600, margin: '0 auto', color: 'var(--medical-text-secondary)' }}>
          Explore the comprehensive training dataset including PTB-XL (21,388 records) and 
          ECG Arrhythmia (45,152 records) datasets with physician-validated labels.
        </Paragraph>
        
        <div style={{ marginTop: 32, color: 'var(--medical-text-light)' }}>
          <strong>Planned Features:</strong>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
            <li>• Interactive dataset statistics and visualizations</li>
            <li>• Condition distribution analysis</li>
            <li>• Sample ECG record browser</li>
            <li>• Training performance metrics</li>
          </ul>
        </div>
      </ComingSoonCard>
    </PageContainer>
  );
};

export default TrainingDataExplorer;