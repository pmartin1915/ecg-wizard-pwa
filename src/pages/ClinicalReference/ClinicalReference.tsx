import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { BookOutlined } from '@ant-design/icons';
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

const ClinicalReference: React.FC = () => {
  return (
    <PageContainer>
      <Title level={2}>Clinical Reference</Title>
      
      <Alert
        message="Coming in Phase 2"
        description="Clinical reference database will be implemented in the next development phase."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <ComingSoonCard>
        <IconContainer>
          <BookOutlined />
        </IconContainer>
        
        <Title level={3}>30 Cardiac Conditions</Title>
        
        <Paragraph style={{ maxWidth: 600, margin: '0 auto', color: 'var(--medical-text-secondary)' }}>
          Comprehensive clinical reference database covering all 30 cardiac conditions 
          that the AI system can identify, with detailed medical information and clinical guidance.
        </Paragraph>
        
        <div style={{ marginTop: 32, color: 'var(--medical-text-light)' }}>
          <strong>Planned Features:</strong>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
            <li>• Detailed condition descriptions and symptoms</li>
            <li>• Clinical priority classifications (Critical, High, Medium, Low)</li>
            <li>• Treatment guidelines and medical protocols</li>
            <li>• Interactive cardiac anatomy references</li>
          </ul>
        </div>
      </ComingSoonCard>
    </PageContainer>
  );
};

export default ClinicalReference;