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
					label: '卷四 · 法将与精舍',
					items: [{ autogenerate: { directory: 'chapters/vol4' } }],
				},
				{
					label: '卷五 · 戒律与论辩',
					items: [{ autogenerate: { directory: 'chapters/vol5' } }],
				},
				{
					label: '卷六 · 论辩与分裂',
					items: [{ autogenerate: { directory: 'chapters/vol6' } }],
				},
			],
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/hiing/BodhiTree-AIBook' },
			],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			pagination: true,
			lastUpdated: false,
		}),
	],
});
