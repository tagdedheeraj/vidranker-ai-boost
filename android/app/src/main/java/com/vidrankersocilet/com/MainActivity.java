
package com.vidrankersocilet.com;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Register the Facebook Ads plugin
        registerPlugin(FacebookAdsPlugin.class);
        
        // Initialize Meta Audience Network SDK
        try {
            com.facebook.ads.AudienceNetworkAds.initialize(this);
            android.util.Log.d("MainActivity", "✅ Meta Audience Network SDK initialized in MainActivity");
        } catch (Exception e) {
            android.util.Log.e("MainActivity", "❌ Failed to initialize Meta Audience Network SDK: " + e.getMessage());
        }
    }
}
