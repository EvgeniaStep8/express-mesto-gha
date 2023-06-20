const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https*:\/\/(www.)*[a-z0-9\-]{1,}.[a-z]{2}[a-z0-9\-\._~\:\/\?\#\[\]@\!\$&'\(\)\*\+,;\=]{1,}/),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.required().custom((value, helper) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helper.message('Некорректный id');
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https*:\/\/(www.)*[a-z0-9\-]{1,}.[a-z]{2}[a-z0-9\-\._~\:\/\?\#\[\]@\!\$&'\(\)\*\+,;\=]{1,}/),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/https*:\/\/(www.)*[a-z0-9\-]{1,}.[a-z]{2}[a-z0-9\-\._~\:\/\?\#\[\]@\!\$&'\(\)\*\+,;\=]{1,}/),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/https*:\/\/(www.)*[a-z0-9\-]{1,}.[a-z]{2}[a-z0-9\-\._~\:\/\?\#\[\]@\!\$&'\(\)\*\+,;\=]{1,}/),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateId,
  validateUpdateUser,
  validateUpdateAvatar,
  validateCreateCard,
};
