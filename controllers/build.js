const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const Build = require('../models/build');
const { build } = require('joi');

exports.getAddBuild = (req, res, next) => {
  res.render('admin/add-build', {
    pageTitle: 'Add Product',
    path: '/admin/add-build',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddBuild = (req, res, next) => {
  function generatePostId() {
    const length = 8;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let postId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      postId += characters.charAt(randomIndex);
    }

    return postId;
  }
  const userId = req.session.userId;
  const title = req.body.title;
  const race = req.body.race;
  const description = req.body.description.replace(/\r\n|\r|\n/g, '<br>');
  const enemy = req.body.enemy;
  const type = req.body.type;

  const build = new Build({
    title: title,
    description: description,
    race: race,
    type: type,
    enemy: enemy,
    postId: generatePostId(),
    user: userId,
  });

  build
    .save()
    .then(() => {
      res.redirect('/builds');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBuilds = (req, res, next) => {
  Build.find()
    .populate('user')
    .then((builds) => {
      res.render('admin/builds', {
        builds: builds,
        pageTitle: 'Admin Products',
        path: '/admin/builds',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getUserBuilds = (req, res, next) => {
  const userId = req.session.userId;
  Build.find({ user: userId })
    .then((builds) => {
      res.render('admin/user-builds', {
        builds: builds,
        pageTitle: 'User Builds',
        path: '/admin/builds',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditBuild = (req, res, next) => {
  const postId = req.params.postId;

  Build.findOne({ postId: postId })
    .then((build) => {
      if (!build) {
        console.log('error2');
      } else {
        res.render('admin/edit-build', {
          post: build,
          pageTitle: 'Edit Build',
          path: `/admin/edit-build/${postId}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditBuild = (req, res, next) => {
  const postId = req.params.postId;
  const updatedContent = req.body.content;

  Build.findOneAndUpdate({ postId: postId }, { content: updatedContent })
    .then(() => {
      res.redirect('/admin/builds');
    })
    .catch((err) => {
      console.log(err);
    });
};
