export type CourseStatus = 'not_started' | 'in_progress' | 'completed';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  status: CourseStatus;
  dueDate: string;
  category?: string;
}
