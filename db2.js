//const postgres = require('postgres');
//const sql = postgres({ ...options }); // will default to the same as psql
//await sql`//
//  select categoria from events
//`;
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
  .then(() => client.query('select * from events'))
  .then((results) => console.table(results.rows))
  .catch((e) => console.log(e))
  .finally(() => client.end());
