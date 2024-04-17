import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from 'src/app/models/Evaluation';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-evaluation-details',
  templateUrl: './evaluation-details.component.html',
  styleUrls: ['./evaluation-details.component.css']
})
export class EvaluationDetailsComponent implements OnInit {
  idEvaluation!: number;
  evaluation!: Evaluation;

  constructor(
    private route: ActivatedRoute,
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEvaluation = +params['id'];
      this.fetchEvaluationDetails(this.idEvaluation);
    });
  }

  fetchEvaluationDetails(id: number): void {
    this.evaluationService.getEvaluationById(id).subscribe(
      (data: Evaluation) => {
        console.log(data);
        this.evaluation = data;
      },
      (error: any) => {
        console.error('Error fetching evaluation details:', error);
      }
    );
  }

  goBackToList(): void {
    this.router.navigate(['evaluation/show-evaluation']);
  }

  public convertToPDF() {
    var data = document.getElementById('contentToConvert');
    if (data) {
        html2canvas(data).then(canvas => {
            // Quelques options de configuration nécessaires
            var imgWidth = 208;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // Page de taille A4 du PDF
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('evaluation_details.pdf'); // Télécharger le PDF généré
        });
    } else {
        console.error('Element with ID "contentToConvert" not found.');
    }
}


}
