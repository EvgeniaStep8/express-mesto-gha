const userRouter = require('express').Router();
const { getUsers, getUsersById, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUsersById);
userRouter.post('/', createUser);

module.exports = userRouter;
