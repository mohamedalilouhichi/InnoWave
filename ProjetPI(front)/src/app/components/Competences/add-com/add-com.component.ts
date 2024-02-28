import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competences } from 'src/app/models/competences';
import { CompetencesService } from '../competences.service';

@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent implements OnInit {
  competences: Competences = new Competences(0, '', '', 0);
  userId!: number;


  constructor(
    private competencesService: CompetencesService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract the 'id' route parameter
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Adjust to match the route parameter name 'id'
      if (!this.userId) {
        console.error("User ID is required");
        // Optionally redirect the user to another page if the ID is not provided
        // this.router.navigate(['/default/route']);
      }
    });
  }
  

  addComp() {
    this.competencesService.addCompetenceToUser(this.userId, this.competences).subscribe({
      next: (response) => {
        console.log("Competence added successfully", response);
        this.router.navigate(['/competence/get']);
      },
      error: (error) => {
        console.error("There was an error adding the competence", error);
      }
    });
  }
}
