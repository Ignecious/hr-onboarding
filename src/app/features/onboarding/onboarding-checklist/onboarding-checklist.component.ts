import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChecklistService } from '../../../core/services/checklist.service';
import { Checklist, ChecklistStep } from '../../../models/checklist.model';

@Component({
  selector: 'app-onboarding-checklist',
  templateUrl: './onboarding-checklist.component.html',
  styleUrls: ['./onboarding-checklist.component.scss'],
  providers: [MessageService]
})
export class OnboardingChecklistComponent implements OnInit {
  employeeId = '';
  checklist?: Checklist;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checklistService: ChecklistService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.checklistService.getChecklist(this.employeeId).subscribe(cl => this.checklist = cl);
  }

  updateStep(step: ChecklistStep, status: ChecklistStep['status']): void {
    this.checklistService.updateStepStatus(this.employeeId, step.stepId, status).subscribe(cl => {
      this.checklist = cl;
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: `Step "${step.name}" updated to ${status}` });
    });
  }

  getStepIcon(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'pi pi-check-circle';
      case 'IN_PROGRESS': return 'pi pi-spin pi-spinner';
      case 'REJECTED': return 'pi pi-times-circle';
      default: return 'pi pi-clock';
    }
  }

  getStepIconClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'step-success';
      case 'IN_PROGRESS': return 'step-warning';
      case 'REJECTED': return 'step-danger';
      default: return 'step-secondary';
    }
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'REJECTED': return 'danger';
      default: return 'secondary';
    }
  }
}
