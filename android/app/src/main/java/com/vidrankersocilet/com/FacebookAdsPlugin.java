
package com.vidrankersocilet.com;

import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.AdView;
import com.facebook.ads.AudienceNetworkAds;
import com.facebook.ads.InterstitialAd;
import com.facebook.ads.InterstitialAdListener;
import com.facebook.ads.AdListener;
import com.facebook.ads.AdSize;
import android.view.ViewGroup;
import android.widget.LinearLayout;

@CapacitorPlugin(name = "FacebookAds")
public class FacebookAdsPlugin extends Plugin {

    private static final String TAG = "FacebookAdsPlugin";
    private InterstitialAd interstitialAd;
    private AdView bannerAdView;
    private boolean isInitialized = false;

    @Override
    public void load() {
        // Initialize Meta Audience Network when plugin loads
        initializeAudienceNetwork();
    }

    private void initializeAudienceNetwork() {
        try {
            if (!isInitialized) {
                Log.d(TAG, "🚀 Initializing Meta Audience Network SDK...");
                AudienceNetworkAds.initialize(getContext());
                isInitialized = true;
                Log.d(TAG, "✅ Meta Audience Network SDK initialized successfully");
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Failed to initialize Meta Audience Network SDK: " + e.getMessage());
        }
    }

    @PluginMethod
    public void initialize(PluginCall call) {
        try {
            initializeAudienceNetwork();
            
            JSObject result = new JSObject();
            result.put("success", true);
            result.put("message", "Meta Audience Network initialized");
            result.put("sdkVersion", "6.15.0");
            
            Log.d(TAG, "📱 SDK initialization requested from JavaScript");
            call.resolve(result);
        } catch (Exception e) {
            Log.e(TAG, "❌ Initialization failed: " + e.getMessage());
            call.reject("Failed to initialize Meta Audience Network", e);
        }
    }

    @PluginMethod
    public void showBannerAd(PluginCall call) {
        String placementId = call.getString("placementId", "IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID");
        
        try {
            Log.d(TAG, "🎯 Loading banner ad with placement ID: " + placementId);
            
            // Create banner ad
            bannerAdView = new AdView(getContext(), placementId, AdSize.BANNER_HEIGHT_50);
            
            // Set ad listener
            bannerAdView.setAdListener(new AdListener() {
                @Override
                public void onError(Ad ad, AdError adError) {
                    Log.e(TAG, "❌ Banner ad error: " + adError.getErrorMessage());
                    JSObject result = new JSObject();
                    result.put("success", false);
                    result.put("error", adError.getErrorMessage());
                    call.resolve(result);
                }

                @Override
                public void onAdLoaded(Ad ad) {
                    Log.d(TAG, "✅ Banner ad loaded successfully");
                    
                    // Add banner to activity layout
                    getActivity().runOnUiThread(() -> {
                        try {
                            ViewGroup layout = getActivity().findViewById(android.R.id.content);
                            if (layout instanceof LinearLayout) {
                                ((LinearLayout) layout).addView(bannerAdView);
                            }
                        } catch (Exception e) {
                            Log.e(TAG, "Failed to add banner to layout: " + e.getMessage());
                        }
                    });
                    
                    JSObject result = new JSObject();
                    result.put("success", true);
                    result.put("message", "Banner ad displayed");
                    call.resolve(result);
                }

                @Override
                public void onAdClicked(Ad ad) {
                    Log.d(TAG, "👆 Banner ad clicked");
                }

                @Override
                public void onLoggingImpression(Ad ad) {
                    Log.d(TAG, "👁️ Banner ad impression logged");
                }
            });

            // Load the ad
            bannerAdView.loadAd();
            
        } catch (Exception e) {
            Log.e(TAG, "❌ Banner ad failed: " + e.getMessage());
            call.reject("Failed to show banner ad", e);
        }
    }

    @PluginMethod
    public void showInterstitialAd(PluginCall call) {
        String placementId = call.getString("placementId", "VID_HD_16_9_46S_APP_INSTALL#YOUR_PLACEMENT_ID");
        
        try {
            Log.d(TAG, "🎯 Loading interstitial ad with placement ID: " + placementId);
            
            // Create interstitial ad
            interstitialAd = new InterstitialAd(getContext(), placementId);
            
            // Set ad listener
            InterstitialAdListener interstitialAdListener = new InterstitialAdListener() {
                @Override
                public void onInterstitialDisplayed(Ad ad) {
                    Log.d(TAG, "🎬 Interstitial ad displayed");
                }

                @Override
                public void onInterstitialDismissed(Ad ad) {
                    Log.d(TAG, "❌ Interstitial ad dismissed");
                    JSObject result = new JSObject();
                    result.put("success", true);
                    result.put("message", "Interstitial ad dismissed");
                    call.resolve(result);
                }

                @Override
                public void onError(Ad ad, AdError adError) {
                    Log.e(TAG, "❌ Interstitial ad error: " + adError.getErrorMessage());
                    JSObject result = new JSObject();
                    result.put("success", false);
                    result.put("error", adError.getErrorMessage());
                    call.resolve(result);
                }

                @Override
                public void onAdLoaded(Ad ad) {
                    Log.d(TAG, "✅ Interstitial ad loaded, showing now...");
                    // Show the ad immediately when loaded
                    interstitialAd.show();
                }

                @Override
                public void onAdClicked(Ad ad) {
                    Log.d(TAG, "👆 Interstitial ad clicked");
                }

                @Override
                public void onLoggingImpression(Ad ad) {
                    Log.d(TAG, "👁️ Interstitial ad impression logged");
                }
            };

            interstitialAd.setAdListener(interstitialAdListener);
            
            // Load the ad
            interstitialAd.loadAd();
            
        } catch (Exception e) {
            Log.e(TAG, "❌ Interstitial ad failed: " + e.getMessage());
            call.reject("Failed to show interstitial ad", e);
        }
    }

    @PluginMethod
    public void hideBannerAd(PluginCall call) {
        try {
            if (bannerAdView != null) {
                getActivity().runOnUiThread(() -> {
                    ViewGroup parent = (ViewGroup) bannerAdView.getParent();
                    if (parent != null) {
                        parent.removeView(bannerAdView);
                    }
                    bannerAdView.destroy();
                    bannerAdView = null;
                });
                
                Log.d(TAG, "🚫 Banner ad hidden and destroyed");
                
                JSObject result = new JSObject();
                result.put("success", true);
                result.put("message", "Banner ad hidden");
                call.resolve(result);
            } else {
                call.reject("No banner ad to hide");
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Failed to hide banner ad: " + e.getMessage());
            call.reject("Failed to hide banner ad", e);
        }
    }

    @Override
    protected void handleOnDestroy() {
        // Clean up ads when plugin is destroyed
        if (bannerAdView != null) {
            bannerAdView.destroy();
        }
        if (interstitialAd != null) {
            interstitialAd.destroy();
        }
        super.handleOnDestroy();
    }
}
