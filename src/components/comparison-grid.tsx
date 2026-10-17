type Comparison = [string, string, string, string, string, string];

export function ComparisonGrid({ items }: { items: Comparison[] }) {
  return <div className="comparison-grid" role="list" aria-label="Tool comparisons">
    {items.map(([tag, title, short], index) => <article className="comparison-cell" role="listitem" key={tag}>
      <div className="comparison-cell-head"><span className="kicker">{tag}</span><span className="comparison-number">{String(index + 1).padStart(2, '0')}</span></div>
      <h3>{title}</h3>
      <p className="short">{short}</p>
    </article>)}
  </div>;
}
