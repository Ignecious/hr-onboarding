import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnboardingChecklistComponent } from './onboarding-checklist/onboarding-checklist.component';
import { SharedModule } from '../../shared/shared.module';

import { AccordionModule } from 'primeng/accordion';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [OnboardingChecklistComponent],
  imports: [CommonModule, RouterModule, SharedModule, AccordionModule, ProgressBarModule, ButtonModule, TagModule, CardModule, ToastModule]
})
export class OnboardingModule {}
