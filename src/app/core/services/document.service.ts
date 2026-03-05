import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document } from '../../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private mockDocuments: Document[] = [
    { documentId: 'DOC-001', employeeId: 'EMP-2026-00123', fileName: 'sa_id_thabo.pdf', documentType: 'SA_ID', fileSize: 1024000, uploadedAt: '2026-01-16', status: 'VERIFIED', verifiedBy: 'HR Admin', verifiedAt: '2026-01-17' },
    { documentId: 'DOC-002', employeeId: 'EMP-2026-00123', fileName: 'proof_address_thabo.pdf', documentType: 'PROOF_OF_ADDRESS', fileSize: 512000, uploadedAt: '2026-01-16', status: 'VERIFIED', verifiedBy: 'HR Admin', verifiedAt: '2026-01-17' },
    { documentId: 'DOC-003', employeeId: 'EMP-2026-00123', fileName: 'edu_cert_thabo.pdf', documentType: 'EDUCATION_CERT', fileSize: 2048000, uploadedAt: '2026-01-17', status: 'VERIFIED', verifiedBy: 'HR Admin', verifiedAt: '2026-01-18' },
    { documentId: 'DOC-004', employeeId: 'EMP-2026-00124', fileName: 'sa_id_nomsa.pdf', documentType: 'SA_ID', fileSize: 980000, uploadedAt: '2026-01-21', status: 'VERIFIED', verifiedBy: 'HR Admin', verifiedAt: '2026-01-22' },
    { documentId: 'DOC-005', employeeId: 'EMP-2026-00124', fileName: 'proof_address_nomsa.pdf', documentType: 'PROOF_OF_ADDRESS', fileSize: 450000, uploadedAt: '2026-01-21', status: 'PENDING_VERIFICATION' },
    { documentId: 'DOC-006', employeeId: 'EMP-2026-00124', fileName: 'edu_cert_nomsa.pdf', documentType: 'EDUCATION_CERT', fileSize: 1800000, uploadedAt: '2026-01-22', status: 'REJECTED', notes: 'Certificate not legible, please reupload' },
    { documentId: 'DOC-007', employeeId: 'EMP-2026-00125', fileName: 'sa_id_sipho.pdf', documentType: 'SA_ID', fileSize: 1100000, uploadedAt: '2026-02-02', status: 'PENDING_VERIFICATION' },
    { documentId: 'DOC-008', employeeId: 'EMP-2026-00125', fileName: 'bank_details_sipho.pdf', documentType: 'BANK_DETAILS', fileSize: 300000, uploadedAt: '2026-02-02', status: 'PENDING_VERIFICATION' }
  ];

  getDocumentsByEmployee(employeeId: string): Observable<Document[]> {
    const docs = this.mockDocuments.filter(d => d.employeeId === employeeId);
    return of(docs);
  }

  getDocumentById(docId: string): Observable<Document | undefined> {
    const doc = this.mockDocuments.find(d => d.documentId === docId);
    return of(doc);
  }

  uploadDocument(employeeId: string, documentType: string, fileName: string, fileSize: number): Observable<Document> {
    const newDoc: Document = {
      documentId: `DOC-${String(this.mockDocuments.length + 1).padStart(3, '0')}`,
      employeeId,
      fileName,
      documentType: documentType as Document['documentType'],
      fileSize,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'PENDING_VERIFICATION'
    };
    this.mockDocuments.push(newDoc);
    return of(newDoc);
  }

  verifyDocument(docId: string, approved: boolean, notes?: string): Observable<Document> {
    const doc = this.mockDocuments.find(d => d.documentId === docId);
    if (doc) {
      doc.status = approved ? 'VERIFIED' : 'REJECTED';
      doc.verifiedBy = 'HR Admin';
      doc.verifiedAt = new Date().toISOString().split('T')[0];
      if (notes) doc.notes = notes;
    }
    return of(doc!);
  }
}
