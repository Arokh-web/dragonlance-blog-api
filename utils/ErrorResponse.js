// This is an extension of the ErrorResponse class to handle errors in a more structured way
// This class extends the built-in Error class to create a custom error response

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
