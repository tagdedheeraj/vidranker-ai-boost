
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, FileText, Info, Trash2, TestTube, Monitor, HelpCircle, Mail, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMetaAudienceNetwork } from '../hooks/useMetaAudienceNetwork';
import { localStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AppSettings {
  adsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AppSettings>({ adsEnabled: true, theme: 'light' });
  const { showBanner, hideBanner, showInterstitial, status } = useMetaAudienceNetwork();

  useEffect(() => {
    const savedSettings = localStorage.getSettings();
    if (savedSettings) {
      setSettings({
        adsEnabled: savedSettings.adsEnabled,
        theme: savedSettings.theme
      });
    }
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

  const testBannerAd = () => {
    if (settings.adsEnabled) {
      showBanner();
      toast.success('Banner ad displayed');
    } else {
      toast.error('Ads are disabled');
    }
  };

  const testInterstitialAd = async () => {
    if (settings.adsEnabled) {
      try {
        await showInterstitial();
        toast.success('Interstitial ad displayed');
      } catch (error) {
        toast.error('Failed to show interstitial ad');
      }
    } else {
      toast.error('Ads are disabled');
    }
  };

  const supportItems = [
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help with using VidRanker',
      action: () => navigate('/help'),
      color: 'from-green-600 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Contact Us',
      description: 'Send us a message or feedback',
      action: () => navigate('/contact'),
      color: 'from-blue-600 to-purple-600'
    }
  ];

  const legalItems = [
    {
      icon: Shield,
      title: 'Privacy Policy',
      description: 'How we handle your data',
      action: () => navigate('/privacy'),
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: FileText,
      title: 'Terms of Service',
      description: 'App usage terms and conditions',
      action: () => navigate('/terms'),
      color: 'from-green-600 to-blue-600'
    },
    {
      icon: Info,
      title: 'About VidRanker',
      description: 'App information and features',
      action: () => navigate('/about'),
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="card-glass text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <SettingsIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold mb-2">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your app preferences and settings
        </p>
      </div>

      {/* App Status */}
      <div className="card-glass">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" />
          App Status
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 glass rounded-lg">
            <span className="text-sm">Meta Audience Network</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              status.isInitialized ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
            }`}>
              {status.isInitialized ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 glass rounded-lg">
            <span className="text-sm">VidRanker Version</span>
            <span className="text-xs text-muted-foreground">1.0.0</span>
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

      {/* Ad Testing (Developer Mode) */}
      <div className="card-glass">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <TestTube className="h-5 w-5 text-orange-500" />
          Developer Tools
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={testBannerAd}
            variant="outline" 
            className="btn-secondary"
            disabled={!settings.adsEnabled}
          >
            Test Banner
          </Button>
          
          <Button 
            onClick={testInterstitialAd}
            variant="outline" 
            className="btn-secondary"
            disabled={!settings.adsEnabled}
          >
            Test Interstitial
          </Button>
        </div>
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
  );
};

export default Settings;
