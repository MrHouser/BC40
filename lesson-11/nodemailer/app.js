const nodemailer = require("nodemailer")
require("dotenv").config()

const { META_PASSWORD } = process.env

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: "boykoroman94@meta.ua",
    pass: META_PASSWORD,
  },
}

const transport = nodemailer.createTransport(nodemailerConfig)

const mail = {
  to: "test@mail.com",
  from: "boykoroman94@meta.ua",
  subject: "New letter",
  html: "<p>New letter</p>",
}

transport
  .sendMail(mail)
  .then(() => console.log("Mail send"))
  .catch((err) => console.log(err.message))
