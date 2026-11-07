import { BeeLogo } from './BeeMark'
import { useStreak } from '../store/useStore'

export function TopBar() {
  const streak = useStreak()
  return (
    <header className="topbar">
      <BeeLogo />
      <span className="chip water" title="Dias seguidos com pelo menos metade da meta">🔥 {streak} {streak === 1 ? 'dia' : 'dias'}</span>
    </header>
  )
}
