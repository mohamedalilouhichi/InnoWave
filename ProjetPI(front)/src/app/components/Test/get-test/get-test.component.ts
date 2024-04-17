import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
  
    // Utilisation de SweetAlert2 pour la confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annulez!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Appeler le service pour supprimer le test
        this.testservice.deleteTest(idTest).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              'Le test a été supprimé.',
              'success'
            );
            this.getTests(); // Récupère à nouveau la liste des tests après la suppression
          },
          error => {
            console.error('Une erreur s\'est produite lors de la suppression du test :', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du test.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Votre test est sécurisé :)',
          'error'
        );
      }
    });
  }
  
  
}
