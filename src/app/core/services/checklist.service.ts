import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Checklist, ChecklistStep } from '../../models/checklist.model';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
  private mockChecklists: { [employeeId: string]: Checklist } = {};

  private createDefaultChecklist(employeeId: string): Checklist {
    return {
      employeeId,
      onboardingId: `ONB-${employeeId}`,
      overallStatus: 'IN_PROGRESS',
      completionPercentage: 16,
      steps: [
        { stepId: 'STEP-001', name: 'Upload SA ID', description: 'Upload a clear copy of your South African ID document', category: 'DOCUMENTS', status: 'COMPLETED', required: true, completedAt: '2026-01-16' },
        { stepId: 'STEP-002', name: 'Upload Proof of Address', description: 'Upload proof of address not older than 3 months', category: 'DOCUMENTS', status: 'IN_PROGRESS', required: true },
        { stepId: 'STEP-003', name: 'Upload Education Certificates', description: 'Upload all relevant education certificates', category: 'DOCUMENTS', status: 'PENDING', required: true },
        { stepId: 'STEP-004', name: 'Upload Bank Details', description: 'Upload bank confirmation letter for salary payment', category: 'DOCUMENTS', status: 'PENDING', required: true },
        { stepId: 'STEP-005', name: 'Home Affairs Verification', description: 'Verification of identity with Department of Home Affairs', category: 'VERIFICATION', status: 'PENDING', required: true },
        { stepId: 'STEP-006', name: 'Complete Tax Form', description: 'Complete and submit IT77 tax registration form', category: 'SYSTEM_SETUP', status: 'PENDING', required: true }
      ]
    };
  }

  getChecklist(employeeId: string): Observable<Checklist> {
    if (!this.mockChecklists[employeeId]) {
      this.mockChecklists[employeeId] = this.createDefaultChecklist(employeeId);
    }
    return of(this.mockChecklists[employeeId]);
  }

  updateStepStatus(employeeId: string, stepId: string, status: ChecklistStep['status']): Observable<Checklist> {
    if (!this.mockChecklists[employeeId]) {
      this.mockChecklists[employeeId] = this.createDefaultChecklist(employeeId);
    }
    const checklist = this.mockChecklists[employeeId];
    const step = checklist.steps.find(s => s.stepId === stepId);
    if (step) {
      step.status = status;
      if (status === 'COMPLETED') step.completedAt = new Date().toISOString().split('T')[0];
      const completed = checklist.steps.filter(s => s.status === 'COMPLETED').length;
      checklist.completionPercentage = Math.round((completed / checklist.steps.length) * 100);
    }
    return of(checklist);
  }
}
