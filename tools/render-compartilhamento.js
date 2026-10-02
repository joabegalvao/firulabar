#!/usr/bin/env node
/* Monta a imagem de compartilhamento (1200x630) com o Chromium, usando as
   fontes do site e as imagens já geradas por tools/optimize-images.py.

   Uso (na raiz do projeto), com o Playwright instalado:
     node tools/render-compartilhamento.js

   Variáveis opcionais: PLAYWRIGHT_MODULE (caminho do módulo playwright) e
   CHROMIUM_PATH (executável do Chromium). Os ícones (favicon, apple-touch,
   192) saem do optimize-images.py, a partir do brasão. */
const path = require('path');
const fs = require('fs');
const os = require('os');

const playwrightModule = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = require(playwrightModule);

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'assets/img');

const fontFace = (family, file, style = 'normal') => `@font-face { font-family: "${family}"; src: url("file://${path.join(root, 'assets/fonts', file)}") format("woff2"); font-style: ${style}; font-weight: 300 700; }`;
const fonts = [fontFace('Oswald', 'oswald-normal-latin.woff2'), fontFace('Lora', 'lora-normal-latin.woff2')].join('\n');

const photo = path.join(out, 'palco-1200.webp');
const logo = path.join(out, 'logo-firula-600.png');
const crest = path.join(out, 'brasao-firula-360.png');

// varal de luzes, como no site
const lights = Array.from({ length: 14 }, (_, i) => `<i style="position:absolute;left:${(i + 0.5) * (1200 / 14)}px;top:0;width:2px;height:${[22, 14, 10][i % 3]}px;background:rgba(255,255,255,.3)"><b style="position:absolute;left:50%;top:100%;width:10px;height:14px;margin-left:-5px;border-radius:50% 50% 55% 55%;background:#f2b55a;box-shadow:0 0 10px #f2b55a,0 0 28px rgba(242,181,90,.6)"></b></i>`).join('');

const html = `<div style="position:relative;width:1200px;height:630px;background:#0d0b0a;color:#fdfdfd;font-family:Lora,serif;overflow:hidden">
  <img src="file://${photo}" style="position:absolute;inset:0;width:1200px;height:630px;object-fit:cover;object-position:70% 50%" alt="">
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,11,10,.96) 0%,rgba(13,11,10,.9) 46%,rgba(13,11,10,.35) 100%)"></div>
  <div style="position:absolute;left:0;right:0;top:40px;border-top:1px solid rgba(255,255,255,.18)">${lights}</div>
  <div style="position:absolute;left:72px;top:118px;width:620px">
    <img src="file://${logo}" style="height:96px;width:auto" alt="">
    <div style="margin-top:40px;font-family:Oswald,sans-serif;font-weight:600;font-size:68px;line-height:.98;text-transform:uppercase">Do almoço caseiro<br><span style="color:#fe6603">ao show ao vivo.</span></div>
    <div style="margin-top:26px;font-size:21px;line-height:1.4;color:#d9cdbb">Comida de boteco feita na hora, drinks e música ao vivo.<br>Av. Curitiba, 289, Zona 04, Maringá.</div>
    <div style="margin-top:26px;display:flex;align-items:center;gap:12px;font-family:Oswald,sans-serif;font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:#f2b55a"><span style="color:#fdfdfd;font-size:22px">4,6</span> no Google, em mais de 2.400 avaliações</div>
  </div>
  <img src="file://${crest}" style="position:absolute;right:64px;bottom:48px;height:120px;width:auto;filter:drop-shadow(0 6px 16px rgba(0,0,0,.6))" alt="">
</div>`;

(async () => {
  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
  );
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  // a página é aberta por file:// para o Chromium aceitar as fontes e as imagens locais
  const tmp = path.join(os.tmpdir(), 'firula-render.html');
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${fonts} body{margin:0;background:transparent}</style></head><body>${html}</body></html>`);
  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, 'compartilhamento.jpg'), type: 'jpeg', quality: 86 });
  fs.unlinkSync(tmp);
  await browser.close();
  console.log('assets/img/compartilhamento.jpg');
})();
