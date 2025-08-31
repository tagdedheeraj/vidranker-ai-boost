export interface MetaAudienceNetworkConfig {
  appId: string;
  bannerPlacementId: string;
  interstitialPlacementId: string;
}

export interface AdStatus {
  isInitialized: boolean;
  bannerLoaded: boolean;
  interstitialLoaded: boolean;
  isNative: boolean;
}

declare global {
  interface Window {
    Capacitor?: any;
  }
}

export class MetaAudienceNetworkService {
  private config: MetaAudienceNetworkConfig = {
    appId: '1160387479246621',
    bannerPlacementId: '1160387479246621_1164434622175240',
    interstitialPlacementId: '1160387479246621_1161152762503426'
  };

  private status: AdStatus = {
    isInitialized: false,
    bannerLoaded: false,
    interstitialLoaded: false,
    isNative: false
  };

  private listeners: ((status: AdStatus) => void)[] = [];

  constructor() {
    this.detectPlatform();
  }

  private detectPlatform() {
    // Check if running in Capacitor (native app)
    this.status.isNative = window.Capacitor !== undefined;
    console.log('Platform detected:', this.status.isNative ? 'Native' : 'Web');
  }

  async initialize(): Promise<boolean> {
    if (!this.status.isNative) {
      console.log('Meta Audience Network: Running in web mode, ads disabled');
      this.status.isInitialized = true;
      this.notifyListeners();
      return true;
    }

    try {
      // In a real implementation, this would initialize the native Meta Audience Network SDK
      console.log('Initializing Meta Audience Network with App ID:', this.config.appId);
      
      // Simulate initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.status.isInitialized = true;
      this.notifyListeners();
      
      // Auto-load banner ad
      await this.loadBannerAd();
      
      console.log('Meta Audience Network initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Meta Audience Network:', error);
      return false;
    }
  }

  async loadBannerAd(): Promise<boolean> {
    if (!this.status.isInitialized) {
      console.log('Meta Audience Network not initialized');
      return false;
    }

    try {
      console.log('Loading banner ad:', this.config.bannerPlacementId);
      
      // Simulate banner ad loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.status.bannerLoaded = true;
      this.notifyListeners();
      
      console.log('Banner ad loaded successfully');
      return true;
    } catch (error) {
      console.error('Failed to load banner ad:', error);
      return false;
    }
  }

  async loadInterstitialAd(): Promise<boolean> {
    if (!this.status.isInitialized) {
      console.log('Meta Audience Network not initialized');
      return false;
    }

    try {
      console.log('Loading interstitial ad:', this.config.interstitialPlacementId);
      
      // Simulate interstitial ad loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.status.interstitialLoaded = true;
      this.notifyListeners();
      
      console.log('Interstitial ad loaded successfully');
      return true;
    } catch (error) {
      console.error('Failed to load interstitial ad:', error);
      return false;
    }
  }

  async showInterstitialAd(): Promise<boolean> {
    if (!this.status.interstitialLoaded) {
      console.log('Interstitial ad not loaded');
      return false;
    }

    try {
      console.log('Showing interstitial ad');
      
      // Simulate showing interstitial ad
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.status.interstitialLoaded = false;
      this.notifyListeners();
      
      console.log('Interstitial ad shown and closed');
      return true;
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
      return false;
    }
  }

  showBannerAd(): void {
    if (!this.status.bannerLoaded) {
      console.log('Banner ad not loaded');
      return;
    }
    
    console.log('Showing banner ad');
    // In native implementation, this would show the banner ad
  }

  hideBannerAd(): void {
    console.log('Hiding banner ad');
    // In native implementation, this would hide the banner ad
  }

  getStatus(): AdStatus {
    return { ...this.status };
  }

  onStatusChange(callback: (status: AdStatus) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getStatus()));
  }

  // Test methods for Settings page
  async testBannerAd(): Promise<void> {
    console.log('Testing banner ad...');
    await this.loadBannerAd();
    this.showBannerAd();
  }

  async testInterstitialAd(): Promise<void> {
    console.log('Testing interstitial ad...');
    await this.loadInterstitialAd();
    await this.showInterstitialAd();
  }
}

export const metaAudienceNetwork = new MetaAudienceNetworkService();
