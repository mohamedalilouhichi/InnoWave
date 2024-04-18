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
  competences: Competences = new Competences(0, '', '', 0, false, 0, 0, false, new Date(), '');
  id!: number;
  context!: 'user' | 'stage'; 

  constructor(
    private competencesService: CompetencesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.context = params['context'];
    });
  }

  addComp() {
    this.competencesService.addCompetence(this.context, this.id, this.competences).subscribe({
      next: (response) => {
        console.log('Competence added successfully', response);
        this.router.navigate(['/some-route']); // Modify as needed
      },
      error: (error) => {
        console.error('Failed to add competence', error);
      }
    });
  }
}
