import React from 'react';
import { Card, Typography, Row, Col, Statistic, Tag, Divider } from 'antd';
import { 
  HeartOutlined, 
  FileTextOutlined, 
  ExperimentOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div`
  padding: 24px;
`;

const StatCard = styled(Card)`
  &&& {
    text-align: center;
    border: 1px solid var(--medical-border-light);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .ant-statistic-title {
      color: var(--medical-text-secondary);
      font-weight: 500;
    }
    
    .ant-statistic-content {
      color: var(--medical-primary-blue);
      font-weight: 700;
    }
  }
`;

const InfoCard = styled(Card)`
  &&& {
    margin-bottom: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .ant-card-head {
      background-color: var(--medical-background-gray);
    }
  }
`;

const SystemInformation: React.FC = () => {
  return (
    <PageContainer>
      <Title level={2}>System Information</Title>
      
      <Paragraph>
        Professional ECG Classification System - Advanced AI-powered cardiac diagnostics 
        platform for healthcare professionals and clinical training environments.
      </Paragraph>

      {/* System Status */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="System Status"
              value="Operational"
              prefix={<CheckCircleOutlined style={{ color: 'var(--medical-clinical-success)' }} />}
              valueStyle={{ color: 'var(--medical-clinical-success)' }}
            />
          </StatCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="Version"
              value="1.0.0"
              prefix={<InfoCircleOutlined />}
            />
          </StatCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="AI Engine"
              value="Active"
              prefix={<ExperimentOutlined style={{ color: 'var(--medical-clinical-success)' }} />}
              valueStyle={{ color: 'var(--medical-clinical-success)' }}
            />
          </StatCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="PWA Mode"
              value="Enabled"
              prefix={<CheckCircleOutlined style={{ color: 'var(--medical-clinical-success)' }} />}
              valueStyle={{ color: 'var(--medical-clinical-success)' }}
            />
          </StatCard>
        </Col>
      </Row>

      {/* System Capabilities */}
      <InfoCard title="📊 System Capabilities">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div>
              <Text strong style={{ color: 'var(--medical-primary-blue)' }}>
                Diagnostic Classifications:
              </Text>
              <ul style={{ marginTop: 8, marginBottom: 0 }}>
                <li>30 Cardiac Conditions</li>
                <li>Real-time Analysis (&lt;3 seconds)</li>
                <li>Advanced ML Algorithms</li>
                <li>Signal Processing & Filtering</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div>
              <Text strong style={{ color: 'var(--medical-primary-blue)' }}>
                Training Dataset:
              </Text>
              <ul style={{ marginTop: 8, marginBottom: 0 }}>
                <li>66,540 Patient Records</li>
                <li>Physician-Validated Labels</li>
                <li>Multiple ECG Databases</li>
                <li>Clinical-Grade Standards</li>
              </ul>
            </div>
          </Col>
        </Row>
      </InfoCard>

      {/* AI Engine Details */}
      <InfoCard title="🧠 AI Classification Engine">
        <Paragraph>
          The system employs advanced machine learning algorithms trained on comprehensive 
          datasets from leading medical institutions. Real feature extraction includes heart rate 
          variability, rhythm patterns, wave morphology, and electrical conduction parameters.
        </Paragraph>
        
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic
              title="Features Extracted"
              value={12}
              prefix={<ExperimentOutlined />}
              suffix="Real AI Features"
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Training Records"
              value={66540}
              prefix={<FileTextOutlined />}
              suffix="Patient Records"
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Conditions"
              value={30}
              prefix={<HeartOutlined />}
              suffix="Cardiac Classifications"
            />
          </Col>
        </Row>
      </InfoCard>

      {/* Supported Conditions */}
      <InfoCard title="🏥 Supported Cardiac Conditions">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Text strong>Normal Conditions:</Text>
            <div style={{ marginTop: 8 }}>
              <Tag color="green">NORM - Normal Sinus Rhythm</Tag>
            </div>
          </Col>
          
          <Col xs={24} md={6}>
            <Text strong>Critical Findings:</Text>
            <div style={{ marginTop: 8 }}>
              <Tag color="red">MI - Myocardial Infarction</Tag>
            </div>
          </Col>
          
          <Col xs={24} md={6}>
            <Text strong>Arrhythmias:</Text>
            <div style={{ marginTop: 8 }}>
              <Tag color="orange">AFIB - Atrial Fibrillation</Tag>
            </div>
          </Col>
          
          <Col xs={24} md={6}>
            <Text strong>Other Conditions:</Text>
            <div style={{ marginTop: 8 }}>
              <Tag color="blue">STTC - ST-T Changes</Tag>
              <Tag color="blue">CD - Conduction Disorder</Tag>
            </div>
          </Col>
        </Row>
      </InfoCard>

      {/* Technical Architecture */}
      <InfoCard title="⚙️ Technical Architecture">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Text strong>Frontend (PWA):</Text>
            <ul style={{ marginTop: 8 }}>
              <li>React + TypeScript</li>
              <li>Ant Design Pro Components</li>
              <li>Professional Medical Styling</li>
              <li>Service Worker (Offline Support)</li>
              <li>Responsive Design</li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Text strong>Backend (API):</Text>
            <ul style={{ marginTop: 8 }}>
              <li>FastAPI (Python)</li>
              <li>Preserved AI Logic</li>
              <li>Real-time WebSocket Support</li>
              <li>File Processing Pipeline</li>
              <li>RESTful API Design</li>
            </ul>
          </Col>
        </Row>
      </InfoCard>

      {/* PWA Features */}
      <InfoCard title="📱 Progressive Web App Features">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: 'var(--medical-clinical-success)', marginBottom: 8 }} />
              <br />
              <Text strong>Installable</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '0.875rem' }}>
                Works like native app
              </Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: 'var(--medical-clinical-success)', marginBottom: 8 }} />
              <br />
              <Text strong>Offline Ready</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '0.875rem' }}>
                Demo files work offline
              </Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: 'var(--medical-clinical-success)', marginBottom: 8 }} />
              <br />
              <Text strong>Responsive</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '0.875rem' }}>
                Desktop, tablet, mobile
              </Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: 'var(--medical-clinical-success)', marginBottom: 8 }} />
              <br />
              <Text strong>Secure</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '0.875rem' }}>
                HTTPS, CSP, SRI
              </Text>
            </div>
          </Col>
        </Row>
      </InfoCard>

      <Divider />

      {/* Medical Disclaimer */}
      <div style={{ 
        background: 'var(--medical-warning-bg)', 
        border: '1px solid var(--medical-clinical-warning)',
        borderRadius: 8,
        padding: 16,
        textAlign: 'center'
      }}>
        <Text strong style={{ color: '#92400e' }}>
          MEDICAL DISCLAIMER
        </Text>
        <br />
        <Text style={{ color: '#92400e', fontSize: '0.875rem' }}>
          This system is designed exclusively for medical education and training purposes. 
          This software is not intended for clinical decision-making without direct supervision 
          by qualified medical professionals. All diagnostic outputs must be validated by 
          licensed healthcare providers.
        </Text>
      </div>
    </PageContainer>
  );
};

export default SystemInformation;