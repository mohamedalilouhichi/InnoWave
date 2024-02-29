import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-get-comp',
  templateUrl: './get-comp.component.html',
  styleUrls: ['./get-comp.component.css']
})
export class GetCompComponent implements OnInit {
  competences: any[] = [];

  constructor(private competencesService: CompetencesService, private router: Router) {}

  ngOnInit() {
    this.getCompetences();
  }
 
  getCompetences() {
    this.competencesService.getCompetences().subscribe(
      data => {
        this.competences = data;
        console.log('Données de la base :', this.competences);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);
      }
    );
  }

  updateCompetence(id: number) {
    this.router.navigate(['/competence/update', id]);
    // Logique pour mettre à jour la compétence avec l'ID spécifié
    console.log('Update competence with ID:', id);
  }

  deleteComp(idCompetences: number) {
    console.log('ID to delete:', idCompetences);
  
    // Configuration de SweetAlert2 avec des boutons personnalisés
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to go back!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: ' No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Appeler le service pour supprimer la compétence
        this.competencesService.deleteCompetence(idCompetences).subscribe(
          () => {
            console.log('Skill successfully removed');
            // Récupère à nouveau la liste des compétences après la suppression
            this.getCompetences();
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'The skill has been removed.',
              'success'
            );
          },
          error => {
            console.error('Une erreur s\'est produite lors de la suppression de la compétence :', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Canceled',
          'Your skill is secure :)',
          'error'
        );
      }
    });
  }
  
  
  
}