const fs = require("fs/promises")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const booksPath = path.join(__dirname, "books.json")

const updateBooks = async (books) =>
  await fs.writeFile(booksPath, JSON.stringify(books))

const getAll = async () => {
  const books = await fs.readFile(booksPath, "utf-8")
  return JSON.parse(books)
}

const getById = async (id) => {
  const books = await getAll()
  const book = books.find((b) => b.id === id)
  return book || null
}

const add = async (title, author) => {
  const books = await getAll()
  const newBook = {
    id: uuidv4(),
    title,
    author,
  }
  books.push(newBook)
  updateBooks(books)
  return newBook
}

const updateById = async ({ id, title, author }) => {
  const books = await getAll()
  const index = books.findIndex((b) => b.id === id)
  if (index === -1) {
    return null
  }
  books[index] = { id, title, author }
  await updateBooks(books)
  return books[index]
}

const deleteById = async (id) => {
  const books = await getAll()
  const index = books.findIndex((b) => b.id === id)
  if (index === -1) {
    return null
  }
  const [deletedBook] = books.splice(index, 1)
  await updateBooks(books)
  return deletedBook
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
}
