import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { email } from "../keys.js";
const emailUser = email.user;
const emailPass = email.pass;

const transport = nodemailer.createTransport(
  smtpTransport({
    host: "admin.proprojectstudio.com",
    port: 465,
    secure: true, // use TL
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);

// verify connection configuration
function verifyEmail() {
  transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
}

function sendMail() {
  transport
    .sendMail({
      from: "no-reply@proprojectstudio.com",
      to: "hegner123@gmail.com",
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello </h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        
        </div>`,
    })
    .then((success) => console.log(success))
    .catch((err) => console.log(err));
}
export { verifyEmail, sendMail };
