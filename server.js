const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from "public" directory
app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.send("Server is running!");
//   });
  

// POST route to handle form submission
app.post("/send-email", async (req, res) => {
  const { fullname, email, number, service, additionalinfo } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com",
    subject: `New Inquiry from ${fullname}`,
    text: `Name: ${fullname}\nEmail: ${email}\nContact: ${number}\nService: ${service}\nAdditional Info: ${additionalinfo}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
