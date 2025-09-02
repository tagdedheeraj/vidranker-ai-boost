
package com.vidrankersocilet.com;

import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

public class MainActivity extends BridgeActivity {
    
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Initialize Mobile Ads SDK with proper error handling
        initializeMobileAds();
        
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

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "🔄 MainActivity destroyed");
    }
}
