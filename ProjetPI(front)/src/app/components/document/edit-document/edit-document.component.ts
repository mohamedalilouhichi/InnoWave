// import { Component, OnInit } from '@angular/core';
// import { DocumentService } from '../service/document.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-edit-document',
//   templateUrl: './edit-document.component.html',
//   styleUrls: ['./edit-document.component.css']
// })
// export class EditDocumentComponent implements OnInit {
//   updateForm!: FormGroup;
//   idDocuments!: number;

//   constructor(
//     private documentService: DocumentService,
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.updateForm = this.formBuilder.group({
//       category: ['', Validators.required],
//       description: ['', Validators.required],
//       rapportFile: [''],
//       cvFile: ['']
//     });

//     this.route.paramMap.subscribe(params => {
//       // Convertir le paramètre 'idDocuments' en nombre
//       this.idDocuments = +params.get('idDocuments')!; // Utilisation de '!' pour indiquer que params.get('idDocuments') ne sera pas nul
//     });

//     // Récupérer les détails du document et pré-remplir le formulaire
//     this.documentService.getDocumentById(this.idDocuments).subscribe(
//       (document: any) => {
//         this.updateForm.patchValue({
//           category: document.category,
//           description: document.description,
//           rapportFile: document.rapportFile,
//           cvFile:document.cvFile

//         });
//       },
//       error => {
//         console.log('Erreur lors de la récupération des détails du document :', error);
//       }
//     );
//   }

//   onUpdateDocument(): void {
//     if (this.updateForm.valid) {
//       const formData = new FormData();
//       formData.append('category', this.updateForm.get('category')!.value);
//       formData.append('description', this.updateForm.get('description')!.value);
//       formData.append('rapportFile', this.updateForm.get('rapportFile')!.value);
//       formData.append('cvFile', this.updateForm.get('cvFile')!.value);

//       this.documentService.updateDocument(this.idDocuments, formData).subscribe(
//         (response: any) => {
//           console.log('Document mis à jour avec succès', response);
//           this.updateForm.reset();
//           // this.router.navigate(['/document-list']);
//         },
//         (error) => {
//           console.log('Erreur lors de la mise à jour du document : ', error);
//         }
//       );
//     } else {
//       console.log('Le formulaire est invalide');
//     }
//   }

//   onFileChangeRapport(event: any) {
//     const file = (event.target as HTMLInputElement).files![0];
//     this.updateForm.patchValue({ rapportFile: file });
//   }

//   onFileChangeCV(event: any) {
//     const file = (event.target as HTMLInputElement).files![0];
//     this.updateForm.patchValue({ cvFile: file });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../service/document.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  updateForm!: FormGroup;
  idDocuments!: number;

  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      rapportFile: [null],
      cvFile: [null]
    });

    this.route.paramMap.subscribe(params => {
      // Convertir le paramètre 'idDocuments' en nombre
      this.idDocuments = +params.get('idDocuments')!;
    });

    // Récupérer les détails du document et pré-remplir le formulaire
    this.documentService.getDocumentById(this.idDocuments).subscribe(
      (document: any) => {
        this.updateForm.patchValue({
          category: document.category,
          description: document.description,
        });

        // Pré-remplir les champs de fichiers si des fichiers sont disponibles
        if (document.rapportFile && document.rapportFile.length > 0) {
          this.updateForm.patchValue({ rapportFile: document.rapportFile });
        }
        if (document.cvFile && document.cvFile.length > 0) {
          this.updateForm.patchValue({ cvFile: document.cvFile });
        }
      },
      error => {
        console.log('Erreur lors de la récupération des détails du document :', error);
      }
    );
  }

  onUpdateDocument(): void {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('category', this.updateForm.get('category')!.value);
      formData.append('description', this.updateForm.get('description')!.value);
      formData.append('rapportFile', this.updateForm.get('rapportFile')!.value);
      formData.append('cvFile', this.updateForm.get('cvFile')!.value);

      this.documentService.updateDocument(this.idDocuments, formData).subscribe(
        (response: any) => {
          console.log('Document mis à jour avec succès', response);
         
          this.router.navigate(['/listDoc']);
          // this.router.navigate(['/document-list']);
        },
        (error) => {
          console.log('Erreur lors de la mise à jour du document : ', error);
        }
      );
    } else {
      console.log('Le formulaire est invalide');
    }
    this.router.navigate(['/listDoc']);
  }

  onFileChangeRapport(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.updateForm.patchValue({ rapportFile: file });
  }

  onFileChangeCV(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.updateForm.patchValue({ cvFile: file });
  }
}

