const express = require('express');
require('dotenv').config();
const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const bycript = require('bcrypt');
const multer = require('multer');
const path = require('path');

//const upload = multer({ dest: './event_thumbnails/' });
var fs = require('fs');

var dir_uploads = './event_thumbnails';
if (!fs.existsSync(dir_uploads)) {
  fs.mkdirSync(dir_uploads);
}
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

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

let storage21 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './event_thumbnails/');
  },
  filename: (req, file, cb) => {
    req.file_extension = path.extname(file.originalname);
    cb(
      null,
      'thumbnail' + Date.now() + req.id + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage21,
  inMemory: true,
  onFileUploadData: function (file, data) {
    result += data;
  },
  onFileUploadComplete: function (file) {
    console.log(result); // This is what you want
  },
});
app.post('/home', upload.single('thumby'), (req, res) => {
  //res.status(200).json({ resp: 'OK' });
  console.log(req.body);
  res.status(404).json({ resp: 'ok' });
});

app.get('/api/events', authenticaToken, (req, res) => {
  client
    .query(
      `select id,event_name,categoria as event_category, lugar AS event_place, direccion AS event_address, inicio AS event_initial_date, fin AS event_final_date, virtual AS event_type from events where dueno=$1 `,
      [req.user]
    )
    .then((results) => {
      res.status(200).json(JSON.parse(JSON.stringify(results.rows)));
    })
    .catch((e) => console.log(e), res.status(400));
});

app.get('/api/events/:id', authenticaToken, (req, res) => {
  client
    .query(
      `select id,event_name,categoria as event_category, lugar AS event_place, direccion AS event_address, inicio AS event_initial_date, fin AS event_final_date, virtual AS event_type from events where id=$1 AND dueno=$2`,
      [req.params.id, req.user]
    )
    .then((results) => {
      res.status(200).json(JSON.parse(JSON.stringify(results.rows)));
    })
    .catch((e) => res.status(400));
});
app.use(bodyParser.json());

app.put('/api/events/:id', authenticaToken, (req, res) => {
  //TO-DO checkear el valor anterior si el body no viene completo y computar el update con los valores anteriores
  client
    .query(
      `UPDATE events SET (event_name,categoria, lugar, direccion, inicio, fin, virtual) =($1, $2,$3, $4,$5,$6,$7) WHERE id=$8 AND dueno=$9 
      RETURNING id,event_name,categoria as event_category, lugar AS event_place, direccion AS event_address, inicio AS event_initial_date, fin AS event_final_date, virtual AS event_type;`,
      [
        req.body.event_name,
        req.body.event_category,
        req.body.event_place,
        req.body.event_address,
        req.body.event_initial_date,
        req.body.event_final_date,
        req.body.event_type,
        req.params.id,
        req.user,
      ]
    )
    .then((results) =>
      res.status(200).json(JSON.parse(JSON.stringify(results.rows)))
    )
    .catch((e) => res.status(400));
});

app.post('/api/events/', authenticaToken, (req, res) => {
  client
    .query(
      `INSERT INTO events(event_name,categoria, lugar, direccion, inicio, fin, virtual, dueno) VALUES($1, $2,$3, $4,$5,$6,$7,$8) RETURNING id,event_name,categoria as event_category, lugar AS event_place, direccion AS event_address, inicio AS event_initial_date, fin AS event_final_date, virtual AS event_type;`,
      [
        req.body.event_name,
        req.body.event_category,
        req.body.event_place,
        req.body.event_address,
        req.body.event_initial_date,
        req.body.event_final_date,
        req.body.event_type,
        req.user,
      ]
    )
    .then((results) =>
      res.status(200).json(JSON.parse(JSON.stringify(results.rows)))
    )
    .catch((e) => console.log(e), res.status(400));
});

app.delete('/api/events/:id', authenticaToken, function (req, res) {
  console.log(`user ${req.user} wants to delete`);
  client
    .query(
      `DELETE FROM events WHERE id=$1 AND dueno=$2 RETURNING id,event_name,categoria as event_category, lugar AS event_place, direccion AS event_address, inicio AS event_initial_date, fin AS event_final_date, virtual AS event_type`,
      [req.params.id, req.user]
    )
    .then((results) =>
      res.status(200).json(JSON.parse(JSON.stringify(results.rows)))
    )
    .catch((e) => console.log(e));
});

app.post('/api/create-user/', async function (req, res) {
  try {
    const salt = await bycript.genSalt();
    const hashedPassword = await bycript.hash(req.body.password, salt);

    client
      .query(
        `INSERT INTO usuarios(username, firstname, last_name, email, password) VALUES($1, $2,$3,$4,$5) RETURNING username,firstname AS first_name, last_name, email;`,
        [
          req.body.username,
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
        ]
      )
      .then((results) =>
        res.status(200).json(JSON.parse(JSON.stringify(results.rows)))
      )
      .catch((e) => console.log(e));
  } catch {
    res.status(500).send();
  }
});

app.post('/api/api-auth/', function (req, res) {
  client
    .query(`select * from usuarios where username = $1`, [req.body.username])
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
          //JWT
          const accesstoken = jwt.sign(
            req.body.username,
            process.env.ACCESS_TOKEN_SECRET
          );
          console.log('au');
          res.status(200).json({ accesstoken });

          //JWT
        } else {
          // response is OutgoingMessage object that server response http request
          return res.status(400).send('no coinciden');
        }
      });
    })
    .catch((e) => console.log(e));
});

function authenticaToken(req, resp, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null) return resp.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return resp.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  client.connect().then(() => console.log('connected to database'));
  console.log(`company ABC server listening at http://localhost:${port}`);
});
