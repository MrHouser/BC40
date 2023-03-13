// ENCODED
// string => algorithm + secret => encodedString
// encodedString => algorithm + secret => string

// Hash
// string => hashing + salt => hashedString

const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  // console.log(hashedPassword)

  const isValid = await bcrypt.compare("qweqwr", hashedPassword)
  console.log(isValid)
}

hashPassword("qweqwe")
