const express = require("express");
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/contact", async (req, res) => {
  console.log(req.query);

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: testAccount, // sender address
    to: req.query.email, // list of receivers
    subject: req.query.subject, // Subject line
    text: req.query.message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.send("thanks");
});

app.listen(port, () => {
  console.log(`TutorMaster app listening at http://localhost:${port}`);
});
