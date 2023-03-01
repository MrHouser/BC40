const express = require("express")
const Joi = require("joi")

const books = require("../../models/books")
const { RequestError } = require("../../helpers")

const router = express.Router()

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await books.getAll()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    })
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await books.getById(id)
    if (!result) {
      throw RequestError(404, "Not found")
      // const error = new Error("Not found")
      // error.status = 404
      // throw error
      // return res.status(404).json({
      //   message: "Not found",
      // })
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const result = await books.add(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const { id } = req.params
    const result = await books.updateById({ ...req.body, id })
    if (!result) {
      throw RequestError(404, "Not Found")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await books.deleteById(id)
    if (!result) {
      throw RequestError(404, "Not Found")
    }
    // res.status(204).send()
    res.json({
      message: "Successfully removed",
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
