import Joi from "joi";

const postSchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Title for post is required",
  }),
  content: Joi.string().alphanum().min(3).max(5000).required().messages({
    "string.empty": "Content for post is required",
  }),
  author_id: Joi.number().integer().min(1).required(),
  cover: Joi.string().uri().required().messages({
    "string.empty": "Cover image for post is required",
  }),
  date: Joi.date().iso(),
  ref_book_id: Joi.number().integer().min(1).required(),
  ref_character_id: Joi.number().integer().min(1).required(),
});

export default postSchema;
