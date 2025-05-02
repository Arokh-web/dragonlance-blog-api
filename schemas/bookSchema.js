import Joi from "joi";

const bookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title of book is required",
  }),
  authors: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .messages({
      "array.empty": "Authors of book is required",
    })
    .required(),
  description: Joi.string().min(3).max(1000).required().messages({
    "string.empty": "Description of book is required",
  }),
  cover: Joi.string().uri().required().messages({
    "string.empty": "Cover of book is required",
  }),
  published_year: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "string.empty": "Year of publication of book is required",
    }),
});

export default bookSchema;
