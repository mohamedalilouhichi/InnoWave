import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from 'src/app/models/Evaluation';
import { PDFDocument, rgb} from 'pdf-lib';




@Component({
  selector: 'app-evaluation-details',
  templateUrl: './evaluation-details.component.html',
  styleUrls: ['./evaluation-details.component.css']
})
export class EvaluationDetailsComponent implements OnInit {
  idEvaluation!: number;
  evaluation!: Evaluation;

  constructor(private route: ActivatedRoute, private evaluationService: EvaluationService,private router: Router) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'évaluation à partir de l'URL
    this.route.params.subscribe(params => {
      this.idEvaluation = +params['id']; // Convertir l'ID en nombre
      this.fetchEvaluationDetails(this.idEvaluation); // Récupérer les détails de l'évaluation
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
    // Naviguer vers la page de la liste des évaluations
    this.router.navigate(['evaluation/show-evaluation']);
}


async convertToPdf(): Promise<void> {
  if (!this.evaluation) return;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const fontSize = 18;
  const lineHeight = 30;

  // Calculer la hauteur totale du texte
  const totalTextHeight = lineHeight * 4;

  // Centrer le texte verticalement
  const startY = (height - totalTextHeight) / 2;

  page.drawText('Evaluation Details', {
    x: 50,
    y: height - 70,
    size: 30,
    color: rgb(0, 0, 0),
  });

  // Ajuster la position verticale pour commencer l'affichage des détails
  const detailsStartY = height - 150;

  // Définir la police et la taille du texte
  page.setFontSize(fontSize);

  // Afficher la date sans l'heure
  const evaluationDate = new Date(this.evaluation.evaluationDate);
  const formattedDate = evaluationDate.toLocaleDateString('fr-FR');

  page.drawText(`Date de l'évaluation: ${formattedDate}`, {
    x: 50,
    y: detailsStartY,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Rating: ${this.evaluation.rating}`, {
    x: 50,
    y: detailsStartY - lineHeight,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Status: ${this.evaluation.status}`, {
    x: 50,
    y: detailsStartY - lineHeight * 2,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Comments: ${this.evaluation.comments}`, {
    x: 50,
    y: detailsStartY - lineHeight * 3,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);

  // Ouvrir une nouvelle fenêtre avec le PDF
  window.open(url, '_blank');
}

}



