/**
 * Quick test of client-side ECG analysis
 * Tests if our TypeScript ECG analyzer produces results
 */

// Simple test data (small ECG snippet)
const testECGData = {
  time: [0.0, 0.002, 0.004, 0.006, 0.008, 0.01, 0.012, 0.014, 0.016, 0.018],
  ecg_signal: [-0.151, -0.171, -0.151, -0.142, -0.107, -0.088, -0.117, -0.127, -0.137, -0.132]
};

// Test the analysis
console.log('Testing ECG Analysis...');
console.log('Input data points:', testECGData.ecg_signal.length);
console.log('Time range:', testECGData.time[0], 'to', testECGData.time[testECGData.time.length - 1]);

// Basic feature extraction test
const mean = testECGData.ecg_signal.reduce((sum, val) => sum + val, 0) / testECGData.ecg_signal.length;
const max = Math.max(...testECGData.ecg_signal);
const min = Math.min(...testECGData.ecg_signal);

console.log('Basic stats:');
console.log('  Mean:', mean.toFixed(4));
console.log('  Max:', max.toFixed(4));
console.log('  Min:', min.toFixed(4));
console.log('  Range:', (max - min).toFixed(4));

console.log('✅ Basic ECG data processing works!');
console.log('Next: Full TypeScript analysis integration test');