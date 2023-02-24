const { program } = require("commander")
const books = require("./books")

program
  .option("--action <type>")
  .option("--id <type>")
  .option("--title <type>")
  .option("--author <type>")

program.parse()
const options = program.opts()

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

invokeAction(options)
