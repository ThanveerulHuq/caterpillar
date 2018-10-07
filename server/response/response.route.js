const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const responseCtrl = require('./response.controller');

const router = express.Router(); // eslint-disable-line new-cap


router.route('/submitResponse')
  /** GET /api/users - Get list of users */
  .get(responseCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createResponse), responseCtrl.create);

  module.exports = router;

  router.route('/findResponse/:id')
  /** GET /api/users - Get list of users */
  .get(responseCtrl.viewOne)

  module.exports = router;