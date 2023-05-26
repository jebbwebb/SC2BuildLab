const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
exports.getLogin = (req, res, next) => {
  res.render('admin/login', {
    pageTitle: 'Login',
    path: '/admin/login',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.getRegister = (req, res, next) => {
  res.render('admin/register', {
    pageTitle: 'Login',
    path: '/admin/register',
    successMessage: req.flash('successMessage'),
    errorMessage: req.flash('errorMessage'),
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username })
    .then((existingUser) => {
      if (existingUser) {
        req.flash('errorMessage', 'Username already exists');
        return Promise.reject('Username already exists');
      }
    })
    .then(() => {
      bcryptjs.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return;
        }

        const user = new User({
          username: username,
          password: hashedPassword,
        });

        user
          .save()
          .then(() => {
            req.flash(
              'successMessage',
              'Registration successful! You can now log in.'
            );
            res.redirect('/register');
          })
          .catch((err) => {
            req.flash('errorMessage');
            res.redirect('/register');
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/register');
    });
};
exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        req.flash('errorMessage', 'Username does not exsist');
        return Promise.reject('Username does not exsist');
      } else {
        bcryptjs
          .compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              req.session.userId = user._id;
              req.session.loggedIn = true;
              res.redirect('/user-builds');
            } else {
              req.flash('errorMessage', 'Invalid  Password');
              return Promise.reject('Invalid Password');
            }
          })
          .catch((err) => {
            console.log(err);
            res.render('admin/login', {
              errorMessage: 'Invalid Username or Password',
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render('admin/login', {
        errorMessage: 'Invalid Username or Password',
      });
    });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
};
