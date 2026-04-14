import Link from 'next/link';

const kpis = [
  { label: 'Total Cases', value: '147', delta: '+12 this month', icon: 'ri-folder-3-line', color: 'bg-[#0097B2]/10 text-[#0097B2]' },
  { label: 'Documents Stored', value: '2,841', delta: '+384 this month', icon: 'ri-file-list-3-line', color: 'bg-[#7c3aed]/10 text-[#7c3aed]' },
  { label: 'Team Members', value: '18', delta: '7 roles defined', icon: 'ri-team-line', color: 'bg-[#16a34a]/10 text-[#16a34a]' },
  { label: 'MRR', value: '$149', delta: 'Professional Plan', icon: 'ri-money-dollar-circle-line', color: 'bg-[#d97706]/10 text-[#d97706]' },
];

const modules = [
  {
    path: '/flows/onboarding',
    icon: 'ri-user-add-line',
    color: 'bg-[#0097B2]/10 text-[#0097B2]',
    title: 'Self-Onboarding',
    desc: '5-step wizard: account setup, email verify, plan & payment',
    badge: null,
  },
  {
    path: '/flows/custodian-ops',
    icon: 'ri-team-line',
    color: 'bg-[#7c3aed]/10 text-[#7c3aed]',
    title: 'Custodian Operations',
    desc: 'Intake requests, task board, SLA monitor & staff dashboard',
    badge: '4 SLA alerts',
    badgeColor: 'bg-red-100 text-red-600',
  },
  {
    path: '/flows/document',
    icon: 'ri-folder-3-line',
    color: 'bg-[#16a34a]/10 text-[#16a34a]',
    title: 'Cases & Documents',
    desc: 'Case management with MDC refs, SHA-256 docs & audit trail',
    badge: '89 active',
    badgeColor: 'bg-[#16a34a]/10 text-[#16a34a]',
  },
  {
    path: '/flows/access',
    icon: 'ri-shield-user-line',
    color: 'bg-[#0891b2]/10 text-[#0891b2]',
    title: 'Access & Sharing',
    desc: 'User roles, MFA, share links with watermarks & access audit',
    badge: '1 MFA pending',
    badgeColor: 'bg-[#d97706]/10 text-[#d97706]',
  },
  {
    path: '/flows/billing',
    icon: 'ri-bank-card-line',
    color: 'bg-[#d97706]/10 text-[#d97706]',
    title: 'Billing & Invoices',
    desc: 'Plan management, usage metrics, invoices & Stripe webhooks',
    badge: null,
  },
  {
    path: '/flows/payment-failure',
    icon: 'ri-error-warning-line',
    color: 'bg-red-100 text-red-600',
    title: 'Payment Recovery',
    desc: 'Failed payment flow, retry schedule & dunning email log',
    badge: '1 action needed',
    badgeColor: 'bg-red-100 text-red-600',
  },
];

const recentActivity = [
  { initials: 'SC', name: 'Sarah Chen', action: 'uploaded', target: 'exhibit_b_affidavit.pdf', case: 'MDC-2026-00147', time: '10 min ago', color: 'bg-brand-cyan text-white' },
  { initials: 'JO', name: 'James Okafor', action: 'escalated intake', target: 'REQ-2026-0087', case: 'MDC-2026-00138', time: '32 min ago', color: 'bg-[#7c3aed]/20 text-[#7c3aed]' },
  { initials: 'SY', name: 'System', action: 'SLA breach detected', target: 'Audit Export', case: 'MDC-2026-00138', time: '1 hr ago', color: 'bg-red-100 text-red-600' },
  { initials: 'ML', name: 'Maria Lopez', action: 'created share link', target: 'shr_002', case: 'MDC-2026-00131', time: '2 hr ago', color: 'bg-[#16a34a]/20 text-[#16a34a]' },
  { initials: 'DK', name: 'David Kim', action: 'accessed case', target: 'MDC-2026-00147', case: 'Westfield Estate', time: '3 hr ago', color: 'bg-[#d97706]/20 text-[#d97706]' },
];

const slaItems = [
  { label: 'Document Intake', target: '4h', actual: '3.2h', widthClass: 'w-[80%]', ok: true },
  { label: 'Access Request', target: '24h', actual: '18h', widthClass: 'w-[75%]', ok: true },
  { label: 'Audit Export', target: '48h', actual: '52h', widthClass: 'w-full', ok: false },
  { label: 'Case Review', target: '72h', actual: '68h', widthClass: 'w-[94%]', ok: true },
];

const recentCases = [
  { id: 'MDC-2026-00147', name: 'Westfield Estate Trust', client: 'Westfield Family', status: 'Active', docs: 24 },
  { id: 'MDC-2026-00143', name: 'Harrington v. Apex Corp', client: 'Harrington LLC', status: 'Under Review', docs: 17 },
  { id: 'MDC-2026-00138', name: 'St. Mercy Health Records', client: 'St. Mercy Hospital', status: 'Closed', docs: 51 },
  { id: 'MDC-2026-00131', name: 'Coastal Insurance Claim', client: 'Coastal Insurance', status: 'Active', docs: 9 },
];

