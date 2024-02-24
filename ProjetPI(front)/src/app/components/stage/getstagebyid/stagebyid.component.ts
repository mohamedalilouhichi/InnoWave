import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'; // Import ActivatedRoute
import { StagebyidService } from './stagebyid.service';

@Component({
  selector: 'app-stagebyid',
  templateUrl: './stagebyid.component.html',
  styleUrls: ['./stagebyid.component.css']
})
export class StagebyidComponent implements OnInit {
  stages: any[] = [];
  pageTitle!: string;

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private stagebyidService: StagebyidService,
   private router: Router
  ) { }

  ngOnInit() {
    // Retrieve enterprise id from route parameters
    this.route.params.subscribe(params => {
      const idEntreprise = params['id'];
      this.pageTitle = 'entreprise ' + idEntreprise + ' offers'; // Assign the value to pageTitle
      this.getStageById(idEntreprise);
    });
  }

  getStageById(idEntreprise: number) {
    this.stagebyidService.getStageById(idEntreprise).subscribe(
      (data: any[]) => {
        this.stages = data;
        if (this.stages.length === 0) {
          this.router.navigate(['/']);
        }
        console.log('Stages retrieved successfully', this.stages);
      },
      error => {
        console.log('Error retrieving stages', error);
      }
    );
  }
}
