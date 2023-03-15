const bcrypt = require("bcryptjs")

const { RequestError } = require("../helpers")
const User = require("../models/user")

const register = async (req, res, next) => {
  const { email, name, password } = req.body
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw RequestError(409, `User with email: ${email} already exists`)
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })
  res.status(201).json({
    name: user.name,
    email: user.email,
  })
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    throw RequestError(401, "Invalid email")
  }
  const isPasswordValid = await bcrypt.compare(password, existingUser.password)
  if (!isPasswordValid) {
    throw RequestError(401, "Invalid password")
  }
  const token = "qrqwtfq.fdqfqwf.14fdqawsfq"
  res.json({
    token,
  })
}

module.exports = {
  register,
  login,
}
