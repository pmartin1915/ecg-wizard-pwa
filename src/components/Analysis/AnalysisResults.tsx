import React from 'react';
import { Card, Row, Col, Typography, Statistic, Alert, Divider, Tag } from 'antd';
import { 
  HeartOutlined, 
  CheckCircleOutlined, 
  WarningOutlined, 
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;

interface AnalysisResultsProps {
  result: {
    success: boolean;
    diagnosis?: string;
    confidence?: number;
    features?: Record<string, any>;
    error?: string;
  };
}

const ResultsContainer = styled.div`
  margin: 24px 0;
`;

const DiagnosisCard = styled(Card)<{ severity: 'normal' | 'warning' | 'critical' }>`
  &&& {
    margin-bottom: 24px;
    border-radius: 12px;
    border-left: 6px solid ${props => {
      switch (props.severity) {
        case 'critical': return 'var(--medical-clinical-critical)';
        case 'warning': return 'var(--medical-clinical-warning)';
        default: return 'var(--medical-clinical-success)';
      }
    }};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    .ant-card-body {
      padding: 24px;
    }
  }
`;

const DiagnosisTitle = styled(Title)`
  &&& {
    color: var(--medical-text-primary) !important;
    margin-bottom: 8px !important;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const ConfidenceScore = styled.div<{ confidence: number }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => 
    props.confidence >= 90 ? 'var(--medical-success-bg)' :
    props.confidence >= 70 ? 'var(--medical-warning-bg)' :
    'var(--medical-critical-bg)'
  };
  border: 1px solid ${props => 
    props.confidence >= 90 ? 'var(--medical-clinical-success)' :
    props.confidence >= 70 ? 'var(--medical-clinical-warning)' :
    'var(--medical-clinical-critical)'
  };
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
`;

const FeaturesCard = styled(Card)`
  &&& {
    border-radius: 12px;
    border: 1px solid var(--medical-border-light);
    
    .ant-card-head {
      background-color: var(--medical-background-gray);
    }
  }
`;

const FeatureItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--medical-border-light);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ClinicalSection = styled.div`
  background-color: var(--medical-info-bg);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--medical-clinical-info);
  margin: 16px 0;
`;

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  if (!result.success) {
    return (
      <Alert
        message="Analysis Failed"
        description={result.error || 'Unknown error occurred during analysis'}
        type="error"
        showIcon
        style={{ margin: '24px 0' }}
      />
    );
  }

  const getSeverity = (diagnosis?: string) => {
    if (!diagnosis) return 'normal';
    
    const lowerDiagnosis = diagnosis.toLowerCase();
    if (lowerDiagnosis.includes('infarction') || lowerDiagnosis.includes('attack')) {
      return 'critical';
    }
    if (lowerDiagnosis.includes('fibrillation') || lowerDiagnosis.includes('arrhythmia')) {
      return 'warning';
    }
    return 'normal';
  };

  const getIcon = (diagnosis?: string) => {
    const severity = getSeverity(diagnosis);
    switch (severity) {
      case 'critical': return <ExclamationCircleOutlined style={{ color: 'var(--medical-clinical-critical)' }} />;
      case 'warning': return <WarningOutlined style={{ color: 'var(--medical-clinical-warning)' }} />;
      default: return <CheckCircleOutlined style={{ color: 'var(--medical-clinical-success)' }} />;
    }
  };

  const getExplanation = (diagnosis?: string) => {
    if (!diagnosis) return 'No diagnosis available';
    
    const explanations: Record<string, string> = {
      'Normal Sinus Rhythm': 'This means your heart is beating in a regular, healthy pattern with normal electrical conduction.',
      'Atrial Fibrillation': 'This shows an irregular heart rhythm where the upper chambers (atria) are not beating in coordination.',
      'Myocardial Infarction': 'This indicates signs of a heart attack, where part of the heart muscle has been damaged due to lack of blood flow.'
    };
    
    return explanations[diagnosis] || `This indicates a specific heart rhythm pattern: ${diagnosis}`;
  };

  const getClinicalSignificance = (diagnosis?: string) => {
    if (!diagnosis) return '';
    
    const significance: Record<string, string> = {
      'Normal Sinus Rhythm': 'NORMAL FINDING - No immediate medical concern. Regular monitoring recommended for wellness.',
      'Atrial Fibrillation': 'SIGNIFICANT FINDING - May require anticoagulation therapy and rate control. Stroke risk assessment needed.',
      'Myocardial Infarction': 'CRITICAL FINDING - Requires immediate emergency medical attention. Time-sensitive treatment essential.'
    };
    
    return significance[diagnosis] || 'Requires evaluation by qualified healthcare professionals.';
  };

  const severity = getSeverity(result.diagnosis);
  
  return (
    <ResultsContainer>
      {/* Main Diagnosis */}
      <DiagnosisCard severity={severity}>
        <DiagnosisTitle level={2}>
          {getIcon(result.diagnosis)}
          AI DIAGNOSIS: {result.diagnosis || 'Unknown'}
        </DiagnosisTitle>
        
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} sm={12}>
            <ConfidenceScore confidence={result.confidence || 0}>
              <HeartOutlined />
              Confidence: {result.confidence?.toFixed(1) || 0}%
            </ConfidenceScore>
          </Col>
          <Col xs={24} sm={12}>
            <Tag 
              color={severity === 'critical' ? 'red' : severity === 'warning' ? 'orange' : 'green'}
              style={{ fontSize: '0.875rem', padding: '4px 12px' }}
            >
              {severity === 'critical' ? 'CRITICAL PRIORITY' : 
               severity === 'warning' ? 'HIGH PRIORITY' : 'NORMAL FINDING'}
            </Tag>
          </Col>
        </Row>
        
        <Divider />
        
        <Paragraph style={{ fontSize: '1.1rem', marginBottom: 16 }}>
          <strong>What this means:</strong> {getExplanation(result.diagnosis)}
        </Paragraph>
        
        <ClinicalSection>
          <Text strong style={{ color: 'var(--medical-primary-blue)' }}>
            Clinical Significance:
          </Text>
          <br />
          <Text style={{ marginTop: 8, display: 'block' }}>
            {getClinicalSignificance(result.diagnosis)}
          </Text>
        </ClinicalSection>
      </DiagnosisCard>

      {/* AI Features */}
      {result.features && (
        <FeaturesCard title="🧠 AI Feature Analysis">
          <Paragraph type="secondary" style={{ marginBottom: 16 }}>
            These are the actual features the AI analyzed to make its diagnosis:
          </Paragraph>
          
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Statistic
                title="Heart Rate"
                value={result.features.estimated_heart_rate?.toFixed(1) || 0}
                suffix="BPM"
                valueStyle={{ color: 'var(--medical-primary-blue)' }}
              />
            </Col>
            {((result.features.rhythm_regularity || 0) * 100) > 0.1 && (
              <Col xs={12} sm={6}>
                <Statistic
                  title="Rhythm Regularity"
                  value={((result.features.rhythm_regularity || 0) * 100).toFixed(1)}
                  suffix="%"
                  valueStyle={{ color: 'var(--medical-primary-blue)' }}
                />
              </Col>
            )}
            <Col xs={12} sm={6}>
              <Statistic
                title="Signal Quality"
                value={result.features.signal_to_noise_ratio?.toFixed(1) || 0}
                valueStyle={{ color: 'var(--medical-primary-blue)' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="Amplitude Range"
                value={result.features.amplitude_range?.toFixed(2) || 0}
                suffix="mV"
                valueStyle={{ color: 'var(--medical-primary-blue)' }}
              />
            </Col>
          </Row>

          {result.features?.rhythm_regularity !== undefined && (result.features.rhythm_regularity * 100) <= 0.1 && (
            <Text type="secondary" style={{ marginTop: 8, display: 'block', fontSize: '0.875rem' }}>
              Note: Rhythm regularity analysis requires longer ECG recordings for accurate assessment.
            </Text>
          )}
          
          <Divider />
          
          <details>
            <summary style={{ cursor: 'pointer', color: 'var(--medical-primary-blue)', fontWeight: 500 }}>
              Show Advanced AI Features
            </summary>
            <div style={{ marginTop: 16 }}>
              {Object.entries(result.features).map(([key, value]) => (
                <FeatureItem key={key}>
                  <Text>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</Text>
                  <Text strong>
                    {typeof value === 'number' ? value.toFixed(3) : String(value)}
                  </Text>
                </FeatureItem>
              ))}
            </div>
          </details>
        </FeaturesCard>
      )}

      {/* Professional Disclaimer */}
      <Alert
        message="Professional Medical Disclaimer"
        description="This analysis is for educational purposes. Always consult qualified healthcare professionals for medical decisions."
        type="info"
        showIcon
        style={{ marginTop: 24 }}
      />
    </ResultsContainer>
  );
};

export default AnalysisResults;
