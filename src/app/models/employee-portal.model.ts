export interface NextStep {
  name: string;
  dueDate: string;
}

export interface ActivityItem {
  description: string;
  timestamp: string;
  icon: string;
}

export interface EmployeePortalData {
  employeeId: string;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  completionPercentage: number;
  nextSteps: NextStep[];
  recentActivity: ActivityItem[];
}
