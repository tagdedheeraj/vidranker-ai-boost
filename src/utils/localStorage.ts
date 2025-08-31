import { SEOContent } from '../services/cohereApiService';
import { GeneratedThumbnail } from '../services/imageGenerationService';

const STORAGE_KEYS = {
  SEO_HISTORY: 'vidranker_seo_history',
  THUMBNAIL_HISTORY: 'vidranker_thumbnail_history',
  APP_SETTINGS: 'vidranker_settings'
} as const;

export interface AppSettings {
  adsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  version: string;
}

export class LocalStorageService {
  
  // SEO Content History
  getSEOHistory(): SEOContent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEO_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load SEO history:', error);
      return [];
    }
  }

  saveSEOContent(content: SEOContent): void {
    try {
      const history = this.getSEOHistory();
      history.unshift(content); // Add to beginning
      
      // Keep only last 50 items
      const trimmed = history.slice(0, 50);
      
      localStorage.setItem(STORAGE_KEYS.SEO_HISTORY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save SEO content:', error);
    }
  }

  deleteSEOContent(timestamp: string): void {
    try {
      const history = this.getSEOHistory();
      const filtered = history.filter(item => item.timestamp !== timestamp);
      localStorage.setItem(STORAGE_KEYS.SEO_HISTORY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete SEO content:', error);
    }
  }

  clearSEOHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SEO_HISTORY);
    } catch (error) {
      console.error('Failed to clear SEO history:', error);
    }
  }

  // Thumbnail History
  getThumbnailHistory(): GeneratedThumbnail[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.THUMBNAIL_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load thumbnail history:', error);
      return [];
    }
  }

  saveThumbnail(thumbnail: GeneratedThumbnail): void {
    try {
      const history = this.getThumbnailHistory();
      history.unshift(thumbnail);
      
      // Keep only last 30 items
      const trimmed = history.slice(0, 30);
      
      localStorage.setItem(STORAGE_KEYS.THUMBNAIL_HISTORY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save thumbnail:', error);
    }
  }

  deleteThumbnail(id: string): void {
    try {
      const history = this.getThumbnailHistory();
      const filtered = history.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.THUMBNAIL_HISTORY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete thumbnail:', error);
    }
  }

  clearThumbnailHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.THUMBNAIL_HISTORY);
    } catch (error) {
      console.error('Failed to clear thumbnail history:', error);
    }
  }

  // App Settings
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      const defaults: AppSettings = {
        adsEnabled: true,
        theme: 'dark',
        version: '1.0.0'
      };
      
      return data ? { ...defaults, ...JSON.parse(data) } : defaults;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {
        adsEnabled: true,
        theme: 'dark',
        version: '1.0.0'
      };
    }
  }

  saveSettings(settings: Partial<AppSettings>): void {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  // Clear all data
  clearAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear all data:', error);
    }
  }

  // Get storage usage info
  getStorageInfo() {
    try {
      const seoCount = this.getSEOHistory().length;
      const thumbnailCount = this.getThumbnailHistory().length;
      
      let totalSize = 0;
      Object.values(STORAGE_KEYS).forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          totalSize += new Blob([data]).size;
        }
      });

      return {
        seoCount,
        thumbnailCount,
        totalSize: Math.round(totalSize / 1024) // KB
      };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return {
        seoCount: 0,
        thumbnailCount: 0,
        totalSize: 0
      };
    }
  }
}

export const localStorage = new LocalStorageService();
