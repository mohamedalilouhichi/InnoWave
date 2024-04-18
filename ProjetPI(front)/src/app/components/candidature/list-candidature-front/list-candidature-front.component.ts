import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../service/candidature.service';
import { Candidature } from '../../../models/candidature';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-list-candidature-front',
  templateUrl: './list-candidature-front.component.html',
  styleUrls: ['./list-candidature-front.component.css']
})
export class ListCandidatureFrontComponent implements OnInit {


  constructor(private candidatureService: CandidatureService){}

  idUser = 1 ;

  candidatures : Candidature [] =  [];


  ngOnInit(): void {
    this.fetchMyCandidacy();

    console.log("this is my candidacy : "+ this.candidatures);

    throw new Error('Method not implemented.');

  }


  fetchMyCandidacy(){
    this.candidatureService.retrieveCandidacyByIdUser(this.idUser).subscribe((data) =>{
      this.candidatures = data ;

  });
}



removeCandidature(idCandidature: number){

  if(confirm('Are you sure you want to delete this candidacy? ')){
    this.candidatureService.deleteCandidature(idCandidature).subscribe(()=>{
      this.fetchMyCandidacy();
      console.log('Candudature deleted successfully.');

  },
  (error) => {
    console.error('Error deleting candidacy:', error);
  }
    );
} else {
  console.log('Deletion canceled');
}
}


sortCandidacyByToday(): void {
  console.log("Filtrage en cours pour: Today");
  const today = new Date();
  this.candidatures = this.candidatures.filter(candidacy => {
    const candidatureDate = new Date(candidacy.dateSoumission);
    return candidatureDate.getDate() === today.getDate() &&
        candidatureDate.getMonth() === today.getMonth() &&
        candidatureDate.getFullYear() === today.getFullYear();
  });
  console.log('Candidatures filtrées pour aujourd\'hui:', this.candidatures);
}

sortCandidacyByThisWeek(): void {
  console.log("Filtrage en cours pour: This Week");
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  this.candidatures = this.candidatures.filter(candidacy => {
    const candidatureDate = new Date(candidacy.dateSoumission);
    return candidatureDate >= oneWeekAgo && candidatureDate <= today;
  });
  console.log('Candidatures filtrées pour cette semaine:', this.candidatures);
}

sortCandidacyByThisMonth(): void {
  console.log("Filtrage en cours pour: This Month");
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  this.candidatures = this.candidatures.filter(candidacy => {
    const candidatureDate = new Date(candidacy.dateSoumission);
    return candidatureDate >= oneMonthAgo && candidatureDate <= today;
  });
  console.log('Candidatures filtrées pour ce mois:', this.candidatures);
}


filteredCandidacy: Candidature[] = []; // Liste filtrée d'évaluations
selectedStatus: string = '';


filterCandidacyByStatus(): void {
    if (this.selectedStatus) {
      this.candidatures = this.candidatures.filter(candidacy => candidacy.statut === this.selectedStatus); // Filtrer les candidacy par statut spécifique
    } else {
      this.candidatures = this.candidatures; // Si aucun statut n'est sélectionné, afficher toutes les candidacy
    }
  }




}
