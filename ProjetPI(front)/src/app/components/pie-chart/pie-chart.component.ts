import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EvaluationService } from '../evaluation/evaluation.service';
import { Evaluation } from 'src/app/models/Evaluation';

@Component({
  selector: 'app-pie-chart',
  template: '<div id="container" style="width: 400px; height: 400px;"></div>',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(private serviceEvaluation: EvaluationService) { }

  listEvalutaio: Evaluation[] = [];
  stats: any[][] = [['good', 'very_good', 'bad', 'Average', 'Rejected'], [0, 0, 0, 0, 0]];

  ngOnInit(): void {
    this.getEvaluation();
  }

  getEvaluation() {
    this.serviceEvaluation.getAllEvaluations().subscribe((data) => {
      this.listEvalutaio = data;
      this.countNombreStatus();
    });
  }

  countNombreStatus() {
    for (let index = 0; index < this.listEvalutaio.length; index++) {
      const status = this.listEvalutaio[index].status;

      if (status === 'Good') {
        this.stats[1][0] += 1;
      } else if (status === 'Very_Good') {
        this.stats[1][1] += 1;
      } else if (status === 'Bad') {
        this.stats[1][2] += 1;
      } else if (status === 'Average') {
        this.stats[1][3] += 1;
      } else if (status === 'Rejected') {
        this.stats[1][4] += 1;
      }
    }
    this.createPieChart();
  }

  private createPieChart(): void {
    const options: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Pie chart evaluation'
      },
      tooltip: {
        valueSuffix: '%'
      },
      subtitle: {
        text: '<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">Source: MDPI</a>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: 20,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Pourcentage',
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'],
        data: this.calculateChartData()
      }]
    };
  
    Highcharts.chart('container', options);
  }
  
  private calculateChartData(): Highcharts.PointOptionsObject[] {
    const totalEvaluations = this.listEvalutaio.length;
    const percentages: { [key: string]: number } = {};
    const data: Highcharts.PointOptionsObject[] = [];
  
    // Calculer le nombre d'occurrences de chaque statut
    this.listEvalutaio.forEach(evaluation => {
      percentages[evaluation.status] = (percentages[evaluation.status] || 0) + 1;
    });
  
    // Convertir les occurrences en pourcentages
    for (const [status, count] of Object.entries(percentages)) {
      const percentage = (count / totalEvaluations) * 100;
      data.push({ name: status, y: percentage });
    }
  
    return data;
  }
  
}