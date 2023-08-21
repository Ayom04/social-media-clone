const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (email, subject, message) => {
    const msg = {
        to: email,
        from: process.env.EMAIL_SENDER, // Use the email address or domain you verified above
        subject: subject,
        text:message,
       };
    sendGrid
        .send(msg)
        .then(() => { })
        .catch((error) => { })
   
}
module.exports = sendEmail;