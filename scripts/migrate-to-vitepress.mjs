import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDocs = path.join(root, 'src', 'content', 'docs');
const targetDocs = path.join(root, 'docs');

const volumes = [
  ['卷一 · 白象入梦', 'vol1', 1, 30],
  ['卷二 · 初转法轮', 'vol2', 31, 44],
  ['卷三 · 度化双贤与建立精舍', 'vol3', 45, 51],
  ['卷四 · 回宫度亲与僧团秩序', 'vol4', 52, 57],
  ['卷五 · 戒律与论辩', 'vol5', 58, 68],
  ['卷六 · 入灭与结集', 'vol6', 69, 77],
];

const volumeCards = [
  ['卷一 · 白象入梦', '/chapters/vol1/01', '第 1-30 章 · 从被保护到看见真实。兜率降世、四门出游、苦行六年、菩提树下成道。'],
  ['卷二 · 初转法轮', '/chapters/vol2/31', '第 31-44 章 · 从觉者到导师。鹿野苑初转法轮、度三迦叶、千人皈依。'],
  ['卷三 · 度化双贤与建立精舍', '/chapters/vol3/45', '第 45-51 章 · 从游化到扎根。双贤归依、祇园精舍落成，僧团制度化。'],
  ['卷四 · 回宫度亲与僧团秩序', '/chapters/vol4/52', '第 52-57 章 · 回宫度亲、罗睺罗出家与戒律初成。'],
  ['卷五 · 戒律与论辩', '/chapters/vol5/58', '第 58-68 章 · 僧团内部张力与外部思想挑战。提婆达多的野心、五法之争。'],
  ['卷六 · 入灭与结集', '/chapters/vol6/69', '第 69-77 章 · 从最后游化到正法传承。娑罗双树入灭，七叶窟结集。'],
];

fs.mkdirSync(targetDocs, { recursive: true });
copyDocs(sourceDocs, targetDocs);
copyAsset('public/favicon.svg', 'docs/public/favicon.svg');
copyAsset('src/assets/logo.svg', 'docs/public/logo.svg');
writeText('docs/.vitepress/config.mts', createConfig());
writeText('docs/.vitepress/theme/index.ts', createThemeEntry());
writeText('docs/.vitepress/theme/custom.css', createThemeCss());

console.log('Migrated Astro Starlight content to VitePress docs/.');

function copyDocs(fromDir, toDir) {
  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const fromPath = path.join(fromDir, entry.name);
    const targetName = entry.name.endsWith('.mdx')
      ? entry.name.replace(/\.mdx$/, '.md')
      : entry.name;
    const toPath = path.join(toDir, targetName);

    if (entry.isDirectory()) {
      fs.mkdirSync(toPath, { recursive: true });
      copyDocs(fromPath, toPath);
      continue;
    }

    if (!entry.name.endsWith('.mdx')) {
      continue;
    }

    const relative = path.relative(sourceDocs, fromPath).replaceAll('\\', '/');
    const content = transformContent(fs.readFileSync(fromPath, 'utf8'), relative);
    writeAbsolute(toPath, content);
  }
}

function transformContent(content, relativePath) {
  let transformed = content.replace(/\r\n/g, '\n');

  if (relativePath === 'index.mdx') {
    transformed = transformed
      .replace(/\nimport \{ Card, CardGrid \} from '@astrojs\/starlight\/components';\n/, '\n')
      .replace(/<CardGrid stagger>[\s\S]*?<\/CardGrid>/, createVolumeGrid());
  }

  const title = extractTitle(transformed);
  const withoutFrontmatter = transformed.replace(/^---[\s\S]*?---\n*/, '');
  if (title && !withoutFrontmatter.trimStart().startsWith('# ')) {
    transformed = transformed.replace(/^(---[\s\S]*?---\n*)/, `$1\n# ${title}\n\n`);
  }

  transformed = normalizeInternalLinks(transformed);

  return transformed.trimEnd() + '\n';
}

function createVolumeGrid() {
  const cards = volumeCards
    .map(([title, href, text]) => [
      `<a class="volume-card" href="${href}">`,
      `<h3>${title}</h3>`,
      `<p>${text}</p>`,
      '</a>',
    ].join('\n'))
    .join('\n');

  return `<div class="volume-grid">\n${cards}\n</div>`;
}

