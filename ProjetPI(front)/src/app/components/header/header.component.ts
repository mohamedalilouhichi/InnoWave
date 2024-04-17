import { Component, Input } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private auth:AuthService){}
  logout() {
this.auth.logout();
}
  @Input() pageTitle: string='';
}
