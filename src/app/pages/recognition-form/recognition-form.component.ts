import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-recognition-form',
  imports: [SharedModule],
  templateUrl: './recognition-form.component.html',
  styleUrl: './recognition-form.component.scss'
})
export class RecognitionFormComponent {
  form!: FormGroup;
  categories = ['Bug Fix', 'Help', 'Innovation', 'Customer Appreciation'];
  users = [{ userId: 2, name: 'Anitha' }, { userId: 3, name: 'Sona' }, { userId: 4, name: 'Abi' }];
  submitting = false;
  submitted = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({ 
      recognizedTo: [null, Validators.required],
      category: [null, Validators.required],
      comments: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  setCategory(c: string) { this.form.patchValue({ category: c }); }

  charCount() { return (this.form.get('comments')?.value || '').length; }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['mat-error']
      });
      return;
    }
    this.submitting = true;
    const payload = {
      recognizedTo: this.form.value.recognizedTo,
      categoryId: this.mapCategory(this.form.value.category),
      comments: this.form.value.comments
    };
    // this.rnr.createRecognition(payload as any).subscribe({
    //   next: () => { this.submitting = false; this.form.reset(); this.submitted = false; },
    //   error: () => { this.submitting = false; }
    // });
  }

  private mapCategory(cat: string) {
    const map: any = { 'Bug Fix': 1, 'Help': 2, 'Innovation': 3, 'Customer Appreciation': 4 };
    return map[cat] || 1;
  }
}
