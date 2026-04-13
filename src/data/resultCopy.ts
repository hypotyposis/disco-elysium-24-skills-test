export interface SkillFlavorNote {
  punchline: string
  worldview: string
  relations: string
  pressure: string
  thoughtTitle: string
  thoughtBody: string
}

export type ShareCopyVariantId = 'moments' | 'x' | 'minimal'

export interface ShareCopyVariantTemplate {
  id: ShareCopyVariantId
  label: string
  description: string
  leadIntro: string
  leadOutro?: string
  topVoicesPrefix: string
  topVoicesOutro?: string
  includePunchline: boolean
  includeWorldview: boolean
  punchlinePrefix?: string
  worldviewPrefix?: string
  callToAction?: string
  hashtags?: readonly string[]
}

export const shareCopyVariantTemplates: readonly ShareCopyVariantTemplate[] = [
  {
    id: 'moments',
    label: '朋友圈版',
    description: '中文优先，情绪和氛围更满，适合直接配海报发朋友圈。',
    leadIntro: '把这份《极乐迪斯科》技能测试做完，档案最终写下的是：',
    leadOutro: '。',
    topVoicesPrefix: '脑内前三声部：',
    topVoicesOutro: '。',
    includePunchline: true,
    includeWorldview: true,
    callToAction: '如果你也测了，欢迎带着海报来报上你的主导技能。',
  },
  {
    id: 'x',
    label: 'Twitter / X版',
    description: '更短更利落，混一点英文和轻标签，适合发推或转帖。',
    leadIntro: 'Lead voice: ',
    topVoicesPrefix: 'Top 3: ',
    includePunchline: true,
    includeWorldview: false,
    callToAction: 'Which skill runs your inner monologue tonight?',
    hashtags: ['#DiscoElysium', '#SkillsTest'],
  },
  {
    id: 'minimal',
    label: '极简版',
    description: '只保留最关键的结论，适合图注、评论区或二次转发。',
    leadIntro: '主导声部：',
    topVoicesPrefix: '前三声部：',
    includePunchline: true,
    includeWorldview: false,
    punchlinePrefix: '判词：',
  },
]

