const Joi = require("joi")

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string().valueOf("novel", "drama").required(),
  isbn: Joi.string()
    .pattern(/[0-9]{3}-[0-9]{1}-[0-9]{2}-[0-9]{6}-[0-9]{1}/)
    .required(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {
  addSchema,
  updateFavoriteSchema,
}
