const router = require('express').Router();
const auth = require('../middleware/auth');
const userRoutes = require('./users');
const cardRoutes = require('./card');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);
router.use('*', (req, res, next) => next(new NotFoundError('Указан несуществующий маршрут')));

module.exports = router;
