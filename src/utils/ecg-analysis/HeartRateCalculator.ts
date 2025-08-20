/**
 * Heart rate calculation and R-peak detection
 * Converted from Python ECG predictor
 */

import { SignalProcessor } from './SignalProcessor';

export class HeartRateCalculator {
  
  /**
   * Estimate heart rate from ECG signal
   * Ported from Python _estimate_heart_rate method
   */
  static estimateHeartRate(signal: number[], time: number[]): number {
    try {
      if (signal.length === 0 || time.length === 0 || signal.length !== time.length) {
        return 72; // Default heart rate
      }
      
      // Calculate sampling rate
      const samplingRate = 1 / (time[1] - time[0]);
      
      // Improved peak detection with minimum distance
      const threshold = SignalProcessor.mean(signal) + 0.8 * SignalProcessor.std(signal);
      const minDistance = Math.floor(0.3 * samplingRate); // Minimum 300ms between peaks
      
      const peaks: number[] = [];
      let lastPeak = -minDistance;
      
      // Find R-wave peaks
      for (let i = 1; i < signal.length - 1; i++) {
        if (signal[i] > threshold &&
            signal[i] > signal[i - 1] &&
            signal[i] > signal[i + 1] &&
            i - lastPeak > minDistance) {
          peaks.push(i);
          lastPeak = i;
        }
      }
      
      if (peaks.length > 2) {
        // Calculate R-R intervals in seconds
        const rrIntervals: number[] = [];
        for (let i = 1; i < peaks.length; i++) {
          rrIntervals.push(time[peaks[i]] - time[peaks[i - 1]]);
        }
        
        // Remove outliers
        const medianRR = SignalProcessor.median(rrIntervals);
        const validRR = SignalProcessor.removeOutliers(rrIntervals, 0.5);
        
        if (validRR.length > 0) {
          const avgRR = SignalProcessor.mean(validRR);
          const heartRate = 60 / avgRR;
          // Clamp to reasonable range
          return SignalProcessor.clamp(heartRate, 30, 200);
        }
      }
      
      return 72; // Default if estimation fails
      
    } catch (error) {
      console.warn('Heart rate estimation failed:', error);
      return 72; // Default if estimation fails
    }
  }
  
  /**
   * Calculate rhythm regularity based on R-R interval variability
   * Ported from Python _calculate_rhythm_regularity method
   */
  static calculateRhythmRegularity(signal: number[]): number {
    try {
      if (signal.length === 0) return 0.75;
      
      // Simple peak detection for R-waves
      const threshold = SignalProcessor.mean(signal) + 1.5 * SignalProcessor.std(signal);
      const minDistance = Math.floor(signal.length / 20); // Minimum distance between R-waves
      
      const peaks: number[] = [];
      let lastPeak = -minDistance;
      
      for (let i = 1; i < signal.length - 1; i++) {
        if (signal[i] > threshold &&
            signal[i] > signal[i - 1] &&
            signal[i] > signal[i + 1] &&
            i - lastPeak > minDistance) {
          peaks.push(i);
          lastPeak = i;
        }
      }
      
      if (peaks.length < 3) {
        // Fallback to zero crossing analysis for short signals
        const zeroCrossings = SignalProcessor.countZeroCrossings(signal);
        const normalizedZC = zeroCrossings / signal.length;
        
        // For real ECG, expect more zero crossings, so adjust thresholds
        if (normalizedZC < 0.15) {
          return 0.95; // Very regular
        } else if (normalizedZC < 0.25) {
          return 0.85; // Regular
        } else {
          return 0.3;  // Irregular
        }
      }
      
      // Calculate R-R interval variability
      const rrIntervals: number[] = [];
      for (let i = 1; i < peaks.length; i++) {
        rrIntervals.push(peaks[i] - peaks[i - 1]);
      }
      
      if (rrIntervals.length < 2) {
        return 0.75;
      }
      
      // Coefficient of variation for R-R intervals
      const meanRR = SignalProcessor.mean(rrIntervals);
      const stdRR = SignalProcessor.std(rrIntervals);
      const cv = stdRR / (meanRR + 1e-8);
      
      // Convert CV to regularity score (lower CV = higher regularity)
      if (cv < 0.05) {
        return 0.95;
      } else if (cv < 0.1) {
        return 0.85;
      } else if (cv < 0.2) {
        return 0.7;
      } else if (cv < 0.4) {
        return 0.5;
      } else {
        return 0.2;
      }
      
    } catch (error) {
      console.warn('Rhythm regularity calculation failed:', error);
      return 0.75;
    }
  }
  
  /**
   * Detect QRS complexes in ECG signal
   * Simplified QRS detection for educational purposes
   */
  static detectQRSComplexes(signal: number[], sampleRate: number): number[] {
    try {
      // Pan-Tompkins algorithm approximation
      const qrsPositions: number[] = [];
      
      // Bandpass filter approximation (simplified)
      const filtered = this.simpleBandpassFilter(signal, sampleRate);
      
      // Differentiation
      const diff = SignalProcessor.diff(filtered);
      
      // Squaring
      const squared = diff.map(val => val * val);
      
      // Moving average
      const windowSize = Math.floor(0.15 * sampleRate); // 150ms window
      const integrated = SignalProcessor.movingAverage(squared, windowSize);
      
      // Peak detection
      const threshold = SignalProcessor.mean(integrated) + 2 * SignalProcessor.std(integrated);
      const minDistance = Math.floor(0.3 * sampleRate); // 300ms minimum distance
      
      let lastQRS = -minDistance;
      for (let i = 1; i < integrated.length - 1; i++) {
        if (integrated[i] > threshold &&
            integrated[i] > integrated[i - 1] &&
            integrated[i] > integrated[i + 1] &&
            i - lastQRS > minDistance) {
          qrsPositions.push(i);
          lastQRS = i;
        }
      }
      
      return qrsPositions;
      
    } catch (error) {
      console.warn('QRS detection failed:', error);
      return [];
    }
  }
  
  /**
   * Simple bandpass filter approximation
   * Real implementation would use proper digital filter design
   */
  private static simpleBandpassFilter(signal: number[], sampleRate: number): number[] {
    // Very simplified bandpass filter (5-15 Hz for QRS detection)
    // In production, use proper digital signal processing libraries
    
    // High-pass filter approximation (remove baseline)
    const highpass = SignalProcessor.diff(signal);
    
    // Low-pass filter approximation (smooth high frequencies)
    const windowSize = Math.floor(sampleRate / 50); // ~20ms window
    const lowpass = SignalProcessor.movingAverage(highpass, windowSize);
    
    return lowpass;
  }
}