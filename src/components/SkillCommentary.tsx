import { getSkillPortraitAsset } from '../data/discoAssets.ts'
import type { VoiceCommentary } from '../lib/voiceEngine.ts'

interface SkillCommentaryProps {
  commentary: VoiceCommentary
}

export function SkillCommentary({ commentary }: SkillCommentaryProps) {
  if (!commentary.dominant) return null

  const dominantPortrait = getSkillPortraitAsset(commentary.dominant.skillEnglish)

  return (
    <div className="skill-commentary" aria-label="内心声音">
      <p className="skill-commentary__label">内心声音</p>

      <div className="skill-commentary__bubble">
        {dominantPortrait && (
          <figure className="skill-commentary__portrait">
            <img
              alt={`${commentary.dominant.skillChinese} 肖像`}
              src={dominantPortrait.src}
            />
          </figure>
        )}
        <div className="skill-commentary__copy">
          <span className="skill-commentary__name skill-commentary__name--dominant">
            {commentary.dominant.skillChinese}
          </span>
          <p className="skill-commentary__line">
            {commentary.dominant.text}
          </p>
        </div>
      </div>

      {commentary.contrarian && (
        <div className="skill-commentary__bubble skill-commentary__bubble--contrarian">
          {(() => {
            const contrarianPortrait = getSkillPortraitAsset(
              commentary.contrarian.skillEnglish,
            )
            return contrarianPortrait ? (
              <figure className="skill-commentary__portrait">
                <img
                  alt={`${commentary.contrarian.skillChinese} 肖像`}
                  src={contrarianPortrait.src}
                />
              </figure>
            ) : null
          })()}
          <div className="skill-commentary__copy">
            <span className="skill-commentary__name skill-commentary__name--contrarian">
              {commentary.contrarian.skillChinese}
            </span>
            <p className="skill-commentary__line">
              {commentary.contrarian.text}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
