import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private mockEmployees: Employee[] = [
    { employeeId: 'EMP-2026-00123', firstName: 'Thabo', lastName: 'Nkosi', idNumber: '9201015800083', email: 'thabo.nkosi@gauteng.gov.za', phoneNumber: '0821234567', department: 'Health', role: 'Nurse', startDate: '2026-01-15', onboardingStatus: 'COMPLETED', completionPercentage: 100, createdAt: '2025-12-01', lastUpdated: '2026-01-20' },
    { employeeId: 'EMP-2026-00124', firstName: 'Nomsa', lastName: 'Dlamini', idNumber: '8805126100082', email: 'nomsa.dlamini@gauteng.gov.za', phoneNumber: '0729876543', department: 'Education', role: 'Teacher', startDate: '2026-01-20', onboardingStatus: 'IN_PROGRESS', completionPercentage: 65, createdAt: '2025-12-05', lastUpdated: '2026-01-18' },
    { employeeId: 'EMP-2026-00125', firstName: 'Sipho', lastName: 'Mahlangu', idNumber: '9507234200080', email: 'sipho.mahlangu@gauteng.gov.za', phoneNumber: '0614567890', department: 'Finance', role: 'Accountant', startDate: '2026-02-01', onboardingStatus: 'IN_PROGRESS', completionPercentage: 40, createdAt: '2025-12-10', lastUpdated: '2026-01-25' },
    { employeeId: 'EMP-2026-00126', firstName: 'Lerato', lastName: 'Molefe', idNumber: '9312098900084', email: 'lerato.molefe@gauteng.gov.za', phoneNumber: '0837654321', department: 'Social Development', role: 'Social Worker', startDate: '2026-02-10', onboardingStatus: 'BLOCKED', completionPercentage: 20, createdAt: '2025-12-15', lastUpdated: '2026-01-30' },
    { employeeId: 'EMP-2026-00127', firstName: 'Kagiso', lastName: 'Sithole', idNumber: '0104157300085', email: 'kagiso.sithole@gauteng.gov.za', phoneNumber: '0769012345', department: 'Health', role: 'Doctor', startDate: '2026-02-15', onboardingStatus: 'INITIATED', completionPercentage: 5, createdAt: '2025-12-20', lastUpdated: '2026-02-01' },
    { employeeId: 'EMP-2026-00128', firstName: 'Zanele', lastName: 'Khumalo', idNumber: '8903264500086', email: 'zanele.khumalo@gauteng.gov.za', phoneNumber: '0852345678', department: 'Education', role: 'Principal', startDate: '2026-01-10', onboardingStatus: 'COMPLETED', completionPercentage: 100, createdAt: '2025-11-20', lastUpdated: '2026-01-15' },
    { employeeId: 'EMP-2026-00129', firstName: 'Bongani', lastName: 'Zulu', idNumber: '9608193600087', email: 'bongani.zulu@gauteng.gov.za', phoneNumber: '0718901234', department: 'Finance', role: 'Budget Analyst', startDate: '2026-02-20', onboardingStatus: 'IN_PROGRESS', completionPercentage: 55, createdAt: '2026-01-05', lastUpdated: '2026-02-05' },
    { employeeId: 'EMP-2026-00130', firstName: 'Precious', lastName: 'Mokoena', idNumber: '9110285400088', email: 'precious.mokoena@gauteng.gov.za', phoneNumber: '0843456789', department: 'Social Development', role: 'Counsellor', startDate: '2026-03-01', onboardingStatus: 'IN_PROGRESS', completionPercentage: 30, createdAt: '2026-01-10', lastUpdated: '2026-02-10' },
    { employeeId: 'EMP-2026-00131', firstName: 'Andile', lastName: 'Ntuli', idNumber: '8812316900089', email: 'andile.ntuli@gauteng.gov.za', phoneNumber: '0625678901', department: 'Health', role: 'Pharmacist', startDate: '2026-03-05', onboardingStatus: 'BLOCKED', completionPercentage: 15, createdAt: '2026-01-15', lastUpdated: '2026-02-15' },
    { employeeId: 'EMP-2026-00132', firstName: 'Thandeka', lastName: 'Mbatha', idNumber: '9405227800080', email: 'thandeka.mbatha@gauteng.gov.za', phoneNumber: '0796789012', department: 'Education', role: 'Librarian', startDate: '2026-03-10', onboardingStatus: 'INITIATED', completionPercentage: 0, createdAt: '2026-01-20', lastUpdated: '2026-01-20' }
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.mockEmployees);

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  getEmployeeById(id: string): Observable<Employee | undefined> {
    const employee = this.mockEmployees.find(e => e.employeeId === id);
    return of(employee);
  }

  createEmployee(data: Partial<Employee>): Observable<Employee> {
    const newEmployee: Employee = {
      employeeId: `EMP-2026-${String(this.mockEmployees.length + 133).padStart(5, '0')}`,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      idNumber: data.idNumber || '',
      email: data.email || '',
      phoneNumber: data.phoneNumber || '',
      department: data.department || '',
      role: data.role || '',
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      onboardingStatus: 'INITIATED',
      completionPercentage: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.mockEmployees.push(newEmployee);
    this.employeesSubject.next([...this.mockEmployees]);
    return of(newEmployee);
  }

  getOnboardingStats(): Observable<{ total: number; inProgress: number; completed: number; blocked: number }> {
    const stats = {
      total: 45,
      inProgress: 12,
      completed: 28,
      blocked: 5
    };
    return of(stats);
  }
}
