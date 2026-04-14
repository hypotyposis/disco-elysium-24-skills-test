import {
  dossierArtifactAssets,
  landingBackdropAssets,
} from '../data/discoAssets.ts'
import type { DiscoReference } from '../types/quiz.ts'
import { DossierArtifact } from './DossierArtifact.tsx'

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
    <section className="landing-screen" aria-labelledby="landing-title">
      <header className="landing-sheet dossier-sheet">
        <div className="sheet-meta">
          <div className="sheet-meta__identity">
            <DossierArtifact
              asset={dossierArtifactAssets.badge}
              className="dossier-artifact--stamp"
            />
            <span className="file-label">RCM 第 41 特别分局 · 入职心理评估</span>
          </div>
          <span>卷别 04 / 证物 24</span>
        </div>

        <div className="landing-lockup">
          <div className="landing-lockup__main">
            <p className="landing-lockup__prefix">
              瑞瓦肖公民自卫队 · 人事档案处
            </p>
            <h1 id="landing-title">
              新警员
              <br />
              心理分析问卷
            </h1>
            <p className="landing-lockup__summary">
              本问卷包含 {questionCount}{' '}
              道评估，将分析你的思维模式、情绪反应、身体素质与行动倾向。完成后将生成你的思维档案。
            </p>
          </div>

          <div className="landing-hero-cluster" aria-hidden="true">
            <figure className="landing-backdrop-card">
              <img
                alt=""
                className="landing-backdrop-card__image"
                loading="eager"
                src={landingBackdropAssets.lobbyBackdrop.src}
              />
              <figcaption className="landing-backdrop-card__label">
                <span>夜班现场 / dossier wash</span>
                <strong>Whirling-in-Rags lobby</strong>
              </figcaption>
            </figure>

            <div className="landing-emblem">
              <span>卷宗</span>
              <strong>24</strong>
              <span>voice trace</span>
            </div>
          </div>
        </div>

        <div className="landing-annotations" aria-hidden="true">
          <div className="annotation-slip">
            <p className="annotation-slip__title">判读方式</p>
            <p>逐题累计技能与属性权重，不做模板贴合，不给人格贴标签。</p>
          </div>
          <div className="annotation-slip annotation-slip--offset">
            <p className="annotation-slip__title">现场气味</p>
            <p>旧纸、灰烬、酒渍、红线。没有原图，只有你脑内那面坏掉的案板。</p>
          </div>
        </div>

        <div className="landing-footer">
          <button className="document-button" type="button" onClick={onStart}>
            开始评估
          </button>

          <div className="landing-ledger">
            <p className="file-label">目录摘要</p>
            <ul>
              <li>
                <strong>{questionCount}</strong>
                <span>道评估</span>
              </li>
              <li>
                <strong>{reference.skills.length}</strong>
                <span>项指标</span>
              </li>
              <li>
                <strong>{reference.attributes.length}</strong>
                <span>维属性</span>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="landing-archive" aria-labelledby="archive-title">
        <div className="archive-heading">
          <div className="archive-heading__head">
            <div className="archive-heading__body">
              <p className="file-label">目录页 / voices index</p>
              <h2 id="archive-title">评估维度：四大属性，二十四项心理指标</h2>
            </div>
            <DossierArtifact
              asset={dossierArtifactAssets.map}
              className="dossier-artifact--map"
            />
          </div>
          <p>每一项都会在执勤中影响你的判断与行为。</p>
        </div>

        <div className="archive-board">
          {groupedSkills.map(({ attribute, skills }, index) => (
            <article
              className={`attribute-folder attribute-folder--${index + 1}`}
              key={attribute.english}
            >
              <div className="attribute-folder__head">
                <div>
                  <p>{attribute.chinese}</p>
                  <span>{attribute.short}</span>
                </div>
                <strong>{attribute.english}</strong>
              </div>

              <ol>
                {skills.map((skill, skillIndex) => (
                  <li key={skill.english}>
                    <span className="attribute-folder__index">
                      {String(skillIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <strong>{skill.chinese}</strong>
                      <span>{skill.english}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
