import { getSkillPortraitAsset } from '../data/discoAssets.ts'
import type { VoiceCommentary } from '../lib/voiceEngine.ts'

interface SkillCommentaryProps {
  commentary: VoiceCommentary
}

export function SkillCommentary({ commentary }: SkillCommentaryProps) {
  if (!commentary.approve) return null

  const approvePortrait = getSkillPortraitAsset(commentary.approve.skillEnglish)

  return (
    <div className="skill-commentary" aria-label="内心声音">
      <p className="skill-commentary__label">内心声音</p>

      <div className="skill-commentary__bubble">
        {approvePortrait && (
          <figure className="skill-commentary__portrait">
            <img
              alt={`${commentary.approve.skillChinese} 肖像`}
              src={approvePortrait.src}
            />
          </figure>
        )}
        <div className="skill-commentary__copy">
          <span className="skill-commentary__name skill-commentary__name--dominant">
            {commentary.approve.skillChinese}
          </span>
          <p className="skill-commentary__line">
            {commentary.approve.text}
          </p>
        </div>
      </div>

      {commentary.dissent && (
        <div className="skill-commentary__bubble skill-commentary__bubble--contrarian">
          {(() => {
            const dissentPortrait = getSkillPortraitAsset(
              commentary.dissent.skillEnglish,
            )
            return dissentPortrait ? (
              <figure className="skill-commentary__portrait">
                <img
                  alt={`${commentary.dissent.skillChinese} 肖像`}
                  src={dissentPortrait.src}
                />
              </figure>
            ) : null
          })()}
          <div className="skill-commentary__copy">
            <span className="skill-commentary__name skill-commentary__name--contrarian">
              {commentary.dissent.skillChinese}
            </span>
            <p className="skill-commentary__line">
              {commentary.dissent.text}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
