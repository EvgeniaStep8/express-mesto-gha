const userRoutes = require('express').Router();
const auth = require('../middleware/auth');
const {
  validateId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middleware/validation');
const {
  getUsers,
  getUserById,
  getUserMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/', auth, getUsers);
userRoutes.get('/me', auth, getUserMe);
userRoutes.get('/:id', validateId, auth, getUserById);
userRoutes.patch('/me', validateUpdateUser, auth, updateUser);
userRoutes.patch('/me/avatar', validateUpdateAvatar, auth, updateAvatar);

module.exports = userRoutes;
