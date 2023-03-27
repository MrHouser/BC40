const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config()

const app = require("app")
const { User } = require("models/user")

const { DB_TEST_HOST, PORT } = process.env

describe("test auth routes", () => {
  let server
  beforeAll(() => (server = app.listen(PORT)))
  afterAll(() => server.close())

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done())
  })

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done())
    })
  })

  test("test login route", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "qweqwe",
    }

    const user = await User.create(newUser)

    /*
        1. Перевірити правильність отриманої відповіді на 
        AJAX-запит
        2. Перевірити що в базу записався потрібний елемент.
        */

    const loginUser = {
      email: "test@mail.com",
      password: "qweqwe",
    }

    const response = await request(app).post("/api/auth/login").send(loginUser)
  })
})
