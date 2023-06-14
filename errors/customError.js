class CustomError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = "";
  }
}

module.exports = CustomError;
