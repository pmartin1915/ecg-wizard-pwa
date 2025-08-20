/**
 * Desktop utilities for ECG Wizard
 * Tauri-based desktop functionality
 */

export { DesktopFileOperations } from './file-operations';
export { DesktopNotifications } from './notifications';

export type { FileOperationResult, NotificationOptions } from './file-operations';

/**
 * Check if running in desktop environment
 */
export function isDesktop(): boolean {
  return typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;
}

/**
 * Initialize desktop features
 */
export async function initializeDesktop(): Promise<{
  fileOperations: boolean;
  notifications: boolean;
}> {
  const results = {
    fileOperations: false,
    notifications: false
  };
  
  if (!isDesktop()) {
    return results;
  }
  
  try {
    // Initialize file operations (always available in desktop)
    results.fileOperations = true;
    
    // Initialize notifications
    results.notifications = await DesktopNotifications.initialize();
    
    // Send welcome notification if this is the first run
    if (results.notifications) {
      await DesktopNotifications.notifyWelcome();
    }
    
  } catch (error) {
    console.warn('Failed to initialize desktop features:', error);
  }
  
  return results;
}