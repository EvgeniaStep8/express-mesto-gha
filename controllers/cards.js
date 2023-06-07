const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new NotFoundError('Карточка с переаднным id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка с переаднным id не найдена'))
    .then((likes) => res.send(likes))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка с переаднным id не найдена'))
    .then((likes) => res.send(likes))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
