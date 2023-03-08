//qweqwe123
const mongoose = require("mongoose")
require("dotenv").config()

const { DB_HOST } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => {
    console.log(err.message)
  })
