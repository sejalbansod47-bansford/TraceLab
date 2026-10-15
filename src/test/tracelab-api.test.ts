import { describe, expect, it } from 'vitest';
import { ACCEPTED_IMAGE_TYPES, AGENTS, reportUrl, validateSelection } from '@/lib/tracelab-api';

describe('TraceLab intake rules', () => {
  it('supports PNG, JPG, and WebP only', () => {
    expect(ACCEPTED_IMAGE_TYPES).toEqual(['image/png', 'image/jpeg', 'image/webp']);
    expect(validateSelection([{ type: 'image/gif' }, { type: 'image/png' }])).toContain('Only PNG, JPG, and WebP');
    expect(validateSelection([{ type: 'image/heic' }, { type: 'image/jpeg' }])).toContain('HEIC');
  });
  it('needs a reference and at least one copy', () => {
    expect(validateSelection([])).toContain('Choose');
    expect(validateSelection([{ type: 'image/png' }])).toContain('at least two');
    expect(validateSelection([{ type: 'image/png' }, { type: 'image/jpeg' }])).toBeNull();
  });
  it('shows the sceptic as its own agent, separate from the report writer', () => {
    expect(AGENTS).toContain('sceptic');
    expect(AGENTS.indexOf('sceptic')).toBeLessThan(AGENTS.indexOf('report'));
  });
  it('builds report download links for markdown and JSON', () => {
    expect(reportUrl('case-abc', 'md', true)).toMatch(/\/api\/cases\/case-abc\/report\.md\?download=1$/);
    expect(reportUrl('case-abc', 'json')).toMatch(/\/api\/cases\/case-abc\/report\.json$/);
  });
});
