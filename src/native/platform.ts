import { Capacitor } from '@capacitor/core'

/** true quando roda dentro do app de loja (iOS/Android via Capacitor). */
export const isNative = Capacitor.isNativePlatform()
export const platform = Capacitor.getPlatform() as 'web' | 'ios' | 'android'
