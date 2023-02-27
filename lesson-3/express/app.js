const express = require("express")
const cors = require("cors")
const books = require("./books")
const app = express()

// app.get("/", (request, response) => {
//   const { url, method, headers } = request
//   console.log({ url, method, headers })
//   console.log("REceived request")
// })

//Використовуємо пакет CORS щоб дозволити запити з інших доменів
app.use(cors())

// За допомоги app.use створюємо middleware, доступну для всіх запитів
app.use((req, res, next) => {
  console.log("I'm middleware")
  //Не забуваємо викликати next() для передачі запиту далі
  next()
})

// Endpoint, у нашому випадку /books - завжди іменник в множині
app.get("/books", (req, res) => {
  // res.send("<h2>Books page</h2>") - res.send зазвичай використовуємо для відправки HTML
  res.json(books) // Для відправки даних - використовуємо res.json()
  // res.json(null) - res.json(null) поверне у відповіді null, res.send(null) - нічого
  // console.log("I'm from books")
})

/*
Вказуємо в URL /api для запитів, які пов'язані з роботою з даними
api/v1/ - також вказується версія API
*/
app.get("/api/v1/books", (req, res) => {
  res.json(books)
})

//Мідлвари також можуть використовуватись для обробки неіснуючих запитів
app.use((req, res) => {
  res.json("Not Found")
})

app.listen(3000)
