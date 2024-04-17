import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpData: any = {};

  constructor(public router: Router, private authService: AuthService) {
  }
  login(){
    this.router.navigate(['/login']);
  }
  register() {
    this.authService.register(this.signUpData).subscribe(
      (response) => {
        console.log('Utilisateur inscrit avec succès :', response);
        this.router.navigate(['/login']);
        // Gérer la redirection ou afficher un message de succès à l'utilisateur
      },
      (error) => {
        console.error('Erreur lors de l\'inscription de l\'utilisateur :', error);
        // Afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions nécessaires en cas d'erreur
      }
    );
  }
}
