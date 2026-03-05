import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = { total: 0, inProgress: 0, completed: 0, blocked: 0 };
  recentEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.getOnboardingStats().subscribe(s => this.stats = s);
    this.employeeService.getEmployees().subscribe(employees => {
      this.recentEmployees = employees.slice(0, 5);
    });
  }

  navigateToCreate(): void { this.router.navigate(['/employees/create']); }
  navigateToEmployees(): void { this.router.navigate(['/employees']); }
  viewEmployee(employee: Employee): void { this.router.navigate(['/employees', employee.employeeId]); }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'BLOCKED': return 'danger';
      default: return 'info';
    }
  }
}
