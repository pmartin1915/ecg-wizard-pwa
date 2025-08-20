/**
 * Basic signal processing utilities for ECG analysis
 * Converted from Python numpy operations to TypeScript
 */

export class SignalProcessor {
  
  /**
   * Calculate mean of an array
   */
  static mean(array: number[]): number {
    if (array.length === 0) return 0;
    return array.reduce((sum, val) => sum + val, 0) / array.length;
  }
  
  /**
   * Calculate standard deviation of an array
   */
  static std(array: number[]): number {
    if (array.length === 0) return 0;
    const mean = this.mean(array);
    const variance = array.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / array.length;
    return Math.sqrt(variance);
  }
  
  /**
   * Calculate median of an array
   */
  static median(array: number[]): number {
    if (array.length === 0) return 0;
    const sorted = [...array].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];
  }
  
  /**
   * Find maximum value in array
   */
  static max(array: number[]): number {
    return array.length > 0 ? Math.max(...array) : 0;
  }
  
  /**
   * Find minimum value in array
   */
  static min(array: number[]): number {
    return array.length > 0 ? Math.min(...array) : 0;
  }
  
  /**
   * Calculate differences between consecutive elements
   */
  static diff(array: number[]): number[] {
    const result: number[] = [];
    for (let i = 1; i < array.length; i++) {
      result.push(array[i] - array[i - 1]);
    }
    return result;
  }
  
  /**
   * Count zero crossings in signal
   */
  static countZeroCrossings(signal: number[]): number {
    let crossings = 0;
    for (let i = 1; i < signal.length; i++) {
      if ((signal[i] >= 0 && signal[i - 1] < 0) || 
          (signal[i] < 0 && signal[i - 1] >= 0)) {
        crossings++;
      }
    }
    return crossings;
  }
  
  /**
   * Simple moving average filter
   */
  static movingAverage(signal: number[], windowSize: number): number[] {
    const result: number[] = [];
    const halfWindow = Math.floor(windowSize / 2);
    
    for (let i = 0; i < signal.length; i++) {
      let sum = 0;
      let count = 0;
      
      const start = Math.max(0, i - halfWindow);
      const end = Math.min(signal.length - 1, i + halfWindow);
      
      for (let j = start; j <= end; j++) {
        sum += signal[j];
        count++;
      }
      
      result.push(sum / count);
    }
    
    return result;
  }
  
  /**
   * Simple FFT approximation for frequency analysis
   * (Simplified version of DFT for basic frequency features)
   */
  static computeFrequencyFeatures(signal: number[], sampleRate: number): {
    dominantFreq: number;
    spectralCentroid: number;
    powerSpectrum: number[];
  } {
    const N = signal.length;
    const powerSpectrum: number[] = [];
    const frequencies: number[] = [];
    
    // Simplified frequency analysis using basic trigonometric approach
    // This is a simplified version - for production consider using a proper FFT library
    const maxFreq = sampleRate / 2;
    const freqStep = maxFreq / (N / 2);
    
    for (let k = 0; k < N / 2; k++) {
      const freq = k * freqStep;
      frequencies.push(freq);
      
      let real = 0, imag = 0;
      for (let n = 0; n < N; n++) {
        const angle = -2 * Math.PI * k * n / N;
        real += signal[n] * Math.cos(angle);
        imag += signal[n] * Math.sin(angle);
      }
      
      const magnitude = Math.sqrt(real * real + imag * imag);
      powerSpectrum.push(magnitude * magnitude);
    }
    
    // Find dominant frequency
    let maxPowerIndex = 0;
    for (let i = 1; i < powerSpectrum.length; i++) {
      if (powerSpectrum[i] > powerSpectrum[maxPowerIndex]) {
        maxPowerIndex = i;
      }
    }
    const dominantFreq = frequencies[maxPowerIndex];
    
    // Calculate spectral centroid
    let weightedSum = 0;
    let totalPower = 0;
    for (let i = 0; i < frequencies.length; i++) {
      weightedSum += frequencies[i] * powerSpectrum[i];
      totalPower += powerSpectrum[i];
    }
    const spectralCentroid = totalPower > 0 ? weightedSum / totalPower : 0;
    
    return {
      dominantFreq,
      spectralCentroid,
      powerSpectrum
    };
  }
  
  /**
   * Remove array elements that are outliers
   */
  static removeOutliers(array: number[], medianFactor: number = 0.5): number[] {
    if (array.length === 0) return [];
    
    const median = this.median(array);
    return array.filter(val => Math.abs(val - median) < medianFactor * median);
  }
  
  /**
   * Clamp value between min and max
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}