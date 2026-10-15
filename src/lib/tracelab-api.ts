// Client for the TraceLab engine (Python: deterministic forensic pipeline + Claude Agent SDK agents).
// Base URL comes from VITE_TRACELAB_API (set http://localhost:8000 for a local engine); defaults to the hosted Modal engine.

export const API_BASE = (import.meta.env['VITE_TRACELAB_API'] as string | undefined)?.replace(/\/$/, '') || 'https://sejalbansod47-bansford--tracelab-engine-web.us-east.modal.run';

export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const AGENTS = ['coordinator', 'provenance', 'lineage', 'visual', 'sceptic', 'report'] as const;
export type AgentName = (typeof AGENTS)[number];
export const AGENT_ROLE: Record<AgentName, string> = {
  coordinator: 'plans & hands off',
  provenance: 'hashes & metadata',
  lineage: 'version order',
  visual: 'pixel changes',
  sceptic: 'judge · veto',
  report: 'cited brief',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- evidence payloads vary by kind
export type EvidenceItem = { id: string; kind: string; subject: string[]; data: any; note: string };
export type LineageEdge = { parent: string; child: string; direction_basis: string; evidence_ids: string[] };
export type Evidence = {
  pipeline_version: string;
  synthetic_only: boolean;
  images: Record<string, { file: string; sha256: string; width: number; height: number; display?: string }>;
  evidence: EvidenceItem[];
  lineage_hypothesis: {
    id: string; method: string; root: string; linked: string[]; edges: LineageEdge[];
    excluded: string[]; exclusion_evidence_ids: string[];
  };
};
export type Claim = { source?: string; text: string; evidence_ids: string[]; confidence?: string; reason?: string; rule?: number };
export type Sceptic = { accepted: Claim[]; rejected: Claim[]; veto?: string };
export type ReportManifest = {
  synthetic_only: boolean;
  report: { title?: string; summary?: string; sections?: { heading: string; findings: Claim[] }[]; declined?: { request: string; reason: string }[] } | null;
  sceptic: Sceptic | null;
  recoveries: { id: string; detail: string }[];
  limitations: string[];
};
export type EngineEvent =
  | { type: 'run_start'; force_malformed: boolean; max_turns: number; max_budget_usd: number }
  | { type: 'agent_state'; agent: AgentName; state: string; attempt?: number; recovery_id?: string; error?: string; raw?: string; rejected?: number; accepted?: number; claims?: number; veto?: string }
  | { type: 'log'; agent: AgentName; text: string }
  | { type: 'fault_injection'; agent: string; note: string }
  | { type: 'gate'; tool: string; path?: string }
  | { type: 'sceptic'; data: Sceptic }
  | { type: 'report_ready' }
  | { type: 'error'; text: string }
  | { type: 'run_end'; subtype: string; cost_usd?: number; duration_ms?: number }
  | { type: 'system'; subtype: string; text: string };

export function validateSelection(files: Array<{ type: string }>): string | null {
  if (files.length === 0) return 'Choose PNG, JPG, or WebP files.';
  if (files.length < 2) return 'Add at least two pictures: the reference first, then its copies.';
  if (files.some(f => !ACCEPTED_IMAGE_TYPES.includes(f.type))) return 'Only PNG, JPG, and WebP files are supported. iPhone HEIC: export as JPEG first.';
  return null;
}

export async function createCase(opts: { files?: File[]; demo?: boolean; question?: string; claims?: string; forceMalformed?: boolean }) {
  const fd = new FormData();
  for (const f of opts.files ?? []) fd.append('files', f);
  fd.append('use_demo', opts.demo ? 'true' : 'false');
  fd.append('question', opts.question ?? '');
  fd.append('requester_claims', opts.claims ?? '');
  fd.append('force_malformed', opts.forceMalformed ? 'true' : 'false');
  const r = await fetch(`${API_BASE}/api/cases`, { method: 'POST', body: fd });
  if (!r.ok) throw new Error(`Engine error ${r.status}: ${await r.text()}`);
  return (await r.json()) as { case_id: string; evidence: Evidence };
}

export function openEvents(caseId: string, onEvent: (e: EngineEvent) => void, replay = 0) {
  const es = new EventSource(`${API_BASE}/api/cases/${caseId}/events${replay ? `?replay=${replay}` : ''}`);
  es.onmessage = m => onEvent(JSON.parse(m.data));
  return es;
}

export const fileUrl = (caseId: string, path: string) => `${API_BASE}/api/cases/${caseId}/file/${path}`;
export const originalUrl = (caseId: string, file: string) => fileUrl(caseId, `originals/${encodeURIComponent(file)}`);
export const reportUrl = (caseId: string, fmt: 'md' | 'json', download = false) =>
  `${API_BASE}/api/cases/${caseId}/report.${fmt}${download ? '?download=1' : ''}`;

export async function getEvidence(caseId: string) {
  const r = await fetch(`${API_BASE}/api/cases/${caseId}/evidence`);
  if (!r.ok) throw new Error(`Engine error ${r.status}`);
  return (await r.json()) as Evidence;
}
export async function getReport(caseId: string) {
  const r = await fetch(reportUrl(caseId, 'json'));
  return r.ok ? ((await r.json()) as ReportManifest) : null;
}
