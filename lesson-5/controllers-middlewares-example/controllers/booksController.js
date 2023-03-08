const books = require("../models/books")
const { RequestError } = require("../helpers")

const getAll = async (req, res, next) => {
  const result = await books.getAll()
  res.json(result)
}

const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await books.getById(id)
  if (!result) {
    throw RequestError(404, "Not found")
  }
  res.json(result)
}

const add = async (req, res, next) => {
  console.log(req.body)
  const result = await books.add(req.body)
  res.status(201).json(result)
}

const updateById = async (req, res, next) => {
  const { id } = req.params
  const result = await books.updateById({ ...req.body, id })
  if (!result) {
    throw RequestError(404, "Not Found")
  }
  res.json(result)
}

const deleteById = async (req, res, next) => {
  const { id } = req.params
  const result = await books.deleteById(id)
  if (!result) {
    throw RequestError(404, "Not Found")
  }
  // res.status(204).send()
  res.json({
    message: "Successfully removed",
  })
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
}
