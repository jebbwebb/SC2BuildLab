const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const buildController = require('../controllers/build');
const mongoose = require('mongoose');
const userController = require('../controllers/users');
const checkLoggedIn = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
};
const requireAuth = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/login');
  }
};
const uri =
  'mongodb+srv://jebbwebb:123456admin@cluster0.gr1tav5.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose
  .connect(uri)
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.log('error');
  });

router.use(checkLoggedIn);
router.get('/add-builds', requireAuth, buildController.getAddBuild);

router.get('/builds', buildController.getBuilds);
router.post('/add-builds', buildController.postAddBuild);
router.get('/admin/edit-build/:postId', buildController.getEditBuild);
router.get('/admin/builds', buildController.getBuilds);
router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/user-builds', requireAuth, buildController.getUserBuilds);
router.post('/logout', userController.postLogout);
router.post('/add-comment', requireAuth, buildController.postAddComment);
router.post('/rating', requireAuth, buildController.postRating);
router.get(
  '/admin/view-build/:postId',
  requireAuth,
  buildController.getViewBuild
);

module.exports = router;
