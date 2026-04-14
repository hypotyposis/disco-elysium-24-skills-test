import harryPortrait from '../assets/disco-game/npc-portraits/harry.png?url'
import jeanPortrait from '../assets/disco-game/npc-portraits/jean.png?url'
import juditPortrait from '../assets/disco-game/npc-portraits/judit.png?url'
import kimPortrait from '../assets/disco-game/npc-portraits/kim.png?url'
import type { AttributeKey } from '../types/quiz.ts'

export interface CharacterReview {
  characterId: 'harry' | 'jean' | 'kim' | 'judit'
  characterName: string
  characterTitle: string
  portraitSrc: string
  byAttribute: Record<AttributeKey, string>
  bySkill?: Partial<Record<string, string>>
}

export const characterReviews: CharacterReview[] = [
  {
    characterId: 'harry',
    characterName: '哈里·杜博阿',
    characterTitle: '41 分局 · 警督（停职审查中）',
    portraitSrc: harryPortrait,
    byAttribute: {
      Intellect:
        '又一个用脑子解决问题的。我告诉你，孩子，脑子这个东西，用多了会坏。看看我。',
      Psyche:
        '精神属性主导？你会听到很多声音。有些是线索，有些是你自己在跟自己说话。祝你分得清。',
      Fysique:
        '身体素质不错。你会需要的。这份工作对肝脏的要求比对大脑高。',
      Motorics:
        '手脚麻利的新人。好。我上次试图接住一个抛过来的钥匙，结果瞎了一只眼。不是比喻。',
    },
    bySkill: {
      'Inland Empire':
        '欢迎来到这个俱乐部。我们的冰箱里永远没有正常的食物。你的领带会跟你说话吗？还没有？等着。',
      Electrochemistry:
        '你懂的。你什么都懂。酒精、烟、那些不应该出现在证物袋里的东西。我们会成为好朋友的。',
      Volition:
        '意志力主导。难以置信。你确定你报对了分局？41 分局不太适合有自控力的人。',
      Empathy:
        '你能感受到别人的痛苦？真的？那你来这儿干什么？这里的痛苦够你感受三辈子。',
      Drama:
        '一个演员。太好了。这里最不缺的就是戏。你和我会相处得很愉快，或者很糟糕。没有中间地带。',
    },
  },
  {
    characterId: 'jean',
    characterName: '让·维克玛',
    characterTitle: '41 分局 · 警督',
    portraitSrc: jeanPortrait,
    byAttribute: {
      Intellect:
        '智力主导。至少你不会在审讯室里跟椅子说话。这在 41 分局算是一种优势。',
      Psyche:
        '精神系主导。又一个靠感觉办案的。我提醒你，感觉不能写进报告里。证据可以。',
      Fysique:
        '体格主导。又一个打算用拳头解决案件的。上一个这么干的人是杜博阿。你看看他现在什么样。',
      Motorics:
        '运动能力突出。你跑得快吗？在 41 分局，跑得快有两种用途：追嫌疑人，和躲开杜博阿。',
    },
    bySkill: {
      Logic:
        '逻辑思维？好。你能帮我理一下杜博阿上个月的报销单吗？我已经看了三遍，还是看不懂。',
      Authority:
        '争强好胜主导。我建议你把这股劲头留给嫌疑人，而不是你的同事。这是忠告。',
      'Esprit de Corps':
        '你很重视团队精神。这很好。但我要提前告诉你，你即将加入的这个团队……比较特殊。',
      Encyclopedia:
        '博学多闻。你知道 41 分局的案件清除率吗？不知道？也许不知道比较好。',
      'Physical Instrument':
        '强身健体。撬棍在储物间第三排。上一个用它的人把门框也一起撬了。别学他。',
    },
  },
  {
    characterId: 'kim',
    characterName: '金·曷城',
    characterTitle: '57 分局 · 警督（借调 41 分局）',
    portraitSrc: kimPortrait,
    byAttribute: {
      Intellect:
        '你的分析能力测试结果很好。我建议你在实际工作中保持这种清醒。41 分局的环境……会考验它。',
      Psyche:
        '你的情绪感知力很强。这在审讯中是优势，但请记住，过度共情会影响判断。我见过。',
      Fysique:
        '体能测试成绩优秀。这份工作的体力消耗比你想象的大。不过，你准备好了。',
      Motorics:
        '你的协调性和反应速度都在优秀范围。在需要精确操作的现场，这会是关键优势。',
    },
    bySkill: {
      Empathy:
        '你的共情指数异常地高。在 41 分局这很少见。我是说……真的很少见。保护好这个能力。',
      'Visual Calculus':
        '你的空间推理能力突出。如果你有兴趣，我可以带你看几个还没结案的现场。',
      Composure:
        '从容自若。你的情绪管理能力很出色。在这个分局，你会发现它的价值。每天都会。',
      Authority:
        '我建议你在实际执勤前参加一下冲突调解培训。不是建议。是要求。',
      Shivers:
        '你对环境有一种……不寻常的敏感度。我以前的一个搭档也有这个特质。他是个好警察。',
      'Half Light':
        '你的威胁评估反应非常敏锐。确保它为你工作，而不是反过来。这很重要。',
    },
  },
  {
    characterId: 'judit',
    characterName: '朱迪·明茨',
    characterTitle: '41 分局 · 巡警',
    portraitSrc: juditPortrait,
    byAttribute: {
      Intellect:
        '你想得比大多数新人多。这是好事。但别想太久，现场不会等你想完。',
      Psyche:
        '你对人很敏感。在 41 分局，这意味着你会比别人更早感到累。但也会比别人更早发现线索。',
      Fysique:
        '体能不错。巡逻的时候你能跟上节奏。说实话，这比你想象的重要。',
      Motorics:
        '你的反应很快。出外勤的时候，这种人我愿意跟他一组。',
    },
    bySkill: {
      Empathy:
        '你很容易读懂别人的情绪。我也是。有时候这让工作更难，因为你没办法假装不在乎。',
      Volition:
        '自控力很强。你会是这里少数几个能按时交报告的人。别笑，这是真话。',
      'Inland Empire':
        '你的直觉很强。有时候直觉是对的。但如果你开始跟物件说话，请告诉我。我见过这种情况。',
      Endurance:
        '你能扛。这里的轮班表会考验你的。但你应该没问题。',
      'Esprit de Corps':
        '你重视团队。太好了。这个分局需要更多这样的人。真的需要。',
      Electrochemistry:
        '我注意到了你在这个指标上的得分。我不评判。但如果你需要帮忙，储物柜 C-4 里有咖啡。真的只是咖啡。',
    },
  },
]

export function getCharacterReview(
  character: CharacterReview,
  primarySkillEnglish: string,
  dominantAttribute: AttributeKey,
): string {
  return (
    character.bySkill?.[primarySkillEnglish] ??
    character.byAttribute[dominantAttribute]
  )
}
