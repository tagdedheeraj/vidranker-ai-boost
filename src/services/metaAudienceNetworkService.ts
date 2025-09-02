
export interface MetaAudienceNetworkConfig {
  appId: string;
  bannerPlacementId: string;
  interstitialPlacementId: string;
  testMode: boolean;
}

export interface AdStatus {
  isInitialized: boolean;
  bannerLoaded: boolean;
  interstitialLoaded: boolean;
  isNative: boolean;
  testMode: boolean;
  lastBidRequest: Date | null;
}

declare global {
  interface Window {
    Capacitor?: any;
    FacebookAds?: any;
  }
}

export class MetaAudienceNetworkService {
  private config: MetaAudienceNetworkConfig = {
    appId: '1160387479246621',
    bannerPlacementId: '1160387479246621_1164434622175240',
    interstitialPlacementId: '1160387479246621_1161152762503426',
    testMode: true // Enable test mode initially
  };

  private status: AdStatus = {
    isInitialized: false,
    bannerLoaded: false,
    interstitialLoaded: false,
    isNative: false,
    testMode: true,
    lastBidRequest: null
  };

  private listeners: ((status: AdStatus) => void)[] = [];
  private FacebookAds: any = null;

  constructor() {
    this.detectPlatform();
  }

  private detectPlatform() {
    this.status.isNative = window.Capacitor !== undefined;
    console.log('Platform detected:', this.status.isNative ? 'Native (Capacitor)' : 'Web Browser');
    
    if (this.status.isNative && window.FacebookAds) {
      this.FacebookAds = window.FacebookAds;
      console.log('Meta Audience Network SDK available');
    }
  }

  async initialize(): Promise<boolean> {
    console.log('🚀 Initializing Meta Audience Network...');
    console.log('App ID:', this.config.appId);
    console.log('Test Mode:', this.config.testMode);

    if (!this.status.isNative) {
      console.log('⚠️ Running in web browser - showing simulated ads for testing');
      this.status.isInitialized = true;
      this.status.testMode = true;
      this.notifyListeners();
      return true;
    }

    try {
      if (!this.FacebookAds) {
        console.error('❌ Meta Audience Network SDK not found');
        return false;
      }

      // Initialize Facebook Ads SDK
      await this.FacebookAds.initialize({
        appId: this.config.appId,
        testMode: this.config.testMode,
        testDeviceId: 'YOUR_TEST_DEVICE_ID' // Add your test device ID here
      });

      this.status.isInitialized = true;
      this.status.testMode = this.config.testMode;
      this.notifyListeners();
      
      console.log('✅ Meta Audience Network initialized successfully');
      
      // Load test ads automatically
      await this.loadBannerAd();
      await this.loadInterstitialAd();
      
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Meta Audience Network:', error);
      return false;
    }
  }

