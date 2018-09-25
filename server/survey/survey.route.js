const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const surveyCtrl = require('./survey.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(surveyCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createSurvey), surveyCtrl.create);

  module.exports = router;