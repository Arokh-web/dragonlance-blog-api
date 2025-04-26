import Joi from "joi";

const characterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(500).required(),
  image: Joi.string().uri().required(),
});

export default characterSchema;
