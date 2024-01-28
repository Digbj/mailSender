const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const cors=require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT;
// console.log(process.env.EMAIL,process.env.PASS)
app.post("/subscribe", async (req, res) => {
  const { name, email } = req.body;
  try {
    // console.log("Received subscription request:", { name, email }); 

   const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     auth: {
       user:process.env.EMAIL,
       pass:process.env.PASS,
     },
   });

   
    const mailOptions = {
      from:process.env.EMAIL,
      to: email,
      subject: "Subscription",
      text: `Hello ${name}, Thank you for subscribing`,
    };

   
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent"});
  } catch (error) {
    console.error("Error sending email:", error); 
    res
      .status(500)
      .json({ error: "Failed to send the message. Please try again." });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the home page");
});

app.listen(port, () => {
  console.log(`Server is Live At ${port}`);
});
