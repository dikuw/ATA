const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const bodyParser = require('body-parser');
const promisify = require('es6-promisify');

//  import all models
// require('./models/User');

const db = require('./database');
const router = require('./routes');

const app = express();

//  create .env file for enviromental variables
require('dotenv').config({ path: 'variables.env' });

//  enable CORS for all origins to allow development with local server
app.use(cors({credentials: true, origin: process.env.ORIGIN}));

// use bodyParser to allow req.params and req.query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


// pass variables on all requests
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('This is the ATA backend/API');
})

app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on port ${server.address().port}`);
});