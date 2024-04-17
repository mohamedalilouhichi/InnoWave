import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { CompetencesService } from '../competences.service';

import { Competences } from 'src/app/models/competences';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit{
  currentStageId: number = 1;
  matchingStudents: any[] = [];
  matchingUserIds:number | undefined;
  usersList: User[] = [
    new User(1, 'Baylassen', 'user1@example.com', '3 stages', '4eme', 'SAE'),
    new User(2, 'Aziz', 'user2@example.com', '2 stages', '3eme', 'A'),
    new User(3, 'Oumaima', 'user3@example.com', 'aucun stage', '2eme', ''),
    new User(4, 'Amira', 'user4@example.com', '1 stage', '2eme', ''),
    new User(5, 'Hadil', 'user5@example.com', '4 stages', '4eme', 'cLOUD'),
    new User(6, 'Anas', 'user6@example.com', '2 stages', '4eme', 'TWIN'),
    // Ajoutez d'autres utilisateurs selon vos besoins
  ];

  competences: Competences[] = []; // Ajoutez une propriété pour stocker les compétences


  constructor(private competencesService: CompetencesService) {}

  ngOnInit(): void {
    this.usersList.forEach(user => {
      this.competencesService.getCompetencesByUserId(user.userId).subscribe((competences: Competences[]) => {
        user.competences = competences;
      });
    });
  }
  handleSaveSelections(selectedCompetences: Competences[]) {
    this.competencesService.getMatchingStudentsForStage(this.currentStageId).subscribe(matchingStudents => {
      console.log("Matching Students:", matchingStudents);
      // Ajustez ici pour utiliser la propriété correcte pour l'ID
      const matchingUserIds = matchingStudents.map(item => item.user.userId);
      console.log("Matching IDs:", matchingUserIds);
      this.usersList = this.usersList.filter(user => matchingUserIds.includes(user.userId));
    });
  }






}
