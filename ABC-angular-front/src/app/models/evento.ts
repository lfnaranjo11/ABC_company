export class Evento {
  id: number = 0;
  event_category: string = 'Clase';
  event_place: string;
  event_address: string;
  event_initial_date: string = '2010-07-14T05:00:00.000Z';
  event_final_date: string = '2010-07-14T05:00:00.000Z';
  event_type: Boolean = false;
}

export class Evento_post {
  // event_category: string;
  event_place: string;
  event_address: string;
  event_initial_date: string;
  event_final_date: string;
  event_type: Boolean;
}
