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
router.get('/add-builds', buildController.getAddBuild);

router.get('/builds', buildController.getBuilds);
router.post('/add-builds', buildController.postAddBuild);
router.get('/admin/edit-build/:postId', buildController.getEditBuild);
router.get('/admin/builds', buildController.getBuilds);
router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/user-builds', buildController.getUserBuilds);
router.post('/logout', userController.postLogout);

module.exports = router;
