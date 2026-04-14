import {
  characterReviews,
  getCharacterReview,
} from '../data/characterReviews.ts'
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
        <p className="file-label">同事评价 / peer assessment</p>
        <h2 id="character-reviews-title">他们看了你的档案</h2>
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
              <div className="character-card__head">
                <strong>{character.characterName}</strong>
                <span>{character.characterTitle}</span>
              </div>
              <p className="character-card__review">{review}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
