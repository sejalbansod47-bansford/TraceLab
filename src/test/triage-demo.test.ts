import { describe, expect, it } from 'vitest';
import { ACCEPTED_IMAGE_TYPES, demoEvidence, validateDemoSelection } from '@/lib/triage-demo';

describe('Synthetic demo boundaries', () => {
  it('supports PNG, JPG, and WebP only', () => {
    expect(ACCEPTED_IMAGE_TYPES).toEqual(['image/png', 'image/jpeg', 'image/webp']);
    expect(validateDemoSelection([{ type: 'image/gif' }])).toContain('Only PNG, JPG, and WebP');
  });
  it('does not allow real media to run triage', () => {
    for (const type of ACCEPTED_IMAGE_TYPES) expect(validateDemoSelection([{ type }])).toContain('Real media is disabled');
  });
  it('provides a unique evidence id for every synthetic finding', () => {
    expect(demoEvidence).toHaveLength(5);
    expect(demoEvidence.every(row => /^E-\d{3}$/.test(row.id) && row.detail.length > 0)).toBe(true);
    expect(new Set(demoEvidence.map(row => row.id)).size).toBe(5);
  });
  it('withholds unsupported date, location, and intent claims', () => {
    expect(demoEvidence.find(row => row.id === 'E-005')?.status).toBe('Not established');
  });
});