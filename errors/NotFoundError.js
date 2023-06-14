class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 404;
  }
}

module.exports = NotFoundError;
