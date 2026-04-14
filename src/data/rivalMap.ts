/**
 * Predefined rival (天敌) mapping between skills.
 * Each skill has exactly one rival — the skill that most naturally
 * opposes its worldview. Mappings are bidirectional.
 *
 * Used by the voice engine to pick the contrarian commentator
 * after each answer, and the rival interjection in the result monologue.
 */
export const rivalMap: Record<string, string> = {
  Logic: 'Inland Empire',
  'Inland Empire': 'Logic',
  Encyclopedia: 'Electrochemistry',
  Electrochemistry: 'Volition',
  Rhetoric: 'Empathy',
  Empathy: 'Authority',
  Drama: 'Composure',
  Composure: 'Drama',
  Conceptualization: 'Visual Calculus',
  'Visual Calculus': 'Conceptualization',
  Volition: 'Electrochemistry',
  Authority: 'Empathy',
  'Esprit de Corps': 'Suggestion',
  Suggestion: 'Esprit de Corps',
  Endurance: 'Pain Threshold',
  'Pain Threshold': 'Endurance',
  'Physical Instrument': 'Hand/Eye Coordination',
  'Hand/Eye Coordination': 'Physical Instrument',
  Shivers: 'Half Light',
  'Half Light': 'Shivers',
  'Perception (Sight)': 'Reaction Speed',
  'Reaction Speed': 'Perception (Sight)',
  'Savoir Faire': 'Interfacing',
  Interfacing: 'Savoir Faire',
}
