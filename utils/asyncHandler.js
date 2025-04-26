// This is a utility function to handle async errors in Express.js
// It wraps the async function and catches any errors, passing them to the next middleware

const asyncHandler = function (fn) {
    return function (req, res, next) {
      return Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
   
  export default asyncHandler;