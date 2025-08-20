/**
 * Main ECG Analyzer class
 * Converted from Python RealECGPredictor class
 * FOR EDUCATIONAL PURPOSES ONLY - NOT FOR CLINICAL USE
 */

import { ECGData, ECGAnalysisResult, CONDITIONS } from './types';
import { FeatureExtractor } from './FeatureExtractor';
import { ArrhythmiaDetector } from './ArrhythmiaDetector';

export class ECGAnalyzer {
  
  /**
   * Analyze ECG data and return prediction results
   * Direct port from Python analyze_demo_ecg method
   */
  static analyzeDemoECG(ecgData: ECGData): ECGAnalysisResult {
    try {
      // Validate input data
      if (!ecgData.ecg_signal || !ecgData.time || 
          ecgData.ecg_signal.length === 0 || 
          ecgData.time.length === 0 ||
          ecgData.ecg_signal.length !== ecgData.time.length) {
        throw new Error('Invalid ECG data: signal and time arrays must be non-empty and equal length');
      }
      
      // Extract signal and time
      const signal = ecgData.ecg_signal;
      const time = ecgData.time;
      
      // Calculate real features (matching Python exactly)
      const features = FeatureExtractor.extractSimpleFeatures(signal, time);
      
      // Make prediction based on features
      const prediction = ArrhythmiaDetector.predictCondition(features);
      
      return {
        diagnosis: prediction.condition,
        confidence: prediction.confidence,
        features: features,
        success: true
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown analysis error';
      console.error('ECG Analysis Error:', errorMessage);
      
      return {
        diagnosis: 'Analysis Error',
        confidence: 0,
        features: this.getDefaultFeatures(),
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Analyze ECG file (CSV format)
   * Equivalent to Python analyze_ecg_file function
   */
  static async analyzeECGFile(csvContent: string): Promise<ECGAnalysisResult> {
    try {
      // Parse CSV content
      const ecgData = this.parseCSVContent(csvContent);
      
      // Analyze the parsed data
      return this.analyzeDemoECG(ecgData);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze ECG file';
      return {
        success: false,
        diagnosis: 'Analysis Error',
        confidence: 0,
        features: this.getDefaultFeatures(),
        error: errorMessage
      };
    }
  }
  
  /**
   * Parse CSV content into ECG data format
   */
  static parseCSVContent(csvContent: string): ECGData {
    const lines = csvContent.trim().split('\n');
    
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least header and one data row');
    }
    
    // Parse header to identify columns
    const header = lines[0].toLowerCase().split(',').map(col => col.trim());
    
    let timeColumn = -1;
    let signalColumn = -1;
    
    // Find time and signal columns (flexible column names)
    header.forEach((col, index) => {
      if (col.includes('time') || col === 't') {
        timeColumn = index;
      }
      if (col.includes('signal') || col.includes('ecg') || col === 'v') {
        signalColumn = index;
      }
    });
    
    if (timeColumn === -1 || signalColumn === -1) {
      throw new Error('CSV must contain time and ECG signal columns');
    }
    
    // Parse data rows
    const time: number[] = [];
    const ecg_signal: number[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(val => val.trim());
      
      if (values.length > Math.max(timeColumn, signalColumn)) {
        const timeValue = parseFloat(values[timeColumn]);
        const signalValue = parseFloat(values[signalColumn]);
        
        if (!isNaN(timeValue) && !isNaN(signalValue)) {
          time.push(timeValue);
          ecg_signal.push(signalValue);
        }
      }
    }
    
    if (time.length === 0 || ecg_signal.length === 0) {
      throw new Error('No valid numeric data found in CSV');
    }
    
    return { time, ecg_signal };
  }
  
  /**
   * Get comprehensive analysis with additional insights
   */
  static getComprehensiveAnalysis(ecgData: ECGData): {
    basicAnalysis: ECGAnalysisResult;
    advancedAnalysis: ReturnType<typeof ArrhythmiaDetector.analyzeArrhythmia>;
    confidenceAssessment: ReturnType<typeof ArrhythmiaDetector.assessConfidence>;
    educationalNotes: string[];
  } {
    const basicAnalysis = this.analyzeDemoECG(ecgData);
    
    if (!basicAnalysis.success) {
      return {
        basicAnalysis,
        advancedAnalysis: {
          primaryDiagnosis: { condition: 'Error', confidence: 0, condition_code: 'NORM' },
          riskFactors: [],
          recommendations: ['Analysis failed - check ECG data quality'],
          severity: 'Low'
        },
        confidenceAssessment: {
          overallConfidence: 0,
          featureQuality: { signalQuality: 0, rhythmClarity: 0, morphologyClarity: 0 },
          reliabilityFactors: ['Analysis failed']
        },
        educationalNotes: ['Analysis could not be completed due to data issues']
      };
    }
    
    const advancedAnalysis = ArrhythmiaDetector.analyzeArrhythmia(basicAnalysis.features);
    const confidenceAssessment = ArrhythmiaDetector.assessConfidence(basicAnalysis.features);
    
    const educationalNotes = [
      '🎓 Educational ECG Analysis System',
      '⚠️ FOR LEARNING PURPOSES ONLY - NOT FOR CLINICAL DECISIONS',
      `📊 Processed ${ecgData.ecg_signal.length} data points`,
      `⏱️ Signal duration: ${(ecgData.time[ecgData.time.length - 1] - ecgData.time[0]).toFixed(2)} seconds`,
      `💗 Estimated heart rate: ${basicAnalysis.features.estimated_heart_rate.toFixed(0)} BPM`,
      `📈 Signal complexity: ${basicAnalysis.features.signal_complexity.toFixed(2)}`,
      `🎯 Analysis confidence: ${(confidenceAssessment.overallConfidence * 100).toFixed(0)}%`
    ];
    
    return {
      basicAnalysis,
      advancedAnalysis,
      confidenceAssessment,
      educationalNotes
    };
  }
  
  /**
   * Validate ECG data quality
   */
  static validateECGData(ecgData: ECGData): {
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Check data completeness
    if (!ecgData.ecg_signal || ecgData.ecg_signal.length === 0) {
      issues.push('Missing ECG signal data');
    }
    
    if (!ecgData.time || ecgData.time.length === 0) {
      issues.push('Missing time data');
    }
    
    if (ecgData.ecg_signal.length !== ecgData.time.length) {
      issues.push('Signal and time arrays have different lengths');
    }
    
    if (ecgData.ecg_signal.length < 1000) {
      issues.push('Signal too short for reliable analysis (< 1000 samples)');
      recommendations.push('Use ECG recordings of at least 10 seconds duration');
    }
    
    // Check for invalid values
    const hasNaN = ecgData.ecg_signal.some(val => isNaN(val)) || ecgData.time.some(val => isNaN(val));
    if (hasNaN) {
      issues.push('Data contains invalid (NaN) values');
      recommendations.push('Check data source and ensure all values are numeric');
    }
    
    // Check sampling rate
    if (ecgData.time.length > 1) {
      const avgSampleInterval = (ecgData.time[ecgData.time.length - 1] - ecgData.time[0]) / (ecgData.time.length - 1);
      const sampleRate = 1 / avgSampleInterval;
      
      if (sampleRate < 100) {
        issues.push(`Low sampling rate (${sampleRate.toFixed(0)} Hz)`);
        recommendations.push('ECG analysis works best with sampling rates ≥ 250 Hz');
      }
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      recommendations
    };
  }
  
  /**
   * Get default features for error cases
   */
  private static getDefaultFeatures() {
    return {
      mean_amplitude: 0,
      std_amplitude: 0.5,
      max_amplitude: 1,
      min_amplitude: -1,
      amplitude_range: 2,
      signal_to_noise_ratio: 1,
      zero_crossings: 100,
      estimated_heart_rate: 72,
      rhythm_regularity: 0.75,
      dominant_frequency: 1,
      spectral_centroid: 5,
      signal_complexity: 1,
      baseline_wander: 0.1
    };
  }
}