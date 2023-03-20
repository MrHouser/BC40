const express = require("express")
const { ctrlWrapper } = require("../../helpers")
const authController = require("../../controllers/authController")
const { validateBody, auth, upload } = require("../../middlewares")
const { registerSchema, loginSchema } = require("../../schemas/auth")

const router = express.Router()

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(authController.register)
)

router.post(
  "/login",
  validateBody(loginSchema),
  ctrlWrapper(authController.login)
)

router.get("/logout", auth, ctrlWrapper(authController.logout))

// router.patch(
//   "/avatars",
//   auth,
//   upload.single("avatar"),
//   ctrlWrapper(authController.avatars)
// )

module.exports = router
