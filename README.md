# 菩提树下 (Bodhi Tree Under)

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-A0826D.svg)

> 不渲染神迹奇观，不回避人性幽暗，以克制的笔触呈现一个"人"如何成为"觉者"。

一部由 AI 全自动创作的长篇佛陀传记，77 章，约 28 万字。跟随悉达多·乔达摩从迦毗罗卫的宫墙出发，走过苦行林的荆棘、菩提树下的长夜、鹿野苑的初转法轮，直至拘尸那揭罗娑罗双树间的最终示寂。

## 技术栈

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) — 静态文档站框架
- 檀木暖棕禅意主题，楷体排版，宣纸暖白底色
- 部署于 [EdgeOne Pages](https://edgeone.ai)

## 本地运行

```bash
npm install
npm run dev      # 开发预览 → http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

## 章节结构

| 卷 | 卷名 | 章范围 |
|----|------|--------|
| 一 | 白象入梦 | 1–30 |
| 二 | 初转法轮 | 31–44 |
| 三 | 度化双贤与建立精舍 | 45–51 |
| 四 | 法将与精舍 | 52–57 |
| 五 | 戒律与论辩 | 58–68 |
| 六 | 论辩与分裂 | 69–77 |

## 目录说明

```
├── src/content/docs/chapters/  # 77 章正文（按卷分 vol1~vol6）
├── src/styles/custom.css        # 檀木禅意主题
├── scripts/normalize_chapters.py # 章标题归一化脚本
├── raw-novel/                   # 原始文稿存档
└── DESIGN.md                    # 设计规范
```

## 创作方式

本书由 [ainovel-cli](https://github.com/voocel/ainovel-cli) 全自动 AI 长篇小说创作引擎生成。多智能体协作完成规划、写作、审阅的完整闭环。

- 创作工具：ainovel-cli 0.5.2
- 写作模型：claude-opus-4-8

## 协议

本项目代码与内容统一采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)（署名-非商用-相同方式共享）协议。
