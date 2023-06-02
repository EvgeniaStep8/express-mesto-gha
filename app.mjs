import express from 'express';
import mongoose from 'mongoose';

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
