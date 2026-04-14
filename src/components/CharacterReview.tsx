import {
  characterReviews,
  getCharacterReview,
} from '../data/characterReviews.ts'
import { characterReviewCopy } from '../data/uiCopy.ts'
import type { AttributeKey } from '../types/quiz.ts'

interface CharacterReviewSectionProps {
  primarySkillEnglish: string
  dominantAttribute: AttributeKey
}

export function CharacterReviewSection({
  primarySkillEnglish,
  dominantAttribute,
}: CharacterReviewSectionProps) {
  return (
    <section className="character-reviews" aria-labelledby="character-reviews-title">
      <div className="section-record">
        <p className="file-label">{characterReviewCopy.sectionLabel}</p>
        <h2 id="character-reviews-title">{characterReviewCopy.sectionTitle}</h2>
      </div>

      <div className="character-reviews__grid">
        {characterReviews.map((character) => {
          const review = getCharacterReview(
            character,
            primarySkillEnglish,
            dominantAttribute,
          )

          return (
            <article
              className={`character-card character-card--${character.characterId}`}
              key={character.characterId}
            >
              <div className="character-card__header">
                <figure className="character-card__portrait">
                  <img
                    alt={`${character.characterName} 肖像`}
                    src={character.portraitSrc}
                  />
                </figure>
                <div className="character-card__head">
                  <strong>{character.characterName}</strong>
                  <span>{character.characterTitle}</span>
                </div>
              </div>
              <p className="character-card__review">{review}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
