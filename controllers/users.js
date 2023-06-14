const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь с переаднным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const newUser = req.body;
  User.findByIdAndUpdate(_id, newUser, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError('Пользователь с переаднным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else if (err.message.includes('Validation failed')) {
        next(new BadRequestError('Передан некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError('Пользователь с переаднным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else if (err.message.includes('Validation failed')) {
        next(new BadRequestError('Передан некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
