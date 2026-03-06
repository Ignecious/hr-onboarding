import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Exception } from '../../models/exception.model';

const initialExceptions: Exception[] = [
  { id: 'exc-001', employeeName: 'Thandi Nkosi', type: 'document_rejected', severity: 'high', detectedAt: '2026-03-05T14:00:00Z', status: 'new', details: 'SA ID rejected 3 times - image unclear' },
  { id: 'exc-002', employeeName: 'John Dlamini', type: 'stalled', severity: 'medium', detectedAt: '2026-03-04T09:00:00Z', status: 'in_progress', details: 'No activity for 7 days' },
  { id: 'exc-003', employeeName: 'Andile Ntuli', type: 'verification_failed', severity: 'critical', detectedAt: '2026-03-05T08:00:00Z', status: 'new', details: 'Home Affairs verification returned no match' },
  { id: 'exc-004', employeeName: 'Lerato Molefe', type: 'missing_document', severity: 'high', detectedAt: '2026-03-03T11:00:00Z', status: 'in_progress', details: 'Bank confirmation letter not submitted' },
  { id: 'exc-005', employeeName: 'Kagiso Sithole', type: 'stalled', severity: 'low', detectedAt: '2026-03-02T16:00:00Z', status: 'new', details: 'No activity for 10 days' },
  { id: 'exc-006', employeeName: 'Thandeka Mbatha', type: 'system_error', severity: 'medium', detectedAt: '2026-03-04T13:00:00Z', status: 'new', details: 'Document upload failed due to system error' },
  { id: 'exc-007', employeeName: 'Precious Mokoena', type: 'missing_document', severity: 'low', detectedAt: '2026-03-01T10:00:00Z', status: 'resolved', details: 'Proof of residence not submitted' }
];

@Injectable({ providedIn: 'root' })
export class ExceptionService {
  private exceptionsSubject = new BehaviorSubject<Exception[]>(initialExceptions);

  getExceptions(): Observable<Exception[]> {
    return this.exceptionsSubject.asObservable();
  }

  updateExceptionStatus(id: string, status: Exception['status']): void {
    const updated = this.exceptionsSubject.getValue().map(e =>
      e.id === id ? { ...e, status } : e
    );
    this.exceptionsSubject.next(updated);
  }
}
