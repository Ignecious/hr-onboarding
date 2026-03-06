import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Course } from '../../models/training.model';

const initialCourses: Course[] = [
  { id: 'course-001', title: 'POPIA Data Privacy Training', description: 'Mandatory training on data protection and privacy compliance for all government employees.', duration: '45 minutes', progress: 40, status: 'in_progress', dueDate: '2026-03-12', category: 'Compliance' },
  { id: 'course-002', title: 'Infection Control Training', description: 'Health & Safety training on infection prevention and control for the Health Department.', duration: '60 minutes', progress: 0, status: 'not_started', dueDate: '2026-03-15', category: 'Health & Safety' },
  { id: 'course-003', title: 'Anti-Corruption Awareness', description: 'Understanding PFMA requirements and anti-corruption measures in the public sector.', duration: '30 minutes', progress: 100, status: 'completed', dueDate: '2026-03-05', category: 'Compliance' },
  { id: 'course-004', title: 'Code of Conduct & Ethics', description: 'Gauteng Province code of conduct and ethical standards for public servants.', duration: '20 minutes', progress: 0, status: 'not_started', dueDate: '2026-03-20', category: 'HR' },
  { id: 'course-005', title: 'Occupational Health & Safety', description: 'Workplace safety regulations and emergency procedures.', duration: '50 minutes', progress: 60, status: 'in_progress', dueDate: '2026-03-18', category: 'Health & Safety' }
];

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private coursesSubject = new BehaviorSubject<Course[]>(initialCourses);

  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  getCourseById(id: string): Observable<Course | undefined> {
    const course = this.coursesSubject.getValue().find(c => c.id === id);
    return of(course);
  }

  markCourseCompleted(id: string): Observable<Course | undefined> {
    const updated = this.coursesSubject.getValue().map(c =>
      c.id === id ? { ...c, status: 'completed' as const, progress: 100 } : c
    );
    this.coursesSubject.next(updated);
    return this.getCourseById(id);
  }
}
