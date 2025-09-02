
import { useEffect, useState } from 'react';
import { metaAudienceNetwork, AdStatus } from '../services/metaAudienceNetworkService';

export const useMetaAudienceNetwork = () => {
  const [status, setStatus] = useState<AdStatus>(metaAudienceNetwork.getStatus());

  useEffect(() => {
    // Initialize Meta Audience Network on component mount
    console.log('🚀 Hook: Initializing Meta Audience Network...');
    metaAudienceNetwork.initialize();

    // Subscribe to status changes
    const unsubscribe = metaAudienceNetwork.onStatusChange(setStatus);

    return unsubscribe;
  }, []);

  return {
    status,
    showInterstitial: metaAudienceNetwork.showInterstitialAd.bind(metaAudienceNetwork),
    loadInterstitial: metaAudienceNetwork.loadInterstitialAd.bind(metaAudienceNetwork),
    showBanner: metaAudienceNetwork.showBannerAd.bind(metaAudienceNetwork),
    hideBanner: metaAudienceNetwork.hideBannerAd.bind(metaAudienceNetwork),
    testBanner: metaAudienceNetwork.testBannerAd.bind(metaAudienceNetwork),
    testInterstitial: metaAudienceNetwork.testInterstitialAd.bind(metaAudienceNetwork),
    refreshAds: metaAudienceNetwork.refreshAds.bind(metaAudienceNetwork),
    setTestMode: metaAudienceNetwork.setTestMode.bind(metaAudienceNetwork),
    getDebugInfo: metaAudienceNetwork.getDebugInfo.bind(metaAudienceNetwork)
  };
};
