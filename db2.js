const { Client } = require('pg');
const client = new Client({
  user: 'miusuario',
  host: 'localhost',
  port: '5432',
  database: 'eventos',
  password: 'kc2h82T4',
});
/*client.query(
    `UPDATE events SET (categoria, lugar, direccion, inicio, fin, virtual) =($1, $2,$3, $4,$5,$6) WHERE id=1;`,
    ['Clase', 'salon', 'calle1', '2010-07-13', '2010-07-14', true]
  )*/
client
  .connect()
  .then(() => console.log('Connected sucesfully'))
  .then(() =>
    client.query(
      `UPDATE events SET (categoria, lugar, direccion, inicio, fin, virtual) =($1, $2,$3, $4,$5,$6) WHERE id=1;`,
      ['Clase', 'salon', 'calle1', '2010-07-13', '2010-07-14', true]
    )
  )
  .then((results) => console.table(results.rows))
  .catch((e) => console.log(e))
  .finally(() => client.end());
