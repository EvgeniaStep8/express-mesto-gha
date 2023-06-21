const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cokieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const { validateCreateUser, validateLogin } = require('./middleware/validation');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cokieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);
app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
