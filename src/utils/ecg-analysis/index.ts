/**
 * ECG Analysis Library - Client-Side ECG Processing
 * Converted from Python backend for desktop application use
 * 
 * FOR EDUCATIONAL PURPOSES ONLY
 * NOT FOR CLINICAL DECISION MAKING
 */

// Main analyzer
export { ECGAnalyzer } from './ECGAnalyzer';

// Core components
export { FeatureExtractor } from './FeatureExtractor';
export { HeartRateCalculator } from './HeartRateCalculator';
export { ArrhythmiaDetector } from './ArrhythmiaDetector';
export { SignalProcessor } from './SignalProcessor';

// Types and interfaces
export type {
  ECGData,
  ECGFeatures,
  ECGPrediction,
  ECGAnalysisResult,
  ConditionCode
} from './types';

export { CONDITIONS } from './types';

// Convenience function for direct file analysis
export async function analyzeECGFile(csvContent: string) {
  return ECGAnalyzer.analyzeECGFile(csvContent);
}

// Convenience function for ECG data analysis
export function analyzeECGData(ecgData: { time: number[]; ecg_signal: number[] }) {
  return ECGAnalyzer.analyzeDemoECG(ecgData);
}

// Educational disclaimer constant
export const EDUCATIONAL_DISCLAIMER = `
⚠️ IMPORTANT EDUCATIONAL DISCLAIMER ⚠️

This ECG analysis system is designed for EDUCATIONAL PURPOSES ONLY.

❌ NOT for clinical diagnosis
❌ NOT for patient care decisions  
❌ NOT a substitute for medical expertise

✅ For learning ECG interpretation
✅ For understanding cardiac rhythms
✅ For educational demonstration

Always consult qualified healthcare professionals for medical decisions.
`;

export const ANALYSIS_METADATA = {
  version: '1.0.0',
  purpose: 'Educational ECG Analysis',
  accuracy: 'Approximation based on simplified algorithms',
  limitations: [
    'Simplified feature extraction',
    'Limited condition classification (5 types)',
    'No complex arrhythmia detection',
    'Educational accuracy only'
  ],
  supportedConditions: [
    'Normal Sinus Rhythm (NORM)',
    'Atrial Fibrillation (AFIB)',
    'Myocardial Infarction (MI)',
    'ST-T Changes (STTC)',
    'Conduction Disorder (CD)'
  ]
};