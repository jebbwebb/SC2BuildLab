const http = require('http');
const express = require('express');
const app = express();
const buildsRoutes = require('./routes/admin');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const flash = require('connect-flash');
const serverless = require('serverless-http');
const router = express.Router();
const port = process.env.PORT || 3000;
app.use(
  session({
    secret: 'd93fce953cd7586ee9bd649d934c6141f24f46033f0d2e7e82448c7f6966c65c',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

const checkLoggedIn = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
};
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkLoggedIn);
app.use(buildsRoutes);

app.listen(port);
