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
  // створити токен верифікації verificationToken і зберегти його в базі
  const user = await User.create({ name, email, password: hashedPassword })
  // створити і відправити імейл
  /*
  const mail = {
    to: email,
    subject: 'Verify your email',
    html: `<a target='_blank' href='http://localhost:3000/api/auth//${verificationToken}'>Verify</a>`
  }

  sendEmail(mail)
  */
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
  //додати перевірку що користувач верифікований - !existingUser.verify
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

const avatars = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { path: tempDir, originalname } = req.file
    const [extention] = originalname.split(".").reverse()
    const newFileName = `${id}.${extention}`
    const avatarURL = path.join("avatars", newFileName)
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({ avatarURL })
    //123123-123312-12312.png
  } catch (error) {
    await fs.unlink(req.file.path)
    next(error)
  }
}

//створити контроллер для GET ендпоінту
/*
1. знайти користувача по токену з запиту 
2. якщо його немає прокинути помилку 
3. якщо він є - встановити verify - true, verificationToken = ''
4. відправити респонс
*/

//створити контроллер для POST ендпоінту для повторної відправки імейлу
/*
1. знайти користувача по імейлу
2. якщо немає користувача - прокинути помилку
3. якщо вже верифікований користувач - прокинути помилку
4. відправити листа з токеном з БД - user.verificationToken
*/

module.exports = {
  register,
  login,
  logout,
  avatars,
}
