interface EvidenceChoiceProps {
  docket: string
  label: string
  note: string
  selected: boolean
  variant: 'likert' | 'scenario'
  order: number
  onSelect: () => void
}

export function EvidenceChoice({
  docket,
  label,
  note,
  selected,
  variant,
  order,
  onSelect,
}: EvidenceChoiceProps) {
  return (
    <button
      className={`evidence-slip evidence-slip--${variant}${selected ? ' is-selected' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="evidence-slip__docket">{docket}</span>
      <strong className="evidence-slip__label">{label}</strong>
      <span className="evidence-slip__note">{note}</span>
      <span className="evidence-slip__marker">
        {selected ? '已归档' : `证片 ${String(order).padStart(2, '0')}`}
      </span>
    </button>
  )
}
