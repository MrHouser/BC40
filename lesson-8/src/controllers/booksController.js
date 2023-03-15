const Book = require("../models/book")
const { RequestError } = require("../helpers")

const getAll = async (req, res, next) => {
  const result = await Book.find({}, "-createdAt -updatedAt")
  res.json(result)
}

const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await Book.findById(id)
  if (!result) {
    throw RequestError(404, "Not found")
  }
  res.json(result)
}

const add = async (req, res, next) => {
  const result = await Book.create(req.body)
  res.status(201).json(result)
}

const updateById = async (req, res, next) => {
  const { id } = req.params
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw RequestError(404, "Not Found")
  }
  res.json(result)
}

const deleteById = async (req, res, next) => {
  const { id } = req.params
  const result = await Book.findByIdAndRemove(id)
  if (!result) {
    throw RequestError(404, "Not Found")
  }
  // res.status(204).send()
  res.json({
    message: "Successfully removed",
  })
}

const updateFavoriteById = async (req, res, next) => {
  const { id } = req.params
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw RequestError(404, "Not Found")
  }
  res.json(result)
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateFavoriteById,
}
