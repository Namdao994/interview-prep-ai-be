import env from '@configs/env'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'namdao994@gmail.com',
    pass: env.GOOGLE_APP_PASSWORD
  }
})

const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: '"Interview Prep AI" <interviewprepai@gmail.com>', // Người gửi
    to, // Người nhận
    subject, // Tiêu đề
    html // Nội dung (HTML)
  })
}

export default sendMail
