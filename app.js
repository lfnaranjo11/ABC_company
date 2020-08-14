const express = require('express');
const postgres = require('postgres');

const app = express();
const port = 8080;
var bodyParser = require('body-parser');
app.get('/api/events', (req, res) => {
  res.send('Hello all events');
});
app.get('/api/events/:id', (req, res) => {
  res.send('Hello');
  console.log(req.params.id);
});
app.use(bodyParser.json());

app.put('/api/events/:id', (req, res) => {
  res.send('');
  console.log(req.params.id);
  console.log(req.body);
});

app.post('/api/events/', (req, res) => {
  res.send('bye');
  console.log(req.body.woman);
});

app.delete('/api/events/:id', function (req, res) {
  res.send('Got a DELETE request at /user');
  console.log(req.params.id);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
