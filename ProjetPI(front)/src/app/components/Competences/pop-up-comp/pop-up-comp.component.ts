import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Competences } from 'src/app/models/competences';
import { CompetencesService } from '../competences.service';

@Component({
  selector: 'app-pop-up-comp',
  templateUrl: './pop-up-comp.component.html',
  styleUrls: ['./pop-up-comp.component.css']
})
export class PopUpCompComponent implements OnInit{
  showModal: boolean = false;
  @Input() competences: Competences[] = [];
  @Output() onSaveSelections = new EventEmitter<Competences[]>();
  constructor(private competencesService: CompetencesService) {} 
  ngOnInit(): void {
    this.competencesService.getCompetences().subscribe((competences: Competences[]) => {
      this.competences = competences;
    });
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  saveSelections(): void {
    const selectedCompetences = this.competences.filter(c => c.selected);
    console.log(selectedCompetences); // Ajoutez ceci pour déboguer
    this.onSaveSelections.emit(selectedCompetences);
    this.closeModal();
  }
  
}
