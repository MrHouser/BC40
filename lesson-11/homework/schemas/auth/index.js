const Joi = require("joi")

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
    .required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
    .required(),
  password: Joi.string().min(6).required(),
})

//створити нову схему для повторної відправки листа

module.exports = {
  registerSchema,
  loginSchema,
}
