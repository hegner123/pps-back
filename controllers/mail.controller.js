import { sendConfirmationEmail } from "../_helpers/node.mailer.js";

const message = {
  from: "admin@proprojectstudio.com",
  to: "hegner123@gmail.com",
  subject: "Test Message from ProProjectStudio",
  text: "Test Message from ProProjectStudio",
  html: "<h1>Test Message from ProProjectStudio</h1>",
};

function controllerSendMail() {
  sendConfirmationEmail(message);
}

export { controllerSendMail };
