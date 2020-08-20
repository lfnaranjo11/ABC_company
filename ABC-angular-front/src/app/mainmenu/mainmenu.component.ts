import { Component, OnInit, ɵConsole } from '@angular/core';
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
        data.forEach((element) => {
          let init_date: Date = new Date(element.event_initial_date);

          let end_date: Date = new Date(element.event_final_date);
          let end_date_string: string = end_date.toISOString().split('T')[0];
          let init_date_string: string = init_date.toISOString().split('T')[0];

          this.eventosArray.push({
            id: element.id,
            event_name: element.event_name,
            event_category: element.event_category,
            event_place: element.event_place,
            event_address: element.event_address,
            event_initial_date: init_date_string,
            event_final_date: end_date_string,
            event_type: element.event_type,
          });
        });
      });
  }
  httpOptions = {
    headers: new HttpHeaders(),
  };

  postEvento() {
    this.httpOptions.headers.set('Content-Type', 'application/json');
    var evento_post: Evento_post = new Evento_post(this.selectedEvento);

    this.http
      .post<Evento[]>(this.rootURL, evento_post, this.httpOptions)
      .subscribe(
        (data) => {
          var evento: Evento = new Evento();
          evento.id = data[0].id;
          evento.event_name = data[0].event_name;
          evento.event_place = data[0].event_place;
          evento.event_address = data[0].event_address;
          evento.event_initial_date = new Date(data[0].event_initial_date)
            .toISOString()
            .split('T')[0];
          evento.event_final_date = new Date(data[0].event_final_date)
            .toISOString()
            .split('T')[0];
          evento.event_category = data[0].event_category;
          console.log(this.eventosArray);
          this.eventosArray = this.eventosArray.reverse();
          this.eventosArray.push(evento);
          this.eventosArray = this.eventosArray.reverse();
        },
        (err) => console.log(err)
      );
  }
  addOrEdit() {
    if (this.selectedEvento.id === 0) {
      this.postEvento();
    } else {
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
