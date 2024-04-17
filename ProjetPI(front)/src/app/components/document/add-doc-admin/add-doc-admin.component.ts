
import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../service/document.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doc-admin',
  templateUrl: './add-doc-admin.component.html',
  styleUrls: ['./add-doc-admin.component.css']
})
export class AddDocAdminComponent {
  candidacyForm!: FormGroup;

  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.candidacyForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      rapportFile: [null, Validators.required],
      cvFile: [null, Validators.required],
    });
  }

  get f() { return this.candidacyForm.controls}
  addDocument(): void {
    if (this.candidacyForm.valid) {
      const formData = new FormData();
      formData.append('category', this.candidacyForm.get('category')!.value);
      formData.append('description', this.candidacyForm.get('description')!.value);
      formData.append('rapportFile', this.candidacyForm.get('rapportFile')!.value);
      formData.append('cvFile', this.candidacyForm.get('cvFile')!.value);

      this.documentService.addDocument(formData).subscribe(
        (response: any) => {
          console.log('Document added successfully', response);
          this.candidacyForm.reset();
          this.router.navigate(['/listDoc']);
        },
        (error) => {
          console.log('Error while adding document: ', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
    this.router.navigate(['/listDoc']);
  }

  onFileChangeRapport(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.candidacyForm.patchValue({ rapportFile: file });
  }

  onFileChangeCV(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.candidacyForm.patchValue({ cvFile: file });
  }
}