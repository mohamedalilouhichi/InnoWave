import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-get-test',
  templateUrl: './get-test.component.html',
  styleUrls: ['./get-test.component.css']
})
export class GetTestComponent implements OnInit{
  test: any[] = [];
  selectedTest: any = {};
  showModal: boolean = false;
  constructor(private testservice: TestService) {}
  ngOnInit(): void {
    this.getCompetences();
    throw new Error('Method not implemented.');
  }
 

  // Méthode pour fermer la modale
  closeModal() {
    this.showModal = false;
  }
  getCompetences() {
    this.testservice.getTest().subscribe(
      data => {
        this.test = data;
        console.log('Données de la base :', this.test);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);
      }
    );
  }
  updateTest(testId: number) {
    // Trouver le test par son ID et le définir comme selectedTest
    const testToUpdate = this.test.find(t => t.idTest === testId);
    if (testToUpdate) {
      this.selectedTest = { ...testToUpdate };
      this.showModal = true; // Ouvre la modale
    }
  }

  // Méthode pour gérer la sauvegarde des modifications (à implémenter)
  handleSave(updatedTest: any) {
    console.log(updatedTest);
    // Logique pour sauvegarder les modifications
    this.showModal = false; // Fermer la modale après la sauvegarde
  }
  

  deleteTest(idTest: number) {
    console.log('Suppression du test avec ID:', idTest);
    // Logique de suppression
  }
}
