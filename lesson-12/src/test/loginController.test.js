const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config()

const app = require("../app")

const { DB_HOST, PORT = 3000 } = process.env

describe("test auth routes", () => {
  let server
  beforeAll(async () => {
    server = app.listen(PORT)
    await mongoose.connect(DB_HOST)
  })
  afterAll(async () => {
    server.close()
    await mongoose.disconnect()
  })

  test("test login route", async () => {
    const loginUser = {
      email: "test@mail.com",
      password: "qweqwe",
    }

    const response = await request(app).post("/api/auth/login").send(loginUser)
    expect(response.statusCode).toBe(200)
    const { body } = response
    expect(body.token).toBeTruthy()
  })
})
