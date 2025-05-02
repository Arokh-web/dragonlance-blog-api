import Joi from "joi";

const characterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name of character is required",
  }),
  description: Joi.string().min(3).max(500).required().messages({
    "string.empty": "Description of character is required",
  }),
  image: Joi.string().uri().required().messages({
    "string.empty": "Image of character is required",
  }),
});

export default characterSchema;
