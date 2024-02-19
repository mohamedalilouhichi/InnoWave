import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/components/models/candidature';
import { CandidatureService } from '../../service/candidature.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.css']
})
export class ListCandidatureComponent implements OnInit {
  candidatures: any[] = [];
  newCandidature: any = {}; // Define newCandidature object for adding candidatures

  ListCandidatures? : Candidature[] ;
  
  
  constructor(private candidatureService: CandidatureService) { }

  public getallCandidatures(): void{
    this.candidatureService.getCandidature().subscribe(
      (response:Candidature[])=>{
        this.ListCandidatures=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }


  
  ngOnInit(): void { 
    this.fetchCandidature();

    this.getallCandidatures();
  }

  fetchCandidature() {
    this.candidatureService.getCandidature().subscribe((data: any[]) => {
      console.log(data);
      this.candidatures = data;
    });
  }
}


