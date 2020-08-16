const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validate = require('express-validation');

const authValidation = require('../validation/auth');

const AuthenticatedRouter = function() {
  const router = new express.Router({ mergeParams: true });
  router.use(cors());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json({ limit: '5mb' }));
  router.use(express.static('public'));

  router.all('/*', validate(authValidation.bearerCheck), (req, res, next) => {
    res.statusCode = 200;
    next();
  });

  return router;
};

module.exports = AuthenticatedRouter;
