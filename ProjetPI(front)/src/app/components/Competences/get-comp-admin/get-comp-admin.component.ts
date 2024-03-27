import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';

@Component({
  selector: 'app-get-comp-admin',
  templateUrl: './get-comp-admin.component.html',
  styleUrls: ['./get-comp-admin.component.css']
})
export class GetCompAdminComponent implements OnInit {
  studentCompetences: any[] = [];
  rhCompetences: any[] = [];

  constructor(private competencesService: CompetencesService) { }

  ngOnInit(): void {
   this.loadCompetences();
  }

  loadCompetences(): void {
    this.competencesService.getCompetencesByUserRole('STUDENT').subscribe(data => {
      this.studentCompetences = data;
    });

    this.competencesService.getCompetencesByUserRole('RH').subscribe(data => {
      this.rhCompetences = data;
    });
  }
}
