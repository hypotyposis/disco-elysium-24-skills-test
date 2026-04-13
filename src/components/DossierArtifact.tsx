import type { DiscoArtAsset } from '../data/discoAssets.ts'

interface DossierArtifactProps {
  asset: DiscoArtAsset
  className?: string
}

export function DossierArtifact({
  asset,
  className = '',
}: DossierArtifactProps) {
  const classes =
    className === '' ? 'dossier-artifact' : `dossier-artifact ${className}`

  return (
    <span aria-hidden="true" className={classes} title={asset.label}>
      <img alt="" loading="lazy" src={asset.src} />
    </span>
  )
}
