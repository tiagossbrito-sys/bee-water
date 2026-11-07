import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'br.com.beewater.app',
  appName: 'Bee Water',
  webDir: 'dist',
  backgroundColor: '#f3f9fc',
  ios: { contentInset: 'automatic', scheme: 'Bee Water' },
  android: { allowMixedContent: false },
  plugins: {
    SplashScreen: { launchShowDuration: 800, backgroundColor: '#2f9be8', showSpinner: false, androidScaleType: 'CENTER_CROP' },
    LocalNotifications: { smallIcon: 'ic_stat_bee', iconColor: '#2f9be8' },
  },
}

export default config
