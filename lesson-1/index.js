const fs = require("fs").promises

// const { foo, getDate } = require("./utils")
// const bar = require("cors")

// const result = getDate()
// console.log(result)
// console.log(foo)
// console.log(baz)

// const getText = async () => {
//   const text = await fs.readFile("./files/file.txt", "utf-8")
//   console.log(text)
// }

// getText()

// fs.readFile("./files/file.txt", "utf-8")
//   .then((data) => console.log(data))
// fs.appendFile("./files/file.txt", "\nfrom Node.js").then((data) =>
//   console.log(data)
// )

// fs.writeFile("./files/file.txt", "Hello students")

const filePath = "./files/file.txt"
const encoding = "utf-8"
const newString = "\nHello Node.js"
const replaceString = "Oh, Hi Mark!"

const readText = async (path, enc) => {
  const text = await fs.readFile(path, enc)
  console.log(text)
}

const addText = async (path, text, enc) => {
  const result = await fs.appendFile(path, text)
  console.log("result:", result)
  readText(path, enc)
}

const rewriteText = async (path, text, enc) => {
  const result = await fs.writeFile(path, text)
  console.log("result:", result)
  readText(path, enc)
}

readText(filePath, encoding)
// addText(filePath, newString, encoding)
// rewriteText(filePath, replaceString, encoding)
