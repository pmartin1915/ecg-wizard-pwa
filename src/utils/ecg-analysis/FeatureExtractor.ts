/**
 * ECG feature extraction
 * Converted from Python _extract_simple_features method
 */

import { SignalProcessor } from './SignalProcessor';
import { HeartRateCalculator } from './HeartRateCalculator';
import { ECGFeatures } from './types';

export class FeatureExtractor {
  
  /**
   * Extract comprehensive features from ECG signal
   * Direct port from Python _extract_simple_features method
   */
  static extractSimpleFeatures(signal: number[], time: number[]): ECGFeatures {
    const features: Partial<ECGFeatures> = {};
    
    try {
      // Basic statistical features
      features.mean_amplitude = SignalProcessor.mean(signal);
      features.std_amplitude = SignalProcessor.std(signal);
      features.max_amplitude = SignalProcessor.max(signal);
      features.min_amplitude = SignalProcessor.min(signal);
      features.amplitude_range = features.max_amplitude - features.min_amplitude;
      
      // Signal quality measures
      const diffSignal = SignalProcessor.diff(signal);
      const diffStd = SignalProcessor.std(diffSignal);
      features.signal_to_noise_ratio = features.std_amplitude / (diffStd + 1e-8);
      features.zero_crossings = SignalProcessor.countZeroCrossings(signal);
      
      // Heart rate estimation
      features.estimated_heart_rate = HeartRateCalculator.estimateHeartRate(signal, time);
      
      // Rhythm regularity
      features.rhythm_regularity = HeartRateCalculator.calculateRhythmRegularity(signal);
      
      // Frequency domain features (simplified)
      const sampleRate = 1 / (time[1] - time[0]);
      const freqFeatures = SignalProcessor.computeFrequencyFeatures(signal, sampleRate);
      features.dominant_frequency = freqFeatures.dominantFreq;
      features.spectral_centroid = freqFeatures.spectralCentroid;
      
      // Morphology features
      features.signal_complexity = this.calculateComplexity(signal);
      features.baseline_wander = this.detectBaselineWander(signal);
      
    } catch (error) {
      console.warn('Feature extraction error:', error);
      // Fill in default values for any missing features
      this.fillDefaultFeatures(features);
    }
    
    // Ensure all features are present with default values if needed
    this.fillDefaultFeatures(features);
    
    return features as ECGFeatures;
  }
  
  /**
   * Calculate signal complexity using sample entropy approximation
   * Ported from Python _calculate_complexity method
   */
  private static calculateComplexity(signal: number[]): number {
    try {
      // Simplified complexity measure
      const diffSignal = SignalProcessor.diff(signal);
      const complexity = SignalProcessor.std(diffSignal) / (SignalProcessor.std(signal) + 1e-8);
      return complexity;
    } catch (error) {
      return 1.0;
    }
  }
  
  /**
   * Detect baseline wander in the signal
   * Ported from Python _detect_baseline_wander method
   */
  private static detectBaselineWander(signal: number[]): number {
    try {
      // Simple baseline detection using moving average
      const windowSize = Math.floor(signal.length / 10);
      const baseline = SignalProcessor.movingAverage(signal, windowSize);
      const wander = SignalProcessor.std(baseline);
      return wander;
    } catch (error) {
      return 0.0;
    }
  }
  
  /**
   * Fill in default values for any missing features
   */
  private static fillDefaultFeatures(features: Partial<ECGFeatures>): void {
    const defaults: ECGFeatures = {
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
    
    // Fill any missing features with defaults
    Object.keys(defaults).forEach(key => {
      if (features[key as keyof ECGFeatures] === undefined) {
        (features as any)[key] = defaults[key as keyof ECGFeatures];
      }
    });
  }
  
  /**
   * Extract time-domain features specifically
   */
  static extractTimeDomainFeatures(signal: number[]): {
    mean: number;
    std: number;
    skewness: number;
    kurtosis: number;
    rms: number;
  } {
    const mean = SignalProcessor.mean(signal);
    const std = SignalProcessor.std(signal);
    
    // Calculate skewness (third moment)
    let skewness = 0;
    for (const value of signal) {
      skewness += Math.pow((value - mean) / std, 3);
    }
    skewness /= signal.length;
    
    // Calculate kurtosis (fourth moment)
    let kurtosis = 0;
    for (const value of signal) {
      kurtosis += Math.pow((value - mean) / std, 4);
    }
    kurtosis = kurtosis / signal.length - 3; // Excess kurtosis
    
    // Calculate RMS (root mean square)
    const rms = Math.sqrt(SignalProcessor.mean(signal.map(x => x * x)));
    
    return {
      mean,
      std,
      skewness,
      kurtosis,
      rms
    };
  }
  
  /**
   * Extract morphological features from ECG
   */
  static extractMorphologyFeatures(signal: number[], sampleRate: number): {
    qrsWidth: number;
    pWavePresence: number;
    tWavePresence: number;
    stSegmentDeviation: number;
  } {
    try {
      // Simplified morphology analysis
      // In production, would use more sophisticated QRS, P-wave, T-wave detection
      
      const qrsPositions = HeartRateCalculator.detectQRSComplexes(signal, sampleRate);
      
      // Estimate average QRS width
      let qrsWidth = 0;
      if (qrsPositions.length > 0) {
        // Very simplified QRS width estimation
        qrsWidth = Math.floor(0.08 * sampleRate); // Assume ~80ms QRS width
      }
      
      // Simplified presence indicators (0-1)
      const pWavePresence = this.detectPWavePresence(signal);
      const tWavePresence = this.detectTWavePresence(signal);
      const stSegmentDeviation = this.detectSTDeviation(signal);
      
      return {
        qrsWidth,
        pWavePresence,
        tWavePresence,
        stSegmentDeviation
      };
      
    } catch (error) {
      return {
        qrsWidth: 0,
        pWavePresence: 0.5,
        tWavePresence: 0.5,
        stSegmentDeviation: 0
      };
    }
  }
  
  /**
   * Simplified P-wave presence detection
   */
  private static detectPWavePresence(signal: number[]): number {
    // Very simplified - in reality would use proper P-wave detection algorithms
    const complexity = this.calculateComplexity(signal);
    return SignalProcessor.clamp(complexity / 2, 0, 1);
  }
  
  /**
   * Simplified T-wave presence detection
   */
  private static detectTWavePresence(signal: number[]): number {
    // Very simplified - in reality would use proper T-wave detection algorithms
    const std = SignalProcessor.std(signal);
    return SignalProcessor.clamp(std / 2, 0, 1);
  }
  
  /**
   * Simplified ST segment deviation detection
   */
  private static detectSTDeviation(signal: number[]): number {
    // Very simplified - in reality would use proper ST segment analysis
    const baseline = SignalProcessor.mean(signal);
    const maxDeviation = Math.max(
      Math.abs(SignalProcessor.max(signal) - baseline),
      Math.abs(SignalProcessor.min(signal) - baseline)
    );
    return maxDeviation;
  }
}