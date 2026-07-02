// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://bodhitree.edgeone.app',
	integrations: [
		starlight({
			title: '菩提树下',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
			},
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
			},
			defaultLocale: 'root',
			head: [
				{
					tag: 'script',
					content: `
						try {
							if (localStorage.getItem('starlight-theme') === null) {
								localStorage.setItem('starlight-theme', 'light');
							}
							if (localStorage.getItem('starlight-theme') === 'light') {
								document.documentElement.dataset.theme = 'light';
							}
						} catch {}
					`,
				},
			],
			sidebar: [
				{ label: '首页', slug: 'index' },
				{ label: '关于本书', slug: 'about' },
				{
					label: '卷一 · 白象入梦',
					items: [{ autogenerate: { directory: 'chapters/vol1' } }],
				},
				{
					label: '卷二 · 初转法轮',
					items: [{ autogenerate: { directory: 'chapters/vol2' } }],
				},
				{
					label: '卷三 · 度化双贤与建立精舍',
					items: [{ autogenerate: { directory: 'chapters/vol3' } }],
				},
				{
					label: '卷四 · 回宫度亲与僧团秩序',
					items: [{ autogenerate: { directory: 'chapters/vol4' } }],
				},
				{
					label: '卷五 · 戒律与论辩',
					items: [{ autogenerate: { directory: 'chapters/vol5' } }],
				},
				{
					label: '卷六 · 入灭与结集',
					items: [{ autogenerate: { directory: 'chapters/vol6' } }],
				},
			],
		customCss: ['./src/styles/custom.css'],
		social: [
			{ icon: 'github', label: 'GitHub', href: 'https://github.com/hiing/BodhiTree-AIBook' },
		],
		tableOfContents: false,
		pagination: true,
		lastUpdated: false,
		}),
	],
});
