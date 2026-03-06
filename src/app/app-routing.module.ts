import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeeListComponent } from './features/employees/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './features/employees/employee-create/employee-create.component';
import { EmployeeDetailComponent } from './features/employees/employee-detail/employee-detail.component';
import { DocumentUploadComponent } from './features/documents/document-upload/document-upload.component';
import { DocumentListComponent } from './features/documents/document-list/document-list.component';
import { DocumentVerifyComponent } from './features/documents/document-verify/document-verify.component';
import { OnboardingChecklistComponent } from './features/onboarding/onboarding-checklist/onboarding-checklist.component';
import { VisibilityDashboardComponent } from './features/visibility-dashboard/visibility-dashboard.component';
import { EmployeePortalComponent } from './features/employee-portal/employee-portal.component';
import { ExceptionQueueComponent } from './features/exceptions/exception-queue.component';
import { TrainingListComponent } from './features/training/training-list.component';
import { TrainingDetailComponent } from './features/training/training-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/visibility', component: VisibilityDashboardComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/create', component: EmployeeCreateComponent },
      { path: 'employees/:id/documents/upload', component: DocumentUploadComponent },
      { path: 'employees/:id/documents', component: DocumentListComponent },
      { path: 'employees/:id/checklist', component: OnboardingChecklistComponent },
      { path: 'employees/:id', component: EmployeeDetailComponent },
      { path: 'documents/:id/verify', component: DocumentVerifyComponent },
      { path: 'employee/portal', component: EmployeePortalComponent },
      { path: 'exceptions', component: ExceptionQueueComponent },
      { path: 'training', component: TrainingListComponent },
      { path: 'training/:id', component: TrainingDetailComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
