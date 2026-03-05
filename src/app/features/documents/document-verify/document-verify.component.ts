import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentService } from '../../../core/services/document.service';
import { Document } from '../../../models/document.model';

@Component({
  selector: 'app-document-verify',
  templateUrl: './document-verify.component.html',
  styleUrls: ['./document-verify.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DocumentVerifyComponent implements OnInit {
  document?: Document;
  rejectionNotes = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.documentService.getDocumentById(id).subscribe(doc => this.document = doc);
    }
  }

  approve(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this document?',
      header: 'Confirm Approval',
      icon: 'pi pi-check-circle',
      accept: () => {
        if (this.document) {
          this.documentService.verifyDocument(this.document.documentId, true).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Approved', detail: 'Document has been approved!' });
            setTimeout(() => this.router.navigate(['/employees', this.document!.employeeId, 'documents']), 1500);
          });
        }
      }
    });
  }

  reject(): void {
    if (!this.rejectionNotes.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please provide rejection notes' });
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure you want to reject this document?',
      header: 'Confirm Rejection',
      icon: 'pi pi-times-circle',
      accept: () => {
        if (this.document) {
          this.documentService.verifyDocument(this.document.documentId, false, this.rejectionNotes).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Document has been rejected.' });
            setTimeout(() => this.router.navigate(['/employees', this.document!.employeeId, 'documents']), 1500);
          });
        }
      }
    });
  }

  getDocTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'SA_ID': 'SA ID Document', 'PROOF_OF_ADDRESS': 'Proof of Address',
      'EDUCATION_CERT': 'Education Certificate', 'BANK_DETAILS': 'Bank Details',
      'TAX_DOCUMENT': 'Tax Document', 'CONTRACT': 'Employment Contract'
    };
    return labels[type] || type;
  }
}
