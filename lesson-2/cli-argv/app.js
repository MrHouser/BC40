const books = require("./books")

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "getAll":
      const allBooks = await books.getAll()
      console.log(allBooks)
      break
    case "getById":
      const book = await books.getById(id)
      console.log(book)
      break
    case "add":
      const newBook = await books.add(title, author)
      console.log(newBook)
      break
    case "updateById":
      const updatedBook = await books.updateById({ id, title, author })
      console.log(updatedBook)
      break
    case "deleteById":
      const deletedBook = await books.deleteById(id)
      console.log(deletedBook)
      break
  }
}

const actionIndex = process.argv.indexOf("--action")
if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1]
  invokeAction({ action })
}
