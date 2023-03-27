const express = require("express")
const { ctrlWrapper } = require("../../helpers")
const authController = require("../../controllers/authController")
const { validateBody, auth } = require("../../middlewares")
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

// створити GET-ендпоінт /users/verify/:verificationToken

// створити POST-ендпоінт для повторної відправки листа на імейл для верифікації - POST /users/verify

// router.patch(
//   "/avatars",
//   auth,
//   upload.single("avatar"),
//   ctrlWrapper(authController.avatars)
// )

module.exports = router
