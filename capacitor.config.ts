
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vidrankersocilet.com',
  appName: 'VidRanker',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1e3a8a",
      showSpinner: true,
      spinnerColor: "#8b5cf6"
    },
    FacebookAds: {
      appId: "1160387479246621",
      testMode: true,
      testDeviceIds: ["YOUR_TEST_DEVICE_ID"],
      logLevel: "verbose"
    }
  }
};

export default config;
