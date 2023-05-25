let builds = [];

const { build } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/users');
const buildSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  enemy: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: String,
    required: true,
  },
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;
