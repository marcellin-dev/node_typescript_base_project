import Joi, { valid } from "joi";

const regexPassword = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@*?#_\-=+]).{8,20}$/
);
const createUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  investor: Joi.string().required(),
  password: Joi.string().required().pattern(regexPassword),
  role: Joi.string().valid("user", "editor", "admin"),
});

const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserValidationSchema = Joi.object({
  role: Joi.string(),
  isDelete: Joi.boolean(),
});

const adminUpdateUserValidationSchema = Joi.object({
  email: Joi.string().email(),
  isDelete: Joi.boolean(),
  role: Joi.string().valid("user", "editor", "admin"),
});

const resetPasswordUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  code: Joi.string().required(),
});

const validateUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
});

export {
  createUserValidationSchema,
  loginUserValidationSchema,
  updateUserValidationSchema,
  adminUpdateUserValidationSchema,
  resetPasswordUserValidationSchema,
  validateUserValidationSchema,
};
