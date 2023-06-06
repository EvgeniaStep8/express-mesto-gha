const cardRoutes = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:id', deleteCard);

module.exports = cardRoutes;
