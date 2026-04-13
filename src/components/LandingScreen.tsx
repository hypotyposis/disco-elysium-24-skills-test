import type { DiscoReference } from '../types/quiz.ts'

interface LandingScreenProps {
  reference: DiscoReference
  questionCount: number
  onStart: () => void
}

export function LandingScreen({
  reference,
  questionCount,
  onStart,
}: LandingScreenProps) {
  const groupedSkills = reference.attributes.map((attribute) => ({
    attribute,
    skills: reference.skills.filter(
      (skill) => skill.attributeEnglish === attribute.english,
    ),
  }))

  return (
    <section className="landing-screen">
      <div className="hero-panel panel">
        <p className="eyebrow">Revachol / Internal Affairs of the Self</p>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">内心旁白鉴定</p>
            <h1>哪一个技能，正在替你说话？</h1>
            <p className="hero-summary">
              24
              道题，拆开你在混乱、关系、直觉与冲动里的第一反应。最后留下来的，
              会是最响的一种声音。
            </p>
            <p className="hero-flavor">
              不是职业测试。更像一份夜班后的自我审讯记录。
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                type="button"
                onClick={onStart}
              >
                开始归档
              </button>
              <div className="stat-chip">
                <strong>{questionCount}</strong>
                <span>题 / 24 技能</span>
              </div>
            </div>
          </div>

          <div className="hero-side">
            <div className="side-card">
              <p className="side-card__label">判读方式</p>
              <p>
                直接累计技能分，不做人格模板贴合。每一题都会推动若干技能与四大属性。
              </p>
            </div>
            <div className="side-card">
              <p className="side-card__label">气味</p>
              <p>
                墨黑、酒红、黄铜、烟灰、旧纸。没有原作图片，只有你脑内的雾和尘。
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="skill-ledger panel">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Voices Inventory</p>
          <h2>24 个声音，按 4 大属性分卷</h2>
        </div>

        <div className="ledger-grid">
          {groupedSkills.map(({ attribute, skills }) => (
            <article className="ledger-column" key={attribute.english}>
              <div className="ledger-column__head">
                <p>{attribute.chinese}</p>
                <span>{attribute.english}</span>
              </div>
              <ul>
                {skills.map((skill) => (
                  <li key={skill.english}>
                    <strong>{skill.chinese}</strong>
                    <span>{skill.english}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
