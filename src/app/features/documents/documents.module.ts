import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentVerifyComponent } from './document-verify/document-verify.component';
import { SharedModule } from '../../shared/shared.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [DocumentUploadComponent, DocumentListComponent, DocumentVerifyComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    TableModule,
    ButtonModule,
    TagModule,
    CardModule,
    FileUploadModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DividerModule,
    TooltipModule
  ]
})
export class DocumentsModule {}
