import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../service/document.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.css'],
})
export class AddDocComponent implements OnInit {
  candidacyForm!: FormGroup;
  captcha: string = '';
  userInput: string = '';
  captchaCorrect: boolean = false;

  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.candidacyForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      rapportFile: [null, Validators.required],
      cvFile: [null, Validators.required],
      captcha: ['', Validators.required], // Ajoutez le champ captcha au formulaire avec validation requise
    });

    // Générer une captcha aléatoire lors du chargement de la page
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    // Code pour générer une captcha aléatoire
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    this.captcha = captcha;
  }

  // Méthode pour soumettre le formulaire
  // addDocument(): void {
  //   // Vérifiez si le formulaire est valide
  //   if (this.candidacyForm.valid) {
  //     // Vérifiez si la captcha est correcte
  //     if (this.userInput === this.captcha) {
  //       // Soumettez le formulaire si la captcha est correcte
  //       const formData = new FormData();
  //       formData.append('category', this.candidacyForm.get('category')!.value);
  //       formData.append(
  //         'description',
  //         this.candidacyForm.get('description')!.value
  //       );
  //       formData.append(
  //         'rapportFile',
  //         this.candidacyForm.get('rapportFile')!.value
  //       );
  //       formData.append('cvFile', this.candidacyForm.get('cvFile')!.value);

  //       this.documentService.addDocument(formData).subscribe(
  //         (response: any) => {
  //           console.log('Document added successfully', response);
  //           this.candidacyForm.reset();
  //           this.router.navigate(['/home']);
  //         },
  //         (error) => {
  //           console.log('Error while adding document: ', error);
  //         }
  //       );
  //     } else {
  //       // Affichez un message d'erreur si la captcha est incorrecte
  //       console.log('Captcha is incorrect');
  //     }
  //   } else {
  //     // Affichez un message d'erreur si le formulaire est invalide
  //     console.log('Form is invalid');
  //   }
  // }
  addDocument(): void {
    // Vérification de la validité du formulaire
    if (!this.candidacyForm.valid) {
      console.log('Form is invalid');
      return;
    }

    // Vérification de la captcha
    if (this.userInput !== this.captcha) {
      alert('Captcha incorrect');
      return;
    }

    // Préparation des données du formulaire
    const formData = new FormData();
    formData.append('category', this.candidacyForm.get('category')!.value);
    formData.append('description', this.candidacyForm.get('description')!.value);
    formData.append('rapportFile', this.candidacyForm.get('rapportFile')!.value);
    formData.append('cvFile', this.candidacyForm.get('cvFile')!.value);

    // Soumission du formulaire
    this.documentService.addDocument(formData).subscribe(
      (response: any) => {
        console.log('Document added successfully', response);
        alert('Document ajouté avec succès');
        this.candidacyForm.reset();
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Error while adding document: ', error);
      }
    );
  }


  // Méthode pour détecter le changement de fichier pour le rapport
  onFileChangeRapport(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.candidacyForm.patchValue({ rapportFile: file });
  }

  // Méthode pour détecter le changement de fichier pour le CV
  onFileChangeCV(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.candidacyForm.patchValue({ cvFile: file });
  }
}
