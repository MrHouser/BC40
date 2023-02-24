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

// invokeAction("getAll")
// invokeAction({ action: "getById", id: "YxhM4QDxPeA3SmPHcEZPJ1" })
// invokeAction({ action: "add", title: "Mikelangelo", author: "Creation" })
// invokeAction({
//   action: "updateById",
//   title: "Donatello",
//   author: "Destruction",
//   id: "f47ba4e0-39eb-448a-b7df-e67df172f017",
// })
invokeAction({
  action: "deleteById",
  id: "f47ba4e0-39eb-448a-b7df-e67df172f017",
})
