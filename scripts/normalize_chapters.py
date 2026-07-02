#!/usr/bin/env python3
"""
章标题归一化 + Starlight mdx 生成脚本

两阶段执行：
  1. python normalize_chapters.py            → 生成 title_map.json 审核文件
  2. python normalize_chapters.py --write    → 按 title_map.json 生成 77 个 mdx

策略：内容优先 + 大纲补全 + 人工审核
  - 有标题的章节 → 采信文件现有标题
  - 无标题的章节 → 从 outline.json 取候选，标记为 outline-pending，待人工核对
"""

import json
import re
import sys
from pathlib import Path

# ===== 路径配置 =====
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
NOVEL_DIR = Path(r"C:\Users\away\Desktop\ainovel-cli_0.5.2_Windows_x86_64\output\novel")
SRC_DIR = NOVEL_DIR / "chapters"
DEST_DIR = PROJECT_DIR / "src" / "content" / "docs" / "chapters"

# ===== 中文数字转换 =====
def num2hanzi(n):
    digits = "零一二三四五六七八九"
    if n < 10:
        return digits[n]
    if n < 20:
        return "十" + (digits[n - 10] if n > 10 else "")
    if n < 100:
        tens, ones = divmod(n, 10)
        return digits[tens] + "十" + (digits[ones] if ones else "")
    return str(n)

# ===== 标题清洗 =====
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")
CHAPTER_PREFIX_RE = re.compile(r"^第[一二三四五六七八九十百零0-9]+章\s*")

def clean_title(first_line):
    """返回 (is_heading, pure_title)。pure_title 去掉 # 和 '第X章' 前缀。"""
    s = first_line.rstrip()
    m = HEADING_RE.match(s)
    body = m.group(2) if m else s
    if not m and not CHAPTER_PREFIX_RE.match(s):
        return False, None
    pure = CHAPTER_PREFIX_RE.sub("", body).strip()
    return True, pure

# ===== 1. 读取大纲 =====
with open(NOVEL_DIR / "layered_outline.json", encoding="utf-8") as f:
    LAYERED = json.load(f)

with open(NOVEL_DIR / "outline.json", encoding="utf-8") as f:
    OUTLINE = json.load(f)

# ===== 2. 建立 chapter_num -> (vol_index, vol_title, arc_title) =====
vol_of = {}
n = 0
for vol in LAYERED:
    for arc in vol["arcs"]:
        for _ch in arc["chapters"]:
            n += 1
            vol_of[n] = (vol["index"], vol["title"], arc["title"])

assert n == 77, f"展开章数 {n} != 77"

# ===== 3. outline_map =====
om = {c["chapter"]: c for c in OUTLINE}

# ===== 4. 逐章处理，生成 title_map =====
title_map = {}
for i in range(1, 78):
    raw = (SRC_DIR / f"{i:02d}.md").read_text(encoding="utf-8")
    head, _, rest = raw.partition("\n")
    is_head, file_title = clean_title(head)

    ol_title = om[i]["title"]
    if file_title:
        chosen, source = file_title, "file"
    else:
        chosen, source = ol_title, "outline-pending"

    title_map[str(i)] = {
        "vol": vol_of[i][0],
        "vol_title": vol_of[i][1],
        "arc_title": vol_of[i][2],
        "file_title": file_title,
        "outline_title": ol_title,
        "chosen": chosen,
        "source": source,
        "core_event": om[i].get("core_event", "")[:100],
    }

# ===== 5. 输出审核文件 =====
out = SCRIPT_DIR / "title_map.json"
out.write_text(json.dumps(title_map, ensure_ascii=False, indent=2), encoding="utf-8")

# 统计
file_count = sum(1 for v in title_map.values() if v["source"] == "file")
pending_count = sum(1 for v in title_map.values() if v["source"] == "outline-pending")
print(f"[1/2] title_map.json 已生成 -> {out}")
print(f"      有标题(采信文件): {file_count} 章 | 无标题(待审核): {pending_count} 章")

# ===== 6. 生成 mdx（仅在 --write 模式执行）=====
if "--write" in sys.argv:
    # 如果 title_map.json 已存在（人工审核后的版本），优先读取它
    reviewed = SCRIPT_DIR / "title_map.json"
    if reviewed.exists():
        title_map = json.loads(reviewed.read_text(encoding="utf-8"))
        print(f"      已读取审核后的 title_map.json")

    VOL_DIR = {1: "vol1", 2: "vol2", 3: "vol3", 4: "vol4", 5: "vol5", 6: "vol6"}

    for i in range(1, 78):
        key = str(i)
        d = title_map[key]
        raw = (SRC_DIR / f"{i:02d}.md").read_text(encoding="utf-8")
        head, _, rest = raw.partition("\n")
        _, file_title = clean_title(head)
        body = rest if file_title else raw
        body = body.lstrip("\n")

        cn = num2hanzi(i)
        # 转义 frontmatter 中的特殊字符
        chosen_title = d["chosen"].replace('"', '\\"')
        desc = d["core_event"].replace('"', '\\"').replace("\n", " ")

        fm = (
            "---\n"
            f'title: 第{cn}章 {chosen_title}\n'
            f'description: "{desc}"\n'
            "---\n\n"
        )

        target = DEST_DIR / VOL_DIR[d["vol"]] / f"{i:02d}.mdx"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(fm + body, encoding="utf-8")

    print(f"[2/2] 已生成 77 个 mdx -> {DEST_DIR}")
else:
    print("[2/2] 跳过 mdx 生成（加 --write 参数执行最终写入）")
