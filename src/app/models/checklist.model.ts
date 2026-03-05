export interface ChecklistStep {
  stepId: string;
  name: string;
  description: string;
  category: 'DOCUMENTS' | 'VERIFICATION' | 'SYSTEM_SETUP';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  required: boolean;
  completedAt?: string;
}

export interface Checklist {
  employeeId: string;
  onboardingId: string;
  overallStatus: string;
  completionPercentage: number;
  steps: ChecklistStep[];
}
