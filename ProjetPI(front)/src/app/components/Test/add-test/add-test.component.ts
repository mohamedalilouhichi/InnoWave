import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Test } from 'src/app/models/test';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit{
  test = new Test(0,'', '', '', new Date(), 0);
  constructor(private testservice: TestService,private router: Router
    ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.testservice.addTest(this.test).subscribe({
      next: (response) => {
        console.log("Competence added successfully", response);
        // Handle successful response, e.g., navigate to another page or show a success message
        this.router.navigate(['/Test/get']);
      },
      error: (error) => {
        console.error("There was an error adding the competence", error);
        // Handle error case
      }
    });
 
 }
}
