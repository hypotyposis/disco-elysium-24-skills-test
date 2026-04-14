import { getSkillPortraitAsset } from '../data/discoAssets.ts'
import type { SkillMonologueData } from '../lib/voiceEngine.ts'

interface SkillMonologueProps {
  monologue: SkillMonologueData
}

export function SkillMonologue({ monologue }: SkillMonologueProps) {
  const portrait = getSkillPortraitAsset(monologue.dominantSkillEnglish)
  const rivalPortrait = monologue.rivalSkillEnglish
    ? getSkillPortraitAsset(monologue.rivalSkillEnglish)
    : null

  return (
    <div className="skill-monologue">
      <p className="skill-monologue__label">主导技能独白</p>

      <div className="skill-monologue__main">
        {portrait && (
          <figure className="skill-monologue__portrait">
            <img
              alt={`${monologue.dominantSkillChinese} 肖像`}
              src={portrait.src}
            />
          </figure>
        )}
        <div className="skill-monologue__body">
          <span className="skill-monologue__name">
            {monologue.dominantSkillChinese}
          </span>
          {monologue.monologueLines.map((line, i) => (
            <p key={i} className="skill-monologue__line">
              {line}
            </p>
          ))}
        </div>
      </div>

      {monologue.rivalInterjection && monologue.rivalSkillChinese && (
        <div className="skill-monologue__rival">
          {rivalPortrait && (
            <figure className="skill-monologue__rival-portrait">
              <img
                alt={`${monologue.rivalSkillChinese} 肖像`}
                src={rivalPortrait.src}
              />
            </figure>
          )}
          <div className="skill-monologue__rival-body">
            <span className="skill-monologue__rival-name">
              {monologue.rivalSkillChinese}
            </span>
            <p className="skill-monologue__rival-line">
              {monologue.rivalInterjection}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
