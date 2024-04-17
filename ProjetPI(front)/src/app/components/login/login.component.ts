import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rec: any[] = [];
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  username: string = '';
  password: string = '';

  signUpData: any = {};

  constructor(public router: Router, private authService: AuthService) {
  }

  //ngOnInit() {
  //this.authService.getUser().subscribe((data: any[]) => {
  //console.log(data);
  //this.rec = data;
  //});
  //}
  connecteduser: any;
  ngOnInit(): void {
    this.authService.getUserbyemail().subscribe(
      (user: any) => {
        this.connecteduser = user;
        if (this.authService.isLoggedIn()) {
          if (this.connecteduser.role == 'ADMIN') {
            this.router.navigate(['admin'])
          } else {
            this.router.navigate(['home'])
          }
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error accordingly
      }
    );
  }


  onLoggedin() {
    this.authService.authenticate(this.username, this.password).subscribe((response) => {
      console.log(response);
      if (response.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/home']);
      }
    });

  }
  register() {
    this.router.navigate(['/register']);
  }
}

