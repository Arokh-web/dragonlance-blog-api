// This validates REQUESTS against a given schema using Joi

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    next();
  };
}
export default validateSchema;
