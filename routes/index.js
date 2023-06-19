const router = require('express').Router();
const { validateAuth } = require('../middleware/validation');
const auth = require('../middleware/auth');
const userRoutes = require('./users');
const cardRoutes = require('./card');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', validateAuth, auth, userRoutes);
router.use('/cards', validateAuth, auth, cardRoutes);
router.use('*', (req, res, next) => next(new NotFoundError('Указан несуществующий маршрут')));

module.exports = router;
