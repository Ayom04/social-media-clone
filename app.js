const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey("SG.");

const sendEmail = (email, subject, message) => {
  console.log(email, subject, message);
  const msg = {
    to: email,
    from: "info@zulfahgroup.com", // Use the email address or domain you verified above
    subject: subject,
    text: message,
  };
  sendGrid
    .send(msg)
    .then(() => {
      console.log("email sent successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
sendEmail(
  "abdullaahyomide04@gmail.com",
  "welcome",
  "hi there, please enter your email address"
);
module.exports = sendEmail;
