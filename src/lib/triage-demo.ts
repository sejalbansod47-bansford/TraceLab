export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function validateDemoSelection(files: Array<{ type: string }>) {
  if (files.length === 0) return 'Choose PNG, JPG, or WebP files.';
  if (files.some(file => !ACCEPTED_IMAGE_TYPES.includes(file.type))) return 'Only PNG, JPG, and WebP files are supported.';
  return 'Real media is disabled in this demo. Files were not read or uploaded. Use synthetic A–E instead.';
}

export const lineage = ['A', 'B', 'C', 'D'];
export const leftOut = 'E';

export const demoEvidence = [
  { id: 'E-001', title: 'B is an exact copy of A', detail: 'Synthetic fixture: A and B reference the same bundled file. No hash was calculated in this demo.', status: 'same copy' },
  { id: 'E-002', title: 'C is a crop of B', detail: 'Synthetic fixture: region (230, 130)–(1390, 910), resized to 1536 × 1024.', status: 'framing' },
  { id: 'E-003', title: 'D is missing the staircase', detail: 'Synthetic fixture: the staircase visible in A is absent from D. Says nothing about intent.', status: 'missing element' },
  { id: 'E-004', title: 'E swaps the tree and is left out', detail: 'Synthetic fixture: the leafy tree is replaced by a different tree, then reduced to 768 × 512. Too degraded for a citable match in this demo.', status: 'left out' },
  { id: 'E-005', title: 'Date, place, and intent', detail: 'No independent source evidence. These conclusions are withheld.', status: 'Not established' },
];

export const rejectedClaims = [
  'A is the original camera file',
  'D was edited to mislead',
  'E is unrelated to A',
];

export function buildReport() {
  return [
    'TraceLens synthetic review brief',
    'SYNTHETIC DEMO DATA ONLY — no real media',
    '',
    `Lineage: ${lineage.join(' → ')} · left out: ${leftOut}`,
    '',
    ...demoEvidence.map(e => `[${e.id}] ${e.title} — ${e.detail}`),
    '',
    'Rejected by the sceptic (no citation):',
    ...rejectedClaims.map(c => `- ${c}`),
    '',
    'Triage for a human expert, not a verdict. SHA-256 is fixity, not truth.',
  ].join('\n');
}
