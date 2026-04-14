/**
 * All UI copy in one place. Components import from here instead of hardcoding text.
 *
 * Structure: organized by screen/component. Edit this file to change any user-facing text.
 * Code changes (layout, logic, styling) go in the component .tsx files.
 *
 * NOTE FOR COPY EDITORS:
 * - Template patterns like {count} or {index} are filled by the component at runtime
 * - Don't change the key names — components reference them
 * - Do change the string values freely
 */

export const landingCopy = {
  badge: 'RCM 第 41 特别分局 · 入职心理评估',
  subtitle: '卷别 04 / 证物 24',
  prefix: '瑞瓦肖公民自卫队 · 人事档案处',
  titleLine1: '新警员',
  titleLine2: '心理分析问卷',
  summary: (count: number) =>
    `本问卷包含 ${count} 道评估，将分析你的思维模式、情绪反应、身体素质与行动倾向。完成后将生成你的思维档案。`,
  backdropLabel: '夜班现场 / dossier wash',
  emblemLabel: '卷宗',
  annotation1Title: '判读方式',
  annotation1Body: '逐题累计技能与属性权重，不做模板贴合，不给人格贴标签。',
  annotation2Title: '现场气味',
  annotation2Body: '旧纸、灰烬、酒渍、红线。没有原图，只有你脑内那面坏掉的案板。',
  startButton: '开始评估',
  ledgerLabel: '目录摘要',
  unitQuestions: '道评估',
  unitSkills: '项指标',
  unitAttributes: '维属性',
  archiveLabel: '目录页 / voices index',
  archiveTitle: '评估维度：四大属性，二十四项心理指标',
  archiveSubtitle: '每一项都会在执勤中影响你的判断与行为。',
}

export const quizCopy = {
  headerLabel: (index: number) => `心理评估 / 第 ${String(index + 1).padStart(2, '0')} 项`,
  headerTitle: '请选择最接近你真实反应的选项。',
  backButton: '上一题',
  restartButton: '重新开始',
  progress: (index: number, total: number) => `第 ${index + 1} / ${total} 题`,
  answered: (label: string) => `已作答：${label}`,
  notAnswered: '尚未作答',
  questionTypeLikert: '陈述题',
  questionTypeScenario: '情境题',
  sceneLabel: '评估背景',
  statusLabel: '已作答',
  statusPending: '待作答',
  voicesLabel: '相关指标',
  voicesCount: (count: number) => `${count} 项心理指标`,
  likertDocket: (index: number) => `强度档 ${String(index + 1).padStart(2, '0')}`,
  scenarioDocket: (index: number) => `证词片段 ${String(index + 1).padStart(2, '0')}`,
  stampLabel: (index: number) => `归档序号 ${String(index + 1).padStart(2, '0')}`,
  tagsAriaLabel: '问题现场标签',
  tagsFallback: '卷宗整理中',
  cueLikert: '从否认到认领，选一张最像你的口供。',
  cueScenario: '三份处理方式里，哪一份最像你会先伸手去拿的那张。',
}

export const sceneCopy = {
  likertTitle: '自我陈述评估',
  scenarioTitle: '情境反应评估',
  likertLead: '请评估以下陈述与你的匹配程度。',
  scenarioLead: '以下情境中，哪种反应最接近你的第一直觉？',
  likertNote: '不存在正确答案。如实回答即可。',
  scenarioNote: '选择你最可能采取的行动，而非你认为正确的行动。',
}

export const resultCopy = {
  reportLabel: '心理评估报告 / personnel psych profile',
  reportComplete: '评估完成',
  posterPrefix: '主导心理指标 / dominant trait',
  posterPortraitLabel: '主导指标 / portrait cut',
  dominantAttribute: '主导属性',
  secondTrait: '第二指标',
  thirdTrait: '第三指标',
  thoughtPattern: '思维模式',
  summaryLabel: '评估摘要',
  lineupAriaLabel: '前三指标海报线列',
  exportSaving: '正在生成 PNG',
  exportSaved: '海报已保存',
  exportError: '导出失败，请重试',
  exportButton: '保存海报 PNG',
  restartButton: '重新测试',
  traitRecordLabel: '指标记录',
  traitRecordTitle: '最显著的三项指标',
  traitDocket: (index: number) => `证词 ${String(index + 1).padStart(2, '0')}`,
  traitScore: (score: number) => `强度 ${score}`,
  thoughtLabel: '思维模式倾向',
  attributeMapLabel: '属性现场图',
  attributeMapTitle: '四大属性在给哪股冲动供电',
  archiveLabel: '总档案',
  archiveTitle: '二十四项指标，按维度归档',
  hesitationLabel: '犹豫记录',
  hesitationTitle: (count: number) => `${count} 次"说不准"`,
  hesitationLow: '偶尔的犹豫是正常的。说明你在认真对待每一道题。',
  hesitationMedium:
    '你有不少问题选了"说不准"。也许你在回避某些判断，也许你真的不确定。两种都值得注意。',
  hesitationHigh:
    '大量的"说不准"。你在回避做出判断。在 41 分局，犹豫的代价比犯错更高。',
}

export const characterReviewCopy = {
  sectionLabel: '同事评价 / peer assessment',
  sectionTitle: '他们看了你的档案',
}

export const commentaryCopy = {
  ariaLabel: '内心声音',
  label: '内心声音',
}

export const monologueCopy = {
  label: '主导技能独白',
}

export const evidenceCopy = {
  selected: '已归档',
  docket: (order: number) => `证片 ${String(order).padStart(2, '0')}`,
}

export const diamondCopy = {
  title: '四大属性现场图',
  description: '四条轴不是汇报图表。它们只是说明，你在混乱里最先往哪边供电。',
}
