export class Usuario {
  //event_category: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  constructor() {}
}

export class UsuarioRespuesta {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  constructor(user: Usuario) {
    this.username = user.username;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
  }
  equals(user: Usuario) {
    return (
      this.username === user.username &&
      this.email == user.email &&
      this.first_name == user.first_name &&
      this.last_name == user.last_name
    );
  }
}

export class UsuarioCorto {
  username: string;
  password: string;
}
