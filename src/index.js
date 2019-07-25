/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const readlineSync = require('readline-sync')
require('dotenv').config()
const templateMail = fs.readFileSync(
  path.join(__dirname, '..', 'templates', '1', 'beeFree.html'),
  'utf8'
)

function main() {
  const dest = readlineSync.question('Destination: ')
  const title = readlineSync.question('Title: ')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASSWORD_MAIL
    }
  })

  const mailOptions = {
    from: process.env.USER_MAIL,
    to: dest === '' ? process.env.TEST_MAIL : dest,
    subject: title === '' ? process.env.TEST_MESSAGE : title,
    html: templateMail
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log(`Email enviado com sucesso: ${info.response}`)
    }
  })
}

module.exports = main
