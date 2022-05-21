// Importing modules and tools
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const routes = require('./controllers'); //todo: uncomment after implementing controllers
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // To be able to store sessions in the database

// Creating app as an instance of express
const app = express();
const PORT = process.env.PORT || 3001;

// Setup handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Defining the session
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js to use handlebars as template 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //Make the folder 'public' available to express

// app.use(routes); //todo: uncomment after implementing controllers

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Connection is now open with server. Now listening'));
})