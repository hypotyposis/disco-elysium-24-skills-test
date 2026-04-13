# Disco Elysium 24 技能人格测试 — Iteration 1

## Goal

搭一个单页测试站，主题是“你脑子里，哪一个《极乐迪斯科》技能在主导你？”。

## Tech

- Vite + React + TypeScript
- 静态数据驱动
- 需要能直接 `npm run dev` 本地预览

## Hard Requirements

1. 中文优先界面。
2. 基于 `src/data/discoSkillReference.json` 的 24 技能与 4 大属性。
3. 结果必须是 24 技能中的一个主技能，并展示 Top 3 voices。
4. 结果页必须展示 4 大属性（智力 / 精神 / 体格 / 身手）的可视化。
5. 风格要贴《极乐迪斯科》：
   - 暗调
   - 油画/旧纸/颗粒感
   - 酒红、黄铜、烟灰、墨黑
   - 文案要有一点“内心旁白”的味道
6. 不要直接使用游戏原图；用纯 CSS / SVG / 渐变 / 噪点模拟氛围。
7. 代码需要可维护：组件化、类型清晰、数据和视图分离。
8. 补上 Prettier，并提供脚本：
   - `npm run format`
   - `npm run lint`
   - `npm run typecheck`

## Product Shape

### Landing

- 标题：强调“哪一个技能在替你说话”
- 一段短副标题
- 开始测试按钮
- 可以有一句很短的 flavor 文案，但不要直接抄原作台词

### Quiz

- 总题量：24 题
  - 建议 16 个 likert statements
  - 8 个 scenario questions
- 进度条 + 当前题号
- 选项交互要清晰，移动端可点
- 文案要像心理侧写，不要像 MBTI 企业培训问卷

### Result

- 主结果：技能名（中英双语都可展示）
- 一句 punchline
- 一段解释：这个技能如何看世界、如何处理人际、如何在压力下表现
- Top 3 技能
- 4 大属性可视化（雷达 / 菱形 / bar 都可以）
- 24 技能分组视图：按 4 大属性分组，每组 6 个 skill，小条显示强弱
- “思维殿堂倾向”小卡片：不是正式 Thought Cabinet 系统，只是 flavor 文案
- 重新测试按钮

## Scoring

- 不要做 24 个固定 profile 的欧氏距离匹配；改成直接累计 skill scores。
- 每道题直接影响：
  - 若干 skills
  - 若干 4 大属性
- 最终：
  - `primarySkill` = 分数最高的技能
  - `top3Skills` = 前三
  - `attributeScores` = 4 大属性归一化到 0-100
- 结果文案可以基于主技能 + 次技能组合生成。

## Suggested File Structure

- `src/data/discoSkillReference.json`
- `src/data/quizData.ts`
- `src/lib/scoring.ts`
- `src/components/*`
- `src/App.tsx`
- `src/index.css`

## Tone Notes

- 不是赛博霓虹，不是动漫，不是金属乐海报。
- 更像：
  - 旧油画
  - 烟雾
  - 脏金色字体
  - 微微发霉的纸张
  - 警探脑中自我审讯的感觉

## Nice to Have

- 分享文案按钮
- 将结果摘要复制到剪贴板
- 轻微动效（呼吸、浮尘、扫描线），但不要廉价

## Verification

完成后必须跑：

1. `npm run format`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
