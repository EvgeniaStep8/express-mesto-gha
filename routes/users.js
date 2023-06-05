import express from 'express';
import { getUsers, getUsersById, createUser } from '../controllers/users.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUsersById);
userRouter.post('/', createUser);

export default userRouter;
