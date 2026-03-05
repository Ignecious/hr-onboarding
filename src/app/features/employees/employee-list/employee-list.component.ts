import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText = '';
  selectedStatus = '';
  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Initiated', value: 'INITIATED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Blocked', value: 'BLOCKED' }
  ];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = [...employees];
    });
  }

  applyFilter(): void {
    this.filteredEmployees = this.employees.filter(e => {
      const matchesSearch = !this.searchText ||
        e.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        e.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        e.employeeId.toLowerCase().includes(this.searchText.toLowerCase()) ||
        e.department.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = !this.selectedStatus || e.onboardingStatus === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  viewEmployee(employee: Employee): void { this.router.navigate(['/employees', employee.employeeId]); }
  uploadDocs(employee: Employee): void { this.router.navigate(['/employees', employee.employeeId, 'documents', 'upload']); }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'BLOCKED': return 'danger';
      default: return 'info';
    }
  }
}