  async loadBannerAd(): Promise<boolean> {
    console.log('📱 Loading banner ad...');
    console.log('Placement ID:', this.config.bannerPlacementId);
    
    if (!this.status.isInitialized) {
      console.log('⚠️ SDK not initialized');
      return false;
    }

    try {
      this.status.lastBidRequest = new Date();
      
      if (this.status.isNative && this.FacebookAds) {
        // Load real banner ad using Capacitor plugin
        await this.FacebookAds.loadBannerAd({
          placementId: this.config.bannerPlacementId,
          size: 'BANNER_320_50'
        });
      } else {
        // Simulate banner loading for web testing
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      this.status.bannerLoaded = true;
      this.notifyListeners();
      
      console.log('✅ Banner ad loaded successfully');
      console.log('📊 Bid request sent at:', this.status.lastBidRequest.toLocaleTimeString());
      return true;
    } catch (error) {
      console.error('❌ Failed to load banner ad:', error);
      return false;
    }
  }

  async loadInterstitialAd(): Promise<boolean> {
    console.log('🎯 Loading interstitial ad...');
    console.log('Placement ID:', this.config.interstitialPlacementId);
    
    if (!this.status.isInitialized) {
      console.log('⚠️ SDK not initialized');
      return false;
    }

    try {
      this.status.lastBidRequest = new Date();
      
      if (this.status.isNative && this.FacebookAds) {
        // Load real interstitial ad using Capacitor plugin
        await this.FacebookAds.loadInterstitialAd({
          placementId: this.config.interstitialPlacementId
        });
      } else {
        // Simulate interstitial loading for web testing
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      this.status.interstitialLoaded = true;
      this.notifyListeners();
      
      console.log('✅ Interstitial ad loaded successfully');
      console.log('📊 Bid request sent at:', this.status.lastBidRequest.toLocaleTimeString());
      return true;
    } catch (error) {
      console.error('❌ Failed to load interstitial ad:', error);
      return false;
    }
  }

  async showInterstitialAd(): Promise<boolean> {
    if (!this.status.interstitialLoaded) {
      console.log('⚠️ Interstitial ad not loaded - loading now...');
      const loaded = await this.loadInterstitialAd();
      if (!loaded) return false;
    }

    try {
      console.log('🎬 Showing interstitial ad...');
      
      if (this.status.isNative && this.FacebookAds) {
        await this.FacebookAds.showInterstitialAd();
      } else {
        // Simulate showing ad for web testing
        console.log('🎭 [SIMULATION] Interstitial ad would show here');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      this.status.interstitialLoaded = false;
      this.notifyListeners();
      
      console.log('✅ Interstitial ad completed');
      
      // Preload next interstitial
      setTimeout(() => this.loadInterstitialAd(), 1000);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to show interstitial ad:', error);
      return false;
    }
  }

  showBannerAd(): void {
    if (!this.status.bannerLoaded) {
      console.log('⚠️ Banner ad not loaded');
      this.loadBannerAd();
      return;
    }
    
    console.log('📱 Showing banner ad...');
    
    if (this.status.isNative && this.FacebookAds) {
      this.FacebookAds.showBannerAd();
    } else {
      console.log('🎭 [SIMULATION] Banner ad would show at bottom of screen');
    }
  }

  hideBannerAd(): void {
    console.log('🙈 Hiding banner ad...');
    
    if (this.status.isNative && this.FacebookAds) {
      this.FacebookAds.hideBannerAd();
    } else {
      console.log('🎭 [SIMULATION] Banner ad would hide from screen');
    }
  }

  // Switch between test and live ads
  setTestMode(enabled: boolean): void {
    this.config.testMode = enabled;
    this.status.testMode = enabled;
    console.log('🔄 Test mode:', enabled ? 'ENABLED' : 'DISABLED');
    this.notifyListeners();
  }

  // Force refresh ads (useful for testing)
  async refreshAds(): Promise<void> {
    console.log('🔄 Refreshing all ads...');
    this.status.bannerLoaded = false;
    this.status.interstitialLoaded = false;
    this.notifyListeners();
    
    await Promise.all([
      this.loadBannerAd(),
      this.loadInterstitialAd()
    ]);
  }

  getStatus(): AdStatus {
    return { ...this.status };
  }

  onStatusChange(callback: (status: AdStatus) => void): () => void {
    this.listeners.push(callback);
    
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

  // Enhanced test methods
  async testBannerAd(): Promise<void> {
    console.log('🧪 Testing banner ad...');
    this.setTestMode(true);
    await this.loadBannerAd();
    this.showBannerAd();
  }

  async testInterstitialAd(): Promise<void> {
    console.log('🧪 Testing interstitial ad...');
    this.setTestMode(true);
    await this.loadInterstitialAd();
    await this.showInterstitialAd();
  }

  // Get debug info
  getDebugInfo(): any {
    return {
      config: this.config,
      status: this.status,
      platform: this.status.isNative ? 'Native' : 'Web',
      sdkAvailable: !!this.FacebookAds,
      lastBidRequest: this.status.lastBidRequest?.toLocaleString()
    };
  }
}

export const metaAudienceNetwork = new MetaAudienceNetworkService();
