const nodeMailer = require("../_helpers/node.mailer");

module.exports = {
  controllerSendMail,
};

const message = {
  from: "admin@proprojectstudio.com",
  to: "hegner123@gmail.com",
  subject: "Test Message from ProProjectStudio",
  text: "Test Message from ProProjectStudio",
  html: "<h1>Test Message from ProProjectStudio</h1>",
};

function controllerSendMail() {
  nodeMailer.sendMail(message);
}
