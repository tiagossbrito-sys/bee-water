/** Marca da Bee: a abelha do ícone, com ou sem a gota, em qualquer tamanho. */
export function BeeMark({ size = 40, drop = true, className }: { size?: number; drop?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="190" cy="150" rx="70" ry="42" fill="#ffffff" stroke="#1976c9" strokeWidth="10" opacity="0.95" transform="rotate(-25 190 150)" />
      <ellipse cx="322" cy="150" rx="70" ry="42" fill="#ffffff" stroke="#1976c9" strokeWidth="10" opacity="0.95" transform="rotate(25 322 150)" />
      <ellipse cx="256" cy="270" rx="150" ry="120" fill="#f5b400" />
      <path d="M118 292 q138 34 276 0 v30 q-138 34 -276 0z M150 346 q106 26 212 0 v28 q-106 26 -212 0z" fill="#0f2733" opacity="0.85" />
      <path d="M225 180 l-25 -40 M287 180 l25 -40" stroke="#0f2733" strokeWidth="12" strokeLinecap="round" />
      <circle cx="200" cy="135" r="12" fill="#0f2733" /><circle cx="312" cy="135" r="12" fill="#0f2733" />
      <circle cx="222" cy="218" r="13" fill="#0f2733" /><circle cx="290" cy="218" r="13" fill="#0f2733" />
      <circle cx="226" cy="214" r="4" fill="#fff" /><circle cx="294" cy="214" r="4" fill="#fff" />
      <path d="M232 248 q24 20 48 0" stroke="#0f2733" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="196" cy="246" rx="14" ry="8" fill="#ff9aa2" opacity="0.6" /><ellipse cx="316" cy="246" rx="14" ry="8" fill="#ff9aa2" opacity="0.6" />
      {drop && <path d="M396 330 c22 38 52 66 52 100 a52 52 0 0 1 -104 0 c0 -34 30 -62 52 -100z" fill="#9ad5ff" stroke="#fff" strokeWidth="10" />}
    </svg>
  )
}

/** Logotipo: marca + nome. */
export function BeeLogo({ size = 28 }: { size?: number }) {
  return (
    <span className="bee-logo" aria-label="Bee Water">
      <BeeMark size={size} drop={false} />
      <span className="bee-wordmark">Bee<b>Water</b></span>
    </span>
  )
}
