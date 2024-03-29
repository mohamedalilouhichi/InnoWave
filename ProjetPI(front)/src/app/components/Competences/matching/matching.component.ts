import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit{
  usersList: User[] = [
    new User(1, 'Baylassen', 'user1@example.com', '3 stages', '4eme', 'SAE'),
    new User(2, 'Aziz', 'user2@example.com', '2 stages', '3eme', 'A'),
    new User(3, 'Oumaima', 'user3@example.com', 'aucun stage', '2eme', ''),
    // Ajoutez d'autres utilisateurs selon vos besoins
  ];
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
