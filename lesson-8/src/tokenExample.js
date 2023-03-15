const jwt = require("jsonwebtoken")

const payload = {
  id: "640f5381a504bf28f19563ff",
}
const token = jwt.sign(payload, "asdasd", { expiresIn: "1h" })
console.log(token)

const decoded = jwt.decode(token)
console.log(decoded)

try {
  const { id } = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGY1MzgxYTUwNGJmMjhmMTk1NjNmZiIsImlhdCI6MTY3ODg5NTIyOSwiZXhwIjoxNjc4ODk4ODI5fQ.QsBnhIuk7guPwXp4FT" +
      "gE6-WkbHhNUm2-CJLaOIZ7PFe",
    "asdasd"
  )
  console.log(id)
} catch (error) {
  console.log(error.message)
}
