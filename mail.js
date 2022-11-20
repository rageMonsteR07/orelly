const express = require("express");

const app = express();

const bodyParser = require("cookie-parser");

app.use(bodyParser({ extended: true }));

app.use(express.json());

const nodemailer = require("nodemailer");

async function main(addressesList) {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "herculesproject7@outlook.com",
      pass: "hercules7@7",
    },
  });

  await transporter.sendMail(
    {
      from: "herculesproject7@outlook.com",
      to: addressesList,
      subject: "Booking Confirmation",
      html: {
        path: "index.html",
      }, // html body
    },
    (err, inf) => {
      console.log(err);
      console.log(inf);
    }
  );
}

app.get("/", (req, res) => {
  res.send("<h1> Hello World");
});

app.post("/sendEmail", async (req, res) => {
  try {
    console.log(req.body);

    const addressesList = req.body.addressList;

    console.log(addressesList);

    res.json({
      message: "Your Bookings is Confirmed, Email is sent successfully.",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({ err: "Something Went Wrong ", status: 501 });
  }
});

app.listen(4000, () => {
  console.log(`App is running on Port : 4000`);
});
