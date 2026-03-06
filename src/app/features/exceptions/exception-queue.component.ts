import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExceptionService } from '../../core/services/exception.service';
import { Exception, ExceptionSeverity, ExceptionStatus } from '../../models/exception.model';

@Component({
  selector: 'app-exception-queue',
  templateUrl: './exception-queue.component.html',
  styleUrls: ['./exception-queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExceptionQueueComponent implements OnInit {
  exceptions: Exception[] = [];
  filteredExceptions: Exception[] = [];
  selectedSeverity = '';
  selectedStatus = '';
  loading = true;

  severityOptions = [
    { label: 'All Severities', value: '' },
    { label: 'Critical', value: 'critical' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
  ];

  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'New', value: 'new' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Dismissed', value: 'dismissed' }
  ];

  constructor(
    private exceptionService: ExceptionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.exceptionService.getExceptions().subscribe(exceptions => {
      this.exceptions = exceptions;
      this.applyFilter();
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  applyFilter(): void {
    this.filteredExceptions = this.exceptions.filter(e => {
      const matchesSeverity = !this.selectedSeverity || e.severity === this.selectedSeverity;
      const matchesStatus = !this.selectedStatus || e.status === this.selectedStatus;
      return matchesSeverity && matchesStatus;
    });
    this.cdr.markForCheck();
  }

  getSeverityTag(severity: ExceptionSeverity): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'secondary';
    }
  }

  getStatusSeverity(status: ExceptionStatus): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'new': return 'danger';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'dismissed': return 'secondary';
    }
  }

  getStatusLabel(status: ExceptionStatus): string {
    switch (status) {
      case 'new': return 'New';
      case 'in_progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      case 'dismissed': return 'Dismissed';
    }
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      document_rejected: 'Document Rejected',
      stalled: 'Stalled',
      verification_failed: 'Verification Failed',
      missing_document: 'Missing Document',
      system_error: 'System Error'
    };
    return labels[type] || type;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('en-ZA', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  onResolve(exception: Exception): void {
    this.exceptionService.updateExceptionStatus(exception.id, 'resolved');
  }

  onEscalate(exception: Exception): void {
    this.exceptionService.updateExceptionStatus(exception.id, 'in_progress');
  }

  onDismiss(exception: Exception): void {
    this.exceptionService.updateExceptionStatus(exception.id, 'dismissed');
  }
}
