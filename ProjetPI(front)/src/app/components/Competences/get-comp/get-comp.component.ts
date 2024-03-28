import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


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
/////////
isModalOpen: boolean = false;
selectedCompetenceId: number | null = null;


  constructor(private competencesService: CompetencesService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    // Use this.route to subscribe to route parameters
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const context = params['context'];
      const id = params['id'];
      if (context && id) {
        // Use a type assertion here to assert the type of `context`
        this.fetchFilteredCompetences(context as 'user' | 'stage', +id);
      } else {
        this.getCompetences();
      }
    });

  }
  openModal(competenceId: number) {
    console.log("Opening modal for competence ID:", competenceId); // Ensure this logs the correct ID
    this.selectedCompetenceId = competenceId;
    this.isModalOpen = true;
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
    // Reset selected ID

    // Assuming you have a way to update contextIds based on selectedContext
    // For example, if you have a service method to fetch IDs based on context
    // this.updateContextIds(context);
  }

  updateCompetence(id: number) {
    this.router.navigate(['/competence/update', id]);
    // Logique pour mettre à jour la compétence avec l'ID spécifié
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
      cancelButtonText: ' No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.competencesService.deleteCompetence(idCompetences).subscribe(
          () => {
            console.log('Skill successfully removed');
            // Remove the deleted competence from the competences array
            this.competences = this.competences.filter(comp => comp.idCompetences !== idCompetences);
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'The skill has been removed.',
              'success'
            );
          },
          error => {
            console.error('An error occurred while deleting the competence:', error);
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
  navigateToFilteredView() {
    if (this.selectedContext && this.selectedId) {
      this.router.navigate(['/competences/filter', this.selectedContext, this.selectedId]);
    }
  }

  // Fetch competences based on context and ID
  fetchFilteredCompetences(context: string | null, id: any) {
    // Ensure context is either 'user' or 'stage', and id is a number
    if ((context === 'user' || context === 'stage') && !isNaN(id)) {
      // Convert id to a number and proceed with the fetching logic
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
      // Handle invalid context or ID appropriately (e.g., show an error message)
    }
  }
}
