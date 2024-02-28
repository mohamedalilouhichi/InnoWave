import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-stat',
  templateUrl: './test-stat.component.html',
  styleUrls: ['./test-stat.component.css']
})
export class TestStatComponent implements OnInit{
  constructor(private testservice: TestService,private router: Router) {}
  averageDuration: number | undefined;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  loadAverageTestDuration(): void {
    this.testservice.getAverageTestDuration().subscribe({
      next: (duration) => {
        this.averageDuration = duration;
      },
      error: (error) => {
        console.error('Error fetching average test duration:', error);
      }
    });
  }

}
