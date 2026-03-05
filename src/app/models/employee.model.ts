export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phoneNumber: string;
  department: string;
  role: string;
  startDate: string;
  onboardingStatus: 'INITIATED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  completionPercentage: number;
  createdAt: string;
  lastUpdated: string;
}