function createConfig() {
  return `import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const volumes = ${JSON.stringify(volumes, null, 2)};

export default defineConfig({
  lang: 'zh-CN',
  title: '菩提树下',
  description: '史诗级宗教传记文学——一个人如何成为觉者。',
  cleanUrls: true,
  lastUpdated: false,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '菩提树下',
    outline: false,
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hiing/BodhiTree-AIBook' },
    ],
    nav: [
      { text: '首页', link: '/' },
      { text: '关于本书', link: '/about' },
    ],
    sidebar: [
      { text: '首页', link: '/' },
      { text: '关于本书', link: '/about' },
      ...volumes.map(([text, directory, start, end]) => ({
        text,
        collapsed: false,
        items: createChapterItems(directory, start, end),
      })),
    ],
    docFooter: {
      prev: '上一章',
      next: '下一章',
    },
  },
});

function createChapterItems(directory: string, start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const chapter = start + index;
    const fileName = String(chapter).padStart(2, '0');
    return {
      text: readTitle(\`chapters/\${directory}/\${fileName}.md\`) ?? \`第 \${chapter} 章\`,
      link: \`/chapters/\${directory}/\${fileName}\`,
    };
  });
}

function readTitle(relativePath: string) {
  const filePath = path.join(docsRoot, relativePath);
  const content = fs.readFileSync(filePath, 'utf8');
  return content.match(/^title:\\s*["']?(.+?)["']?\\s*$/m)?.[1];
}
`;
}

function createThemeEntry() {
  return `import DefaultTheme from 'vitepress/theme';
import './custom.css';

export default DefaultTheme;
`;
}

function createThemeCss() {
  return `:root {
  --vp-font-family-base: Georgia, 'Palatino Linotype', Palatino, 'Noto Serif SC', 'Noto Serif CJK SC', 'Source Han Serif SC', 'Songti SC', 'STSong', 'SimSun', serif;
  --vp-font-family-mono: 'STSong', 'SimSun', serif;
  --vp-c-bg: #faf9f5;
  --vp-c-bg-alt: #f4f1ea;
  --vp-c-bg-soft: #f4f1ea;
  --vp-c-text-1: #141413;
  --vp-c-text-2: #625d55;
  --vp-c-divider: #dfd9cf;
  --vp-c-brand-1: #5f755f;
  --vp-c-brand-2: #7c624f;
  --vp-c-brand-3: #a0826d;
  --vp-sidebar-width: 17rem;
  --vp-layout-max-width: 1180px;
}

.dark {
  --vp-c-bg: #1c1a17;
  --vp-c-bg-alt: #211e1a;
  --vp-c-bg-soft: #27231d;
  --vp-c-text-1: #e0dcd3;
  --vp-c-text-2: #a89f93;
  --vp-c-divider: #3a352e;
}

body {
  line-height: 1.9;
  letter-spacing: 0;
  font-size: 18px;
}

.VPDoc .container {
  max-width: 48rem !important;
}

.VPDoc .content,
.VPDoc .content-container {
  max-width: 48rem !important;
}

.vp-doc p {
  margin: 1.25em 0;
  text-align: justify;
  text-justify: inter-ideograph;
}

.vp-doc h1 {
  margin-top: 0;
  text-align: center;
  font-size: 1.85rem;
  line-height: 1.45;
}

.vp-doc h2 {
  margin-top: 2.2rem;
  border-top: 0;
}

.vp-doc a {
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-divider);
}

.vp-doc a:hover {
  border-bottom-color: var(--vp-c-brand-2);
}

.VPSidebar,
.VPNavBarTitle .title {
  font-family: system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.volume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 0.85rem;
  margin: 1.5rem 0 2rem;
}

.volume-card {
  display: block;
  min-height: 9.5rem;
  padding: 1rem;
  color: inherit;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.volume-card h3 {
  margin: 0 0 0.6rem;
  font-size: 1.05rem;
}

.volume-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.75;
  text-align: left;
}
`;
}

function extractTitle(content) {
  return content.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
}

function normalizeInternalLinks(content) {
  return content
    .replace(/\]\((\/[^)\s]+?)\/\)/g, ']($1)')
    .replace(/href="(\/[^"]+?)\/"/g, 'href="$1"');
}

function copyAsset(fromRelative, toRelative) {
  const from = path.join(root, fromRelative);
  if (!fs.existsSync(from)) {
    return;
  }
  writeAbsolute(path.join(root, toRelative), fs.readFileSync(from));
}

function writeText(relativePath, content) {
  writeAbsolute(path.join(root, relativePath), content);
}

function writeAbsolute(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}
