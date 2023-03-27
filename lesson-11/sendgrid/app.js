const sgMail = require("@sendgrid/mail")
require("dotenv").config()

const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const mail = {
  to: "test@mail.com",
  from: "boykoroman94@gmail.com",
  subject: "New letter",
  html: "<p>New letter you got</p>",
}

sgMail
  .send(mail)
  .then(() => console.log("Mail send successfully"))
  .catch((error) => console.log(error.message))
