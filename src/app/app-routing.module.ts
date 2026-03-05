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

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/create', component: EmployeeCreateComponent },
      { path: 'employees/:id/documents/upload', component: DocumentUploadComponent },
      { path: 'employees/:id/documents', component: DocumentListComponent },
      { path: 'employees/:id/checklist', component: OnboardingChecklistComponent },
      { path: 'employees/:id', component: EmployeeDetailComponent },
      { path: 'documents/:id/verify', component: DocumentVerifyComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
