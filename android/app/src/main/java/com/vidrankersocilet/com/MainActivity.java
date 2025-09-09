
package com.vidrankersocilet.com;

import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.facebook.ads.AudienceNetworkAds;

public class MainActivity extends BridgeActivity {
    
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Initialize Mobile Ads SDK with proper error handling
        initializeMobileAds();
        
        // Initialize Meta Audience Network
        initializeMetaAudienceNetwork();
        
        // Register the FacebookAds plugin for Capacitor
        registerPlugin(FacebookAdsPlugin.class);
    }

    private void initializeMobileAds() {
        try {
            Log.d(TAG, "🚀 Initializing Google Mobile Ads SDK...");
            
            MobileAds.initialize(this, new OnInitializationCompleteListener() {
                @Override
                public void onInitializationComplete(InitializationStatus initializationStatus) {
                    Log.d(TAG, "✅ Google Mobile Ads SDK initialized successfully");
                    Log.d(TAG, "📊 AdapterStatus: " + initializationStatus.getAdapterStatusMap().toString());
                }
            });
            
        } catch (Exception e) {
            Log.e(TAG, "❌ Failed to initialize Google Mobile Ads SDK: " + e.getMessage());
        }
    }

    private void initializeMetaAudienceNetwork() {
        try {
            Log.d(TAG, "🚀 Initializing Meta Audience Network SDK...");
            
            AudienceNetworkAds
                .buildInitSettings(this)
                .withInitListener(result -> {
                    if (result.isSuccess()) {
                        Log.d(TAG, "✅ Meta Audience Network initialized successfully");
                    } else {
                        Log.e(TAG, "❌ Meta Audience Network initialization failed: " + result.getMessage());
                    }
                })
                .initialize();
                
        } catch (Exception e) {
            Log.e(TAG, "❌ Failed to initialize Meta Audience Network SDK: " + e.getMessage());
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "🔄 MainActivity destroyed");
    }
}
