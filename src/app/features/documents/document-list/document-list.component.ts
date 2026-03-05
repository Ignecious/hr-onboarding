import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../../core/services/document.service';
import { Document } from '../../../models/document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  employeeId = '';
  documents: Document[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private documentService: DocumentService) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.documentService.getDocumentsByEmployee(this.employeeId).subscribe(docs => this.documents = docs);
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'VERIFIED': return 'success';
      case 'PENDING_VERIFICATION': return 'warning';
      case 'REJECTED': return 'danger';
      default: return 'info';
    }
  }

  verifyDocument(doc: Document): void { this.router.navigate(['/documents', doc.documentId, 'verify']); }
  uploadDocument(): void { this.router.navigate(['/employees', this.employeeId, 'documents', 'upload']); }
  formatFileSize(bytes: number): string { return (bytes / 1024 / 1024).toFixed(2) + ' MB'; }
}
