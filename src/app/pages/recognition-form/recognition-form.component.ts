import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-recognition-form',
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule,MatInputModule, MatAutocompleteModule, MatCardModule],
  templateUrl: './recognition-form.component.html',
  styleUrl: './recognition-form.component.scss'
})
export class RecognitionFormComponent {
  form!: FormGroup;
  categories = ['Bug Fix', 'Help', 'Innovation', 'Customer Appreciation'];
  users = [{ userId: 2, name: 'Anitha' }, { userId: 3, name: 'Sona' }, { userId: 4, name: 'Abi' }];
  submitting = false;


  constructor(private fb: FormBuilder) { }


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
    if (this.form.invalid) return;
    this.submitting = true;
    const payload = {
      recognizedTo: this.form.value.recognizedTo,
      categoryId: this.mapCategory(this.form.value.category),
      comments: this.form.value.comments
    };
    // this.rnr.createRecognition(payload as any).subscribe({
    //   next: () => { this.submitting = false; this.form.reset(); },
    //   error: () => { this.submitting = false; }
    // });
  }


  private mapCategory(cat: string) {
    const map: any = { 'Bug Fix': 1, 'Help': 2, 'Innovation': 3, 'Customer Appreciation': 4 };
    return map[cat] || 1;
  }
}
