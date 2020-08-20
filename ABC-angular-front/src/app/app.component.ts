import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ABC-angular-front';
  constructor(public authService: AuthService) {}
}
