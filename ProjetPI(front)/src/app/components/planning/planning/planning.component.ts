import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from '../planning.service';
import { Planning } from 'src/app/models/Planning';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit{
  newPlanning: Planning = new Planning();
dateStr:any;
ngOnInit(): void {
  this.dateStr=this.route.snapshot.paramMap.get('dateStr');
 this.newPlanning.dateDebut=this.dateStr;
}
  constructor(private planningService: PlanningService, private router: Router,private route:ActivatedRoute) { }
  addPlanning(): void {
   {
      this.planningService.addPlanning(this.newPlanning).subscribe(
        () => {
          console.log('Planning added successfully');
          this.router.navigate(['calendar-Admin']); 
        },
        
      );
    }
  }

 
}