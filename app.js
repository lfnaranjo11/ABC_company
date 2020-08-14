const express = require('express');
const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const bycript = require('bcrypt');
const client = new Client({
  user: 'miusuario',
  host: 'localhost',
  port: '5432',
  database: 'eventos',
  password: 'kc2h82T4',
});

const app = express();
const port = 8080;
var bodyParser = require('body-parser');
app.get('/api/events', (req, res) => {
  client
    .connect()
    .then(() => console.log('Connected sucesfully'))
    .then(() => client.query(`select * from events`))
    .then((results) => {
      res.json(JSON.parse(JSON.stringify(results.rows)));
    })
    .catch((e) => res.status(400))
    .finally(() => client.end());
});
app.get('/api/events/:id', (req, res) => {
  client
    .connect()
    .then(() => console.log('Connected sucesfully'))
    .then(() =>
      client.query(`select * from events where id=$1`, [req.params.id])
    )
    .then((results) => {
      res.json(JSON.parse(JSON.stringify(results.rows)));
    })
    .catch((e) => res.status(400))
    .finally(() => client.end());
});
app.use(bodyParser.json());

app.put('/api/events/:id', (req, res) => {
  //TO-DO checkear el valor anterior si el body no viene completo y computar el update con los valores anteriores

  client
    .connect()
    .then(() => console.log('Connected sucesfully'))
    .then(() =>
      client.query(
        `UPDATE events SET (categoria, lugar, direccion, inicio, fin, virtual) =($1, $2,$3, $4,$5,$6) WHERE id=$7;`,
        [
          req.body.event_category,
          req.body.event_place,
          req.body.event_address,
          req.body.event_initial_date,
          req.body.event_final_date,
          req.body.event_type,
          req.params.id,
        ]
      )
    )
    .then((results) => res.send('ok'))
    .catch((e) => res.status(400))
    .finally(() => client.end());
});

app.post('/api/events/', (req, res) => {
  console.log(req.body.woman);
  client
    .connect()
    .then(() => console.log('Connected sucesfully'))
    .then(() =>
      client.query(
        `INSERT INTO events(categoria, lugar, direccion, inicio, fin, virtual, dueno) VALUES($1, $2,$3, $4,$5,$6,$7);`,
        [
          req.body.event_category,
          req.body.event_place,
          req.body.event_address,
          req.body.event_initial_date,
          req.body.event_final_date,
          req.body.event_type,
          req.body.owner,
        ]
      )
    )
    .then((results) => console.log(results), res.status(200), res.send('ok'))
    .catch((e) => console.log(e), res.status(400))
    .finally(() => client.end());
});

app.delete('/api/events/:id', function (req, res) {
  res.send('Got a DELETE request at /user');
  client
    .connect()
    .then(() => console.log('Connected sucesfully'))
    .then(() => client.query(`DELETE FROM events WHERE id=$1`, [req.params.id]))
    .then((results) => res.send('Ok'))
    .catch((e) => console.log(e))
    .finally(() => client.end());
});

app.post('/api/create-user/', async function (req, res) {
  try {
    const salt = await bycript.genSalt();
    const hashedPassword = await bycript.hash(req.body.password, salt);
    client
      .connect()
      .then(() => console.log('Connected sucesfully'))
      .then(() =>
        client.query(
          `INSERT INTO usuarios(username, firstname, last_name, email, password) VALUES($1, $2,$3,$4,$5);`,
          [
            req.body.username,
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hashedPassword,
          ]
        )
      )
      .then((results) => res.send('Ok'))
      .catch((e) => console.log(e))
      .finally(() => client.end());
  } catch {
    res.status(500).send();
  }

  req.body.username;
  req.body.first_name;
  req.body.last_name;
  req.body.email;
  req.body.password;
});

app.post('/api/api_auth/', function (req, res) {
  req.body.username;
  req.body.password;
  client
    .connect()
    .then(() => console.log('Connected sucesfully'))
    .then(() =>
      client.query(`select * from usuarios where username = $1`, [
        req.body.username,
      ])
    )
    .then((results) => {
      console.log(results.rows[0].password);
      if (results.rows.length == 0) {
        return res.status(400).send('cannot find user');
      }
      bycript.compare(req.body.password, results.rows[0].password, function (
        err,
        resp
      ) {
        if (err) {
          // handle error
          res.status(500).send();
        }
        if (resp) {
          res.send('ok');
          //JWT
        } else {
          // response is OutgoingMessage object that server response http request
          return res.send('no coinciden');
        }
      });
    })
    .catch((e) => console.log(e))
    .finally(() => client.end());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
