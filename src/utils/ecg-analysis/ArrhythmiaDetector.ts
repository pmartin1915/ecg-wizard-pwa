/**
 * Arrhythmia detection and classification
 * Converted from Python _predict_condition method
 */

import { ECGFeatures, ECGPrediction, CONDITIONS, ConditionCode } from './types';
import { SignalProcessor } from './SignalProcessor';

export class ArrhythmiaDetector {
  
  /**
   * Predict cardiac condition based on extracted features
   * Direct port from Python _predict_condition method
   */
  static predictCondition(features: ECGFeatures): ECGPrediction {
    try {
      // Extract key features (matching Python exactly)
      const heartRate = features.estimated_heart_rate || 72;
      const regularity = features.rhythm_regularity || 0.5;
      const amplitudeRange = features.amplitude_range || 1.0;
      const complexity = features.signal_complexity || 1.0;
      const stdAmplitude = features.std_amplitude || 0.5;
      const zeroCrossings = features.zero_crossings || 100;
      
      // Normalize some features for better decision making
      const normalizedAmplitude = SignalProcessor.clamp(amplitudeRange, 0.1, 2.0);
      const normalizedComplexity = SignalProcessor.clamp(complexity, 0.1, 3.0);
      
      // Decision tree based on real ECG characteristics
      // For real 500Hz ECG data, adjust thresholds significantly
      
      let condition: ConditionCode;
      let confidence: number;
      
      // First check for highly irregular patterns (AFIB) - more stringent criteria
      if (regularity < 0.5 && 
          zeroCrossings > 300 && // Higher threshold for 5000-sample signals
          normalizedAmplitude > 0.1) { // Lower amplitude threshold for real data
        // Very irregular rhythm suggests A-Fib
        condition = 'AFIB';
        confidence = Math.min(92, 75 + (1 - regularity) * 15);
        
      // Then check for normal - adjusted for real ECG data
      } else if (heartRate >= 50 && heartRate <= 110 && 
                 regularity > 0.7 && // Good regularity
                 normalizedAmplitude > 0.05 && // Lower threshold for real data
                 zeroCrossings < 350) { // Reasonable zero crossings for real data
        // Regular rhythm, normal heart rate, good regularity
        condition = 'NORM';
        confidence = Math.min(95, 75 + regularity * 20);
        
      } else if (normalizedAmplitude < 0.15 || // Broader amplitude threshold
                 (stdAmplitude < 0.15 && normalizedAmplitude < 1.0) || // Low variability with moderate amplitude
                 (zeroCrossings > 400 && regularity < 0.6)) { // Complex irregular patterns (MI+AFIB)
        // MI patterns: reduced amplitude, low variability, or complex patterns
        condition = 'MI';
        confidence = Math.min(90, 75 + Math.min(15, zeroCrossings / 40));
        
      } else if (heartRate > 110 || heartRate < 45) {
        // Significantly abnormal heart rate
        condition = 'STTC';
        confidence = Math.min(88, 65 + Math.min(20, Math.abs(heartRate - 75) / 3));
        
      } else if (regularity < 0.7 && normalizedAmplitude > 0.6) {
        // Somewhat irregular but with good amplitude
        condition = 'CD';
        confidence = Math.min(85, 70 + (1 - regularity) * 10);
        
      } else {
        // Default case - lean towards normal if features are borderline
        if (regularity > 0.5 && heartRate >= 50 && heartRate <= 120) {
          condition = 'NORM';
          confidence = Math.max(70, 60 + regularity * 20);
        } else {
          condition = 'STTC';
          confidence = 75;
        }
      }
      
      return {
        condition: CONDITIONS[condition],
        confidence: Math.round(confidence * 10) / 10,
        condition_code: condition
      };
      
    } catch (error) {
      console.warn('Condition prediction failed:', error);
      return {
        condition: CONDITIONS['NORM'],
        confidence: 50.0,
        condition_code: 'NORM'
      };
    }
  }
  
