export type Theme = 'light' | 'dark';

export type DashboardView = 'Overview' | 'Alarms' | 'Building' | 'Rooms' | 'Schedules';

export type ProjectSelectHandler = (projectId: string) => void;

export interface ArchitectureDoc {
  title: string;
  path: string;
  url: string;
  focus: string;
}

export interface ProjectVisual {
  src: string;
  caption: string;
}

export interface ProofPoint {
  label: string;
  title: string;
  detail: string;
}

export interface LabelValue {
  label: string;
  value: string;
}

export interface DetailFact extends LabelValue {
  helper: string;
}

export interface DatabaseTableGroup {
  label: string;
  tables: string[];
}

export interface DatabaseDetails {
  title: string;
  summary: string;
  quickFacts: DetailFact[];
  access: LabelValue[];
  tableGroups: DatabaseTableGroup[];
  dataFlows: string[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  deployment: string;
  dependencies: string[];
  repository: string;
  architectureDocs: ArchitectureDoc[];
  preview?: string;
  visuals: ProjectVisual[];
  tags: string[];
  problem: string;
  architecture: string;
  proofPoints: ProofPoint[];
  deepDetails: string[];
  features: string[];
  outcomes: string[];
  resumeBullets: string[];
  screenshotCaption: string;
  suggestedContent: string[];
  aliases?: string[];
  collection?: 'embedded-systems' | string;
  repositoryLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
  loginRoute?: string;
  loginLabel?: string;
  databaseDetails?: DatabaseDetails;
}
