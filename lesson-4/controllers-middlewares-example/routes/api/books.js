const express = require("express")

const booksController = require("../../controllers/booksController")
const { ctrlWrapper } = require("../../helpers")
const { validateBody } = require("../../middlewares")
const { addSchema } = require("../../schemas/books")

const router = express.Router()

router.get("/", ctrlWrapper(booksController.getAll))

router.get("/:id", ctrlWrapper(booksController.getById))

router.post("/", validateBody(addSchema), ctrlWrapper(booksController.add))

router.put(
  "/:id",
  validateBody(addSchema),
  ctrlWrapper(booksController.updateById)
)

router.delete("/:id", ctrlWrapper(booksController.deleteById))

module.exports = router
