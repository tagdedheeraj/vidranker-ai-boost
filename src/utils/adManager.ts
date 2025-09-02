
import { metaAudienceNetwork } from '@/services/metaAudienceNetworkService';

class AdManager {
  private lastInterstitialTime = 0;
  private readonly INTERSTITIAL_COOLDOWN = 30000; // 30 seconds cooldown

  async showInterstitialAd(trigger: string = 'button_click') {
    try {
      const now = Date.now();
      
      // Cooldown check to prevent too frequent ads
      if (now - this.lastInterstitialTime < this.INTERSTITIAL_COOLDOWN) {
        console.log('🕒 Interstitial ad skipped - cooldown active');
        return false;
      }

      console.log(`🎯 Showing interstitial ad - trigger: ${trigger}`);
      
      // Meta के official test placement ID
      const testPlacementId = 'VID_HD_16_9_46S_APP_INSTALL#YOUR_PLACEMENT_ID';
      await metaAudienceNetwork.showInterstitialAd(testPlacementId);
      
      this.lastInterstitialTime = now;
      console.log('✅ Interstitial ad shown successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to show interstitial ad:', error);
      return false;
    }
  }

  async showBannerAd(placementId?: string) {
    try {
      const testPlacementId = placementId || 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID';
      await metaAudienceNetwork.showBannerAd(testPlacementId);
      return true;
    } catch (error) {
      console.error('❌ Failed to show banner ad:', error);
      return false;
    }
  }
}

export const adManager = new AdManager();
