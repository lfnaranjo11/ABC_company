import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      //   this.router.navigate(['mainmenu']);
    } else {
      //  console.log('aqui amigo');
    }
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['mainmenu']);
    } else {
      this.router.navigate(['home']);
    }
  }
  receiveMessage($event) {}
}
