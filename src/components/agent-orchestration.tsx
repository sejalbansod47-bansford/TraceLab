import { Check, FileText, Fingerprint, GitBranch, Loader2, Scan, ShieldCheck, Workflow } from 'lucide-react';
import { AGENT_ROLE, type AgentName } from '@/lib/tracelab-api';

type AgentTrail = { state: string; extra?: string | undefined }[];
const icons = { coordinator: Workflow, provenance: Fingerprint, lineage: GitBranch, visual: Scan, sceptic: ShieldCheck, report: FileText };

export function AgentOrchestration({ trails }: { trails: Record<string, AgentTrail> }) {
  function node(agent: AgentName) {
    const history = trails[agent] ?? [];
    const current = history.at(-1);
    const state = current?.state ?? 'queued';
    const Icon = icons[agent];
    const active = state === 'running' || state === 'retrying';
    const complete = state === 'done' || state === 'recovered';
    return <div className={`orchestration-node orchestration-${agent}`} data-state={state} key={agent}
      title={history.map(item => `${item.state}${item.extra ? ` · ${item.extra}` : ''}`).join(' → ')}>
      <span className="orchestration-symbol"><Icon size={20} strokeWidth={1.5} />
        {active && <Loader2 className="orchestration-indicator spin" size={12} />}
        {complete && <Check className="orchestration-indicator" size={12} />}
      </span>
      <strong>{agent}</strong>
      <span className="orchestration-role">{AGENT_ROLE[agent]}</span>
      <span className="orchestration-state">{state === 'vetoed' ? 'veto' : state}</span>
    </div>;
  }
  return <div className="orchestration" role="group" aria-label="Live agent orchestration">
    <svg className="orchestration-links" viewBox="0 0 360 400" aria-hidden="true" preserveAspectRatio="none">
      <path d="M180 90 V103 H60 V120 M180 103 V120 M180 103 H300 V120 M60 210 V223 H180 V240 M300 210 V223 H180 M180 210 V240 M180 330 V350" />
      <path className="orchestration-arrow" d="m56 115 4 5 4-5 M176 115 l4 5 4-5 M296 115 l4 5 4-5 M176 235 l4 5 4-5 M176 345 l4 5 4-5" />
    </svg>
    {node('coordinator')}
    {node('provenance')}{node('lineage')}{node('visual')}
    {node('sceptic')}{node('report')}
  </div>;
}