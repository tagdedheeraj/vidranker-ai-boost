
import { useEffect, useState } from 'react';
import { useMetaAudienceNetwork } from '@/hooks/useMetaAudienceNetwork';

interface BannerAdProps {
  className?: string;
}

export const BannerAd = ({ className = '' }: BannerAdProps) => {
  const { showBannerAd, status } = useMetaAudienceNetwork();
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const loadBannerAd = async () => {
      if (status.isInitialized && !adLoaded) {
        try {
          // Meta के official test placement ID
          const testPlacementId = 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID';
          await showBannerAd(testPlacementId);
          setAdLoaded(true);
          console.log('🎯 Banner ad loaded successfully');
        } catch (error) {
          console.error('Failed to load banner ad:', error);
        }
      }
    };

    loadBannerAd();
  }, [status.isInitialized, showBannerAd, adLoaded]);

  if (!status.isInitialized) {
    return (
      <div className={`h-[50px] bg-muted/20 flex items-center justify-center ${className}`}>
        <div className="text-xs text-muted-foreground">Loading ads...</div>
      </div>
    );
  }

  return (
    <div className={`h-[50px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center border border-border/50 rounded-lg ${className}`}>
      <div className="text-xs text-muted-foreground flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Banner Ad Space
      </div>
    </div>
  );
};
