// contactRoute.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require("path");

console.log("Loading contactRoute:", __filename);

const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = Number(process.env.EMAIL_PORT) || 465;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_FROM;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("SMTP Error:", err);
  else console.log("SMTP ready:", success);
});

// POST /contact
router.post("/contact", async (req, res) => {
  try {
    console.log("DEBUG: /contact received body:", req.body);

    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      console.log("DEBUG: missing fields");
      return res.status(400).json({ msg: "Please fill name, email and message." });
    }

    const esc = (s = "") => String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const htmlBody = `
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <hr/>
      <p>${esc(message).replace(/\n/g, "<br/>")}</p>
    `;

    console.log("DEBUG: sending mail to:", EMAIL_TO);

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_TO,
      replyTo: email,
      subject: `New contact from ${esc(name)}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email send info:", {
      accepted: info.accepted,
      rejected: info.rejected,
      messageId: info.messageId,
      response: info.response,
    });

    return res.status(200).json({
      msg: "Message sent successfully!",
      info: { accepted: info.accepted, rejected: info.rejected },
    });
  } catch (err) {
    console.error("contactRoute send error:", err);
    return res.status(500).json({ msg: "Failed to send message. Try again later." });
  }
});

// GET /test-email (keep for quick testing)
router.get("/test-email", async (req, res) => {
  try {
    console.log("DEBUG: /test-email called");
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: "Test email from backend",
      text: "This is a test email from backend.",
      html: "<p>This is a test email from backend.</p>",
    });
    console.log("Test email info:", { accepted: info.accepted, rejected: info.rejected, response: info.response });
    return res.send("Test email attempted — check server logs and inbox/spam.");
  } catch (err) {
    console.error("Test email error:", err);
    return res.status(500).send("Test email failed. Check server logs.");
  }
});

module.exports = router;
