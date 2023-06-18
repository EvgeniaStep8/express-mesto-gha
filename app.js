const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
