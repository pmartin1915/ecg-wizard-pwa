/**
 * Desktop notification system using Tauri
 * Provides user feedback for analysis completion and system status
 */

import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

export class DesktopNotifications {
  
  private static permissionGranted: boolean | null = null;
  
  /**
   * Initialize notifications and request permissions
   */
  static async initialize(): Promise<boolean> {
    try {
      // Check if permission is already granted
      this.permissionGranted = await isPermissionGranted();
      
      if (!this.permissionGranted) {
        // Request permission
        const permission = await requestPermission();
        this.permissionGranted = permission === 'granted';
      }
      
      return this.permissionGranted;
      
    } catch (error) {
      console.warn('Failed to initialize notifications:', error);
      return false;
    }
  }
  
  /**
   * Send analysis completion notification
   */
  static async notifyAnalysisComplete(
    diagnosis: string, 
    confidence: number, 
    heartRate: number
  ): Promise<void> {
    if (!await this.ensurePermission()) return;
    
    try {
      await sendNotification({
        title: '📊 ECG Analysis Complete',
        body: `Diagnosis: ${diagnosis}\nConfidence: ${confidence}%\nHeart Rate: ${heartRate} BPM\n\n⚠️ Educational use only`
      });
    } catch (error) {
      console.warn('Failed to send analysis notification:', error);
    }
  }
  
  /**
   * Send batch processing completion notification
   */
  static async notifyBatchComplete(
    totalFiles: number, 
    successfulFiles: number
  ): Promise<void> {
    if (!await this.ensurePermission()) return;
    
    try {
      const failedFiles = totalFiles - successfulFiles;
      const body = failedFiles === 0 
        ? `Successfully analyzed ${successfulFiles} ECG files`
        : `Analyzed ${successfulFiles}/${totalFiles} files\n${failedFiles} files failed`;
      
      await sendNotification({
        title: '📁 Batch Processing Complete',
        body: body + '\n\n⚠️ Educational results only'
      });
    } catch (error) {
      console.warn('Failed to send batch notification:', error);
    }
  }
  
  /**
   * Send error notification
   */
  static async notifyError(
    title: string, 
    error: string
  ): Promise<void> {
    if (!await this.ensurePermission()) return;
    
    try {
      await sendNotification({
        title: `❌ ${title}`,
        body: error
      });
    } catch (notificationError) {
      console.warn('Failed to send error notification:', notificationError);
    }
  }
  
  /**
   * Send file operation notification
   */
  static async notifyFileOperation(
    operation: 'saved' | 'loaded' | 'exported',
    fileName: string,
    success: boolean = true
  ): Promise<void> {
    if (!await this.ensurePermission()) return;
    
    try {
      const emoji = success ? '✅' : '❌';
      const action = success ? operation : `failed to ${operation.replace('ed', '')}`;
      
      await sendNotification({
        title: `${emoji} File ${operation}`,
        body: `${fileName} ${action}`
      });
    } catch (error) {
      console.warn('Failed to send file operation notification:', error);
    }
  }
  
  /**
   * Send system status notification
   */
  static async notifySystemStatus(
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ): Promise<void> {
    if (!await this.ensurePermission()) return;
    
    try {
      const emojis = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
      };
      
      await sendNotification({
        title: `${emojis[type]} ${title}`,
        body: message
      });
    } catch (error) {
      console.warn('Failed to send system status notification:', error);
    }
  }
  
  /**
   * Send welcome notification on first app launch
   */
  static async notifyWelcome(): Promise<void> {
    if (!await this.ensurePermission()) return;
    
    try {
      await sendNotification({
        title: '🎓 Welcome to ECG Wizard',
        body: 'Professional ECG analysis for medical education\n\n⚠️ Educational purposes only - not for clinical use'
      });
    } catch (error) {
      console.warn('Failed to send welcome notification:', error);
    }
  }
  
  /**
   * Send data quality warning notification
   */
  static async notifyDataQuality(
    issues: string[],
    fileName?: string
  ): Promise<void> {
    if (!await this.ensurePermission()) return;
    
    try {
      const fileInfo = fileName ? ` in ${fileName}` : '';
      const issueList = issues.slice(0, 3).join('\n• '); // Limit to 3 issues
      
      await sendNotification({
        title: `⚠️ Data Quality Issues${fileInfo}`,
        body: `• ${issueList}${issues.length > 3 ? '\n• ...and more' : ''}`
      });
    } catch (error) {
      console.warn('Failed to send data quality notification:', error);
    }
  }
  
  /**
   * Ensure notification permission is granted
   */
  private static async ensurePermission(): Promise<boolean> {
    if (this.permissionGranted === null) {
      return await this.initialize();
    }
    return this.permissionGranted;
  }
  
  /**
   * Check if notifications are available
   */
  static isAvailable(): boolean {
    return typeof window !== 'undefined' && 
           (window as any).__TAURI__ !== undefined;
  }
  
  /**
   * Get notification permission status
   */
  static getPermissionStatus(): boolean | null {
    return this.permissionGranted;
  }
}