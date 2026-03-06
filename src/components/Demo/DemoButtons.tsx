import React from 'react';
import { Button, Row, Col, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Text } = Typography;

interface DemoButtonsProps {
  onDemoClick: (demoId: string) => void;
  disabled?: boolean;
}

const DemoButton = styled(Button)`
  &&& {
    height: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background-color: var(--medical-background-white);
    border: 2px solid var(--medical-border-light);
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--medical-primary-blue);
      background-color: var(--medical-info-bg);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }
`;

const ButtonIcon = styled(HeartOutlined)`
  font-size: 24px;
  color: var(--medical-primary-blue);
`;

const ButtonTitle = styled(Text)`
  &&& {
    font-weight: 600;
    color: var(--medical-text-primary);
    font-size: 1rem;
  }
`;

const ButtonDescription = styled(Text)`
  &&& {
    color: var(--medical-text-secondary);
    font-size: 0.875rem;
    text-align: center;
    line-height: 1.4;
  }
`;

const DemoButtons: React.FC<DemoButtonsProps> = ({ onDemoClick, disabled = false }) => {
  const demoFiles = [
    {
      id: 'normal_sinus_rhythm',
      title: 'Normal Heart Rhythm',
      description: 'Healthy sinus rhythm pattern - baseline normal ECG'
    },
    {
      id: 'atrial_fibrillation',
      title: 'Atrial Fibrillation',
      description: 'Irregular rhythm - common arrhythmia requiring monitoring'
    },
    {
      id: 'myocardial_infarction',
      title: 'Heart Attack Pattern',
      description: 'Critical finding - ST elevation indicating acute MI'
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      {demoFiles.map((demo) => (
        <Col xs={24} sm={8} key={demo.id}>
          <DemoButton
            onClick={() => onDemoClick(demo.id)}
            disabled={disabled}
            block
          >
            <ButtonIcon />
            <ButtonTitle>{demo.title}</ButtonTitle>
            <ButtonDescription>{demo.description}</ButtonDescription>
          </DemoButton>
        </Col>
      ))}
    </Row>
  );
};

export default DemoButtons;