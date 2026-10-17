/** Keep an interacting panel inside the rail's safe edges. */
export function visiblePanelScroll(current: number, railLeft: number, railWidth: number, panelLeft: number, panelWidth: number, inset: number, maximum: number) {
  const left = railLeft + inset;
  const right = railLeft + railWidth - inset;
  const adjustment = panelLeft < left ? panelLeft - left : panelLeft + panelWidth > right ? panelLeft + panelWidth - right : 0;
  return Math.max(0, Math.min(maximum, current + adjustment));
}