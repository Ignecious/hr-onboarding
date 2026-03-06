import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrainingListComponent } from './training-list.component';
import { TrainingDetailComponent } from './training-detail.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [TrainingListComponent, TrainingDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TagModule,
    ProgressBarModule
  ]
})
export class TrainingModule {}
