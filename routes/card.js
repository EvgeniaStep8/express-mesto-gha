const cardRoutes = require('express').Router();
const auth = require('../middleware/auth');
const { validateCreateCard, validateId } = require('../middleware/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/', auth, getCards);
cardRoutes.post('/', validateCreateCard, auth, createCard);
cardRoutes.delete('/:id', validateId, auth, deleteCard);
cardRoutes.put('/:id/likes', validateId, auth, likeCard);
cardRoutes.delete('/:id/likes', auth, dislikeCard);

module.exports = cardRoutes;