const statusColor: Record<string, string> = {
  Active: 'bg-[#16a34a]/10 text-[#16a34a]',
  'Under Review': 'bg-[#d97706]/10 text-[#d97706]',
  Closed: 'bg-brand-muted/10 text-brand-muted',
};

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-outfit font-bold text-2xl text-brand-navy">Good morning, Sarah 👋</h1>
          <p className="text-brand-muted text-sm mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-cyan-light border border-brand-cyan/20 rounded-full">
          <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
          <span className="text-sm font-medium text-brand-cyan">Professional Plan · Active</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-brand-border p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-brand-muted">{k.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${k.color}`}>
                <i className={`${k.icon} text-base`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-brand-navy">{k.value}</div>
            <div className="text-xs text-brand-muted mt-1">{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Alerts banner */}
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        <i className="ri-alarm-warning-line text-red-500 text-xl" />
        <p className="text-sm text-red-700 font-medium flex-1">
          SLA breach: Audit export for <strong>MDC-2026-00138</strong> is overdue by 4 hours.
        </p>
        <Link href="/flows/custodian-ops" className="text-sm text-red-600 font-semibold hover:underline whitespace-nowrap">
          View Ops →
        </Link>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Modules */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <h2 className="font-outfit font-semibold text-brand-navy mb-3">Application Modules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modules.map((mod) => (
                <Link
                  key={mod.path}
                  href={mod.path}
                  className="bg-white rounded-xl border border-brand-border p-4 hover:border-brand-cyan hover:bg-brand-surface transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mod.color}`}>
                      <i className={`${mod.icon} text-lg`} />
                    </div>
                    {mod.badge && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${mod.badgeColor}`}>
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-semibold text-brand-navy text-sm group-hover:text-brand-cyan transition-colors">
                    {mod.title}
                  </div>
                  <div className="text-xs text-brand-muted mt-1 leading-relaxed">{mod.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Cases */}
          <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-brand-border flex items-center justify-between">
              <h2 className="font-outfit font-semibold text-brand-navy text-sm">Recent Cases</h2>
              <Link href="/flows/document" className="text-xs text-brand-cyan hover:underline">View all →</Link>
            </div>
            <table className="w-full">
              <thead className="bg-brand-surface">
                <tr>
                  <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-brand-muted uppercase tracking-wide">Reference</th>
                  <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-brand-muted uppercase tracking-wide">Case</th>
                  <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-brand-muted uppercase tracking-wide">Status</th>
                  <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-brand-muted uppercase tracking-wide">Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {recentCases.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-surface/50 cursor-pointer">
                    <td className="px-5 py-3 font-mono text-xs text-brand-cyan">{c.id}</td>
                    <td className="px-5 py-3">
                      <div className="text-sm font-medium text-brand-navy">{c.name}</div>
                      <div className="text-xs text-brand-muted">{c.client}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-5 py-3 text-sm text-brand-body">{c.docs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-5">
          {/* SLA */}
          <div className="bg-white rounded-xl border border-brand-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-outfit font-semibold text-brand-navy text-sm">SLA Performance</h2>
              <Link href="/flows/custodian-ops" className="text-xs text-brand-cyan hover:underline">Details →</Link>
            </div>
            <div className="space-y-4">
              {slaItems.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-brand-body font-medium">{s.label}</span>
                    <span className={s.ok ? 'text-[#16a34a]' : 'text-red-600'}>
                      {s.actual} / {s.target}
                    </span>
                  </div>
                  <div className="h-1.5 bg-brand-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.ok ? 'bg-[#16a34a]' : 'bg-red-500'} ${s.widthClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl border border-brand-border p-5">
            <h2 className="font-outfit font-semibold text-brand-navy text-sm mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${a.color}`}>
                    {a.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-brand-body leading-relaxed">
                      <span className="font-semibold text-brand-navy">{a.name}</span>{' '}
                      {a.action}{' '}
                      <span className="text-brand-cyan font-medium">{a.target}</span>
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      {a.time} · {a.case}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-brand-border p-5">
            <h2 className="font-outfit font-semibold text-brand-navy text-sm mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { to: '/flows/document', icon: 'ri-folder-add-line', label: 'New Case' },
                { to: '/flows/document', icon: 'ri-upload-cloud-line', label: 'Upload Documents' },
                { to: '/flows/access', icon: 'ri-user-add-line', label: 'Invite User' },
                { to: '/flows/onboarding', icon: 'ri-building-line', label: 'New Organization' },
              ].map((a) => (
                <Link
                  key={a.label}
                  href={a.to}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-brand-border hover:border-brand-cyan hover:bg-brand-surface transition-all"
                >
                  <i className={`${a.icon} text-brand-cyan`} />
                  <span className="text-sm text-brand-body">{a.label}</span>
                  <i className="ri-arrow-right-s-line text-brand-muted ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
