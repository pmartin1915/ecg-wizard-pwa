/**
 * Desktop-specific file operations using Tauri APIs
 * Enables ECG file import/export and analysis result saving
 */

import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { ECGAnalysisResult } from '../utils/ecg-analysis';

export interface FileOperationResult {
  success: boolean;
  data?: string;
  filePath?: string;
  error?: string;
}

export class DesktopFileOperations {
  
  /**
   * Open ECG file dialog and read CSV content
   */
  static async openECGFile(): Promise<FileOperationResult> {
    try {
      const filePath = await open({
        multiple: false,
        filters: [
          {
            name: 'ECG Data',
            extensions: ['csv', 'txt']
          },
          {
            name: 'All Files',
            extensions: ['*']
          }
        ],
        title: 'Select ECG Data File'
      });
      
      if (!filePath) {
        return {
          success: false,
          error: 'No file selected'
        };
      }
      
      const content = await readTextFile(filePath as string);
      
      return {
        success: true,
        data: content,
        filePath: filePath as string
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to open file';
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Open multiple ECG files for batch processing
   */
  static async openMultipleECGFiles(): Promise<FileOperationResult[]> {
    try {
      const filePaths = await open({
        multiple: true,
        filters: [
          {
            name: 'ECG Data',
            extensions: ['csv', 'txt']
          }
        ],
        title: 'Select ECG Data Files'
      });
      
      if (!filePaths || filePaths.length === 0) {
        return [{
          success: false,
          error: 'No files selected'
        }];
      }
      
      const results: FileOperationResult[] = [];
      
      for (const filePath of filePaths as string[]) {
        try {
          const content = await readTextFile(filePath);
          results.push({
            success: true,
            data: content,
            filePath
          });
        } catch (error) {
          results.push({
            success: false,
            error: `Failed to read ${filePath}: ${error}`,
            filePath
          });
        }
      }
      
      return results;
      
    } catch (error) {
      return [{
        success: false,
        error: error instanceof Error ? error.message : 'Failed to open files'
      }];
    }
  }
  
  /**
   * Save analysis results as JSON
   */
  static async saveAnalysisResults(results: ECGAnalysisResult[], defaultName?: string): Promise<FileOperationResult> {
    try {
      const filePath = await save({
        filters: [
          {
            name: 'JSON',
            extensions: ['json']
          }
        ],
        title: 'Save Analysis Results',
        defaultPath: defaultName || 'ecg_analysis_results.json'
      });
      
      if (!filePath) {
        return {
          success: false,
          error: 'Save cancelled'
        };
      }
      
      const jsonData = JSON.stringify({
        timestamp: new Date().toISOString(),
        analysisCount: results.length,
        results: results,
        disclaimer: 'FOR EDUCATIONAL PURPOSES ONLY - NOT FOR CLINICAL USE',
        generator: 'ECG Wizard Desktop Application'
      }, null, 2);
      
      await writeTextFile(filePath as string, jsonData);
      
      return {
        success: true,
        filePath: filePath as string
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save results'
      };
    }
  }
  
  /**
   * Save analysis results as CSV report
   */
  static async saveAnalysisReportCSV(results: ECGAnalysisResult[], defaultName?: string): Promise<FileOperationResult> {
    try {
      const filePath = await save({
        filters: [
          {
            name: 'CSV',
            extensions: ['csv']
          }
        ],
        title: 'Save Analysis Report',
        defaultPath: defaultName || 'ecg_analysis_report.csv'
      });
      
      if (!filePath) {
        return {
          success: false,
          error: 'Save cancelled'
        };
      }
      
      // Create CSV content
      const headers = [
        'Timestamp',
        'Diagnosis',
        'Confidence',
        'Heart Rate',
        'Rhythm Regularity',
        'Signal Quality',
        'Success',
        'Error'
      ];
      
      const csvRows = [headers.join(',')];
      
      results.forEach((result, index) => {
        const row = [
          new Date().toISOString(),
          `"${result.diagnosis}"`,
          result.confidence.toString(),
          result.features.estimated_heart_rate?.toString() || '',
          result.features.rhythm_regularity?.toString() || '',
          result.features.signal_to_noise_ratio?.toString() || '',
          result.success.toString(),
          result.error ? `"${result.error}"` : ''
        ];
        csvRows.push(row.join(','));
      });
      
      // Add disclaimer footer
      csvRows.push('');
      csvRows.push('"EDUCATIONAL DISCLAIMER: FOR LEARNING PURPOSES ONLY"');
      csvRows.push('"NOT FOR CLINICAL DECISION MAKING"');
      
      const csvContent = csvRows.join('\n');
      
      await writeTextFile(filePath as string, csvContent);
      
      return {
        success: true,
        filePath: filePath as string
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save CSV report'
      };
    }
  }
  
  /**
   * Export ECG data with analysis annotations
   */
  static async exportAnnotatedECG(
    originalData: { time: number[]; ecg_signal: number[] },
    analysis: ECGAnalysisResult,
    defaultName?: string
  ): Promise<FileOperationResult> {
    try {
      const filePath = await save({
        filters: [
          {
            name: 'CSV',
            extensions: ['csv']
          }
        ],
        title: 'Export Annotated ECG',
        defaultPath: defaultName || 'annotated_ecg_data.csv'
      });
      
      if (!filePath) {
        return {
          success: false,
          error: 'Export cancelled'
        };
      }
      
      // Create annotated CSV content
      const lines = [
        '# ECG Wizard - Annotated ECG Data',
        '# FOR EDUCATIONAL PURPOSES ONLY',
        '# Generated: ' + new Date().toISOString(),
        '# Diagnosis: ' + analysis.diagnosis,
        '# Confidence: ' + analysis.confidence + '%',
        '# Heart Rate: ' + analysis.features.estimated_heart_rate + ' BPM',
        '#',
        'time,ecg_signal'
      ];
      
      // Add data points
      for (let i = 0; i < originalData.time.length; i++) {
        lines.push(`${originalData.time[i]},${originalData.ecg_signal[i]}`);
      }
      
      const content = lines.join('\n');
      await writeTextFile(filePath as string, content);
      
      return {
        success: true,
        filePath: filePath as string
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to export annotated ECG'
      };
    }
  }
  
  /**
   * Check if running in desktop environment
   */
  static isDesktopEnvironment(): boolean {
    return typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;
  }
  
  /**
   * Get file information
   */
  static getFileInfo(filePath: string): { name: string; extension: string } {
    const parts = filePath.split(/[\\/]/);
    const fileName = parts[parts.length - 1];
    const dotIndex = fileName.lastIndexOf('.');
    
    return {
      name: dotIndex > 0 ? fileName.substring(0, dotIndex) : fileName,
      extension: dotIndex > 0 ? fileName.substring(dotIndex + 1) : ''
    };
  }
}