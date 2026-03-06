import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardData, DashboardEmployee } from '../../models/dashboard.model';

@Component({
  selector: 'app-visibility-dashboard',
  templateUrl: './visibility-dashboard.component.html',
  styleUrls: ['./visibility-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisibilityDashboardComponent implements OnInit, OnDestroy {
  dashboardData: DashboardData | null = null;
  filteredEmployees: DashboardEmployee[] = [];
  searchText = '';
  selectedDepartment = '';
  selectedStatus = '';
  loading = true;

  departmentOptions = [
    { label: 'All Departments', value: '' },
    { label: 'Health', value: 'Health' },
    { label: 'Education', value: 'Education' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Social Development', value: 'Social Development' }
  ];

  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Ready to Start', value: 'READY' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Blocked', value: 'BLOCKED' },
    { label: 'Stalled', value: 'STALLED' },
    { label: 'At Risk', value: 'AT_RISK' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
    // Refresh every 30 seconds
    interval(30000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadData());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.loading = true;
    this.dashboardService.getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dashboardData = data;
        this.applyFilter();
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  applyFilter(): void {
    if (!this.dashboardData) return;
    this.filteredEmployees = this.dashboardData.employees.filter(e => {
      const matchesSearch = !this.searchText ||
        e.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        e.employeeId.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesDept = !this.selectedDepartment || e.department === this.selectedDepartment;
      const matchesStatus = !this.selectedStatus || e.status === this.selectedStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
    this.cdr.markForCheck();
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'READY': return 'success';
      case 'BLOCKED': return 'danger';
      case 'STALLED': return 'warning';
      case 'IN_PROGRESS': return 'info';
      case 'AT_RISK': return 'warning';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'READY': return 'Ready to Start';
      case 'BLOCKED': return 'Blocked';
      case 'STALLED': return 'Stalled';
      case 'IN_PROGRESS': return 'In Progress';
      case 'AT_RISK': return 'At Risk';
      default: return status;
    }
  }

  onView(employee: DashboardEmployee): void {
    console.log('View employee:', employee.employeeId);
  }

  onResolve(employee: DashboardEmployee): void {
    console.log('Resolve issue for:', employee.employeeId);
  }

  onContact(employee: DashboardEmployee): void {
    console.log('Contact employee:', employee.employeeId);
  }
}
