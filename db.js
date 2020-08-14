const { Client } = require('pg');
const client = new Client({
  user: 'miusuario',
  host: 'localhost',
  port: '5432',
  database: 'eventos',
  password: 'kc2h82T4',
});

client
  .connect()
  .then(() => console.log('Connected sucesfully'))
  .then(() => client.query(`select * from usuarios`))
  .then((results) => console.table(results.rows))
  .catch((e) => console.log(e))
  .finally(() => client.end());
