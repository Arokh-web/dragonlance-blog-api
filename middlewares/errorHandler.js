const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  process.env.NODE_ENV !== "production" && console.error(err.stack);
  res.status(statusCode || 500).json({
    error: message,
  });
};

export default errorHandler;
