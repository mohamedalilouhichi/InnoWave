import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show = false;
  @Input() selectedTest: any = {}; // Assume que selectedTest est passé en tant qu'input
  @Output() save = new EventEmitter<any>(); // Émetteur d'événement pour la sauvegarde

  close() {
    this.show = false;
  }

  saveTest() {
    this.save.emit(this.selectedTest); // Émettre les données pour sauvegarde
    this.close(); // Fermer la modale après la sauvegarde
  }
}
