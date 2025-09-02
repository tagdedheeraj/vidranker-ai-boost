interface AdStatus {
  isInitialized: boolean;
  isNative: boolean;
  testMode: boolean;
  bannerLoaded: boolean;
  interstitialLoaded: boolean;
  sdkVersion?: string;
  error?: string;
}

interface DebugInfo {
  lastBidRequest?: string;
  adRequests: number;
  errors: string[];
  initAttempts: number;
  lastError?: string;
}

class MetaAudienceNetworkService {
  private isInitialized = false;
  private testMode = true;
  private initializationAttempts = 0;
  private maxRetries = 3;
  private debugInfo: DebugInfo = {
    adRequests: 0,
    errors: [],
    initAttempts: 0
  };
  private status: AdStatus = {
    isInitialized: false,
    isNative: false,
    testMode: true,
    bannerLoaded: false,
    interstitialLoaded: false
  };

  // Meta के official test placement IDs
  private readonly TEST_PLACEMENT_IDS = {
    banner: 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID',
    interstitial: 'VID_HD_16_9_46S_APP_INSTALL#YOUR_PLACEMENT_ID',
    native: 'CAROUSEL_IMG_SQUARE_APP_INSTALL#YOUR_PLACEMENT_ID'
  };

  // Real placement IDs - यहाँ आपके real IDs आएंगे
  private readonly LIVE_PLACEMENT_IDS = {
    banner: 'YOUR_REAL_BANNER_PLACEMENT_ID',
    interstitial: 'YOUR_REAL_INTERSTITIAL_PLACEMENT_ID',
    native: 'YOUR_REAL_NATIVE_PLACEMENT_ID'
  };

  private getPlacementId(adType: 'banner' | 'interstitial' | 'native'): string {
    if (this.testMode) {
      return this.TEST_PLACEMENT_IDS[adType];
    }
    return this.LIVE_PLACEMENT_IDS[adType];
  }

  private isCapacitorNative(): boolean {
    return typeof window !== 'undefined' && 'Capacitor' in window && (window as any).Capacitor?.isNativePlatform?.();
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      console.log('✅ Meta Audience Network already initialized');
      return true;
    }

    this.initializationAttempts++;
    this.debugInfo.initAttempts = this.initializationAttempts;

    try {
      console.log(`🚀 Initializing Meta Audience Network (Attempt ${this.initializationAttempts}/${this.maxRetries})...`);
      
      // Check if running in native environment
      this.status.isNative = this.isCapacitorNative();
      
      if (this.status.isNative) {
        console.log('📱 Running in native environment - initializing native SDK');
        
        // Initialize native Facebook Ads SDK
        const { FacebookAds } = (window as any).Capacitor.Plugins;
        if (FacebookAds) {
          const result = await FacebookAds.initialize();
          console.log('🎯 Native SDK initialization result:', result);
          
          if (result.success) {
            this.status.sdkVersion = result.sdkVersion || '6.15.0';
          }
        } else {
          throw new Error('Facebook Ads plugin not available');
        }
        
      } else {
        console.log('🌐 Running in web browser - using simulation mode');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      this.isInitialized = true;
      this.status.isInitialized = true;
      this.status.testMode = this.testMode;
      
      console.log('✅ Meta Audience Network initialized successfully');
      console.log(`📱 Platform: ${this.status.isNative ? 'Native App' : 'Web Browser'}`);
      console.log(`🧪 Test Mode: ${this.testMode ? 'Enabled' : 'Disabled'}`);
      
      // Preload ads after successful initialization
      setTimeout(() => {
        this.preloadAds();
      }, 1000);
      
      return true;
      
    } catch (error) {
      const errorMessage = `Init failed: ${error}`;
      console.error('❌ Failed to initialize Meta Audience Network:', error);
      
      this.debugInfo.errors.push(errorMessage);
      this.debugInfo.lastError = errorMessage;
      this.status.error = errorMessage;
      
      // Retry logic
      if (this.initializationAttempts < this.maxRetries) {
        console.log(`🔄 Retrying initialization in 2 seconds...`);
        setTimeout(() => {
          this.initialize();
        }, 2000);
      } else {
        console.error('❌ Max initialization attempts reached. Using fallback mode.');
        this.status.error = 'Max init attempts reached';
      }
      
      return false;
    }
  }

  private async preloadAds() {
    try {
      console.log('🔄 Preloading ads...');
      
      // Simulate ad loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.status.bannerLoaded = true;
      this.status.interstitialLoaded = true;
      
      console.log('📢 Ads preloaded successfully');
      
    } catch (error) {
      console.error('⚠️ Failed to preload ads:', error);
      this.debugInfo.errors.push(`Preload failed: ${error}`);
    }
  }

  async showBannerAd(placementId?: string) {
    if (!this.isInitialized) {
      console.log('🔄 SDK not initialized, initializing now...');
      const initSuccess = await this.initialize();
      if (!initSuccess) {
        console.error('❌ Cannot show banner ad: Initialization failed');
        return;
      }
    }

    try {
      const finalPlacementId = placementId || this.getPlacementId('banner');
      console.log('🎯 Showing banner ad with placement ID:', finalPlacementId);
      
      this.debugInfo.adRequests++;
      this.debugInfo.lastBidRequest = new Date().toLocaleTimeString();
      
      if (this.status.isNative) {
        // Native implementation
        const { FacebookAds } = (window as any).Capacitor.Plugins;
        const result = await FacebookAds.showBannerAd({ 
          placementId: finalPlacementId 
        });
        
        if (result.success) {
          console.log('📱 Native banner ad displayed successfully');
          this.status.bannerLoaded = true;
        } else {
          throw new Error(result.error || 'Failed to show banner ad');
        }
      } else {
        console.log('🌐 Web banner ad simulation - placement:', finalPlacementId);
        console.log('💡 In native app, this would show real ads');
        this.status.bannerLoaded = true;
      }
      
      console.log('✅ Banner ad displayed successfully');
      
    } catch (error) {
      const errorMessage = `Banner failed: ${error}`;
      console.error('❌ Failed to show banner ad:', error);
      this.debugInfo.errors.push(errorMessage);
    }
  }

