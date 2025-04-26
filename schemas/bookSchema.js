import Joi from "joi";

const bookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title is required",
  }),
  authors: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(1000).required(),
  cover: Joi.string().uri().required(),
  published_year: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required(),
});

export default bookSchema;
