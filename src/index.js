/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const readlineSync = require('readline-sync')
require('dotenv').config()

function main() {
  const templateMail = fs.readFileSync(
    path.join(__dirname, '..', 'templates', '1', 'index.html'),
    'utf8'
  )
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
    html: templateMail,
    attachments: [
      {
        filename: 'logo_re_ani.gif',
        path: './templates/1/images/logo_re_ani.gif',
        cid: 'logoGif'
      },
      {
        filename: 'Hero_bg.jpg',
        path: './templates/1/images/Hero_bg.jpg',
        cid: 'cellphone'
      },
      {
        filename: '1.png',
        path: './templates/1/images/1.png',
        cid: 'firstImg'
      },
      {
        filename: '2.png',
        path: './templates/1/images/2.png',
        cid: 'secondImg'
      },
      {
        filename: '3.png',
        path: './templates/1/images/3.png',
        cid: 'thirdImg'
      },
      {
        filename: 'logo.png',
        path: './templates/1/images/logo.png',
        cid: 'logo'
      },
      {
        filename: 'facebook@2x.png',
        path: './templates/1/images/facebook@2x.png',
        cid: 'facebook'
      },
      {
        filename: 'twitter@2x.png',
        path: './templates/1/images/twitter@2x.png',
        cid: 'twitter'
      },
      {
        filename: 'instagram@2x.png',
        path: './templates/1/images/instagram@2x.png',
        cid: 'instagram'
      },
      {
        filename: 'linkedin@2x.png',
        path: './templates/1/images/linkedin@2x.png',
        cid: 'linkedin'
      }
    ]
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
