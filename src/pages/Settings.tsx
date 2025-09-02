import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, FileText, Info, Trash2, TestTube, Monitor, HelpCircle, Mail, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMetaAudienceNetwork } from '../hooks/useMetaAudienceNetwork';
import { localStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { metaAudienceNetwork } from '../services/metaAudienceNetworkService';
import { useAds } from '@/hooks/useAds';
import { BannerAd } from '@/components/ads/BannerAd';
import { AdDebugPanel } from '@/components/ads/AdDebugPanel';

interface AppSettings {
  adsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AppSettings>({ adsEnabled: true, theme: 'light' });
  const [debugInfo, setDebugInfo] = useState<any>({});
  const { status, showBanner, hideBanner, showInterstitial, testBanner, testInterstitial } = useMetaAudienceNetwork();
  const { showInterstitialOnAction } = useAds();

  useEffect(() => {
    const savedSettings = localStorage.getSettings();
    if (savedSettings) {
      setSettings({
        adsEnabled: savedSettings.adsEnabled,
        theme: savedSettings.theme
      });
    }
    
    // Get debug info
    setDebugInfo(metaAudienceNetwork.getDebugInfo());
  }, []);

  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.saveSettings(newSettings);
    toast.success('Settings saved successfully!');
  };

  const clearAllData = () => {
    localStorage.clearAllData();
    toast.success('All data cleared successfully!');
  };

  const testBannerAd = async () => {
    console.log('🧪 Manual banner test started...');
    try {
      await testBanner();
      toast.success('Banner ad test completed! Check console for details.');
    } catch (error) {
      toast.error('Banner ad test failed. Check console for details.');
      console.error('Banner test error:', error);
    }
  };

  const testInterstitialAd = async () => {
    console.log('🧪 Manual interstitial test started...');
    try {
      await testInterstitial();
      toast.success('Interstitial ad test completed! Check console for details.');
    } catch (error) {
      toast.error('Interstitial ad test failed. Check console for details.');
      console.error('Interstitial test error:', error);
    }
  };

  const refreshAllAds = async () => {
    console.log('🔄 Refreshing all ads...');
    try {
      await metaAudienceNetwork.refreshAds();
      setDebugInfo(metaAudienceNetwork.getDebugInfo());
      toast.success('Ads refreshed successfully!');
    } catch (error) {
      toast.error('Failed to refresh ads');
      console.error('Refresh error:', error);
    }
  };

  const toggleTestMode = () => {
    const newTestMode = !status.testMode;
    metaAudienceNetwork.setTestMode(newTestMode);
    setDebugInfo(metaAudienceNetwork.getDebugInfo());
    toast.success(`Test mode ${newTestMode ? 'enabled' : 'disabled'}`);
  };

  const handleNavigateWithAd = async (path: string, pageName: string) => {
    console.log(`🎯 Navigating to ${pageName} with interstitial ad`);
    await showInterstitialOnAction(`navigate_to_${pageName}`);
    navigate(path);
  };

  const supportItems = [
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help with using VidRanker',
      action: () => handleNavigateWithAd('/help', 'help'),
      color: 'from-green-600 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Contact Us',
      description: 'Send us a message or feedback',
      action: () => handleNavigateWithAd('/contact', 'contact'),
      color: 'from-blue-600 to-purple-600'
    }
  ];

  const legalItems = [
    {
      icon: Shield,
      title: 'Privacy Policy',
      description: 'How we handle your data',
      action: () => handleNavigateWithAd('/privacy', 'privacy'),
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: FileText,
      title: 'Terms of Service',
      description: 'App usage terms and conditions',
      action: () => handleNavigateWithAd('/terms', 'terms'),
      color: 'from-green-600 to-blue-600'
    },
    {
      icon: Info,
      title: 'About VidRanker',
      description: 'App information and features',
      action: () => handleNavigateWithAd('/about', 'about'),
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="flex-1 p-4 space-y-6">
        {/* Header */}
        <div className="card-glass text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <SettingsIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold mb-2">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your app preferences and ad settings
          </p>
        </div>

        {/* Debug Panel - Only show in development or when there are issues */}
        {(!status.isInitialized || debugInfo.errors?.length > 0) && (
          <AdDebugPanel />
        )}

        {/* Meta Audience Network Status */}
        <div className="card-glass">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Monitor className="h-5 w-5 text-primary" />
            Meta Audience Network Status
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 glass rounded-lg">
              <span className="text-sm">SDK Status</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                status.isInitialized ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
              }`}>
                {status.isInitialized ? '✅ Initialized' : '❌ Not Ready'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 glass rounded-lg">
              <span className="text-sm">Platform</span>
              <span className="text-xs text-muted-foreground">
                {status.isNative ? '📱 Native App' : '🌐 Web Browser'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 glass rounded-lg">
              <span className="text-sm">Test Mode</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                status.testMode ? 'bg-orange-500/20 text-orange-600' : 'bg-blue-500/20 text-blue-600'
              }`}>
                {status.testMode ? '🧪 Test Ads' : '🎯 Live Ads'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 glass rounded-lg">
              <span className="text-sm">Banner Status</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                status.bannerLoaded ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'
              }`}>
                {status.bannerLoaded ? '✅ Loaded' : '⏳ Loading...'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 glass rounded-lg">
              <span className="text-sm">Interstitial Status</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                status.interstitialLoaded ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'
              }`}>
                {status.interstitialLoaded ? '✅ Ready' : '⏳ Loading...'}
              </span>
            </div>

            {debugInfo.lastBidRequest && (
              <div className="flex justify-between items-center p-3 glass rounded-lg">
                <span className="text-sm">Last Bid Request</span>
                <span className="text-xs text-muted-foreground">
                  {debugInfo.lastBidRequest}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ad Testing Controls */}
        <div className="card-glass">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TestTube className="h-5 w-5 text-orange-500" />
            Ad Testing & Controls
          </h2>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={testBannerAd}
                variant="outline" 
                className="btn-secondary"
                disabled={!settings.adsEnabled}
              >
                🧪 Test Banner
              </Button>
              
              <Button 
                onClick={testInterstitialAd}
                variant="outline" 
                className="btn-secondary"
                disabled={!settings.adsEnabled}
              >
                🧪 Test Interstitial
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={toggleTestMode}
                variant="outline" 
                className="btn-secondary"
              >
                {status.testMode ? '🎯 Enable Live' : '🧪 Enable Test'}
              </Button>
              
              <Button 
                onClick={refreshAllAds}
                variant="outline" 
                className="btn-secondary"
              >
                🔄 Refresh Ads
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
            <p className="text-xs text-blue-600 mb-2">
              📊 <strong>Testing Guide:</strong>
            </p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Test ads confirm bid requests are working</li>
              <li>• Check console logs for detailed information</li>
              <li>• Switch to live mode when ready for production</li>
              <li>• Refresh ads if "Waiting for bid request" persists</li>
            </ul>
          </div>
        </div>

        {/* App Status */}
        <div className="card-glass">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Monitor className="h-5 w-5 text-primary" />
            App Status
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 glass rounded-lg">
              <span className="text-sm">Ads Service</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                status.isInitialized ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
              }`}>
                {status.isInitialized ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 glass rounded-lg">
              <span className="text-sm">VidRanker Version</span>
              <span className="text-xs text-muted-foreground">5.0.0</span>
            </div>
          </div>
        </div>

        {/* Support & Help */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Support & Help</h2>
          {supportItems.map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className="card-glass hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal & Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Legal & Information</h2>
          {legalItems.map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className="card-glass hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Management */}
        <div className="card-glass">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Data Management
          </h2>
          
          <Button 
            onClick={clearAllData}
            variant="destructive" 
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This will delete all your saved SEO content and thumbnails
          </p>
        </div>
      </div>

      {/* Banner Ad at bottom */}
      <BannerAd className="mx-4 mb-4" />
    </div>
  );
};

export default Settings;
