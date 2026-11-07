/** Recursos que dependem do servidor (fase 1). Ligar quando o Supabase estiver conectado. */
export const GROUPS_ENABLED = false
export const SOON_LABEL = 'em breve'

/**
 * Versão de loja (App Store / Google Play): sem recursos "em breve", sem assinatura ainda inexistente.
 * Definida no build com VITE_STORE_BUILD=1 (workflows Android e iOS).
 */
export const STORE_BUILD = import.meta.env.VITE_STORE_BUILD === '1'
/** A aba Grupo aparece quando os grupos funcionam, ou na web como prévia. */
export const SHOW_GROUPS = GROUPS_ENABLED || !STORE_BUILD
/** Personagens de assinatura só aparecem quando houver compra no app. */
export const SHOW_PREMIUM = !STORE_BUILD
