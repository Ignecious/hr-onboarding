import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardData } from '../../models/dashboard.model';

const mockDashboardData: DashboardData = {
  kpis: {
    readyToStart: 8,
    blocked: 3,
    stalled: 2,
    inProgress: 12,
    atRisk: 5
  },
  employees: [
    { employeeId: 'EMP-2026-00123', name: 'Sipho Mabena', department: 'Health', completionPercentage: 100, status: 'READY', blocker: null },
    { employeeId: 'EMP-2026-00124', name: 'Thandi Nkosi', department: 'Education', completionPercentage: 45, status: 'BLOCKED', blocker: 'Home Affairs verification failed' },
    { employeeId: 'EMP-2026-00125', name: 'John Dlamini', department: 'Finance', completionPercentage: 72, status: 'IN_PROGRESS', blocker: null },
    { employeeId: 'EMP-2026-00126', name: 'Lerato Molefe', department: 'Social Development', completionPercentage: 20, status: 'AT_RISK', blocker: 'Missing bank details' },
    { employeeId: 'EMP-2026-00127', name: 'Kagiso Sithole', department: 'Health', completionPercentage: 5, status: 'STALLED', blocker: 'No activity for 10 days' },
    { employeeId: 'EMP-2026-00128', name: 'Zanele Khumalo', department: 'Education', completionPercentage: 100, status: 'READY', blocker: null },
    { employeeId: 'EMP-2026-00129', name: 'Bongani Zulu', department: 'Finance', completionPercentage: 55, status: 'IN_PROGRESS', blocker: null },
    { employeeId: 'EMP-2026-00130', name: 'Precious Mokoena', department: 'Social Development', completionPercentage: 30, status: 'IN_PROGRESS', blocker: null },
    { employeeId: 'EMP-2026-00131', name: 'Andile Ntuli', department: 'Health', completionPercentage: 15, status: 'BLOCKED', blocker: 'SA ID verification failed' },
    { employeeId: 'EMP-2026-00132', name: 'Thandeka Mbatha', department: 'Education', completionPercentage: 0, status: 'STALLED', blocker: 'Awaiting manager approval' }
  ]
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getDashboardData(): Observable<DashboardData> {
    return of(mockDashboardData);
  }
}
