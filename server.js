// Importing modules and tools
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // To be able to store sessions in the database

const cookieTimeout = (60 * 1000) // Set cookie to expire in 1 minute
// Creating app as an instance of express
const app = express();
const PORT = process.env.PORT || 3001;

// Setup handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Register new handlebar function 
hbs.handlebars.registerHelper('if_equals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.handlebars.registerHelper("compare", function (operand_1, operator, operand_2, options) {
  console.log(`logged in as ${operand_1} - comment owner: ${operand_2}`)
  var operators = {
   'eq': function(l,r) { return l == r; },
   'noteq': function(l,r) { return l != r; },
   'gt': function(l,r) { return Number(l) > Number(r); },
   'or': function(l,r) { return l || r; },
   'and': function(l,r) { return l && r; },
   '%': function(l,r) { return (l % r) === 0; }
  }
  , result = operators[operator](operand_1,operand_2);

  if (result) return options.fn(this);
  else  return options.inverse(this);
});

// Defining the session
const sess = {
  secret: process.env.SECRET,
  cookie: { expires: cookieTimeout },
  resave: true,
  rolling: true,
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

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Connection is now open with server. Now listening'));
})