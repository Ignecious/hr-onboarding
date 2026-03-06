import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from '../../core/services/training.service';
import { Course } from '../../models/training.model';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingListComponent implements OnInit {
  courses: Course[] = [];
  loading = true;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.trainingService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'info';
      case 'not_started': return 'secondary';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'not_started': return 'Not Started';
      default: return status;
    }
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  viewCourse(course: Course): void {
    this.router.navigate(['/training', course.id]);
  }
}
