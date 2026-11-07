import { useEffect } from 'react'
import { App as CapApp } from '@capacitor/app'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Share } from '@capacitor/share'
import { isNative, platform } from './platform'
import { useStore } from '../store/useStore'
import { ensureActionTypes, nativePermission, onReminderAction, scheduleReminders } from './notifications'

/** Integrações do app de loja: splash, barra de status, lembretes nativos e ação "Gole" na notificação. */
export function useNativeApp() {
  const settings = useStore((s) => s.settings)
  const name = useStore((s) => s.profile.name)
  const stage = useStore((s) => s.stage)

  useEffect(() => {
    if (!isNative) return
    SplashScreen.hide().catch(() => {})
    StatusBar.setStyle({ style: settings.theme === 'escuro' ? Style.Dark : Style.Light }).catch(() => {})
    if (platform === 'android') StatusBar.setBackgroundColor({ color: settings.theme === 'escuro' ? '#0f2233' : '#f3f9fc' }).catch(() => {})
  }, [settings.theme])

  // Reagenda os lembretes sempre que as opções mudam
  useEffect(() => {
    if (!isNative || stage !== 'app') return
    let cancelled = false
    ;(async () => {
      await ensureActionTypes()
      const p = await nativePermission()
      if (cancelled || p !== 'granted') return
      await scheduleReminders(settings, name)
    })()
    return () => { cancelled = true }
  }, [stage, name, settings.pushEnabled, settings.reminderMin, settings.awakeStart, settings.awakeEnd, settings.nightSummary, settings])

  // Botão "Gole" na notificação registra um copo sem abrir o app
  useEffect(() => {
    if (!isNative) return
    const off = onReminderAction((actionId) => { if (actionId === 'gole') useStore.getState().addGole('gole') })
    const sub = CapApp.addListener('appStateChange', ({ isActive }) => { if (isActive) useStore.getState().rollover() })
    return () => { off(); sub.then((h) => h.remove()) }
  }, [])
}

export async function tap() {
  if (!isNative) { navigator.vibrate?.(12); return }
  try { await Haptics.impact({ style: ImpactStyle.Light }) } catch { /* sem háptico */ }
}

export async function shareText(title: string, text: string, url?: string): Promise<boolean> {
  if (isNative) { try { await Share.share({ title, text, url, dialogTitle: title }); return true } catch { return false } }
  if (navigator.share) { try { await navigator.share({ title, text, url }); return true } catch { return false } }
  try { await navigator.clipboard?.writeText(url ? `${text} ${url}` : text); return true } catch { return false }
}
