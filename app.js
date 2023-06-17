const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { login } = require('./controllers/users');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '647efc0e3cfa8be4173af82e',
  };

  next();
});

app.post('/signin', login);

app.use(router);
app.use(errorHandler);

// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
