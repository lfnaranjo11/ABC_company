import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Evento, Evento_post } from '../models/evento';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css'],
})
export class MainmenuComponent implements OnInit {
  eventosArray: Evento[] = [];
  selectedEvento: Evento = new Evento();
  rootURL = 'http://localhost:8080/api/events';
  constructor(private http: HttpClient) {
    this.http
      .get<Evento[]>(this.rootURL, this.httpOptions)
      .subscribe((data) => {
        console.log(typeof data);
        console.log(typeof data[0]);

        console.log(data[0].event_initial_date);
        let init_date: Date = new Date(data[0].event_initial_date);
        console.log(init_date.toDateString());
        //this.eventosArray = data;
        data.forEach((element) => {
          let init_date: Date = new Date(element.event_initial_date);

          let end_date: Date = new Date(element.event_final_date);
          this.eventosArray.push({
            id: element.id,
            event_category: element.event_category,
            event_place: element.event_place,
            event_address: element.event_address,
            event_initial_date: init_date.toDateString(),
            event_final_date: end_date.toDateString(),
            event_type: element.event_type,
          });
        });
      });
  }
  httpOptions = {
    headers: new HttpHeaders(),
  };

  postEvento(): void {
    this.httpOptions.headers.set('Content-Type', 'application/json');

    this.http
      .post(this.rootURL, this.selectedEvento, this.httpOptions)
      .subscribe((data) => {
        console.log('resultado', data);
      });
  }
  addOrEdit() {
    if (this.selectedEvento.id === 0) {
      //post new
      this.postEvento();
      this.selectedEvento.id = 0;
      this.eventosArray.push(this.selectedEvento);
    } else {
      //put con los datos especificados
      console.log('aqui here');
      this.putEvento();
    }
    this.selectedEvento = new Evento();
  }

  putEvento() {
    this.httpOptions.headers.set('Content-Type', 'application/json');

    this.http
      .put(
        this.rootURL + `/${this.selectedEvento.id}`,
        this.selectedEvento,
        this.httpOptions
      )
      .subscribe((data) => console.log(data));
  }
  openForEdit(evento: Evento) {
    this.selectedEvento = evento;
  }
  deleteEvento() {
    if (confirm('seguro de querer eliminarlo')) {
      this.eventosArray = this.eventosArray.filter(
        (evento) => evento != this.selectedEvento
      );
      this.http
        .delete(this.rootURL + `/${this.selectedEvento.id}`, this.httpOptions)
        .subscribe();
      //delete
    }
  }
  ngOnInit(): void {}
}
