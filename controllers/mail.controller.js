const nodeMailer = require("../_helpers/node.mailer");

module.exports = {
  controllerSendMail,
};

function controllerSendMail(name, email, confirmationcode) {
  nodeMailer.sendMail(name, email, confirmationcode);
}
