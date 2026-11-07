import type { ReactNode } from 'react'
import { BeeMark } from './BeeMark'

/** A Bee fala: balão de mensagem com a abelha ao lado. */
export function BeeSays({ children, label, size = 46, tone = 'normal' }: { children: ReactNode; label?: string; size?: number; tone?: 'normal' | 'quiet' }) {
  return (
    <div className={`bee-says${tone === 'quiet' ? ' quiet' : ''}`}>
      <div className="bee-says-mark"><BeeMark size={size} drop={false} /></div>
      <div className="bee-bubble">
        {label && <div className="bee-label">{label}</div>}
        <div>{children}</div>
      </div>
    </div>
  )
}
