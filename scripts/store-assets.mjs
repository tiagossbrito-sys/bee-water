// Gera assets/icon.png (1024), icon-foreground/background (Android adaptive) e splash (2732) a partir do SVG.
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright')
const svg = readFileSync(new URL('../public/icon.svg', import.meta.url), 'utf8')
const inner = svg.replace(/<svg[^>]*>/, '').replace('</svg>', '')
const bee = inner.replace(/<rect width="512" height="512" rx="110" fill="#2f9be8"\/>/, '')
mkdirSync(new URL('../assets', import.meta.url), { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage()
async function shot(name, size, html, transparent = false) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<html><body style="margin:0;background:${transparent ? 'transparent' : '#2f9be8'}">${html}</body></html>`)
  writeFileSync(new URL(`../assets/${name}`, import.meta.url), await page.screenshot({ omitBackground: transparent, clip: { x: 0, y: 0, width: size, height: size } }))
  console.log('ok', name)
}
const full = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 512 512">${inner}</svg>`
await shot('icon.png', 1024, full(1024))
await shot('icon-only.png', 1024, full(1024))
// Android adaptive: foreground com margem segura (66% central), background liso
await shot('icon-foreground.png', 1024, `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 512 512"><g transform="translate(90 90) scale(0.65)">${bee}</g></svg>`, true)
await shot('icon-background.png', 1024, `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><rect width="1024" height="1024" fill="#2f9be8"/></svg>`)
// Splash: abelha centralizada
const splash = (bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732"><rect width="2732" height="2732" fill="${bg}"/><g transform="translate(1066 966) scale(1.17)"><svg viewBox="0 0 512 512" width="512" height="512">${bee}</svg></g><text x="1366" y="1780" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-weight="900" font-size="150" fill="#ffffff">Bee Water</text></svg>`
await shot('splash.png', 2732, splash('#2f9be8'))
await shot('splash-dark.png', 2732, splash('#0f2233'))
await browser.close()
