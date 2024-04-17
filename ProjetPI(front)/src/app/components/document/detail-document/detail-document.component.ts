import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { document } from '../../models/document';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.css'],
})
export class DetailDocumentComponent {
  doc!: document;

  document!: document;
  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getDocumentFromRoute();
  }
  cvpath!: any;
  rapportpath!: any;
  x!: any;
  y!: any;
  getDocumentFromRoute(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('idDocuments');
      if (idParam !== null) {
        const idDocuments = +idParam;
        this.documentService
          .getDocumentById(idDocuments)
          .subscribe((document) => {
            this.document = document;
            this.cvpath =
              '../../../../assets/documents/' + this.document.cvFile;
            this.x = this.getSafeUrl(this.cvpath);
            this.rapportpath =
              '../../../../assets/documents/' + this.document.rapportFile;
            this.y = this.getSafeUrl(this.rapportpath);

            console.log('document', document);
          });
      } else {
        console.log('Erreur : ID du document manquant');
      }
    });
  }

  downloadCV(): void {
    if (this.document.cvFile) {
      this.documentService
        .downloadDocument(this.document.cvFile)
        .subscribe((blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          window.open(downloadUrl);
        });
    }
  }

  downloadRapport(): void {
    if (this.document.rapportFile) {
      this.documentService
        .downloadDocument(this.document.rapportFile)
        .subscribe((blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          window.open(downloadUrl);
        });
    }
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
