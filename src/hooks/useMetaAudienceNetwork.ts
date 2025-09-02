
import { useEffect, useState } from 'react';
import { metaAudienceNetwork } from '@/services/metaAudienceNetworkService';

export const useMetaAudienceNetwork = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        await metaAudienceNetwork.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Meta Audience Network:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const showBannerAd = async (placementId: string) => {
    try {
      await metaAudienceNetwork.showBannerAd(placementId);
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  };

  const showInterstitialAd = async (placementId: string) => {
    try {
      await metaAudienceNetwork.showInterstitialAd(placementId);
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
    }
  };

  const loadTestAd = async () => {
    try {
      return await metaAudienceNetwork.loadTestAd();
    } catch (error) {
      console.error('Error loading test ad:', error);
      return false;
    }
  };

  const hideBannerAd = async () => {
    try {
      await metaAudienceNetwork.hideBannerAd();
    } catch (error) {
      console.error('Error hiding banner ad:', error);
    }
  };

  return {
    isInitialized,
    isLoading,
    showBannerAd,
    showInterstitialAd,
    loadTestAd,
    hideBannerAd
  };
};
