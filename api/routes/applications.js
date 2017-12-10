const express = require('express');
let router = express.Router();

const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');
const applicationControllers = require('../controllers/applicationControllers');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.all('*',jwtMiddleware({secret: secrets.jwtSecret}),findUser,authenticateAdmin)

router.route('/')
  .get(applicationControllers.index)

  .post(applicationControllers.create);

router.route('/:id')
  .delete(applicationControllers.find, applicationControllers.destroy);

module.exports = router;
