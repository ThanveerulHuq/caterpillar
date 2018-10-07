const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const questionsCtrl = require('./questions.controller');

const router = express.Router(); // eslint-disable-line new-cap


router.route('/addQuestions')
  /** GET /api/users - Get list of users */
  .get(questionsCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createQuestions), questionsCtrl.create);

  module.exports = router;

  router.route('/findQuestion/:id')
  /** GET /api/users - Get list of users */
  .get(questionsCtrl.viewOne)

  module.exports = router;