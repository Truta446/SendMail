/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const readlineSync = require('readline-sync')
const hogan = require('hogan.js')
const templateMail = fs.readFileSync(
  path.join(__dirname, '..', 'templates', '1', 'beeFree.html'),
  'utf8'
)

function main() {
  const user = readlineSync.question('E-mail: ')
  const password = readlineSync.question('Password: ', {
    hideEchoBack: true
  })
  const dest = readlineSync.question('Destination: ')
  const title = readlineSync.question('Title: ')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: password
    }
  })

  const mailOptions = {
    from: user,
    to: dest,
    subject: title,
    html: hogan.compile(templateMail)
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
