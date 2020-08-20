export class Evento {
  id: number = 0;
  event_name: string;
  event_category: string;
  event_place: string;
  event_address: string;
  event_initial_date: string = '2020-12-12';
  event_final_date: string = '2020-08-30';
  event_type: Boolean = false;
}

export class Evento_post {
  event_name: string;

  event_category: string;
  event_place: string;
  event_address: string;
  event_initial_date: string;
  event_final_date: string;
  event_type: Boolean;

  constructor(evento_normal: Evento) {
    this.event_name = evento_normal.event_name;
    this.event_category = evento_normal.event_category;
    this.event_place = evento_normal.event_place;
    this.event_address = evento_normal.event_address;
    this.event_type = evento_normal.event_type;
    this.event_initial_date = new Date(
      evento_normal.event_initial_date
    ).toISOString();
    this.event_final_date = new Date(
      evento_normal.event_final_date
    ).toISOString();
  }
}
