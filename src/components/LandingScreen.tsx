import {
  dossierArtifactAssets,
  landingBackdropAssets,
} from '../data/discoAssets.ts'
import { landingCopy } from '../data/uiCopy.ts'
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
            <span className="file-label">{landingCopy.badge}</span>
          </div>
          <span>{landingCopy.subtitle}</span>
        </div>

        <div className="landing-lockup">
          <div className="landing-lockup__main">
            <p className="landing-lockup__prefix">{landingCopy.prefix}</p>
            <h1 id="landing-title">
              {landingCopy.titleLine1}
              <br />
              {landingCopy.titleLine2}
            </h1>
            <p className="landing-lockup__summary">
              {landingCopy.summary(questionCount)}
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
                <span>{landingCopy.backdropLabel}</span>
                <strong>Whirling-in-Rags lobby</strong>
              </figcaption>
            </figure>

            <div className="landing-emblem">
              <span>{landingCopy.emblemLabel}</span>
              <strong>24</strong>
              <span>voice trace</span>
            </div>
          </div>
        </div>

        <div className="landing-annotations" aria-hidden="true">
          <div className="annotation-slip">
            <p className="annotation-slip__title">
              {landingCopy.annotation1Title}
            </p>
            <p>{landingCopy.annotation1Body}</p>
          </div>
          <div className="annotation-slip annotation-slip--offset">
            <p className="annotation-slip__title">
              {landingCopy.annotation2Title}
            </p>
            <p>{landingCopy.annotation2Body}</p>
          </div>
        </div>

        <div className="landing-footer">
          <button className="document-button" type="button" onClick={onStart}>
            {landingCopy.startButton}
          </button>

          <div className="landing-ledger">
            <p className="file-label">{landingCopy.ledgerLabel}</p>
            <ul>
              <li>
                <strong>{questionCount}</strong>
                <span>{landingCopy.unitQuestions}</span>
              </li>
              <li>
                <strong>{reference.skills.length}</strong>
                <span>{landingCopy.unitSkills}</span>
              </li>
              <li>
                <strong>{reference.attributes.length}</strong>
                <span>{landingCopy.unitAttributes}</span>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="landing-archive" aria-labelledby="archive-title">
        <div className="archive-heading">
          <div className="archive-heading__head">
            <div className="archive-heading__body">
              <p className="file-label">{landingCopy.archiveLabel}</p>
              <h2 id="archive-title">{landingCopy.archiveTitle}</h2>
            </div>
            <DossierArtifact
              asset={dossierArtifactAssets.map}
              className="dossier-artifact--map"
            />
          </div>
          <p>{landingCopy.archiveSubtitle}</p>
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
