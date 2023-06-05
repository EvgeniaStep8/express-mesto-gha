import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', userRouter);

// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
