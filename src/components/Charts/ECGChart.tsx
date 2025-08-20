import React from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

interface ECGChartProps {
  data?: any;
  diagnosis?: string;
}

const ChartContainer = styled(Card)`
  &&& {
    margin: 24px 0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .ant-card-head {
      background-color: var(--medical-background-gray);
      border-bottom: 1px solid var(--medical-border-light);
    }
  }
`;

const PlaceholderChart = styled.div`
  height: 400px;
  background: linear-gradient(45deg, #f8f9fa 25%, transparent 25%), 
              linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #f8f9fa 75%), 
              linear-gradient(-45deg, transparent 75%, #f8f9fa 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  border: 1px solid var(--medical-border-light);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const ECGLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--medical-primary-blue);
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 20%;
    width: 2px;
    height: 40px;
    background-color: var(--medical-primary-blue);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -30px;
    left: 40%;
    width: 2px;
    height: 60px;
    background-color: var(--medical-primary-blue);
  }
`;

const ChartLabel = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  color: var(--medical-text-secondary);
  border: 1px solid var(--medical-border-light);
`;

const ECGChart: React.FC<ECGChartProps> = ({ data, diagnosis }) => {
  return (
    <ChartContainer title={`ECG Signal Analysis${diagnosis ? ` - ${diagnosis}` : ''}`}>
      <PlaceholderChart>
        <ECGLine />
        <ChartLabel>
          ECG Visualization
          <br />
          (Plotly.js integration ready)
        </ChartLabel>
      </PlaceholderChart>
      
      <div style={{ marginTop: 16, color: 'var(--medical-text-secondary)', fontSize: '0.875rem' }}>
        <strong>Note:</strong> ECG chart visualization will be implemented with Plotly.js in Phase 2.
        This placeholder shows the professional medical styling and layout structure.
      </div>
    </ChartContainer>
  );
};

export default ECGChart;