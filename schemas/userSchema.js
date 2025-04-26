import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
  }),
  password_hash: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().required(),
  is_author: Joi.boolean().default(false),
  is_user: Joi.boolean().default(false),
  is_admin: Joi.boolean().default(false),
  created_at: Joi.date().iso(),
  updated_at: Joi.date().iso(),
});

export default userSchema;
