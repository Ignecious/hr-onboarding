import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeePortalService } from '../../core/services/employee-portal.service';
import { EmployeePortalData } from '../../models/employee-portal.model';

@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePortalComponent implements OnInit {
  portalData: EmployeePortalData | null = null;
  loading = true;

  constructor(
    private employeePortalService: EmployeePortalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.employeePortalService.getEmployeePortalData().subscribe(data => {
      this.portalData = data;
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  getProgressSeverity(percentage: number): string {
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'info';
    if (percentage >= 25) return 'warning';
    return 'danger';
  }

  onUploadDocuments(): void {
    console.log('Navigate to document upload');
  }

  onViewChecklist(): void {
    console.log('Navigate to onboarding checklist');
  }

  onAskForHelp(): void {
    console.log('Open help request form');
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString('en-ZA', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
}
