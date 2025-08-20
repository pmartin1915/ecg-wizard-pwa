/**
 * TypeScript interfaces for ECG analysis
 * Converted from Python ECG predictor for client-side processing
 */

export interface ECGData {
  time: number[];
  ecg_signal: number[];
}

export interface ECGFeatures {
  // Basic statistical features
  mean_amplitude: number;
  std_amplitude: number;
  max_amplitude: number;
  min_amplitude: number;
  amplitude_range: number;
  
  // Signal quality measures
  signal_to_noise_ratio: number;
  zero_crossings: number;
  
  // Heart rate and rhythm
  estimated_heart_rate: number;
  rhythm_regularity: number;
  
  // Frequency domain features
  dominant_frequency: number;
  spectral_centroid: number;
  
  // Morphology features
  signal_complexity: number;
  baseline_wander: number;
}

export interface ECGPrediction {
  condition: string;
  confidence: number;
  condition_code: string;
}

export interface ECGAnalysisResult {
  diagnosis: string;
  confidence: number;
  features: ECGFeatures;
  success: boolean;
  error?: string;
}

export type ConditionCode = 'NORM' | 'AFIB' | 'MI' | 'STTC' | 'CD';

export const CONDITIONS: Record<ConditionCode, string> = {
  'NORM': 'Normal Sinus Rhythm',
  'AFIB': 'Atrial Fibrillation',
  'MI': 'Myocardial Infarction',
  'STTC': 'ST-T Changes',
  'CD': 'Conduction Disorder'
};