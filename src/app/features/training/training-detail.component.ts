import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../../core/services/training.service';
import { Course } from '../../models/training.model';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingDetailComponent implements OnInit {
  course: Course | null = null;
  loading = true;
  completing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/training']);
      return;
    }
    this.trainingService.getCourseById(id).subscribe(course => {
      this.course = course || null;
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

  markCompleted(): void {
    if (!this.course) return;
    this.completing = true;
    this.trainingService.markCourseCompleted(this.course.id).subscribe(course => {
      this.course = course || null;
      this.completing = false;
      this.cdr.markForCheck();
    });
  }

  goBack(): void {
    this.router.navigate(['/training']);
  }
}
