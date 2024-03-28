import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { Router,ActivatedRoute } from '@angular/router';
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
/////////
isModalOpen: boolean = false;
selectedCompetenceId: number | null = null;


selectedCompetence: Competences = new Competences(0, '', '', 0);

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
  openModal(competenceId?: number) {
    this.isModalOpen = true;
    if (competenceId) {
      const competence = this.competences.find(c => c.idCompetences === competenceId);
      if (competence) {
        this.selectedCompetence = { ...competence }; // Utilisez selectedCompetence ici
        this.selectedCompetenceId = competenceId;
      }
    } else {
      this.selectedCompetence = new Competences(0, '', '', 0); // Réinitialisez selectedCompetence
      this.selectedCompetenceId = null;
    }
  }
submitForm(form: NgForm) {
  if (!form.valid) {
    console.error('Le formulaire n\'est pas valide');
    return;
  }

  // Récupérer le contexte et l'ID à partir de l'URL actuelle
  // Cela suppose que selectedContext et selectedId sont toujours définis correctement dans votre composant
  const currentContext = this.selectedContext;
  const currentId = this.selectedId;

  if (this.selectedCompetenceId) {
    // Mise à jour de la compétence existante
    this.competencesService.updateCompetence(this.selectedCompetenceId, this.selectedCompetence).subscribe({
      next: (response) => {
        console.log('Mise à jour réussie de la compétence', response);
        this.closeModal(); // Fermer la modal après la mise à jour

        // Utilisez les valeurs actuelles de currentContext et currentId pour la navigation
        if (currentContext && currentId != null) {
          this.router.navigate(['/competences/get', currentContext, currentId.toString()]);
        } else {
          console.error('Le contexte ou l\'ID est null ou indéfini');
          this.router.navigate(['/']); // Rediriger vers une route par défaut en cas d'erreur
        }
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la compétence', error);
      }
    });
  } else {
    // Ajouter ici la logique pour ajouter une nouvelle compétence
    // Assurez-vous d'inclure une logique de redirection similaire après l'ajout d'une compétence
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
  // Vérification si l'ID est défini
  if (idCompetences == null) {
    console.error('ID to delete is undefined');
    // Afficher une alerte ou gérer cette situation comme vous le souhaitez
    return; // Sortir de la méthode si l'ID est indéfini
  }
  
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
    cancelButtonText: 'No, cancel!',
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
          console.error('An error occurred while deleting the skill:', error);
          // Gérer spécifiquement l'erreur ici, par exemple, afficher une notification à l'utilisateur
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