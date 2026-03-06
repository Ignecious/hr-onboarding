export type ExceptionSeverity = 'critical' | 'high' | 'medium' | 'low';
export type ExceptionStatus = 'new' | 'in_progress' | 'resolved' | 'dismissed';
export type ExceptionType =
  | 'document_rejected'
  | 'stalled'
  | 'verification_failed'
  | 'missing_document'
  | 'system_error';

export interface Exception {
  id: string;
  employeeName: string;
  type: ExceptionType;
  severity: ExceptionSeverity;
  detectedAt: string;
  status: ExceptionStatus;
  details: string;
}
