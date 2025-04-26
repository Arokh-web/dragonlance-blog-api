import Joi from "joi";

const postSchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().alphanum().min(3).max(30).required(),
  author_id: Joi.number().integer().min(1).required(),
  cover: Joi.string().uri().required(),
  date: Joi.date().iso(),
  ref_book_id: Joi.number().integer().min(1).required(),
  ref_character_id: Joi.number().integer().min(1).required(),
  created_at: Joi.date().iso(),
  updated_at: Joi.date().iso(),
});

export default postSchema;
