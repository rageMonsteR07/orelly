import express, { Application, Request, Response } from "express";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "email",
    pass: "password",
  },
  logger: true,
});

const app = express();

const port = 8000;

app.get("/", async (req, res) => {
  const filePath = path.join(__dirname, "../emails/template.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    username: "Darth Vader",
  };
  const htmlToSend = template(replacements);

  const info = await transporter.sendMail({
    from: '"Sender Name" <from@example.net>',
    to: "email.address@gmail.com",
    subject: "Hello from node",
    text: "Hello world?",
    html: htmlToSend,
    headers: { "x-myheader": "test header" },
  });

  console.log("Message sent: %s", info.response);
  res.send("Hello world!");
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});


