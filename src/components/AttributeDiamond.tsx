import type { AttributeReference, AttributeKey } from '../types/quiz.ts'

interface AttributeDiamondProps {
  attributes: readonly AttributeReference[]
  scores: Record<AttributeKey, number>
}

interface Point {
  x: number
  y: number
}

export function AttributeDiamond({
  attributes,
  scores,
}: AttributeDiamondProps) {
  const center = 148
  const radius = 92
  const levels = [20, 40, 60, 80, 100]

  const pointAt = (attributeKey: AttributeKey, multiplier = 1): Point => {
    const scaledRadius = radius * multiplier

    switch (attributeKey) {
      case 'Intellect':
        return { x: center, y: center - scaledRadius }
      case 'Motorics':
        return { x: center + scaledRadius, y: center }
      case 'Fysique':
        return { x: center, y: center + scaledRadius }
      case 'Psyche':
        return { x: center - scaledRadius, y: center }
    }
  }

  const points = {
    Intellect: pointAt('Intellect', scores.Intellect / 100),
    Motorics: pointAt('Motorics', scores.Motorics / 100),
    Fysique: pointAt('Fysique', scores.Fysique / 100),
    Psyche: pointAt('Psyche', scores.Psyche / 100),
  }

  const polygonPoints = Object.values(points)
    .map((point) => `${point.x},${point.y}`)
    .join(' ')

  return (
    <figure className="attribute-map">
      <svg
        aria-labelledby="attribute-map-title"
        className="attribute-map__svg"
        viewBox="0 0 296 296"
      >
        <title id="attribute-map-title">四大属性现场图</title>

        {levels.map((level) => (
          <polygon
            key={level}
            className="attribute-map__grid"
            points={[
              pointAt('Intellect', level / 100),
              pointAt('Motorics', level / 100),
              pointAt('Fysique', level / 100),
              pointAt('Psyche', level / 100),
            ]
              .map((point) => `${point.x},${point.y}`)
              .join(' ')}
          />
        ))}

        <line
          className="attribute-map__axis"
          x1={center}
          x2={center}
          y1={center - radius - 22}
          y2={center + radius + 22}
        />
        <line
          className="attribute-map__axis"
          x1={center - radius - 22}
          x2={center + radius + 22}
          y1={center}
          y2={center}
        />

        <polygon className="attribute-map__shape" points={polygonPoints} />

        {attributes.map((attribute) => {
          const point = points[attribute.english]
          const labelPoint = pointAt(attribute.english, 1.28)

          return (
            <g className="attribute-map__label" key={attribute.english}>
              <circle
                className="attribute-map__point"
                cx={point.x}
                cy={point.y}
                r="4.5"
              />
              <text x={labelPoint.x} y={labelPoint.y}>
                {attribute.chinese}
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption className="attribute-map__caption">
        四条轴不是汇报图表。它们只是说明，你在混乱里最先往哪边供电。
      </figcaption>
    </figure>
  )
}
