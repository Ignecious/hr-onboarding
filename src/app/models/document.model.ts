export interface Document {
  documentId: string;
  employeeId: string;
  fileName: string;
  documentType: 'SA_ID' | 'PROOF_OF_ADDRESS' | 'EDUCATION_CERT' | 'BANK_DETAILS' | 'TAX_DOCUMENT' | 'CONTRACT';
  fileSize: number;
  uploadedAt: string;
  status: 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
}
