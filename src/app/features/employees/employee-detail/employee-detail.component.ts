import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { DocumentService } from '../../../core/services/document.service';
import { ChecklistService } from '../../../core/services/checklist.service';
import { Employee } from '../../../models/employee.model';
import { Document } from '../../../models/document.model';
import { Checklist } from '../../../models/checklist.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee?: Employee;
  documents: Document[] = [];
  checklist?: Checklist;
  activityLog = [
    { date: '2026-01-15', action: 'Employee record created', user: 'HR Admin' },
    { date: '2026-01-16', action: 'SA ID uploaded', user: 'Employee' },
    { date: '2026-01-17', action: 'SA ID verified', user: 'HR Admin' },
    { date: '2026-01-20', action: 'Onboarding status updated to IN_PROGRESS', user: 'System' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private documentService: DocumentService,
    private checklistService: ChecklistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe(emp => this.employee = emp);
      this.documentService.getDocumentsByEmployee(id).subscribe(docs => this.documents = docs);
      this.checklistService.getChecklist(id).subscribe(cl => this.checklist = cl);
    }
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'COMPLETED': case 'VERIFIED': return 'success';
      case 'IN_PROGRESS': case 'PENDING_VERIFICATION': return 'warning';
      case 'BLOCKED': case 'REJECTED': return 'danger';
      default: return 'info';
    }
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
      case 'COMPLETED': return 'step-icon-success';
      case 'IN_PROGRESS': return 'step-icon-warning';
      case 'REJECTED': return 'step-icon-danger';
      default: return 'step-icon-secondary';
    }
  }

  uploadDocuments(): void { this.router.navigate(['/employees', this.employee?.employeeId, 'documents', 'upload']); }
  viewDocuments(): void { this.router.navigate(['/employees', this.employee?.employeeId, 'documents']); }
  viewChecklist(): void { this.router.navigate(['/employees', this.employee?.employeeId, 'checklist']); }
  verifyDocument(doc: Document): void { this.router.navigate(['/documents', doc.documentId, 'verify']); }
}
