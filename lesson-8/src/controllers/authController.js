const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { RequestError } = require("../helpers")
const User = require("../models/user")

const { TOKEN_KEY } = process.env

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
  const payload = {
    id: existingUser._id,
  }
  const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: "1h" })
  await User.findByIdAndUpdate(existingUser._id, { token })
  res.json({
    token,
  })
}

const logout = async (req, res, next) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: "" })
  res.json({
    message: "Logout successful",
  })
}

module.exports = {
  register,
  login,
  logout,
}
