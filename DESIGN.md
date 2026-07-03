---
version: beta
name: 菩提树下 (Bodhi Tree Under)
description: 东方禅意风格的悉达多觉醒之旅 VitePress 阅读站设计。
sources:
  - https://vitepress.dev
  - https://edgeone.ai
notes:
  - 风格偏向传统纸质书籍与禅宗留白美学。
  - 采用 VitePress 驱动，静态构建部署至 EdgeOne Pages。
  - 檀木暖棕为主色调，朱砂红仅用于印章 Logo 点睛。
colors:
  primary: "#A0826D"
  seal: "#A62B2B"
  background: "#FAF9F5"
  backgroundDark: "#1C1A17"
  text: "#141413"
  textDark: "#E0DCD3"
  muted: "#625D55"
  border: "#DFD9CF"
  accent: "#5F755F"
typography:
  fontFamily: "Georgia, Palatino Linotype, Noto Serif SC, Songti SC, STSong, SimSun, serif"
  lineHeight: "1.9"
  letterSpacing: "0"
  fontSize: "1.125rem"
rounded:
  small: "2px"
  medium: "4px"
  large: "8px"
components:
  reader-container:
    maxWidth: "48rem"
    margin: "0 auto"
  volume-card:
    backgroundColor: "{colors.background}"
    border: "1px solid {colors.border}"
    borderRadius: "4px"
vitepress_theme:
  framework: "VitePress 1.x"
  config: "docs/.vitepress/config.mts"
  customCss: "docs/.vitepress/theme/custom.css"
  contentRoot: "docs"
  output: "docs/.vitepress/dist"
---

## Overview

本设计规范为小说《菩提树下》定制一套具有东方禅意、纸质温润、留白充足、阅读优先的极简界面。站点采用 VitePress 驱动，正文维护在 `docs/` 目录，构建产物输出到 `docs/.vitepress/dist/`。

整体布局强调克制、安静和长篇阅读的耐受性。导航服务于章节查找，视觉焦点始终落在正文。

## Colors

- **主色 (Primary)**: `#A0826D`，檀木暖棕。用于链接、章节卡片标题、当前位置提示等主要交互元素。
- **印章色 (Seal)**: `#A62B2B`，朱砂红。仅用于 Logo 点睛，不扩展为大面积主题色。
- **背景色 (Background)**: `#FAF9F5`，宣纸暖白。避免纯白刺眼，保留纸面温度。
- **文字主色 (Text)**: `#141413`，近墨黑。保证阅读对比度，同时避免纯黑的硬感。
- **辅助文字 (Muted)**: `#625D55`，砚石灰。用于描述、次级导航和弱提示。
- **边框与线 (Border)**: `#DFD9CF`，竹纸浅灰。只承担轻微分隔，不抢正文。
- **点缀色 (Accent)**: `#5F755F`，菩提绿。用于极少数状态和链接 hover 的辅助气质。

## Typography

- **字体族**: 正文优先使用衬线中文字体和 Georgia/Palatino 系列，形成接近纸书的阅读节奏。
- **正文排版**:
  - 字号：`1.125rem`
  - 行高：`1.9`
  - 字间距：`0`
  - 段落间距：`1.25em`
  - 中文段落使用 `text-align: justify` 与 `text-justify: inter-ideograph`

## Layout

- **阅读宽度**: 主内容最大宽度控制在 `48rem` 左右，避免长行疲劳。
- **侧边栏**: 保留卷与章节目录，方便 77 章长篇阅读时快速定位。
- **右侧大纲**: 当前关闭，减少长篇小说阅读中的工具化干扰。
- **卡片**: 只用于首页卷目入口，不做嵌套卡片，不使用强阴影。

## VitePress Theme Mapping

设计 token 主要映射到 VitePress 的 `--vp-*` 变量：

| Design Token | VitePress Variable | Value |
|---|---|---|
| primary | `--vp-c-brand-3` | `#A0826D` |
| brand active | `--vp-c-brand-1` | `#5F755F` |
| brand hover | `--vp-c-brand-2` | `#7C624F` |
| background | `--vp-c-bg` | `#FAF9F5` |
| surface | `--vp-c-bg-soft` | `#F4F1EA` |
| text | `--vp-c-text-1` | `#141413` |
| muted | `--vp-c-text-2` | `#625D55` |
| border | `--vp-c-divider` | `#DFD9CF` |
| fontFamily | `--vp-font-family-base` | Serif reading stack |
| sidebar width | `--vp-sidebar-width` | `17rem` |

## Logo And Usage

- 印章 Logo 保持方正、克制，不旋转、不拉伸、不添加投影。
- 朱砂红只用于 Logo 内部，不参与页面大面积配色。
- 页面背景保持干净，不叠加喧闹纹理和大图。

## Do's And Don'ts

- **Do**: 保持充足留白、稳定行宽和温润纸色背景。
- **Do**: 让导航、搜索、主题切换等工具保持低干扰。
- **Do**: 优先保证移动端与桌面端正文都能自然阅读。
- **Don't**: 使用刺眼亮蓝、强渐变、大圆角药丸按钮。
- **Don't**: 使用复杂动画、音效或会打断阅读节奏的交互。
