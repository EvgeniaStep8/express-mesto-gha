// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).send({ message: err.message });
};
