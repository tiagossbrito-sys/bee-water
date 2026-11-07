// Screenshots para as lojas: iPhone 6,7" (1290x2796) e Android (1080x2340).
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright')
const base = process.env.BASE ?? 'http://localhost:4173/'
const browser = await chromium.launch()
const targets = [
  { dir: 'docs/loja/screenshots/ios', w: 430, h: 932, scale: 3 },      // 1290x2796
  { dir: 'docs/loja/screenshots/android', w: 360, h: 780, scale: 3 },  // 1080x2340
]
for (const t of targets) {
  const ctx = await browser.newContext({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: t.scale, isMobile: true, hasTouch: true, locale: 'pt-BR' })
  const page = await ctx.newPage()
  await page.goto(base); await page.waitForSelector('text=Qual seu gole hoje?')
  await page.screenshot({ path: `${t.dir}/1-onboarding.png` })
  await page.fill('input[placeholder="Seu nome"]', 'Ana'); await page.click('text=Feminino'); await page.click('text=Continuar'); await page.click('text=Continuar')
  await page.click('button.btn:text-is("Começar")'); await page.waitForSelector('button.gole-btn')
  for (let i = 0; i < 5; i++) { await page.click('button.gole-btn'); await page.waitForTimeout(120); if (await page.$('.overlay')) { if (i === 3) await page.screenshot({ path: `${t.dir}/3-super-gole.png` }); await page.click('text=Continuar') } }
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${t.dir}/2-hoje.png` })
  await page.click('nav.tabbar button:has-text("Coleção")'); await page.waitForSelector('text=Personagens'); await page.screenshot({ path: `${t.dir}/4-colecao.png` })
  await page.click('nav.tabbar button:has-text("Eu")'); await page.waitForSelector('text=Meta e copo'); await page.screenshot({ path: `${t.dir}/5-opcoes.png` })
  await page.click('nav.tabbar button:has-text("Grupo")'); await page.waitForSelector('text=Prévia ilustrativa'); await page.screenshot({ path: `${t.dir}/6-grupo-em-breve.png` })
  await ctx.close()
  console.log('ok', t.dir)
}
await browser.close()