export const skillFlavorNotes: Record<string, SkillFlavorNote> = {
  Logic: {
    punchline: '你的脑内书记官先整理证据，再允许情绪发言。',
    worldview: '你把世界看成待解的结构题，裂缝比表象更重要。',
    relations: '你通过指出矛盾、补齐因果来接近别人。',
    pressure: '越混乱越想把一切压回可证明的秩序里。',
    thoughtTitle: '因果链成瘾',
    thoughtBody: '只要线索还能连成句子，你就拒绝承认局面失控。',
  },
  Encyclopedia: {
    punchline: '你的脑子不是抽屉，是一整座积灰档案馆。',
    worldview: '任何当下都会被你放进历史、地理与轶事的长链条。',
    relations: '你用知识建立连接，也偶尔把别人淹没在旁枝末节里。',
    pressure: '一焦虑就开始翻找更多背景，好让自己重新占据高地。',
    thoughtTitle: '灰尘中的年鉴',
    thoughtBody: '你相信被命名过的事物，就没那么可怕。',
  },
  Rhetoric: {
    punchline: '在你脑中，每句话都自带反驳席位。',
    worldview: '你优先听立场、漏洞和被省略的前提。',
    relations: '对话对你像一场拆招，既能说服，也会让人防备。',
    pressure: '压力越大，你越想用更锋利的语言夺回主动。',
    thoughtTitle: '论点的牙齿',
    thoughtBody: '只有把话掰开看，你才肯相信它。',
  },
  Drama: {
    punchline: '你不是撒谎，你是在替现实加灯光。',
    worldview: '世界是舞台，真相常常藏在表演欲和停顿里。',
    relations: '你会试探、扮演、逗引，也善于闻到他人的假面。',
    pressure: '局势紧绷时，你更容易把自己也演进剧情。',
    thoughtTitle: '丝绒面具',
    thoughtBody: '当现实太钝，你会本能地让它更有戏。',
  },
  Conceptualization: {
    punchline: '你先看到气味、形状与隐喻，然后才看到桌子。',
    worldview: '你通过审美和联想理解世界，凡事都能长出第二层意义。',
    relations: '你会被有风格的人吸引，也会用创意把僵局拧开。',
    pressure: '压力一来，你要么灵感暴涨，要么嫌现实太俗。',
    thoughtTitle: '美学性逃生',
    thoughtBody: '只要还能把痛苦说得漂亮一点，你就还没输。',
  },
  'Visual Calculus': {
    punchline: '你的眼睛替大脑画草图，大脑再把草图变成证词。',
    worldview: '空间、轨迹与残留痕迹会自动在你脑中复原。',
    relations: '你不太吃空话，更相信姿势、距离和现场细节。',
    pressure: '紧张时你会更想盯死事实的几何形状。',
    thoughtTitle: '现场重建冲动',
    thoughtBody: '你相信角度不会背叛你。',
  },
  Volition: {
    punchline: '在最吵的时候，仍有个声音叫你站稳。',
    worldview: '你把自我控制视作最后一道防线。',
    relations: '你会体谅别人，但不会轻易把方向盘交出去。',
    pressure: '越危险越克制，代价是把许多情绪关在里面。',
    thoughtTitle: '心墙维修工',
    thoughtBody: '你不是没有裂缝，只是一直在缝。',
  },
  'Inland Empire': {
    punchline: '你听见的不止是声音，还有物件背后的梦。',
    worldview: '直觉、预感和象征在你这里从不是装饰。',
    relations: '你会把别人未说出口的部分也当成讯息。',
    pressure: '压力会放大幻象，让灵感与失真一起涌上来。',
    thoughtTitle: '清醒梦边境',
    thoughtBody: '现实从来不是单层表面。',
  },
  Empathy: {
    punchline: '别人还没开口，你已经先替他们难过了一半。',
    worldview: '情绪是线索，人心是案发现场。',
    relations: '你擅长让人松口，也容易被别人的重量拖住。',
    pressure: '紧绷时你会代入过深，替他人承受不该全由你扛的东西。',
    thoughtTitle: '镜像回音',
    thoughtBody: '你总能感到房间里哪处正在疼。',
  },
  Authority: {
    punchline: '你的语气里自带一枚桌上的警徽。',
    worldview: '你会先判断谁掌权、谁退让、谁在试探边界。',
    relations: '你倾向于定调和控场，不太习惯被轻慢。',
    pressure: '一有威胁感就会把语气压得更硬。',
    thoughtTitle: '秩序索赔',
    thoughtBody: '尊重不是礼物，是你随时准备追讨的欠款。',
  },
  'Esprit de Corps': {
    punchline: '你脑中始终留着一个位置，给同伴与系统。',
    worldview: '个体行为会被你自动放回队伍、规则与职责之中。',
    relations: '你重视默契、义气和共同承担。',
    pressure: '局面越坏，你越不愿让阵线散掉。',
    thoughtTitle: '同袍残响',
    thoughtBody: '有些人是人，有些人是你背后的整支队伍。',
  },
  Suggestion: {
    punchline: '你很少硬推门，你让门自己觉得该打开。',
    worldview: '柔软的引导比正面冲撞更有效。',
    relations: '你擅长顺着欲望、羞耻和期待去轻推别人。',
    pressure: '一旦不安，你会更依赖话术与气氛来换控制感。',
    thoughtTitle: '丝线外交',
    thoughtBody: '你相信最稳的操纵，看起来像对方自己的决定。',
  },
  Endurance: {
    punchline: '你对世界的第一反应是，先扛住。',
    worldview: '活下来、撑过去，比优雅更重要。',
    relations: '你不爱示弱，常把疲惫藏到别人看不见的地方。',
    pressure: '越难越硬，直到身体替你讨债。',
    thoughtTitle: '迟到的疼痛',
    thoughtBody: '你习惯把代价记在明天。',
  },
  'Pain Threshold': {
    punchline: '痛感到了你这里，不是停止信号，是背景噪音。',
    worldview: '受伤、尴尬、失落都能被你咬着牙带过去。',
    relations: '你会敬佩能吃苦的人，也可能误判别人的极限。',
    pressure: '压力一来反而更想迎头撞上去。',
    thoughtTitle: '瘀青勋章',
    thoughtBody: '你把忍耐误认成了自由的一部分。',
  },
  'Physical Instrument': {
    punchline: '你的身体比你的句子更先想解决问题。',
    worldview: '门、墙、人群与阻力，都像可被直接处理的物件。',
    relations: '你尊重硬碰硬的诚实，不太信绕弯子的说法。',
    pressure: '越急越想靠力量把局面扳正。',
    thoughtTitle: '肌肉判词',
    thoughtBody: '如果世界不听解释，你就想让它听见撞击声。',
  },
  Electrochemistry: {
    punchline: '你的神经永远在问：还能更热、更快、更醉吗？',
    worldview: '快乐、刺激与欲望会被你当成现实的一部分证词。',
    relations: '你能迅速读懂享乐场合，也容易被它们反向读懂。',
    pressure: '压力会把你往更立即的快感里推。',
    thoughtTitle: '即时赦免',
    thoughtBody: '短暂失重，是你最熟悉的自救。',
  },
  Shivers: {
    punchline: '你不是在城市里行走，你是在听它喘气。',
    worldview: '街道、风声、灯影和寒意都会在你这里变成语言。',
    relations: '你对环境的敏感，有时比对眼前的人更深。',
    pressure: '越孤独，外部世界越像在向你低声通报。',
    thoughtTitle: '街灯神谕',
    thoughtBody: '砖墙、铁轨与冷风都在给你递口供。',
  },
  'Half Light': {
    punchline: '你天生不信平静，先问危险躲在哪。',
    worldview: '威胁、羞辱与突变会比礼貌更早进入你的视野。',
    relations: '你会吓到别人，也能先一步闻到对方的恶意。',
    pressure: '局势一紧就会准备反击，哪怕还没人真的动手。',
    thoughtTitle: '警铃过载',
    thoughtBody: '你宁愿误判为危险，也不愿措手不及。',
  },
  'Hand/Eye Coordination': {
    punchline: '当别人还在瞄，你已经在修正角度。',
    worldview: '距离、重量与命中率是你理解世界的一种方式。',
    relations: '你相信干净利落的执行，比冗长说明更可靠。',
    pressure: '越紧张越会把注意力缩到那一瞬的手感。',
    thoughtTitle: '弹道直觉',
    thoughtBody: '你会本能地寻找那条最快命中的线。',
  },
  'Perception (Sight)': {
    punchline: '细节从不敲门，它们直接闯进你的视野。',
    worldview: '褶皱、污点、异响和目光偏移都会被你记下。',
    relations: '你容易发现别人漏掉的东西，也因此很难真正放松。',
    pressure: '越紧绷，世界的颗粒越大、越刺眼。',
    thoughtTitle: '灰尘目录',
    thoughtBody: '每一粒异常都会先在你眼里发光。',
  },
  'Reaction Speed': {
    punchline: '你最大的习惯，是比场面快半拍。',
    worldview: '时机本身就是一种真相。',
    relations: '你擅长接住突发变化，但偶尔也会太快替别人做结论。',
    pressure: '压力会让你更敏捷，也更容易先动后想。',
    thoughtTitle: '半拍之前',
    thoughtBody: '你把犹豫看成一种奢侈。',
  },
  'Savoir Faire': {
    punchline: '你喜欢不留痕迹地把事情做成。',
    worldview: '优雅、潜行和漂亮动作能让混乱显得可控。',
    relations: '你用风度和身法绕开正面冲突，也享受被人侧目。',
    pressure: '一旦被逼到墙角，你会更想用一记漂亮动作证明自己。',
    thoughtTitle: '无声登场',
    thoughtBody: '最理想的胜利，是别人回头才发现你来过。',
  },
  Interfacing: {
    punchline: '锁、机械和线路对你来说，像半懂人话。',
    worldview: '你信任工具、结构与可拆解的系统。',
    relations: '你常通过修、撬、接上电路来和世界打交道。',
    pressure: '越失控，越想靠可操作的装置找回确定性。',
    thoughtTitle: '冷金属亲和',
    thoughtBody: '机器至少会按自己的规则回答你。',
  },
  Composure: {
    punchline: '哪怕心里起火，你也先把外套理平。',
    worldview: '姿态、节奏和表面的稳固本身就是力量。',
    relations: '你擅长藏住波动，也善于看见别人脸上的裂纹。',
    pressure: '压力越大，你越像把表情钉死在脸上。',
    thoughtTitle: '裂纹礼仪',
    thoughtBody: '体面不是装出来的，是你最后的护甲。',
  },
}
