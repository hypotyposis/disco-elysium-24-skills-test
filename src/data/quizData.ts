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
    prompt: '当现场像一头被开膛破肚的巨兽横在你面前，你是否更倾向于在灰尘和烟蒂中寻找线索，而不是听从肚子里那个正在发芽的、该死的“预感”？',
    monologue: '先让桌上的灰尘说话，它们比你的直觉更诚实。',
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
    prompt: '只要话题稍微露出一点缝隙，你脑子里那些毫无用处的背景知识就会像决堤的洪水一样喷涌而出，拦都拦不住？',
    monologue: '档案柜已经自己弹开了，警探。没人能阻止真相——即使它是完全无关紧要的那种。',
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
    prompt: '听别人说话时，你是否会本能地拆解他们的句子，寻找那些该死的漏洞、偷换的概念和漏掉的前提，像个专业的法医在解剖尸体？',
    monologue: '句子正在自动拆件。真相就藏在那些没说出口的虚词里。',
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
    prompt: '如果事实看起来太干瘪、太无聊，你是否会忍不住给它加点戏，把它讲得像一场惊心动魄的独角戏？',
    monologue: '真相配得上一盏追光灯，大人。哪怕那是用谎言装饰出来的。',
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
    prompt: '那些破败的楼房、过时的旧歌、甚至是某种奇怪的衣料质感，是否会在你脑中自动长出画面，仿佛它们在向你诉说某种宏大的意义？',
    monologue: '现实正在往外渗出颜料。你不仅在看，你还在重新构思这个世界。',
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
    prompt: '只要给你一点点痕迹——一个脚印、一丝烟味——你就会开始在心眼里重建现场，仿佛时间正在你面前倒流？',
    monologue: '脚印、弹道、倒下的椅子……在你的视网膜上，它们正在缓缓归位。',
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
    prompt: '哪怕现实已经塌了一半，哪怕你的内脏正在翻江倒海，你心里是否还有一个声音在逼你站直了，把领口拉整齐？',
    monologue: '别现在垮掉，警探。至少在观众散场之前，把你的脊梁骨挺住了。',
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
    prompt: '那些没说出口的委屈、藏在笑脸后的怨气，你是否总能先于对方一步感觉到，就像空气里的湿度突然变了一样？',
    monologue: '房间里最重的东西往往不是家具，而是那些在沉默中发酵的情绪。',
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
    prompt: '一踏入紧张的局势，你是否会本能地判断谁在发号施令，谁在试探底线，谁又是那个随时准备开溜的胆小鬼？',
    monologue: '在这间屋子里，总得有人先把气压稳住。如果不是你，那就是权力本身。',
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
    prompt: '那种“我们是一伙的”集体感、那枚沉甸甸的徽章、还有那些写在纸上的条文，是否对你有种天然的、不可抗拒的吸引力？',
    monologue: '徽章不只是金属，警探。它是一种契约，是将你从虚无中拉回来的最后一根救命稻草。',
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
    prompt: '你是否更喜欢通过微妙的暗示让人自己点头，而不是像个粗鲁的工头一样把道理强行塞进别人的耳朵里？',
    monologue: '轻一点，警探。思想的线索从来不是用来砸人的，它是用来慢慢收紧的。',
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
    prompt: '疼痛、流血、或者是众目睽睽下的难堪……这些东西是否非但不会让你退缩，反而会让你变得像头被激怒的公牛一样固执？',
    monologue: '把牙关咬死，警探。别让这个该死的世界听见你灵魂碎裂的声音。',
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
    prompt: '面对障碍——无论是一扇锁住的门还是一个不配合的混混——你首先想到的是直接发力，用肌肉和骨骼去解决问题？',
    monologue: '如果门不懂礼貌，那就让它的铰链懂。如果世界不懂规矩，那就让你的拳头去教它。',
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
    prompt: '只要稍微感到一点疲惫、空虚或者烦躁，你脑子里那个声音就会开始诱惑你：再来一点快感吧，只要一点点就好？',
    monologue: '再来一点，老兄。就一点。你知道这种化学反应能让你看到天堂。',
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
    prompt: '在寂静的深夜，你是否会觉得那些楼间的穿堂风、街角的霓虹闪烁，仿佛都是这座城市在对你通风报信？',
    monologue: '砖墙知道的秘密通常比报纸多。而你，刚好是那个能听懂砖墙说话的人。',
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
    prompt: '那些极其细微的响动、视线的一秒钟偏移，是否总会先于语言闯进你的意识，让你在所有人反应过来之前就察觉到异样？',
    monologue: '你已经看到它了，就在那个阴影里。别人还在等待解释，而你已经开始行动了。',
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
    prompt: '你踏入一处被暴力洗礼过的现场。地上有干涸的水迹，墙角散落着烟灰，窗缝还在发出凄厉的漏风声。你的身体本能会让你先做什么？',
    monologue: '第一步往往决定了接下来的这一小时里，是谁在你的脑子里掌舵。',
    options: [
      {
        id: 'crime-scene-angles',
        label: '测量角度、检视痕迹，在虚空中重建那场混乱的发生顺序。',
        insight: '让物理规律自己开口作证，它们从来不撒谎。',
        effects: {
          skills: { 'Visual Calculus': 3, Logic: 2 },
          attributes: { Intellect: 2 },
        },
      },
      {
        id: 'crime-scene-witness',
        label: '搜寻那个正缩在角落里、眼神躲闪的家伙，撬开他的嘴。',
        insight: '人心里的裂缝，比地上的脚印更容易留下作案的余温。',
        effects: {
          skills: { Empathy: 2, Suggestion: 2, Volition: 1 },
          attributes: { Psyche: 2 },
        },
      },
      {
        id: 'crime-scene-scan',
        label: '扫视所有出口、死角和可能藏人的掩体，先确定自己的安全。',
        insight: '在看到故事之前，你必须先看清危险藏在哪里。',
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
    prompt: '破烂酒吧里气压低得吓人。有人正挑衅地抬起下巴，有人把手悄悄藏进了脏兮兮的口袋。你会以什么姿态进场？',
    monologue: '门后是一池由酒精、陈年敌意和审美疲劳汇成的浑水。',
    options: [
      {
        id: 'bar-force',
        label: '挺起胸膛，把肩膀顶进去，用气势把场面先压住。',
        insight: '在这个物质世界里，你必须先让空气知道谁才是更硬的那一个。',
        effects: {
          skills: { Authority: 2, 'Physical Instrument': 2, 'Half Light': 1 },
          attributes: { Psyche: 1, Fysique: 2 },
        },
      },
      {
        id: 'bar-charm',
        label: '笑着走向吧台，用几句俏皮话把紧绷的气氛慢慢引开。',
        insight: '真相总喜欢从那些因为酒精和笑话而松开的嘴角溜出来。',
        effects: {
          skills: { Drama: 2, Suggestion: 2, Empathy: 1 },
          attributes: { Intellect: 1, Psyche: 2 },
        },
      },
      {
        id: 'bar-slip',
        label: '贴着阴影移动，像一抹不留指纹的幻影，悄无声息地摸清局势。',
        insight: '最完美的登场方式，就是让所有人都在一秒钟后才惊觉你的存在。',
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
    prompt: '凌晨四点的街口，瑞瓦肖的冷风直往领口里钻。一个空的绿酒瓶刚好滚到你脚边。你会？',
    monologue: '城市正在通过一个酒瓶向你发出邀请，或者嘲讽。',
    options: [
      {
        id: 'bottle-refuse',
        label: '把它踢进排水沟，继续走向那个该死的现场。',
        insight: '不是今晚，警探。至少今晚，你还想留着那点可怜的尊严。',
        effects: {
          skills: { Volition: 2, Endurance: 2, Composure: 1 },
          attributes: { Psyche: 2, Fysique: 1, Motorics: 1 },
        },
      },
      {
        id: 'bottle-taste',
        label: '拧开盖子闻闻那残留的酒气，给自己一个沉沦的借口。',
        insight: '多巴胺最擅长的诡计，就是把自己伪装成破案的灵感。',
        effects: {
          skills: { Electrochemistry: 3, Conceptualization: 1, Drama: 1 },
          attributes: { Fysique: 2, Intellect: 1 },
        },
      },
      {
        id: 'bottle-listen',
        label: '盯着它看，听远方电线杆发出的蜂鸣声，感受这一刻的虚无。',
        insight: '也许夜色本身就在做证。只是没人能听懂它的证词。',
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
    prompt: '搭档提出了一个极其蹩脚的计划，然后正用那种混合了期待和疲惫的眼神看着你，等你的表态。你会？',
    monologue: '忠诚、正确与体面……它们并不总能站在同一条线上。',
    options: [
      {
        id: 'partner-cover',
        label: '先点头表示赞同，然后再想办法在执行中悄悄修正它。',
        insight: '永远别让阵线在那些秃鹫（外人）面前散掉，即便它是错的。',
        effects: {
          skills: { 'Esprit de Corps': 3, Volition: 1, Authority: 1 },
          attributes: { Psyche: 2 },
        },
      },
      {
        id: 'partner-argue',
        label: '直接把那些该死的逻辑漏洞一条条拆解给他看。',
        insight: '错就是错。别指望虚伪的友情能替它润色，那只会害死你们。',
        effects: {
          skills: { Rhetoric: 2, Logic: 2, Encyclopedia: 1 },
          attributes: { Intellect: 2 },
        },
      },
      {
        id: 'partner-improvise',
        label: '嘴上答应着，身体已经开始按照另一种节奏修改路线了。',
        insight: '让事后的修补看起来像是一场蓄谋已久的、天才的即兴发挥。',
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
    prompt: '你面前是一台上锁的旧机器，线头裸露在外，金属壳体上还留着焦痕。你最想怎么处理它？',
    monologue: '有些门写着“危险”，其实只是在等待那个能读懂它们的人。',
    options: [
      {
        id: 'machine-open',
        label: '拆开它，用你的手指直接感知它的电路流向和逻辑。',
        insight: '螺丝和齿轮比人要诚实得多，只要你找对工具。',
        effects: {
          skills: { Interfacing: 3, Logic: 1, 'Perception (Sight)': 1 },
          attributes: { Motorics: 2, Intellect: 1 },
        },
      },
      {
        id: 'machine-interpret',
        label: '盯着那些焦痕，思考这台机器在这个时代的隐喻意义。',
        insight: '也许这不仅仅是机器，而是一句用生锈金属铸造成的、悲伤的格言。',
        effects: {
          skills: { Conceptualization: 2, 'Inland Empire': 2, Encyclopedia: 1 },
          attributes: { Intellect: 2, Psyche: 1 },
        },
      },
      {
        id: 'machine-force',
        label: '抓住边缘猛拽，如果暴力能让它响，那它就算是被修好了。',
        insight: '有些顽固的结构只认得力道。别废话，动手吧。',
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
    prompt: '审讯桌对面的人正在撒谎。不是什么惊天大谎，而是那种以为自己能瞒天过海的、愚蠢的小谎。你怎么撬开他？',
    monologue: '裂缝已经出现了，警探。你只需要把光打进去。',
    options: [
      {
        id: 'lie-posture',
        label: '死死盯着他的下颌和手指，等待他的身体先一步背叛他的嘴。',
        insight: '无论嘴巴怎么伪装，紧绷的肌肉永远会先泄露灵魂的秘密。',
        effects: {
          skills: { Composure: 2, 'Perception (Sight)': 2, Drama: 1 },
          attributes: { Motorics: 2, Intellect: 1 },
        },
      },
      {
        id: 'lie-emotion',
        label: '找到他内心最柔软、最不想被碰触的那块伤疤，狠狠推一把。',
        insight: '一旦心口松了动，舌头就会像决堤的洪水一样交待一切。',
        effects: {
          skills: { Empathy: 2, Suggestion: 2, Authority: 1 },
          attributes: { Psyche: 2 },
        },
      },
      {
        id: 'lie-logic',
        label: '用一系列时间线和逻辑陷阱把他绕进去，直到他自相矛盾。',
        insight: '让谎言自己在逻辑的重压下崩塌，那种场面比直接审讯更有趣。',
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
    prompt: '远处突然传来一声沉闷的枪响，伴随着碎玻璃落地的声音。你的神经系统会先下达什么指令？',
    monologue: '答案不会等你开会研讨，它已经在你的突触里起跑了。',
    options: [
      {
        id: 'shot-aim',
        label: '瞬间抬眼，搜寻弹道路径、掩体位置以及还击的角度。',
        insight: '在混乱中保持精准，是对这个充满恶意的世界的一种礼貌。',
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
        label: '强行压住内心的惊吓，身体已经先一步顶着风声冲了出去。',
        insight: '先活下来，然后再去考虑什么是优雅。',
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
        label: '一把拽倒身边的人，大吼着分位，接管并控住这该死的混乱。',
        insight: '在这致命的一秒钟里，必须有人站出来把秩序重新点亮。',
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
    prompt: '从泛黄的旧卷宗里掉出一封折叠了无数次的信。纸边已经发脆，上面的字迹透着一股绝望的颤抖。你会先读哪一层含义？',
    monologue: '一张纸永远不会只保留一种意义，警探。',
    options: [
      {
        id: 'letter-context',
        label: '检查日期、地点，以及信中提到的每一个实实在在的细节。',
        insight: '冰冷的上下文才是承载所有情绪的坚硬骨架。',
        effects: {
          skills: { Encyclopedia: 2, Logic: 2 },
          attributes: { Intellect: 2 },
        },
      },
      {
        id: 'letter-subtext',
        label: '解读那些藏在字里行间的、没有写出来的爱、愧疚和绝望。',
        insight: '空白处传来的呐喊，往往比写出来的字更加震耳欲聋。',
        effects: {
          skills: { 'Inland Empire': 2, Empathy: 2, Drama: 1 },
          attributes: { Psyche: 2, Intellect: 1 },
        },
      },
      {
        id: 'letter-traces',
        label: '观察折痕的磨损、墨迹的洇染，感受这封信被保存时的触感。',
        insight: '材料本身拥有的记忆，并不比文字承载的少。',
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
