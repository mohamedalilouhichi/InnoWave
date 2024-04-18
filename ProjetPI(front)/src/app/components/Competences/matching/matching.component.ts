import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { CompetencesService } from '../competences.service';
import { Competences } from 'src/app/models/competences';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {
users: User[] = [];
  filteredUsers: User[] = [];
  allCompetences: Competences[] = [];  // Ensure this property is defined
  showModal: boolean = false;
  selectedStageId: number = 1;
  constructor(private competencesService: CompetencesService) {}

  ngOnInit(): void {
    this.loadUsersWithCompetences();
    this.loadAllCompetences();
  }
  loadUsersWithCompetences(): void {
    this.competencesService.getAllUsersWithCompetences().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users; // Initially set filtered users to all users
      },
      error: (error) => {
        console.error('Error fetching users with competences', error);
      }
    });
  }
  loadAllCompetences(): void {
    this.competencesService.getCompetences().subscribe({
      next: (competences) => {
        this.allCompetences = competences;
        console.log(this.allCompetences); // Ajoutez cette ligne pour déboguer
      },
      error: (error) => {
        console.error('Error fetching competences', error);
      }
    });
  }
  
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleSaveSelections(): void {
    // Logic to handle after saving selections
    this.applyFilters();
    this.closeModal();
  }

  fetchMatchingStudents(): void {
    this.competencesService.getMatchingStudentsForStage(this.selectedStageId).subscribe({
      next: (matchingStudents) => {
        this.filteredUsers = matchingStudents;
      },
      error: (error) => {
        console.error('Error fetching matching students', error);
      }
    });
  }

  applyFilters(): void {
    // Example filter logic based on selected competences
    const selectedCompetences = this.allCompetences.filter(c => c.selected);
    this.filteredUsers = this.users.filter(user => 
      user.competences.some(uc => selectedCompetences.some(sc => uc.idCompetences === sc.idCompetences)));
  }
}