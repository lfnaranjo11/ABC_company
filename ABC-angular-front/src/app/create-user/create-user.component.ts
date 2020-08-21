import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Usuario, UsuarioRespuesta } from '../models/usuario';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  //selectedEvento: Evento = new Evento();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  URL = 'http://localhost:8080/api/create-user';
  //URL = 'http://172.24.98.165:8080/api/create-user';

  nuevo_usuario = new Usuario();
  constructor(private http: HttpClient) {}
  create() {
    let respuesta_us_esperado = new UsuarioRespuesta(this.nuevo_usuario);

    this.http
      .post<Usuario[]>(this.URL, this.nuevo_usuario, this.httpOptions)
      .subscribe((data) => {
        console.log(data[0]);
        console.log(respuesta_us_esperado);
        if (respuesta_us_esperado.equals(data[0])) {
          console.log('exitoso');
          ///redirect
        } else {
          console.log('usuari_no_creado');
        }
      });
  }

  ngOnInit(): void {}
}