  /**
   * Advanced arrhythmia analysis with additional features
   */
  static analyzeArrhythmia(features: ECGFeatures): {
    primaryDiagnosis: ECGPrediction;
    riskFactors: string[];
    recommendations: string[];
    severity: 'Low' | 'Medium' | 'High';
  } {
    const primaryDiagnosis = this.predictCondition(features);
    const riskFactors: string[] = [];
    const recommendations: string[] = [];
    
    // Analyze risk factors based on features
    if (features.estimated_heart_rate > 100) {
      riskFactors.push('Tachycardia (fast heart rate)');
    }
    if (features.estimated_heart_rate < 60) {
      riskFactors.push('Bradycardia (slow heart rate)');
    }
    if (features.rhythm_regularity < 0.5) {
      riskFactors.push('Irregular rhythm pattern');
    }
    if (features.amplitude_range < 0.1) {
      riskFactors.push('Low amplitude variability');
    }
    if (features.baseline_wander > 0.2) {
      riskFactors.push('Baseline wander detected');
    }
    
    // Generate educational recommendations
    recommendations.push('This is an educational analysis only');
    recommendations.push('Always consult healthcare professionals for clinical decisions');
    
    if (primaryDiagnosis.condition_code === 'AFIB') {
      recommendations.push('Study: Irregular RR intervals characteristic of atrial fibrillation');
      recommendations.push('Learning focus: Absence of P waves, irregular ventricular response');
    } else if (primaryDiagnosis.condition_code === 'MI') {
      recommendations.push('Study: ST segment changes and T wave abnormalities');
      recommendations.push('Learning focus: Q wave development and morphology changes');
    } else if (primaryDiagnosis.condition_code === 'NORM') {
      recommendations.push('Study: Normal P-QRS-T morphology and intervals');
      recommendations.push('Learning focus: Regular rhythm and normal axis');
    }
    
    // Determine severity for educational purposes
    let severity: 'Low' | 'Medium' | 'High' = 'Low';
    if (primaryDiagnosis.condition_code === 'AFIB' || primaryDiagnosis.condition_code === 'MI') {
      severity = 'High';
    } else if (primaryDiagnosis.condition_code === 'STTC' || primaryDiagnosis.condition_code === 'CD') {
      severity = 'Medium';
    }
    
    return {
      primaryDiagnosis,
      riskFactors,
      recommendations,
      severity
    };
  }
  
  /**
   * Confidence assessment based on feature quality
   */
  static assessConfidence(features: ECGFeatures): {
    overallConfidence: number;
    featureQuality: {
      signalQuality: number;
      rhythmClarity: number;
      morphologyClarity: number;
    };
    reliabilityFactors: string[];
  } {
    const reliabilityFactors: string[] = [];
    
    // Signal quality assessment
    let signalQuality = 0.8; // Base quality
    if (features.signal_to_noise_ratio > 5) {
      signalQuality += 0.1;
    } else if (features.signal_to_noise_ratio < 2) {
      signalQuality -= 0.2;
      reliabilityFactors.push('Low signal-to-noise ratio');
    }
    
    if (features.baseline_wander < 0.1) {
      signalQuality += 0.1;
    } else if (features.baseline_wander > 0.3) {
      signalQuality -= 0.1;
      reliabilityFactors.push('Significant baseline wander');
    }
    
    // Rhythm clarity
    let rhythmClarity = features.rhythm_regularity;
    if (features.estimated_heart_rate < 30 || features.estimated_heart_rate > 200) {
      rhythmClarity -= 0.2;
      reliabilityFactors.push('Extreme heart rate detected');
    }
    
    // Morphology clarity
    let morphologyClarity = 0.7; // Base morphology clarity
    if (features.amplitude_range > 0.5) {
      morphologyClarity += 0.2;
    } else if (features.amplitude_range < 0.1) {
      morphologyClarity -= 0.2;
      reliabilityFactors.push('Low amplitude variability');
    }
    
    // Overall confidence
    const overallConfidence = (signalQuality + rhythmClarity + morphologyClarity) / 3;
    
    return {
      overallConfidence: SignalProcessor.clamp(overallConfidence, 0, 1),
      featureQuality: {
        signalQuality: SignalProcessor.clamp(signalQuality, 0, 1),
        rhythmClarity: SignalProcessor.clamp(rhythmClarity, 0, 1),
        morphologyClarity: SignalProcessor.clamp(morphologyClarity, 0, 1)
      },
      reliabilityFactors
    };
  }
}