import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../service/candidature.service';
import { Candidature } from '../../models/candidature';
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













}
