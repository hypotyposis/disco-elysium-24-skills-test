import type { AttributeReference, AttributeKey } from '../types/quiz.ts'

interface AttributeDiamondProps {
  attributes: readonly AttributeReference[]
  scores: Record<AttributeKey, number>
}

export function AttributeDiamond({
  attributes,
  scores,
}: AttributeDiamondProps) {
  const center = 110
  const radius = 76
  const levels = [25, 50, 75, 100]

  const pointAt = (attributeKey: AttributeKey, multiplier = 1) => {
    const scaledRadius = radius * multiplier

    switch (attributeKey) {
      case 'Intellect':
        return `${center},${center - scaledRadius}`
      case 'Motorics':
        return `${center + scaledRadius},${center}`
      case 'Fysique':
        return `${center},${center + scaledRadius}`
      case 'Psyche':
        return `${center - scaledRadius},${center}`
    }
  }

  const polygonPoints = [
    pointAt('Intellect', scores.Intellect / 100),
    pointAt('Motorics', scores.Motorics / 100),
    pointAt('Fysique', scores.Fysique / 100),
    pointAt('Psyche', scores.Psyche / 100),
  ].join(' ')

  return (
    <div className="attribute-diamond">
      <svg
        aria-labelledby="attribute-map-title"
        className="attribute-diamond__svg"
        viewBox="0 0 220 220"
      >
        <title id="attribute-map-title">四大属性可视化</title>

        {levels.map((level) => (
          <polygon
            key={level}
            className="attribute-diamond__grid"
            points={[
              pointAt('Intellect', level / 100),
              pointAt('Motorics', level / 100),
              pointAt('Fysique', level / 100),
              pointAt('Psyche', level / 100),
            ].join(' ')}
          />
        ))}

        <line
          className="attribute-diamond__axis"
          x1={center}
          x2={center}
          y1={center - radius}
          y2={center + radius}
        />
        <line
          className="attribute-diamond__axis"
          x1={center - radius}
          x2={center + radius}
          y1={center}
          y2={center}
        />

        <polygon className="attribute-diamond__shape" points={polygonPoints} />
      </svg>

      <div className="attribute-diamond__labels">
        {attributes.map((attribute) => (
          <div className="attribute-pill" key={attribute.english}>
            <span>{attribute.chinese}</span>
            <strong>{scores[attribute.english]}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
