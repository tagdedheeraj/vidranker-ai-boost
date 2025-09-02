
import { useCallback } from 'react';
import { adManager } from '@/utils/adManager';
import { useMetaAudienceNetwork } from './useMetaAudienceNetwork';

export const useAds = () => {
  const { status } = useMetaAudienceNetwork();

  const showInterstitialOnAction = useCallback(async (actionName: string) => {
    if (!status.isInitialized) {
      console.log('🔄 Ads not initialized yet');
      return false;
    }

    console.log(`🎯 Triggering interstitial ad for action: ${actionName}`);
    return await adManager.showInterstitialAd(actionName);
  }, [status.isInitialized]);

  const showBannerAd = useCallback(async (placementId?: string) => {
    if (!status.isInitialized) {
      console.log('🔄 Ads not initialized yet');
      return false;
    }

    return await adManager.showBannerAd(placementId);
  }, [status.isInitialized]);

  return {
    showInterstitialOnAction,
    showBannerAd,
    isAdsReady: status.isInitialized,
    adStatus: status
  };
};
