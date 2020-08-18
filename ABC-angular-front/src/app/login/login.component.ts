import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private Auth: AuthService) {}
  message: string = 'hola mundo';

  @Output() messageEvent = new EventEmitter<String>();

  sendMessage() {
    this.messageEvent.emit(this.message);
  }
  ngOnInit(): void {}
  loginUser(event) {
    event.preventDefault();
    //console.log(event);
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.messageEvent.emit(this.message);

    this.Auth.getUserDetails(username, password);
  }
}
