import { LocalNotifications, type LocalNotificationSchema } from '@capacitor/local-notifications'
import { isNative } from './platform'
import type { Settings } from '../game/types'

const BASE_ID = 7000
const ACTION_TYPE = 'BEE_LEMBRETE'

/**
 * Lembretes nativos: agendados no sistema, chegam com o app fechado.
 * Um lembrete por intervalo dentro do horário acordado, repetindo todo dia.
 */
export async function ensureActionTypes() {
  if (!isNative) return
  await LocalNotifications.registerActionTypes({
    types: [{ id: ACTION_TYPE, actions: [{ id: 'gole', title: 'Gole (1 copo)' }, { id: 'depois', title: 'Depois', destructive: false }] }],
  })
}

export async function nativePermission(): Promise<'granted' | 'denied' | 'prompt'> {
  if (!isNative) return 'denied'
  const s = await LocalNotifications.checkPermissions()
  return s.display === 'granted' ? 'granted' : s.display === 'denied' ? 'denied' : 'prompt'
}

export async function requestNativePermission(): Promise<'granted' | 'denied' | 'prompt'> {
  if (!isNative) return 'denied'
  const s = await LocalNotifications.requestPermissions()
  return s.display === 'granted' ? 'granted' : 'denied'
}

export async function cancelAllReminders() {
  if (!isNative) return
  const pending = await LocalNotifications.getPending()
  const ours = pending.notifications.filter((n) => n.id >= BASE_ID && n.id < BASE_ID + 200)
  if (ours.length) await LocalNotifications.cancel({ notifications: ours.map((n) => ({ id: n.id })) })
}

export async function scheduleReminders(s: Settings, name: string) {
  if (!isNative) return
  await cancelAllReminders()
  if (!s.pushEnabled) return
  const first = name.split(' ')[0] || 'você'
  const list: LocalNotificationSchema[] = []
  let i = 0
  for (let m = s.awakeStart * 60; m <= s.awakeEnd * 60 && i < 60; m += s.reminderMin, i++) {
    const hour = Math.floor(m / 60), minute = m % 60
    if (hour >= 24) break
    list.push({
      id: BASE_ID + i,
      title: 'Bee: hora do gole',
      body: `${first}, um copo agora e você segue no ritmo de 1 por hora.`,
      schedule: { on: { hour, minute }, repeats: true, allowWhileIdle: true },
      actionTypeId: ACTION_TYPE,
      smallIcon: 'ic_stat_bee',
      iconColor: '#2f9be8',
      extra: { kind: 'lembrete' },
    })
  }
  // Resumo da noite, 30 min depois do fim do horário acordado
  if (s.nightSummary) {
    const m = Math.min(23 * 60 + 30, s.awakeEnd * 60 + 30)
    list.push({
      id: BASE_ID + 150,
      title: 'Bee: seu gole de hoje',
      body: 'Abra para ver quanto você bebeu e fechar o dia.',
      schedule: { on: { hour: Math.floor(m / 60), minute: m % 60 }, repeats: true, allowWhileIdle: true },
      smallIcon: 'ic_stat_bee',
      iconColor: '#2f9be8',
      extra: { kind: 'resumo' },
    })
  }
  if (list.length) await LocalNotifications.schedule({ notifications: list })
}

export function onReminderAction(handler: (actionId: string) => void) {
  if (!isNative) return () => {}
  const p = LocalNotifications.addListener('localNotificationActionPerformed', (e) => handler(e.actionId))
  return () => { p.then((h) => h.remove()) }
}
