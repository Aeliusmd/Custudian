export type Visibility = 'Public' | 'Private';

export interface DocumentVersion {
  id: string;
  versionName: string;
  date: string;
  uploadedBy: string;
  isCurrent: boolean;
}

export interface DocumentRecord {
  id: string;
  name: string;
  category: string;
  uploadedBy: string;
  visibility: Visibility;
  uploadDate: string;
  lastUpdated: string;
  fileSize: string;
  fileType: string;
  metadata: Record<string, string>;
  versions: DocumentVersion[];
}

export const MOCK_CATEGORIES = [
  'Legal Contracts',
  'Financial Reports',
  'HR Documents',
  'Compliance',
  'Operations',
  'Client Proposals',
] as const;

export const MOCK_UPLOADERS = [
  'James Whitfield',
  'Sarah Lin',
  'Mark Torres',
  'Nina Patel',
  'Ava Reynolds',
] as const;

export const MOCK_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-4821',
    name: 'Service Agreement - Apex Corp.pdf',
    category: 'Legal Contracts',
    uploadedBy: 'James Whitfield',
    visibility: 'Public',
    uploadDate: '2026-04-10',
    lastUpdated: '2026-04-11',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    metadata: {
      'Contract Date': '2026-04-09',
      Counterparty: 'Apex Corp',
      'Contract Type': 'Service Agreement',
      'Expiry Date': '2027-04-09',
    },
    versions: [
      { id: 'v3', versionName: 'v3.0 Final', date: '2026-04-11', uploadedBy: 'James Whitfield', isCurrent: true },
      { id: 'v2', versionName: 'v2.1 Review', date: '2026-04-10', uploadedBy: 'James Whitfield', isCurrent: false },
      { id: 'v1', versionName: 'v1.0 Draft', date: '2026-04-09', uploadedBy: 'James Whitfield', isCurrent: false },
    ],
  },
  {
    id: 'DOC-4820',
    name: 'Q1 2026 Financial Summary.xlsx',
    category: 'Financial Reports',
    uploadedBy: 'Sarah Lin',
    visibility: 'Private',
    uploadDate: '2026-04-10',
    lastUpdated: '2026-04-10',
    fileSize: '1.2 MB',
    fileType: 'XLSX',
    metadata: {
      Quarter: 'Q1',
      Year: '2026',
      'Prepared By': 'Sarah Lin',
    },
    versions: [
      { id: 'v2', versionName: 'v2.0 Approved', date: '2026-04-10', uploadedBy: 'Sarah Lin', isCurrent: true },
      { id: 'v1', versionName: 'v1.0 Draft', date: '2026-04-08', uploadedBy: 'Sarah Lin', isCurrent: false },
    ],
  },
  {
    id: 'DOC-4819',
    name: 'Employee Handbook v3.2.pdf',
    category: 'HR Documents',
    uploadedBy: 'Mark Torres',
    visibility: 'Private',
    uploadDate: '2026-04-09',
    lastUpdated: '2026-04-09',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    metadata: {
      Department: 'HR',
      Version: '3.2',
      'Effective Date': '2026-04-01',
    },
    versions: [
      { id: 'v1', versionName: 'v3.2', date: '2026-04-09', uploadedBy: 'Mark Torres', isCurrent: true },
    ],
  },
  {
    id: 'DOC-4818',
    name: 'ISO 27001 Audit Report.pdf',
    category: 'Compliance',
    uploadedBy: 'Nina Patel',
    visibility: 'Private',
    uploadDate: '2026-04-09',
    lastUpdated: '2026-04-09',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    metadata: {
      Regulation: 'ISO 27001',
      Auditor: 'External Firm',
      Status: 'Compliant',
    },
    versions: [
      { id: 'v2', versionName: 'v2.0 Final', date: '2026-04-09', uploadedBy: 'Nina Patel', isCurrent: true },
      { id: 'v1', versionName: 'v1.0 Draft', date: '2026-04-07', uploadedBy: 'Nina Patel', isCurrent: false },
    ],
  },
  {
    id: 'DOC-4817',
    name: 'Operations Manual 2026.pdf',
    category: 'Operations',
    uploadedBy: 'Ava Reynolds',
    visibility: 'Public',
    uploadDate: '2026-04-08',
    lastUpdated: '2026-04-10',
    fileSize: '2.9 MB',
    fileType: 'PDF',
    metadata: {
      Department: 'Operations',
      Version: '2026',
      'Effective Date': '2026-01-01',
    },
    versions: [
      { id: 'v2', versionName: 'v2.0 Updated', date: '2026-04-10', uploadedBy: 'Ava Reynolds', isCurrent: true },
      { id: 'v1', versionName: 'v1.0 Initial', date: '2026-04-08', uploadedBy: 'Ava Reynolds', isCurrent: false },
    ],
  },
  {
    id: 'DOC-4816',
    name: 'Client Proposal - Nimbus Ltd.pdf',
    category: 'Client Proposals',
    uploadedBy: 'James Whitfield',
    visibility: 'Public',
    uploadDate: '2026-04-07',
    lastUpdated: '2026-04-07',
    fileSize: '1.7 MB',
    fileType: 'PDF',
    metadata: {
      Client: 'Nimbus Ltd',
      Status: 'Sent',
      'Proposal Date': '2026-04-06',
    },
    versions: [
      { id: 'v1', versionName: 'v1.0 Sent', date: '2026-04-07', uploadedBy: 'James Whitfield', isCurrent: true },
    ],
  },
];