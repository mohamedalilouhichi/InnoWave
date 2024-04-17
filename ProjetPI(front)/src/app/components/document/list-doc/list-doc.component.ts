import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DocumentService } from '../service/document.service';
import { document } from '../../models/document';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.css']
})
export class ListDocComponent {
  documents: document[] = [];
  document:any={};
  newDocument!: document;
  searchTerm: string = '';
  qrCodeUrls: { [id: number]: string } = {}; // Objet pour stocker les URL des codes QR associés à chaque document

  //  @Output() addForm = new EventEmitter<Document>();
  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.fetchDocuments();
    this.generateQRCodeForDoc();
  }

 

  deleteDocument(document: document): void {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.removeDocuments(document.idDocuments).subscribe(() => {
        console.log('Document deleted successfully');
        this.fetchDocuments(); // Refresh the document list after deleting one
      }, (error) => {
        console.log('Error while deleting document: ', error);
      });
    }
  }
  fetchDocuments(): void {
    this.documentService.getdocument().subscribe(
      (data: document[]) => {
        console.log('Fetched documents: ', data);
        this.documents = data;
        this. generateQRCodeForDoc()

      },
      (error) => {
        console.log('Error while fetching documents: ', error);
      }
    );
    

  }

  details(idDocuments: any): void {
    this.router.navigate(['/detailDoc', idDocuments]);
  }
  updateDocument(idDocuments: any): void {
    this.router.navigate(['/editDoc', idDocuments]);
  }
  //recherche
  get filteDocuments() {
    return this.documents.filter(
      (doc: document) =>
        doc.idDocuments.toString().includes(this.searchTerm) ||
        doc.category.toString().includes(this.searchTerm) ||
        doc.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


async generateQRCodeForDoc(): Promise<void> {
  for (const doc of this.documents) {
    const detailsDoc = {
      idDocuments: doc.idDocuments,
      category: doc.category,
      description: doc.description,
    };

    try {
      const url = await QRCode.toDataURL(JSON.stringify(detailsDoc));
      this.qrCodeUrls[doc.idDocuments] = url; // Stocker l'URL du code QR associé à l'ID du document
    } catch (err) {
      console.error('Erreur lors de la génération du QR Code:', err);
    }
  }
}





}