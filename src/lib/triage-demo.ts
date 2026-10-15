export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function validateDemoSelection(files: Array<{ type: string }>) {
  if (files.length === 0) return 'Choose PNG, JPG, or WebP files.';
  if (files.some(file => !ACCEPTED_IMAGE_TYPES.includes(file.type))) return 'Only PNG, JPG, and WebP files are supported.';
  return 'Real media is disabled in this demo. Files were not read or uploaded. Use synthetic A–E instead.';
}

export const demoEvidence = [
  { id: 'E-001', title: 'Exact copy', observation: 'A and B are byte-identical.', detail: 'Synthetic fixture definition: A and B reference the same bundled file. No hash was calculated in this demo.', files: 'A ↔ B', status: 'Same copy' },
  { id: 'E-002', title: 'Crop', observation: 'C is a cropped and resized version of A.', detail: 'Synthetic fixture transformation: source region (230, 130)–(1390, 910), resized to 1536 × 1024 pixels. This is a known demo transformation, not an inferred finding.', files: 'A ↔ C', status: 'Changed framing' },
  { id: 'E-003', title: 'Tone adjustment', observation: 'D has reduced colour saturation and increased contrast.', detail: 'Synthetic fixture transformation: saturation multiplier 0.35; contrast multiplier 1.12. No conclusion about intent or authenticity follows.', files: 'A ↔ D', status: 'Changed tone' },
  { id: 'E-004', title: 'Resize and compression', observation: 'E is a smaller, more compressed version of A.', detail: 'Synthetic fixture transformation: 768 × 512 pixels, JPEG quality setting 58. The source fixture is 1536 × 1024 pixels.', files: 'A ↔ E', status: 'Changed encoding' },
  { id: 'E-005', title: 'Sceptic abstention', observation: 'Capture date, location, and intent cannot be established.', detail: 'No independent source evidence is supplied. The fixture transformations do not support claims about real events. These conclusions are withheld.', files: 'A–E', status: 'Not established' },
];