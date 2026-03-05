import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
  providers: [MessageService]
})
export class EmployeeCreateComponent {
  employeeForm: FormGroup;
  departments = [
    { label: 'Health', value: 'Health' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Education', value: 'Education' },
    { label: 'Social Development', value: 'Social Development' }
  ];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) { this.employeeForm.markAllAsTouched(); return; }
    this.isSubmitting = true;
    const formValue = { ...this.employeeForm.value };
    if (formValue.startDate instanceof Date) {
      formValue.startDate = formValue.startDate.toISOString().split('T')[0];
    }
    this.employeeService.createEmployee(formValue).subscribe(newEmployee => {
      this.isSubmitting = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Employee ${newEmployee.firstName} ${newEmployee.lastName} created successfully!`, life: 3000 });
      setTimeout(() => this.router.navigate(['/employees', newEmployee.employeeId]), 1500);
    });
  }

  onCancel(): void { this.router.navigate(['/employees']); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
