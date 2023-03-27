const { Schema, model } = require("mongoose")

//додати необхідні поля з опису ДЗ
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { versionKey: false, timestamps: true }
)

const User = model("user", userSchema)

module.exports = User