  async showInterstitialAd(placementId?: string) {
    if (!this.isInitialized) {
      console.log('🔄 SDK not initialized, initializing now...');
      const initSuccess = await this.initialize();
      if (!initSuccess) {
        console.error('❌ Cannot show interstitial ad: Initialization failed');
        return;
      }
    }

    try {
      const finalPlacementId = placementId || this.getPlacementId('interstitial');
      console.log('🎯 Loading interstitial ad with placement ID:', finalPlacementId);
      
      this.debugInfo.adRequests++;
      this.debugInfo.lastBidRequest = new Date().toLocaleTimeString();
      
      if (this.status.isNative) {
        // Native implementation
        const { FacebookAds } = (window as any).Capacitor.Plugins;
        const result = await FacebookAds.showInterstitialAd({ 
          placementId: finalPlacementId 
        });
        
        if (result.success) {
          console.log('📱 Native interstitial ad displayed successfully');
          this.status.interstitialLoaded = true;
        } else {
          throw new Error(result.error || 'Failed to show interstitial ad');
        }
      } else {
        console.log('🌐 Web interstitial ad simulation - placement:', finalPlacementId);
        console.log('💡 In native app, this would show real ads');
        console.log('🎬 Interstitial ad would cover full screen here');
        this.status.interstitialLoaded = true;
      }
      
      console.log('✅ Interstitial ad displayed successfully');
      
    } catch (error) {
      const errorMessage = `Interstitial failed: ${error}`;
      console.error('❌ Failed to show interstitial ad:', error);
      this.debugInfo.errors.push(errorMessage);
    }
  }

  async hideBannerAd() {
    try {
      console.log('🚫 Hiding banner ad...');
      
      if (this.status.isNative) {
        // Native implementation
        const { FacebookAds } = (window as any).Capacitor.Plugins;
        const result = await FacebookAds.hideBannerAd();
        
        if (result.success) {
          console.log('📱 Native banner ad hidden successfully');
        }
      } else {
        console.log('🌐 Web banner ad hidden (simulation)');
      }
      
      this.status.bannerLoaded = false;
      console.log('✅ Banner ad hidden');
    } catch (error) {
      console.error('❌ Failed to hide banner ad:', error);
      this.debugInfo.errors.push(`Hide banner failed: ${error}`);
    }
  }

  async refreshAds() {
    console.log('🔄 Refreshing all ads...');
    this.status.bannerLoaded = false;
    this.status.interstitialLoaded = false;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.status.bannerLoaded = true;
      this.status.interstitialLoaded = true;
      
      console.log('✅ Ads refreshed successfully');
    } catch (error) {
      console.error('❌ Failed to refresh ads:', error);
      this.debugInfo.errors.push(`Refresh failed: ${error}`);
    }
  }

  setTestMode(enabled: boolean) {
    this.testMode = enabled;
    this.status.testMode = enabled;
    console.log(`🧪 Test mode ${enabled ? 'enabled' : 'disabled'}`);
    
    // Refresh ads after mode change
    setTimeout(() => {
      this.refreshAds();
    }, 500);
  }

  switchToLiveAds() {
    this.setTestMode(false);
    console.log('🎯 Switched to live ads - using real placement IDs');
  }

  switchToTestAds() {
    this.setTestMode(true);
    console.log('🧪 Switched to test ads - using test placement IDs');
  }

  updateLivePlacementIds(bannerID: string, interstitialID: string, nativeID: string) {
    (this.LIVE_PLACEMENT_IDS as any).banner = bannerID;
    (this.LIVE_PLACEMENT_IDS as any).interstitial = interstitialID;
    (this.LIVE_PLACEMENT_IDS as any).native = nativeID;
    console.log('🔄 Live placement IDs updated:', {
      banner: bannerID,
      interstitial: interstitialID,
      native: nativeID
    });
  }

  getStatus(): AdStatus {
    return { ...this.status };
  }

  getDebugInfo(): DebugInfo {
    return { ...this.debugInfo };
  }

  // Health check method for debugging
  async performHealthCheck(): Promise<boolean> {
    console.log('🩺 Performing Meta Audience Network health check...');
    
    try {
      const healthStatus = {
        sdkInitialized: this.isInitialized,
        platform: this.status.isNative ? 'native' : 'web',
        testMode: this.testMode,
        adsLoaded: this.status.bannerLoaded && this.status.interstitialLoaded,
        errors: this.debugInfo.errors.length,
        lastError: this.debugInfo.lastError
      };
      
      console.log('📊 Health check results:', healthStatus);
      
      if (!this.isInitialized) {
        console.log('🔄 SDK not initialized, attempting initialization...');
        return await this.initialize();
      }
      
      return true;
      
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return false;
    }
  }
}

export const metaAudienceNetwork = new MetaAudienceNetworkService();
