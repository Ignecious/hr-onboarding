import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeePortalData } from '../../models/employee-portal.model';

const mockEmployeeData: EmployeePortalData = {
  employeeId: 'EMP-2026-00123',
  firstName: 'Sipho',
  lastName: 'Mabena',
  department: 'Health',
  role: 'Nurse',
  completionPercentage: 65,
  nextSteps: [
    { name: 'Upload Bank Details', dueDate: '2026-03-10' },
    { name: 'Complete POPIA Training', dueDate: '2026-03-12' },
    { name: 'Submit Medical Certificate', dueDate: '2026-03-14' }
  ],
  recentActivity: [
    { description: 'SA ID document uploaded', timestamp: '2026-03-05T10:30:00Z', icon: 'pi pi-upload' },
    { description: 'Employment contract signed', timestamp: '2026-03-04T14:00:00Z', icon: 'pi pi-file' },
    { description: 'POPIA training started', timestamp: '2026-03-03T09:00:00Z', icon: 'pi pi-play' },
    { description: 'Onboarding initiated', timestamp: '2026-03-01T08:00:00Z', icon: 'pi pi-flag' }
  ]
};

@Injectable({ providedIn: 'root' })
export class EmployeePortalService {
  getEmployeePortalData(): Observable<EmployeePortalData> {
    return of(mockEmployeeData);
  }
}
