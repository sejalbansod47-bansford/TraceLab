import { describe, expect, it } from 'vitest';
import { visiblePanelScroll } from '../lib/panel-visibility';

describe('interacting scrolling panels', () => {
  it('reveals a leftmost card that automatic scrolling partially hid', () => {
    expect(visiblePanelScroll(80, 100, 800, 40, 400, 20, 900)).toBe(0);
  });
  it('reveals the whole card at the right edge with breathing room', () => {
    expect(visiblePanelScroll(0, 100, 800, 600, 400, 20, 900)).toBe(120);
  });
  it('does not move an already fully visible card', () => {
    expect(visiblePanelScroll(120, 100, 800, 200, 400, 20, 900)).toBe(120);
  });
});