import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const volumes = [
  [
    "卷一 · 白象入梦",
    "vol1",
    1,
    30
  ],
  [
    "卷二 · 初转法轮",
    "vol2",
    31,
    44
  ],
  [
    "卷三 · 度化双贤与建立精舍",
    "vol3",
    45,
    51
  ],
  [
    "卷四 · 回宫度亲与僧团秩序",
    "vol4",
    52,
    57
  ],
  [
    "卷五 · 戒律与论辩",
    "vol5",
    58,
    68
  ],
  [
    "卷六 · 入灭与结集",
    "vol6",
    69,
    77
  ]
];

export default defineConfig({
  lang: 'zh-CN',
  title: '菩提树下',
  description: '史诗级宗教传记文学——一个人如何成为觉者。',
  cleanUrls: true,
  lastUpdated: false,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    [  'script',
      {
        async: '',
        defer: '',
        'data-website-id': '1606d39a-d534-477e-b082-60f9f2bc8cae',
        src: 'https://umami.hiing.net/script.js'
      }]
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
      text: readTitle(`chapters/${directory}/${fileName}.md`) ?? `第 ${chapter} 章`,
      link: `/chapters/${directory}/${fileName}`,
    };
  });
}

function readTitle(relativePath: string) {
  const filePath = path.join(docsRoot, relativePath);
  const content = fs.readFileSync(filePath, 'utf8');
  return content.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
}
