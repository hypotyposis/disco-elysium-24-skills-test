import { evidenceCopy } from '../data/uiCopy.ts'

interface EvidenceChoiceProps {
  docket: string
  label: string
  note: string
  selected: boolean
  variant: 'likert' | 'scenario'
  order: number
  voiceLabel?: string
  portrait?: {
    alt: string
    src: string
  }
  onSelect: () => void
}

export function EvidenceChoice({
  docket,
  label,
  note,
  selected,
  variant,
  order,
  voiceLabel,
  portrait,
  onSelect,
}: EvidenceChoiceProps) {
  return (
    <button
      className={`evidence-slip evidence-slip--${variant}${selected ? ' is-selected' : ''}`}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
    >
      <div className="evidence-slip__head">
        <span className="evidence-slip__docket">{docket}</span>

        {(voiceLabel || portrait) && (
          <span className="evidence-slip__witness">
            {voiceLabel && (
              <span className="evidence-slip__voice">{voiceLabel}</span>
            )}
            {portrait && (
              <span className="evidence-slip__portrait">
                <img alt={portrait.alt} loading="lazy" src={portrait.src} />
              </span>
            )}
          </span>
        )}
      </div>

      <strong className="evidence-slip__label">{label}</strong>
      <span className="evidence-slip__note">{note}</span>
      <span className="evidence-slip__marker">
        {selected ? evidenceCopy.selected : evidenceCopy.docket(order)}
      </span>
    </button>
  )
}
