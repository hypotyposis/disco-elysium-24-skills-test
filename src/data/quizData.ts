import type { QuizQuestion } from '../types/quiz.ts'

export const likertScale = [
  { value: -2, label: '完全不像我', tone: '这不是你的口供。' },
  { value: -1, label: '有点不像', tone: '只在坏天气里偶尔出现。' },
  { value: 0, label: '说不准', tone: '证词不足，暂不归档。' },
  { value: 1, label: '有点像我', tone: '声音已经贴近耳边。' },
  { value: 2, label: '非常像我', tone: '它几乎替你先开口。' },
] as const

export const quizQuestions = [
  {
    id: 'likert-evidence',
    kind: 'likert',
    prompt: '面对一团乱麻时，我更信证据，而不是预感。',
    monologue: '先让桌上的灰尘说话。',
    agree: {
      skills: { Logic: 3, 'Visual Calculus': 2 },
      attributes: { Intellect: 2 },
    },
    disagree: {
      skills: { 'Inland Empire': 2, Shivers: 2 },
      attributes: { Psyche: 1, Fysique: 1 },
    },
  },
  {
    id: 'likert-trivia',
    kind: 'likert',
    prompt: '只要话题稍微开个缝，我就会把背景知识全倒出来。',
    monologue: '档案柜已经自己弹开了。',
    agree: {
      skills: { Encyclopedia: 3, Rhetoric: 1 },
      attributes: { Intellect: 2 },
    },
    disagree: {
      skills: { 'Perception (Sight)': 2, Composure: 1 },
      attributes: { Motorics: 1, Intellect: 1 },
    },
  },
  {
    id: 'likert-argument',
    kind: 'likert',
    prompt: '听别人说话时，我会本能地寻找漏洞、偷换概念和漏掉的前提。',
    monologue: '句子正在自动拆件。',
    agree: {
      skills: { Rhetoric: 3, Logic: 2 },
      attributes: { Intellect: 2 },
    },
    disagree: {
      skills: { Empathy: 2, Suggestion: 1 },
      attributes: { Psyche: 2 },
    },
  },
  {
    id: 'likert-performance',
    kind: 'likert',
    prompt: '如果事实太干瘪，我会忍不住把它讲得更有戏一点。',
    monologue: '真相配得上一盏追光灯。',
    agree: {
      skills: { Drama: 3, Suggestion: 2 },
      attributes: { Intellect: 1, Psyche: 1 },
    },
    disagree: {
      skills: { Volition: 2, Composure: 2 },
      attributes: { Psyche: 1, Motorics: 1 },
    },
  },
  {
    id: 'likert-aesthetic',
    kind: 'likert',
    prompt: '破楼、旧歌、奇怪的衣料，会在我脑中自动长出画面和意义。',
    monologue: '现实正往外渗颜料。',
    agree: {
      skills: { Conceptualization: 3, 'Inland Empire': 2 },
      attributes: { Intellect: 1, Psyche: 1 },
    },
    disagree: {
      skills: { Logic: 1, Composure: 1 },
      attributes: { Intellect: 1, Motorics: 1 },
    },
  },
  {
    id: 'likert-reconstruction',
    kind: 'likert',
    prompt: '只要给我一点痕迹，我就会开始在脑中重建现场。',
    monologue: '脚印、弹道、倒下的椅子，全部归位。',
    agree: {
      skills: { 'Visual Calculus': 3, 'Perception (Sight)': 2 },
      attributes: { Intellect: 1, Motorics: 1 },
    },
    disagree: {
      skills: { Shivers: 2, 'Inland Empire': 1 },
      attributes: { Fysique: 1, Psyche: 1 },
    },
  },
  {
    id: 'likert-self-control',
    kind: 'likert',
    prompt: '哪怕情绪塌下来，我心里也还有个声音会逼我站直。',
    monologue: '别现在垮。先把领口整理好。',
    agree: {
      skills: { Volition: 3, Composure: 2 },
      attributes: { Psyche: 1, Motorics: 1 },
    },
    disagree: {
      skills: { Electrochemistry: 2, 'Half Light': 1 },
      attributes: { Fysique: 2 },
    },
  },
  {
    id: 'likert-emotional-cues',
    kind: 'likert',
    prompt: '别人没说出口的难过或怨气，我通常会先一步感觉到。',
    monologue: '房间里最重的东西，往往不是家具。',
    agree: {
      skills: { Empathy: 3, Suggestion: 1 },
      attributes: { Psyche: 2 },
    },
    disagree: {
      skills: { Logic: 1, Composure: 2 },
      attributes: { Intellect: 1, Motorics: 1 },
    },
  },
  {
    id: 'likert-dominance',
    kind: 'likert',
    prompt: '一进紧张场面，我会先判断谁在掌权，谁在试探底线。',
    monologue: '这间屋子里，总得有人先把气压压住。',
    agree: {
      skills: { Authority: 3, 'Half Light': 2 },
      attributes: { Psyche: 1, Fysique: 1 },
    },
    disagree: {
      skills: { Empathy: 1, Volition: 1 },
      attributes: { Psyche: 2 },
    },
  },
  {
    id: 'likert-badge',
    kind: 'likert',
    prompt: '队伍、规章和“我们是一伙的”这件事，对我有天然吸引力。',
    monologue: '徽章不只是金属，它还是某种誓言。',
    agree: {
      skills: { 'Esprit de Corps': 3, Authority: 1 },
      attributes: { Psyche: 2 },
    },
    disagree: {
      skills: { 'Savoir Faire': 2, Conceptualization: 1 },
      attributes: { Motorics: 1, Intellect: 1 },
    },
  },
  {
    id: 'likert-soft-persuasion',
    kind: 'likert',
    prompt: '我更喜欢让人自己点头，而不是硬把道理塞进去。',
    monologue: '轻一点。线从来不是用来砸人的。',
    agree: {
      skills: { Suggestion: 3, Rhetoric: 1 },
      attributes: { Psyche: 2 },
    },
    disagree: {
      skills: { 'Physical Instrument': 2, Authority: 1 },
      attributes: { Fysique: 2 },
    },
  },
  {
    id: 'likert-pain',
    kind: 'likert',
    prompt: '疼痛和难堪通常不会让我退后，反而会让我更固执。',
    monologue: '把牙关咬紧，别让世界听见。',
    agree: {
      skills: { Endurance: 2, 'Pain Threshold': 3 },
      attributes: { Fysique: 2 },
    },
    disagree: {
      skills: { Volition: 1, Empathy: 1 },
      attributes: { Psyche: 2 },
    },
  },
  {
    id: 'likert-body-solution',
    kind: 'likert',
    prompt: '面对障碍时，我首先想到的是直接动手、上肩、发力。',
    monologue: '如果门不懂礼貌，那就让铰链懂。',
    agree: {
      skills: { 'Physical Instrument': 3, 'Reaction Speed': 1 },
      attributes: { Fysique: 2, Motorics: 1 },
    },
    disagree: {
      skills: { Logic: 2, Interfacing: 1 },
      attributes: { Intellect: 1, Motorics: 1 },
    },
  },
  {
    id: 'likert-temptation',
    kind: 'likert',
    prompt: '一累、一空、一烦，我就更容易被即时快感牵走。',
    monologue: '再来一点。就一点。你知道这句台词的后果。',
    agree: {
      skills: { Electrochemistry: 3, 'Savoir Faire': 1 },
      attributes: { Fysique: 2, Motorics: 1 },
    },
    disagree: {
      skills: { Volition: 2, Endurance: 1 },
      attributes: { Psyche: 1, Fysique: 1 },
    },
  },
  {
    id: 'likert-city-voice',
    kind: 'likert',
    prompt: '夜色、风向和楼体回音，有时会像城市在跟我通风报信。',
    monologue: '砖墙知道的，通常比报纸多。',
    agree: {
      skills: { Shivers: 3, 'Inland Empire': 1 },
      attributes: { Fysique: 2, Psyche: 1 },
    },
    disagree: {
      skills: { Logic: 1, 'Visual Calculus': 1 },
      attributes: { Intellect: 2 },
    },
  },
  {
    id: 'likert-sensory-scan',
    kind: 'likert',
    prompt: '细小的声音、视线偏移和动作异常，常常会先于语言闯进我脑子。',
    monologue: '你已经看到它了，只是别人还没承认。',
    agree: {
      skills: { 'Perception (Sight)': 3, 'Reaction Speed': 2 },
      attributes: { Motorics: 2 },
    },
    disagree: {
      skills: { Empathy: 1, Encyclopedia: 1 },
      attributes: { Psyche: 1, Intellect: 1 },
    },
  },
  {
    id: 'scenario-crime-scene',
    kind: 'scenario',
    prompt:
      '你踏进一处陌生现场。地上有水迹，墙角有烟灰，窗缝还在漏风。你先做什么？',
    monologue: '第一步，往往决定接下来是谁在脑子里掌舵。',
    options: [
      {
        id: 'crime-scene-angles',
        label: '先量角度、看痕迹、重建发生顺序。',
        insight: '让现场自己作证。',
        effects: {
          skills: { 'Visual Calculus': 3, Logic: 2 },
          attributes: { Intellect: 2 },
        },
      },
      {
        id: 'crime-scene-witness',
        label: '先去找最不安的人谈，让他把裂缝说出来。',
        insight: '人心比灰尘更容易留下热度。',
        effects: {
          skills: { Empathy: 2, Suggestion: 2, Volition: 1 },
          attributes: { Psyche: 2 },
        },
      },
      {
        id: 'crime-scene-scan',
        label: '先扫出口、死角和每一处反光，给自己找最稳的位置。',
        insight: '先看见危险，再看见故事。',
        effects: {
          skills: {
            'Perception (Sight)': 2,
            'Reaction Speed': 2,
            'Hand/Eye Coordination': 1,
          },
          attributes: { Motorics: 2 },
        },
      },
    ],
  },
  {
    id: 'scenario-bar',
    kind: 'scenario',
    prompt: '酒吧里气氛快炸了。有人抬高下巴，有人把手藏进口袋。你怎么进场？',
    monologue: '门后是一池酒精、敌意和审美疲劳。',
    options: [
      {
        id: 'bar-force',
        label: '把肩膀顶进去，先把场面压住。',
        insight: '让空气知道谁更硬。',
        effects: {
          skills: { Authority: 2, 'Physical Instrument': 2, 'Half Light': 1 },
          attributes: { Psyche: 1, Fysique: 2 },
        },
      },
      {
        id: 'bar-charm',
        label: '先跟吧台打成一片，笑着把消息引出来。',
        insight: '真相总爱从松开的嘴角漏出来。',
        effects: {
          skills: { Drama: 2, Suggestion: 2, Empathy: 1 },
          attributes: { Intellect: 1, Psyche: 2 },
        },
      },
      {
        id: 'bar-slip',
        label: '贴着镜面和阴影走，顺手摸清谁在看谁。',
        insight: '最好的登场，是别人一秒后才反应过来。',
        effects: {
          skills: { 'Savoir Faire': 3, Composure: 1, Interfacing: 1 },
          attributes: { Motorics: 2 },
        },
      },
    ],
  },
  {
    id: 'scenario-bottle',
    kind: 'scenario',
    prompt: '凌晨街口，冷风灌进领口。一个旧酒瓶正好滚到你脚边。你会？',
    monologue: '城市把一种答案推到了鞋尖前。',
    options: [
      {
        id: 'bottle-refuse',
        label: '把它踢远，继续往案子那边走。',
        insight: '不是今晚。至少不是今晚。',
        effects: {
          skills: { Volition: 2, Endurance: 2, Composure: 1 },
          attributes: { Psyche: 2, Fysique: 1, Motorics: 1 },
        },
      },
      {
        id: 'bottle-taste',
        label: '拧开闻一口，再给自己一个借口。',
        insight: '快感最擅长伪装成灵感。',
        effects: {
          skills: { Electrochemistry: 3, Conceptualization: 1, Drama: 1 },
          attributes: { Fysique: 2, Intellect: 1 },
        },
      },
      {
        id: 'bottle-listen',
        label: '不碰它，只站着听电线和雾气发出的声音。',
        insight: '也许夜本身就在做证。',
        effects: {
          skills: { Shivers: 3, 'Inland Empire': 2 },
          attributes: { Fysique: 2, Psyche: 1 },
        },
      },
    ],
  },
  {
    id: 'scenario-partner',
    kind: 'scenario',
    prompt: '搭档抛出一个并不高明的计划，还正看着你等表态。你会？',
    monologue: '忠诚、正确与体面，不一定站在一边。',
    options: [
      {
        id: 'partner-cover',
        label: '先兜住局面，再想办法悄悄修正。',
        insight: '别让阵线在外人面前散掉。',
        effects: {
          skills: { 'Esprit de Corps': 3, Volition: 1, Authority: 1 },
          attributes: { Psyche: 2 },
        },
      },
      {
        id: 'partner-argue',
        label: '直接把漏洞一条条拆给他看。',
        insight: '错就是错，别指望友情替它润色。',
        effects: {
          skills: { Rhetoric: 2, Logic: 2, Encyclopedia: 1 },
          attributes: { Intellect: 2 },
        },
      },
      {
        id: 'partner-improvise',
        label: '嘴上答应，身体先开始改动路线和节奏。',
        insight: '让修补看起来像本来就这么设计。',
        effects: {
          skills: { 'Reaction Speed': 2, 'Savoir Faire': 2, Composure: 1 },
          attributes: { Motorics: 2 },
        },
      },
    ],
  },
  {
    id: 'scenario-machine',
    kind: 'scenario',
    prompt:
      '你面前是一台上锁的旧机器，线头裸着，金属壳体还留着焦痕。你最想怎么处理？',
    monologue: '有些门写着“危险”，其实只是等人读懂它们。',
    options: [
      {
        id: 'machine-open',
        label: '拆开它，直接读懂它的工作方式。',
        insight: '螺丝和电路，比人诚实。',
        effects: {
          skills: { Interfacing: 3, Logic: 1, 'Perception (Sight)': 1 },
          attributes: { Motorics: 2, Intellect: 1 },
        },
      },
      {
        id: 'machine-interpret',
        label: '先看它像什么、象征什么，再决定要不要碰。',
        insight: '也许这不是机器，而是一句金属做的隐喻。',
        effects: {
          skills: { Conceptualization: 2, 'Inland Empire': 2, Encyclopedia: 1 },
          attributes: { Intellect: 2, Psyche: 1 },
        },
      },
      {
        id: 'machine-force',
        label: '抓住边缘就掰，能响就说明它会开。',
        insight: '有些结构只认力道。',
        effects: {
          skills: {
            'Physical Instrument': 2,
            'Half Light': 2,
            'Pain Threshold': 1,
          },
          attributes: { Fysique: 2 },
        },
      },
    ],
  },
  {
    id: 'scenario-lie',
    kind: 'scenario',
    prompt:
      '审讯桌对面的人在撒谎。不是大谎，是那种以为自己藏得住的小谎。你怎么撬？',
    monologue: '裂缝已经出现，只差你把光打进去。',
    options: [
      {
        id: 'lie-posture',
        label: '盯他的下颌、手指和肩线，等身体先背叛嘴。',
        insight: '姿态会先泄密。',
        effects: {
          skills: { Composure: 2, 'Perception (Sight)': 2, Drama: 1 },
          attributes: { Motorics: 2, Intellect: 1 },
        },
      },
      {
        id: 'lie-emotion',
        label: '找到他最不想被碰的情绪，把门往里推一点。',
        insight: '心口松了，舌头就会跟着松。',
        effects: {
          skills: { Empathy: 2, Suggestion: 2, Authority: 1 },
          attributes: { Psyche: 2 },
        },
      },
      {
        id: 'lie-logic',
        label: '拿时间线和细节把他绕回自相矛盾里。',
        insight: '让谎言自己和自己打起来。',
        effects: {
          skills: { Logic: 2, Rhetoric: 2, 'Visual Calculus': 1 },
          attributes: { Intellect: 2 },
        },
      },
    ],
  },
  {
    id: 'scenario-shot',
    kind: 'scenario',
    prompt: '远处忽然一声枪响，碎玻璃同时落地。你身体先做哪件事？',
    monologue: '答案不会等你开会，它已经在神经里起跑了。',
    options: [
      {
        id: 'shot-aim',
        label: '抬眼找线位、掩体和回射角度。',
        insight: '命中率是一种礼貌。',
        effects: {
          skills: {
            'Hand/Eye Coordination': 3,
            'Reaction Speed': 2,
            'Half Light': 1,
          },
          attributes: { Motorics: 2, Fysique: 1 },
        },
      },
      {
        id: 'shot-push',
        label: '压住痛觉和惊吓，顶着往前。',
        insight: '先活住，再谈优雅。',
        effects: {
          skills: {
            Endurance: 2,
            'Pain Threshold': 2,
            'Physical Instrument': 1,
          },
          attributes: { Fysique: 2 },
        },
      },
      {
        id: 'shot-command',
        label: '先把人拽低、分位、控住混乱。',
        insight: '有人得在这秒钟把秩序重新点亮。',
        effects: {
          skills: { Authority: 2, 'Esprit de Corps': 2, Volition: 1 },
          attributes: { Psyche: 2 },
        },
      },
    ],
  },
  {
    id: 'scenario-letter',
    kind: 'scenario',
    prompt:
      '旧卷宗里掉出一封被折过很多次的信。纸边发脆，字有些抖。你先读哪一层？',
    monologue: '纸张永远不会只保留一种意义。',
    options: [
      {
        id: 'letter-context',
        label: '先查日期、地点和信里提到的背景。',
        insight: '上下文是情绪的骨架。',
        effects: {
          skills: { Encyclopedia: 2, Logic: 2 },
          attributes: { Intellect: 2 },
        },
      },
      {
        id: 'letter-subtext',
        label: '先读里面没写出来的爱、愧疚和退缩。',
        insight: '空白处往往比字更响。',
        effects: {
          skills: { 'Inland Empire': 2, Empathy: 2, Drama: 1 },
          attributes: { Psyche: 2, Intellect: 1 },
        },
      },
      {
        id: 'letter-traces',
        label: '先看折痕、墨迹、手势和这封信是怎么被保存下来的。',
        insight: '材料的记忆，不比文字少。',
        effects: {
          skills: {
            'Perception (Sight)': 1,
            Interfacing: 2,
            'Visual Calculus': 2,
          },
          attributes: { Motorics: 1, Intellect: 1 },
        },
      },
    ],
  },
] satisfies readonly QuizQuestion[]
