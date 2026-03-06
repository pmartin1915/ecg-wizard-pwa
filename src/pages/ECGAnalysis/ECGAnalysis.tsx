import React, { useState, useCallback } from 'react';
import { 
  Card, 
  Button, 
  Upload, 
  Typography, 
  Row, 
  Col, 
  Alert, 
  Progress, 
  Divider,
  Space,
  Statistic
} from 'antd';
import { 
  UploadOutlined, 
  HeartOutlined, 
  FileTextOutlined,
  ExperimentOutlined,
  WarningOutlined
} from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import styled from 'styled-components';
import ECGChart from '../../components/Charts/ECGChart';
import AnalysisResults from '../../components/Analysis/AnalysisResults';
import DemoButtons from '../../components/Demo/DemoButtons';
import { useECGAnalysis } from '../../hooks/useECGAnalysis';

const { Title, Text, Paragraph } = Typography;

const PageContainer = styled.div`
  padding: 24px;
  background-color: var(--medical-background-light);
  min-height: calc(100vh - 64px);
`;

const HeaderSection = styled.div`
  text-align: center;
  padding: 32px 0;
  background: linear-gradient(135deg, var(--medical-primary-blue) 0%, var(--medical-primary-blue-light) 100%);
  color: white;
  margin: -24px -24px 32px -24px;
  border-radius: 0 0 16px 16px;
`;

const HeaderTitle = styled(Title)`
  &&& {
    color: white !important;
    margin: 0 0 8px 0 !important;
    font-size: 2.5rem !important;
    font-weight: 700 !important;
  }
`;

const HeaderSubtitle = styled(Text)`
  &&& {
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: 1.125rem !important;
    font-weight: 400 !important;
  }
`;

const StatsRow = styled(Row)`
  margin: 32px 0;
`;

const StatCard = styled(Card)`
  &&& {
    text-align: center;
    border: 1px solid var(--medical-border-light);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .ant-card-body {
      padding: 24px 16px;
    }
    
    .ant-statistic-title {
      color: var(--medical-text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .ant-statistic-content {
      color: var(--medical-primary-blue);
      font-weight: 700;
    }
  }
`;

const MedicalDisclaimer = styled(Alert)`
  &&& {
    background-color: #fef3c7;
    border: 1px solid var(--medical-clinical-warning);
    border-radius: 8px;
    margin: 24px 0;
    
    .ant-alert-message {
      color: #92400e;
      font-weight: 600;
    }
    
    .ant-alert-description {
      color: #92400e;
    }
  }
`;

const SectionCard = styled(Card)`
  &&& {
    margin-bottom: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--medical-border-light);
    
    .ant-card-head {
      background-color: var(--medical-background-gray);
      border-bottom: 1px solid var(--medical-border-light);
      border-radius: 12px 12px 0 0;
    }
    
    .ant-card-head-title {
      color: var(--medical-text-primary);
      font-weight: 600;
    }
  }
`;

const UploadSection = styled.div`
  padding: 32px;
  border: 2px dashed var(--medical-border-medium);
  border-radius: 12px;
  text-align: center;
  background-color: var(--medical-background-white);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--medical-primary-blue);
    background-color: var(--medical-info-bg);
  }
`;

const UploadIcon = styled(UploadOutlined)`
  font-size: 48px;
  color: var(--medical-primary-blue);
  margin-bottom: 16px;
`;

const ProgressSection = styled.div`
  padding: 24px;
  background-color: var(--medical-info-bg);
  border-radius: 12px;
  margin: 24px 0;
`;

