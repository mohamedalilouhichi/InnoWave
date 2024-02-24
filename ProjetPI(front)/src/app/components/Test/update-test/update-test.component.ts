import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../test.service';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {
  test: Test = new Test(0, '', '', '', new Date(), 0);

  constructor(
    private testsService: TestService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const testId = +params['id'];
      if (testId) {
        this.getTest(testId);
      }
    });
  }

  getTest(testId: number) {
    this.testsService.getTestById(testId).subscribe(
      response => {
        console.log('Test récupéré avec succès :', response);
        // Mettre à jour la propriété test avec les données récupérées
        this.test = response;
      },
      error => {
        console.error('Erreur lors de la récupération du test :', error);
        // Gérer l'erreur et afficher un message approprié à l'utilisateur
      }
    );
  }
  
  updateTest() {
    if (this.test.idTest && this.test.name && this.test.description && this.test.status && this.test.createdAt && this.test.duration) {
      this.testsService.updateTest(this.test.idTest, this.test).subscribe(
        response => {
          console.log('Test mis à jour avec succès :', response);
          // Redirigez l'utilisateur vers une page appropriée après la mise à jour
          // Par exemple, vers la liste des tests ou la page de détail du test mis à jour
          this.router.navigate(['/Test/get']); // Assurez-vous que le chemin est correct selon votre application
        },
        error => {
          console.error('Erreur lors de la mise à jour du test :', error);
          // Ici, vous pouvez gérer les erreurs et éventuellement afficher un message à l'utilisateur
        }
      );
    } else {
      console.log('Tous les champs sont requis.');
      // Gestion des cas où tous les champs requis ne sont pas remplis.
      // Vous pourriez afficher un message d'erreur à l'utilisateur
    }
  }
  
 
}