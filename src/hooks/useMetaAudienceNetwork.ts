
import { useEffect, useState } from 'react';
import { metaAudienceNetwork } from '@/services/metaAudienceNetworkService';

export const useMetaAudienceNetwork = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(metaAudienceNetwork.getStatus());

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        await metaAudienceNetwork.initialize();
        setIsInitialized(true);
        setStatus(metaAudienceNetwork.getStatus());
      } catch (error) {
        console.error('Failed to initialize Meta Audience Network:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();

    // Update status periodically
    const interval = setInterval(() => {
      setStatus(metaAudienceNetwork.getStatus());
    }, 1000);

    return () => clearInterval(interval);
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

  // Aliases to match what components expect
  const showBanner = showBannerAd;
  const hideBanner = hideBannerAd;
  const showInterstitial = showInterstitialAd;
  const testBanner = loadTestAd;
  const testInterstitial = loadTestAd;

  return {
    isInitialized,
    isLoading,
    status,
    showBannerAd,
    showInterstitialAd,
    loadTestAd,
    hideBannerAd,
    showBanner,
    hideBanner,
    showInterstitial,
    testBanner,
    testInterstitial
  };
};
