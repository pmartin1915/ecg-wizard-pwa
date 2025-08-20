import { useState, useCallback } from 'react';
import type { UploadFile } from 'antd';
import { ECGAnalyzer, ECGAnalysisResult as BaseECGResult } from '../utils/ecg-analysis';
import { DesktopNotifications, isDesktop } from '../desktop';

interface ECGAnalysisResult {
  success: boolean;
  diagnosis?: string;
  confidence?: number;
  features?: Record<string, any>;
  error?: string;
  ecgData?: any;
}

export const useECGAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ECGAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const clearResults = useCallback(() => {
    setAnalysisResult(null);
    setError(null);
    setProgress(0);
  }, []);

  const simulateProgress = useCallback(() => {
    const steps = [
      { progress: 15, message: "Reading ECG signal data..." },
      { progress: 30, message: "Preprocessing signal..." },
      { progress: 50, message: "Extracting AI features..." },
      { progress: 70, message: "Running classification..." },
      { progress: 85, message: "Calculating confidence..." },
      { progress: 95, message: "Generating report..." },
      { progress: 100, message: "Analysis complete!" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return interval;
  }, []);

  const analyzeFile = useCallback(async (file: UploadFile) => {
    setIsAnalyzing(true);
    setError(null);
    setProgress(0);

    const progressInterval = simulateProgress();

    try {
      // Read file content as text
      const fileContent = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsText(file as any);
      });

      // Use client-side ECG analyzer
      const result: BaseECGResult = await ECGAnalyzer.analyzeECGFile(fileContent);
      
      setTimeout(async () => {
        clearInterval(progressInterval);
        setProgress(100);
        setAnalysisResult(result);
        setIsAnalyzing(false);

        // Send desktop notification if available
        if (result.success && isDesktop()) {
          await DesktopNotifications.notifyAnalysisComplete(
            result.diagnosis,
            result.confidence,
            result.features.estimated_heart_rate
          );
        }
      }, 1000);

    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      setIsAnalyzing(false);
      setProgress(0);

      // Send error notification if available
      if (isDesktop()) {
        await DesktopNotifications.notifyError('Analysis Failed', errorMessage);
      }
    }
  }, [simulateProgress]);

  const analyzeDemoFile = useCallback(async (demoId: string) => {
    setIsAnalyzing(true);
    setError(null);
    setProgress(0);

    const progressInterval = simulateProgress();

    try {
      // Load demo ECG file from backend/samples directory
      const demoFiles: Record<string, string> = {
        'normal': 'normal_sinus_rhythm.csv',
        'afib': 'atrial_fibrillation.csv',
        'mi': 'myocardial_infarction.csv'
      };

      const fileName = demoFiles[demoId] || 'normal_sinus_rhythm.csv';
      
      // In desktop mode, load from local files
      // In web mode, fetch from backend
      let csvContent: string;
      
      if (isDesktop()) {
        // For desktop, we'll include demo files in the build
        const response = await fetch(`/samples/${fileName}`);
        if (!response.ok) {
          throw new Error('Demo file not found');
        }
        csvContent = await response.text();
      } else {
        // For web mode, fallback to backend API
        const response = await fetch(`http://localhost:8000/api/v1/analyze-demo/${demoId}`, {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setAnalysisResult(result);
        setIsAnalyzing(false);
        clearInterval(progressInterval);
        setProgress(100);
        return;
      }

      // Use client-side ECG analyzer for desktop
      const result: BaseECGResult = await ECGAnalyzer.analyzeECGFile(csvContent);
      
      setTimeout(async () => {
        clearInterval(progressInterval);
        setProgress(100);
        setAnalysisResult(result);
        setIsAnalyzing(false);

        // Send desktop notification if available
        if (result.success && isDesktop()) {
          await DesktopNotifications.notifyAnalysisComplete(
            result.diagnosis,
            result.confidence,
            result.features.estimated_heart_rate
          );
        }
      }, 1000);

    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = err instanceof Error ? err.message : 'Demo analysis failed';
      setError(errorMessage);
      setIsAnalyzing(false);
      setProgress(0);

      // Send error notification if available
      if (isDesktop()) {
        await DesktopNotifications.notifyError('Demo Analysis Failed', errorMessage);
      }
    }
  }, [simulateProgress]);

  return {
    isAnalyzing,
    analysisResult,
    error,
    progress,
    analyzeFile,
    analyzeDemoFile,
    clearResults
  };
};