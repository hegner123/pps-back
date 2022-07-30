import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { email } from "../keys.js";
const emailUser = email.user;
const emailPass = email.pass;

const transport = nodemailer.createTransport(
  smtpTransport({
    host: "mail.proprojectstudio.com",
    port: 465,
    secure: true,
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
      from: "admin@proprojectstudio.com",
      to: "test-0mskxgf6r@srv1.mail-tester.com",
      subject: "Please confirm your account",
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
      * {
        font-family: "Roboto Mono", monospace;
      }
      html {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0">
    <div
      style="background: #333333; width: 100%; min-height: 100vh; padding: 5% 0"
    >
      <div
        style="
          background: #ffffff;
          width: min-content;
          padding: 1rem;
          margin: 0 25%;
        "
      >
        <h1 style="font-size: 3rem; padding: 1rem 1rem 1rem 0; color: #333333">
          Email Verification
        </h1>
        <p
          style="
            font-size: 1rem;

            padding: 1rem 1rem 1rem 0;
            color: #333333;
          "
        >
          Thanks for creating an account on ProProject Studio ${name}! Use the
          link below to verify this email address.
        </p>
        <blockquote>
          <a
            href="https://proprojectstudio.com/user/confirm/${confirmationCode}"
            >https://proprojectstudio.com/user/confirm/${confirmationCode}</a
          >
        </blockquote>
      </div>
    </div>
  </body>
</html>


`,
    })
    .then((success) => console.log(success))
    .catch((err) => console.log(err));
}
export { verifyEmail, sendMail };
