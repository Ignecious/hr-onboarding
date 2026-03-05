import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
  providers: [MessageService]
})
export class DocumentUploadComponent implements OnInit {
  employeeId = '';
  selectedDocType = '';
  uploadedFiles: any[] = [];
  isUploading = false;

  documentTypes = [
    { label: 'SA ID', value: 'SA_ID' },
    { label: 'Proof of Address', value: 'PROOF_OF_ADDRESS' },
    { label: 'Education Certificate', value: 'EDUCATION_CERT' },
    { label: 'Bank Details', value: 'BANK_DETAILS' },
    { label: 'Tax Document', value: 'TAX_DOCUMENT' },
    { label: 'Employment Contract', value: 'CONTRACT' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
  }

  onFileSelect(event: any): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onUpload(event: any): void {
    if (!this.selectedDocType) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a document type' });
      return;
    }
    this.isUploading = true;
    const file = event.files[0];
    this.documentService.uploadDocument(this.employeeId, this.selectedDocType, file.name, file.size).subscribe(() => {
      this.isUploading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document uploaded successfully!' });
      setTimeout(() => this.router.navigate(['/employees', this.employeeId, 'documents']), 1500);
    });
  }

  goBack(): void { this.router.navigate(['/employees', this.employeeId]); }
}
