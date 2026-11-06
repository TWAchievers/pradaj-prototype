import { readFile, writeFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve('dist')
let html = await readFile(resolve(dist, 'index.html'), 'utf8')
const imageFiles = await readdir(resolve(dist, 'images'))
const images = Object.fromEntries(await Promise.all(imageFiles.map(async file => [
  file, 'data:image/' + (file.endsWith('.png') ? 'png' : 'webp') + ';base64,' + (await readFile(resolve(dist, 'images', file))).toString('base64'),
])))
const script = html.match(/<script[^>]*src="([^"]+)"[^>]*><\/script>/)
const style = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!script || !style) throw new Error('Run npm run build before packaging the preview.')
const js = await readFile(resolve(dist, script[1]), 'utf8')
let css = await readFile(resolve(dist, style[1]), 'utf8')
for (const match of [...css.matchAll(/url\(\.\/([^)]*\.woff2)\)/g)]) {
  const font = await readFile(resolve(dist, 'assets', match[1]))
  css = css.replace(match[0], 'url(data:font/woff2;base64,' + font.toString('base64') + ')')
}
html = html.replace(script[0], () => '<script type="module">window.previewImages = ' + JSON.stringify(images) + ';\n' + js.replace(/<\/script/gi, '<\\/script') + '</script>')
html = html.replace(style[0], () => '<style>' + css + '</style>')
await writeFile(process.argv[2] ?? 'Pradaj-Preview.html', html)
