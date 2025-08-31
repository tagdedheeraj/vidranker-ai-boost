import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Smartphone, Trash2, Database, TestTube, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useMetaAudienceNetwork } from '../hooks/useMetaAudienceNetwork';
import { localStorage, AppSettings } from '../utils/localStorage';
import { toast } from 'sonner';

export const Settings = () => {
  const { status, testBanner, testInterstitial } = useMetaAudienceNetwork();
  const [storageInfo, setStorageInfo] = useState({ seoCount: 0, thumbnailCount: 0, totalSize: 0 });
  const [settings, setSettings] = useState<AppSettings>({ adsEnabled: true, theme: 'dark', version: '1.0.0' });

  useEffect(() => {
    loadStorageInfo();
    setSettings(localStorage.getSettings());
  }, []);

  const loadStorageInfo = () => {
    setStorageInfo(localStorage.getStorageInfo());
  };

  const handleClearData = (type: 'seo' | 'thumbnails' | 'all') => {
    const confirmMessage = {
      seo: 'Are you sure you want to clear all SEO content?',
      thumbnails: 'Are you sure you want to clear all thumbnails?',
      all: 'Are you sure you want to clear ALL data? This cannot be undone.'
    };

    if (window.confirm(confirmMessage[type])) {
      switch (type) {
        case 'seo':
          localStorage.clearSEOHistory();
          toast.success('SEO history cleared');
          break;
        case 'thumbnails':
          localStorage.clearThumbnailHistory();
          toast.success('Thumbnail history cleared');
          break;
        case 'all':
          localStorage.clearAllData();
          toast.success('All data cleared');
          break;
      }
      loadStorageInfo();
    }
  };

  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.saveSettings(newSettings);
    toast.success('Settings updated');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="card-glass text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <SettingsIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold mb-2">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your app preferences and data
        </p>
      </div>

      {/* App Info */}
      <div className="card-glass">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          App Information
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Version</span>
            <span className="text-sm font-mono glass px-2 py-1 rounded">1.0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Platform</span>
            <span className="text-sm glass px-2 py-1 rounded">
              {status.isNative ? 'Native Mobile' : 'Web Browser'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Build</span>
            <span className="text-sm font-mono glass px-2 py-1 rounded">2024.01.31</span>
          </div>
        </div>
      </div>

      {/* Meta Audience Network Status */}
      <div className="card-glass">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Meta Audience Network
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-3 rounded-lg text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${status.isInitialized ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <div className="text-xs font-medium">Initialized</div>
              <div className="text-xs text-muted-foreground">
                {status.isInitialized ? 'Ready' : 'Failed'}
              </div>
            </div>
            
            <div className="glass p-3 rounded-lg text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${status.bannerLoaded ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <div className="text-xs font-medium">Banner</div>
              <div className="text-xs text-muted-foreground">
                {status.bannerLoaded ? 'Loaded' : 'Not Loaded'}
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="space-y-2">
            <Button
              onClick={testBanner}
              variant="outline"
              className="w-full btn-secondary"
              disabled={!status.isInitialized}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Test Banner Ad
            </Button>
            
            <Button
              onClick={testInterstitial}
              variant="outline"
              className="w-full btn-secondary"
              disabled={!status.isInitialized}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Test Interstitial Ad
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            App ID: 1160387479246621
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card-glass">
        <h2 className="font-semibold mb-4">Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Enable Ads</div>
              <div className="text-xs text-muted-foreground">Show Meta Audience Network ads</div>
            </div>
            <Switch
              checked={settings.adsEnabled}
              onCheckedChange={(checked) => handleSettingChange('adsEnabled', checked)}
            />
          </div>
        </div>
      </div>

      {/* Storage & Data */}
      <div className="card-glass">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-400" />
          Storage & Data
        </h2>
        
        <div className="space-y-4">
          {/* Storage Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-primary">{storageInfo.seoCount}</div>
              <div className="text-xs text-muted-foreground">SEO Items</div>
            </div>
            <div className="glass p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-secondary">{storageInfo.thumbnailCount}</div>
              <div className="text-xs text-muted-foreground">Thumbnails</div>
            </div>
            <div className="glass p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">{storageInfo.totalSize}KB</div>
              <div className="text-xs text-muted-foreground">Total Size</div>
            </div>
          </div>

          {/* Clear Data Options */}
          <div className="space-y-2">
            <Button
              onClick={() => handleClearData('seo')}
              variant="outline"
              className="w-full btn-secondary"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear SEO History
            </Button>
            
            <Button
              onClick={() => handleClearData('thumbnails')}
              variant="outline"
              className="w-full btn-secondary"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Thumbnail History
            </Button>
            
            <Button
              onClick={() => handleClearData('all')}
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="card-glass text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Made with ❤️ for YouTube Creators
        </p>
        <p className="text-xs text-muted-foreground">
          © 2024 VidRanker. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Settings;
