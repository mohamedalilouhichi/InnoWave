import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Competences } from 'src/app/models/competences';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-get-comp',
  templateUrl: './get-comp.component.html',
  styleUrls: ['./get-comp.component.css']
})
export class GetCompComponent implements OnInit {
  competences: any[] = [];
  selectedContext: 'user' | 'stage' | null = null;
  selectedId: number | null = null;
  contextIds: Array<{ id: number; name: string }> = []; // Example structure
  isModalOpen: boolean = false;
  selectedCompetenceId: number | null = null;
  selectedCompetence: Competences = new Competences(0, '', '', 0);

  constructor(private competencesService: CompetencesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const context = params['context'];
      const id = params['id'];
      if (context && id) {
        this.fetchFilteredCompetences(context as 'user' | 'stage', +id);
      } else {
        this.getCompetences();
      }
    });
  }

  openModal(competenceId: number) {
    console.log("Opening modal for competence ID:", competenceId);
    this.selectedCompetenceId = competenceId;
    this.isModalOpen = true;
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      console.error('Le formulaire n\'est pas valide');
      return;
    }

    const currentContext = this.selectedContext;
    const currentId = this.selectedId;

    if (this.selectedCompetenceId) {
      this.competencesService.updateCompetence(this.selectedCompetenceId, this.selectedCompetence).subscribe({
        next: (response) => {
          console.log('Mise à jour réussie de la compétence', response);
          this.closeModal();
          if (currentContext && currentId != null) {
            this.router.navigate(['/competences/get', currentContext, currentId.toString()]);
          } else {
            console.error('Le contexte ou l\'ID est null ou indéfini');
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la compétence', error);
        }
      });
    } else {
      // Logic to add a new competence
    }
  }

  closeModal() {
    this.isModalOpen = false;
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

  onContextChange(value: string) {
    this.selectedContext = value as 'user' | 'stage';
    this.selectedId = null;
  }

  updateCompetence(id: number) {
    this.router.navigate(['/competence/update', id]);
    console.log('Update competence with ID:', id);
  }

  getCardColor(importanceLevel: number): string {
    if (importanceLevel <= 3) {
      return 'green';
    } else if (importanceLevel <= 6) {
      return 'blue';
    } else {
      return 'red';
    }
  }

  deleteComp(idCompetences: number) {
    if (idCompetences == null) {
      console.error('ID to delete is undefined');
      return;
    }

    console.log('ID to delete:', idCompetences);

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
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.competencesService.deleteCompetence(idCompetences).subscribe(
          () => {
            console.log('Skill successfully removed');
            this.getCompetences();
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'The skill has been removed.',
              'success'
            );
          },
          error => {
            console.error('An error occurred while deleting the skill:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your skill is safe :)',
          'error'
        );
      }
    });
  }

  navigateToFilteredView() {
    if (this.selectedContext && this.selectedId) {
      this.router.navigate(['/competences/filter', this.selectedContext, this.selectedId]);
    }
  }

  fetchFilteredCompetences(context: string | null, id: any) {
    if ((context === 'user' || context === 'stage') && !isNaN(id)) {
      this.competencesService.getCompetencesFiltered(context, +id).subscribe(
        competences => {
          this.competences = competences;
        },
        error => {
          console.error('Failed to fetch competences', error);
        }
      );
    } else {
      console.error('Invalid context or ID');
    }
  }
}
