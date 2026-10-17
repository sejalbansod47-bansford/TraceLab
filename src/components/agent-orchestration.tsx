import { Fragment } from 'react';
import { Check, ChevronRight, FileText, Fingerprint, GitBranch, Loader2, Scan, ShieldCheck, Workflow } from 'lucide-react';
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
    return <div className="orchestration-node" data-state={state} key={agent}
      title={history.map(item => `${item.state}${item.extra ? ` · ${item.extra}` : ''}`).join(' → ')}>
      <span className="orchestration-symbol"><Icon size={28} strokeWidth={1.5} />
        {active && <Loader2 className="orchestration-indicator spin" size={14} />}
        {complete && <Check className="orchestration-indicator" size={14} />}
      </span>
      <strong>{agent}</strong>
      <span className="orchestration-role">{AGENT_ROLE[agent]}</span>
      <span className="orchestration-state">{state === 'vetoed' ? 'veto' : state}</span>
    </div>;
  }
  const order: AgentName[] = ['coordinator', 'provenance', 'lineage', 'visual', 'sceptic', 'report'];
  return <div className="orchestration" role="group" aria-label="Live agent orchestration">
    {order.map((agent, i) => <Fragment key={agent}>
      {i > 0 && <ChevronRight className="orchestration-join" size={22} aria-hidden />}
      {node(agent)}
    </Fragment>)}
  </div>;
}