import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "user").default("user"),
  created_at: Joi.date().iso(),
  updated_at: Joi.date().iso(),
});

export default userSchema;
