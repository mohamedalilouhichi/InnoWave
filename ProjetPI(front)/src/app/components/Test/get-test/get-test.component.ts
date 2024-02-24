import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-test',
  templateUrl: './get-test.component.html',
  styleUrls: ['./get-test.component.css']
})
export class GetTestComponent implements OnInit{
  test: any[] = [];
  selectedTest: any = {};
  showModal: boolean = false;
  constructor(private testservice: TestService,private router: Router) {}
  ngOnInit(): void {
    this.getTests();
    throw new Error('Method not implemented.');
  }
 

  
  getTests() {
    this.testservice.getTest().subscribe(
      data => {
        this.test = data;
        console.log('Données de la base :', this.test);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);
      }
    );
  }
  updateTest(id: number) {
    this.router.navigate(['/Test/update', id]);
    // Logique pour mettre à jour la compétence avec l'ID spécifié
    console.log('Update competence with ID:', id);
  }

 

  deleteTest(idTest: number) {
    console.log('ID to delete:', idTest);
    if (confirm('Êtes-vous sûr de vouloir supprimer ce test ?')) {
      this.testservice.deleteTest(idTest).subscribe(
        () => {
          console.log('Test supprimé avec succès');
          this.getTests(); // Récupère à nouveau la liste des tests après la suppression
        },
        error => {
          console.error('Une erreur s\'est produite lors de la suppression du test :', error);
        }
      );
    } else {
      console.log('Suppression annulée');
    }
  }
  
}
