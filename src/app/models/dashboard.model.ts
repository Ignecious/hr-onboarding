export interface DashboardKpis {
  readyToStart: number;
  blocked: number;
  stalled: number;
  inProgress: number;
  atRisk: number;
}

export interface DashboardEmployee {
  employeeId: string;
  name: string;
  department: string;
  completionPercentage: number;
  status: 'READY' | 'BLOCKED' | 'STALLED' | 'IN_PROGRESS' | 'AT_RISK';
  blocker: string | null;
}

export interface DashboardData {
  kpis: DashboardKpis;
  employees: DashboardEmployee[];
}