const ECGAnalysis: React.FC = () => {
  const {
    isAnalyzing,
    analysisResult,
    error,
    progress,
    analyzeFile,
    analyzeDemoFile,
    clearResults
  } = useECGAnalysis();

  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv,.txt,.dat',
    beforeUpload: (file) => {
      // Don't auto-upload, just store the file
      setUploadedFiles([file]);
      return false;
    },
    onRemove: () => {
      setUploadedFiles([]);
      clearResults();
    },
    fileList: uploadedFiles
  };

  const handleAnalyzeFile = useCallback(() => {
    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      analyzeFile(file);
    }
  }, [uploadedFiles, analyzeFile]);

  const handleDemoAnalysis = useCallback((demoId: string) => {
    setUploadedFiles([]);
    analyzeDemoFile(demoId);
  }, [analyzeDemoFile]);

  return (
    <PageContainer>
      {/* Professional Header */}
      <HeaderSection>
        <HeaderTitle level={1}>
          Professional ECG Classification System
        </HeaderTitle>
        <HeaderSubtitle>
          Analyze heart rhythm recordings and identify 30 cardiac conditions
        </HeaderSubtitle>
      </HeaderSection>

      {/* Medical Disclaimer */}
      <MedicalDisclaimer
        message="MEDICAL DISCLAIMER"
        description="This system is designed exclusively for medical education and training purposes. This software is not intended for clinical decision-making without direct supervision by qualified medical professionals. All diagnostic outputs must be validated by licensed healthcare providers."
        type="warning"
        icon={<WarningOutlined />}
        showIcon
      />

      {/* System Capabilities */}
      <StatsRow gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="Cardiac Conditions"
              value={30}
              prefix={<HeartOutlined />}
            />
          </StatCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="Patient Records"
              value={66540}
              prefix={<FileTextOutlined />}
            />
          </StatCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="Processing Time"
              value="<3"
              suffix="sec"
              prefix={<ExperimentOutlined />}
            />
          </StatCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatCard>
            <Statistic
              title="Validation"
              value="Physician"
              prefix={<HeartOutlined />}
            />
          </StatCard>
        </Col>
      </StatsRow>

      <Divider />

      {/* Demo Section */}
      <SectionCard title="🩺 Try These Example ECG Files">
        <Alert
          message="New to ECG analysis?"
          description="Start with these sample recordings to see how the system works. Each button analyzes real heart rhythm data and shows you exactly what the AI sees."
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />
        
        <DemoButtons 
          onDemoClick={handleDemoAnalysis}
          disabled={isAnalyzing}
        />
      </SectionCard>

      {/* File Upload Section */}
      <SectionCard title="Upload Your ECG File">
        <UploadSection>
          <UploadIcon />
          
          <Title level={4} style={{ color: 'var(--medical-text-primary)', margin: '16px 0' }}>
            Choose an ECG file for analysis
          </Title>
          
          <Paragraph style={{ color: 'var(--medical-text-secondary)', marginBottom: 24 }}>
            Upload ECG signal data in CSV, TXT, or DAT format for diagnostic analysis
          </Paragraph>
          
          <Upload.Dragger {...uploadProps} style={{ background: 'transparent', border: 'none' }}>
            <Space direction="vertical" size="middle">
              <Button 
                type="primary" 
                icon={<UploadOutlined />} 
                size="large"
                style={{ marginBottom: 16 }}
              >
                Select ECG File
              </Button>
              <Text type="secondary">
                Supported formats: CSV, TXT, DAT • Max size: 10MB
              </Text>
            </Space>
          </Upload.Dragger>
          
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                size="large"
                onClick={handleAnalyzeFile}
                loading={isAnalyzing}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing ECG Recording...' : 'Analyze ECG Recording'}
              </Button>
            </div>
          )}
        </UploadSection>
      </SectionCard>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <ProgressSection>
          <Title level={4} style={{ marginBottom: 16 }}>
            AI Analysis in Progress
          </Title>
          <Progress 
            percent={progress} 
            status="active"
            strokeColor="var(--medical-primary-blue)"
          />
          <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
            Real AI classification engine analyzing ECG features...
          </Text>
        </ProgressSection>
      )}

      {/* Error Display */}
      {error && (
        <Alert
          message="Analysis Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={clearResults}
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <>
          <ECGChart data={analysisResult.ecgData} diagnosis={analysisResult.diagnosis} />
          <AnalysisResults result={analysisResult} />
        </>
      )}

      {/* Help Section */}
      {!analysisResult && !isAnalyzing && (
        <SectionCard title="How It Works">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <HeartOutlined style={{ fontSize: 32, color: 'var(--medical-primary-blue)', marginBottom: 16 }} />
                <Title level={4}>What It Does</Title>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
                  <li>• Analyzes ECG heart rhythm recordings</li>
                  <li>• Identifies 30 different cardiac conditions</li>
                  <li>• Provides instant diagnostic classifications</li>
                  <li>• Shows confidence levels for each diagnosis</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <ExperimentOutlined style={{ fontSize: 32, color: 'var(--medical-primary-blue)', marginBottom: 16 }} />
                <Title level={4}>How It Works</Title>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
                  <li>• AI trained on 66,540 patient records</li>
                  <li>• Advanced machine learning algorithms</li>
                  <li>• Signal processing and pattern recognition</li>
                  <li>• Physician-validated training data</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <FileTextOutlined style={{ fontSize: 32, color: 'var(--medical-primary-blue)', marginBottom: 16 }} />
                <Title level={4}>Results You Get</Title>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
                  <li>• Clear diagnostic classification</li>
                  <li>• Confidence percentage scores</li>
                  <li>• Plain English explanations</li>
                  <li>• Professional medical terminology</li>
                </ul>
              </div>
            </Col>
          </Row>
        </SectionCard>
      )}
    </PageContainer>
  );
};

export default ECGAnalysis;