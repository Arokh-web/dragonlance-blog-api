import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Username is required",
    })
    .required(),
  password_hash: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.empty": "Password is required",
    })
    .required(),
  email: Joi.string()
    .email()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"))
    .messages({
      "string.empty": "E-Mail is required",
    })
    .required(),
  is_author: Joi.boolean().default(false),
  is_user: Joi.boolean().default(false),
  is_admin: Joi.boolean().default(false),
});

export default userSchema;
