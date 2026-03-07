import { useState, useCallback } from 'react';
import type { UploadFile } from 'antd';

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
      const formData = new FormData();
      formData.append('file', file as any);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/classify-ecg`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 1000);

    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      setIsAnalyzing(false);
      setProgress(0);
    }
  }, [simulateProgress]);

  const analyzeDemoFile = useCallback(async (demoId: string) => {
    setIsAnalyzing(true);
    setError(null);
    setProgress(0);

    const progressInterval = simulateProgress();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/analyze-demo/${demoId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 1000);

    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = err instanceof Error ? err.message : 'Demo analysis failed';
      setError(errorMessage);
      setIsAnalyzing(false);
      setProgress(0);
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