import { Component, OnInit } from '@angular/core';
import { Candidature } from '../../models/candidature';
import { Chart } from 'chart.js/auto';
import { CandidatureService } from '../service/candidature.service';



@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  
  candidacy !: Candidature  ;
  candidatures: Candidature[] = [];
  labels:(string | number )[][]=[[],[]]
  chart:Chart= new Chart("myChart",
  {type:'bar',
  data:
      {datasets:[]
  },options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  });

  constructor(private candidacyService : CandidatureService){}
  
  ngOnInit(): void {
    this.fetchAll()

      console.log(this.labels)
      const ctx = document.getElementById('myChart');

    
  }

  fetchAll(){
    this.candidacyService.getCandidature().subscribe((data)=>{
      this.candidatures=data
      this.manipulationData()
      new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.labels[0] as string[], // Assuming this.labels[0] contains array of strings,
          datasets: [{
            data: this.labels[1] as number[], // Assuming this.labels[1] contains array of numbers
            label: 'Count',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            // Add label if needed
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
    }
    )
  }
  manipulationData(){
    this.labels[0]= this.candidatures.map((ele)=>ele.dateSoumission.toString().split('T')[0])
    console.log(this.labels)

    this.removeDuplicatesAndFormatDates(this.labels[0]);

  }

  removeDuplicatesAndFormatDates(myarray: (string | number)[]) {
    const uniqueLabels: { [key: string]: number } = {}; // Object to track unique elements and their counts
    const formattedLabels: (string | number)[] = [];

    myarray.forEach(element => {
        const formattedElement = typeof element === 'string' ? element.split('T')[0] : element.toString(); // Formatting string elements
        if (!uniqueLabels[formattedElement]) {
            uniqueLabels[formattedElement] = 1;
            formattedLabels.push(element);
        } else {
            uniqueLabels[formattedElement]++;
        }
    });
    console.log(uniqueLabels); // Log counts of each unique element
    // Assigning unique labels (keys) to labels[0]
    this.labels[0] = Object.keys(uniqueLabels);

    // Assigning counts (values) to labels[1]
    this.labels[1] = Object.values(uniqueLabels);
}
}

