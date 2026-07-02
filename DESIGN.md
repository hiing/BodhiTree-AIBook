---
version: alpha
name: 菩提树下 (Bodhi Tree Under)
description: 东方禅意风格的悉达多觉醒之旅小说文档站设计。
sources:
  - https://astro.build
  - https://starlight.astro.build
  - https://edgeone.ai
notes:
  - 风格偏向于传统的纸质书籍与禅宗留白美学。
  - 采用 Astro Starlight 驱动，静态构建部署至 EdgeOne Pages。
  - 檀木暖棕为主色调，朱砂红仅用于印章 Logo 点睛。
colors:
  primary: "#A0826D"          # 檀木暖棕（主色，用于 --sl-color-primary-*）
  seal: "#A62B2B"             # 朱砂红（仅印章 logo / 激活点睛，不进 primary 色阶）
  background: "#FAF7F0"       # 宣纸暖白（浅色模式主背景）
  backgroundDark: "#1C1A17"   # 黛黑（深色模式主背景，带暖色）
  text: "#1C1A17"             # 黛黑水墨色（浅色模式主文字）
  textDark: "#E0DCD3"         # 象牙/瓦灰（深色模式主文字）
  muted: "#7A7267"            # 砚石灰（次级辅助文字）
  border: "#E6E1D8"           # 竹纸浅灰（边框与分割线）
  accent: "#4B7055"           # 菩提翠绿（用于叶片点缀、微弱提示）
typography:
  fontFamily: "Kaiti SC, STKaiti, Xingkai SC, Kaiti, SimSun, Georgia, serif"
  lineHeight: "1.9"
  letterSpacing: "0.05em"
  fontSize: "1.0625rem"
rounded:
  small: "2px"
  medium: "4px"
  large: "8px"
components:
  seal:
    color: "#FAF7F0"
    backgroundColor: "{colors.seal}"
    border: "1px solid {colors.seal}"
  reader-container:
    maxWidth: "42rem"
    padding: "3rem 1.5rem"
    margin: "0 auto"
  callout-zen:
    backgroundColor: "#F4EFE6"
    borderLeft: "4px solid {colors.accent}"
starlight_tokens:
  framework: "Astro Starlight 0.41.x"
  customCss: "src/styles/custom.css"
  primary_scale: "#A0826D 为 500 阶，向 50/950 两端派生"
  font_var: "--sl-font"
  content_width: "42rem"
---

## Overview
本设计规范旨在为小说《菩提树下》（悉达多的觉醒之路）定制一套具有"东方禅意、水墨留白、纸质温润、印章点缀"的极简阅读界面。采用 Astro Starlight 驱动，静态构建部署至 EdgeOne Pages，整体布局强调"呼吸感"与"克制"。

## Colors
- **主色 (Primary)**: `#A0826D`（檀木暖棕）。沉静、温润的木质色调，用于导航高亮、链接、侧边栏激活态等主要交互元素，营造沉稳的阅读氛围。
- **印章色 (Seal)**: `#A62B2B`（朱砂红）。传统印章和题款的色彩，仅用于 Logo 印章图案，不进入 primary 色阶，避免喧宾夺主。
- **背景色 (Background)**: `#FAF7F0`（宣纸色）。不使用刺眼的纯白，而是带有温润微黄的植物纤维纸张质感，能够减少长期阅读的视觉疲劳。
- **文字主色 (Text)**: `#1C1A17`（黛黑/砚黑）。带有一点微暖的极深灰色，非纯黑，模仿墨汁落于宣纸干涸后的水墨黑。
- **辅助文字 (Muted)**: `#7A7267`（砚石灰）。用于章节描述、日期、侧边栏非激活导航。
- **边框与线 (Border)**: `#E6E1D8`（竹纸灰）。极轻的墨线，用于细微的分隔，绝不喧宾夺主。
- **点缀色 (Accent)**: `#4B7055`（菩提翠绿）。用于极少数微弱提示，如禅意提示框的左侧竖线。

## Typography
- **字体族**: 优先使用楷体（`Kaiti SC`, `STKaiti`）与宋体（`SimSun`, `serif`）。展现类似宋版书或手抄卷的古典感，而不是现代的黑体（Sans-serif）。
- **正文排版**:
  - 字号：`1.0625rem` (17px)
  - 行高：`1.9`（提供宽裕的字行间隙，增加呼吸感）
  - 字间距：`0.05em`
  - 段落间距：`1.4em`（段落之间有明显的留白，不采用首行缩进，而是采用极简的段落留白划分段落）

## Layout
- **留白比例**: 内容区域最大宽度控制在 `42rem` (672px)，居中对齐，左右两边留出大量宣纸底色，营造"空灵"与"静思"的禅修状态。通过覆盖 Starlight 的 `.main-frame` max-width 实现。
- **去工具化**: 侧边栏和主顶部导航应使用超低对比度的文字，关闭面包屑导航和最后更新时间，让读者的注意力百分之百沉浸在故事文字中。

## Components
- **印章 Logo (Seal Logo)**:
  - 一个小正方形方块，背景朱砂红 `#A62B2B`，中间白字"菩提"。用作网站的徽标，不旋转不投影。
- **禅意提示框 (Zen Callout)**:
  - 背景为 `#F4EFE6`（带一点泥土与檀香色），左侧配菩提翠绿的细竖线。
- **章节卡片 (Chapter Card)**:
  - 扁平化，没有现代科技感的阴影和强渐变，只有竹纸灰的细边框，或者仅用留白区隔。

## Starlight Token Mapping
DESIGN.md tokens 到 Starlight `--sl-*` CSS 变量的映射关系：

| Design Token | Starlight Variable | Value |
|---|---|---|
| primary (檀木棕) | `--sl-color-primary-500` | `#A0826D` |
| primary 派生 | `--sl-color-primary-50~950` | 檀木棕色阶 |
| accent (菩提翠绿) | `--sl-color-accent-500` | `#5A8266` |
| background | `--sl-color-bg` | `#FAF7F0` |
| text | `--sl-color-text` | `#1C1A17` |
| muted | `--sl-color-text-muted` | `#7A7267` |
| border | `--sl-color-border` | `#E6E1D8` |
| fontFamily | `--sl-font` | `Kaiti SC, STKaiti, ...` |

## Logo And Usage
- 印章不可随意旋转、拉伸或添加投影。
- 保证背景的干净，切勿在水墨渲染以外添加喧嚣的背景大图。
- 朱砂红 `#A62B2B` 仅出现在 SVG Logo 内部，不出现在 CSS 色阶变量中。

## Do's and Don'ts
- **Do**: 保持页面的极其宽敞的 padding 和 margin。
- **Do**: 保持字体的衬线体/楷书质感。
- **Don't**: 使用刺眼的亮蓝色链接、大面积渐变或圆角很大的药丸状按钮（例如 `rounded-full`）。
- **Don't**: 频繁使用动态交互音效或复杂的闪烁动效。所有转场应如同墨水在水中的缓慢晕染般柔和。
