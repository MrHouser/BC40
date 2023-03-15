const express = require("express")

const booksController = require("../../controllers/booksController")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, auth } = require("../../middlewares")
const { addSchema, updateFavoriteSchema } = require("../../schemas/books")

const router = express.Router()

router.get("/", auth, ctrlWrapper(booksController.getAll))

router.get("/:id", ctrlWrapper(booksController.getById))

router.post(
  "/",
  auth,
  validateBody(addSchema),
  ctrlWrapper(booksController.add)
)

router.put(
  "/:id",
  validateBody(addSchema),
  ctrlWrapper(booksController.updateById)
)

router.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  ctrlWrapper(booksController.updateFavoriteById)
)

router.delete("/:id", ctrlWrapper(booksController.deleteById))

module.exports = router
