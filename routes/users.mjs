import Router from 'express';
import { getUsers, getUsersById } from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUsersById);

export default userRouter;
