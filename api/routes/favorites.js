const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const favoritesController = require('../controllers/FavoritesController');

router.route('/')
  .post(favoritesController.create);

router.route('/:id')
  .delete(favoritesController.find, authenticateOwner, favoritesController.destroy);

module.exports = router;
