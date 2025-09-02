
import { FacebookAds } from '@capacitor/facebook-ads';

class MetaAudienceNetworkService {
  private isInitialized = false;
  
  async initialize() {
    try {
      console.log('Initializing Meta Audience Network...');
      
      await FacebookAds.initialize({
        testMode: true,
        testDeviceIds: ['YOUR_TEST_DEVICE_ID'],
        logLevel: 'verbose'
      });
      
      this.isInitialized = true;
      console.log('Meta Audience Network initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Meta Audience Network:', error);
    }
  }

  async showBannerAd(placementId: string) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      console.log('Showing banner ad with placement ID:', placementId);
      
      await FacebookAds.showBannerAd({
        placementId: placementId,
        size: 'BANNER_320_50',
        position: 'BOTTOM_CENTER'
      });
      
      console.log('Banner ad displayed successfully');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  async showInterstitialAd(placementId: string) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      console.log('Loading interstitial ad with placement ID:', placementId);
      
      await FacebookAds.loadInterstitialAd({
        placementId: placementId
      });
      
      await FacebookAds.showInterstitialAd();
      console.log('Interstitial ad displayed successfully');
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  }

  async loadTestAd() {
    try {
      console.log('Loading test ad...');
      
      // Using Facebook's test placement ID
      const testPlacementId = 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID';
      
      await this.showBannerAd(testPlacementId);
      console.log('Test ad loaded successfully');
      
      return true;
    } catch (error) {
      console.error('Failed to load test ad:', error);
      return false;
    }
  }

  async hideBannerAd() {
    try {
      await FacebookAds.hideBannerAd();
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }
}

export const metaAudienceNetwork = new MetaAudienceNetworkService();
