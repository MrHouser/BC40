const { Schema, model } = require("mongoose")

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      required: true,
      enum: ["novel", "drama"],
    },
    isbn: {
      type: String,
      required: true,
      match: /[0-9]{3}-[0-9]{1}-[0-9]{2}-[0-9]{6}-[0-9]{1}/,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
)

const Book = model("book", bookSchema)

module.exports = Book
