const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const containerModel = require('./api/container.model');
const containerControllers = require('./api/container.controllers');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(express.static('public'));

const dataBaseURL = process.env.DATABASE;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/containers', containerControllers.findAll);
app.get('/api/containers/:id', containerControllers.findById);
app.post('/api/containers', containerControllers.add);
app.put('/api/containers/:id', containerControllers.update);
app.delete('/api/containers/:id', containerControllers.delete);
app.get('/api/import', containerControllers.import);
app.get('/api/killall', containerControllers.killall);

const PORT = process.env.PORT || 5000;


process.on('SIGINT', shutdown);

function shutdown() {
  console.log('graceful shutdown express');
  server.close(function() {
    console.log('closed express');
  });
}

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.warn(err));

const server = app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
