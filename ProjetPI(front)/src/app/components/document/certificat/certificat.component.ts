import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-certificat',
  templateUrl: './certificat.component.html',
  styleUrls: ['./certificat.component.css']
})
export class CertificatComponent implements OnInit {
  username: string = '';
  titre: string = '';
  dateFin: string = '';
  dateDebut: string = '';

  signaturePad!: SignaturePad;
  signatureImage: string | null = null;

  constructor() { }

  ngOnInit(): void {
    const canvas = document.getElementById('signature-pad') as HTMLCanvasElement;
    this.signaturePad = new SignaturePad(canvas);
  }

  async genererCertificat(): Promise<void> {
    this.signatureImage = this.signaturePad.toDataURL();
    const qrCodeData = `Nom d'utilisateur: ${this.username}, Titre: ${this.titre}`;

    try {
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

      const doc = new jsPDF();
      const logoImg = new Image();
      logoImg.src = '/assets/img/logos/logoEsprit.jpg';

      logoImg.onload = async () => {
        doc.addImage(logoImg, 'PNG', 10, 10, 50, 25);
        doc.setFontSize(18);
        doc.text('Attestation de stage', 80, 30);

        if (qrCodeUrl) {
          const qrCodeWidth = 40;
          const qrCodeHeight = qrCodeWidth;
          doc.addImage(qrCodeUrl, 'PNG', 150, 10, qrCodeWidth, qrCodeHeight);
        }

        // Ajoutez d'autres éléments du certificat ici
        // Ajouter le paragraphe
        doc.setFontSize(12);
        doc.text(`Le Directeur de la Formation atteste que :`, 10, 60);
        doc.text(` ${this.username} , étudiant(e) à l’Ecole Supérieure Privée d’Ingénierie et de Technologies « ESPRIT » `, 10, 70);
        doc.text(`a effectué un stage de formation non rémunéré à partir du ${this.dateDebut} au ${this.dateFin}`, 10, 80);
        // doc.text(`à partir du ${this.dateDebut} au ${this.dateFin}`, 10, 90);
        doc.text(`Pour : ${this.titre}`, 10, 90);

        if (this.signatureImage) {
          doc.setFontSize(10);
          doc.text('Signature:', 10, 130); // Placer le mot "Signature" avant d'ajouter l'image
          const signatureWidth = 100;
          const signatureHeight = (signatureWidth / 400) * 200;
          doc.addImage(this.signatureImage, 'PNG', 10, 150, signatureWidth, signatureHeight);
        }
        
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('fr-FR', options);
        doc.text(`Date: ${formattedDate}`, 10, 260); // Ajouter la date d'aujourd'hui à la fin du document

        doc.save('certificat.pdf');
      };
    } catch (error) {
      console.error('Erreur lors de la génération du code QR :', error);
    }
  }

  async generateQRCodeUrl(username: string, titre: string): Promise<string | null> {
    try {
      const qrCodeData = `Nom d'utilisateur: ${username}, Titre: ${titre}`;
      return await QRCode.toDataURL(qrCodeData);
    } catch (error) {
      console.error('Erreur lors de la génération du code QR :', error);
      return null;
    }
  }
}
