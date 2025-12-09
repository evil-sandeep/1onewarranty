// careerRoute.js  (replace contactRoute.js with this file)
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

console.log("Loading careerRoute:", __filename);

// ----------------------
// Multer: memory storage (we attach file as email attachment, no disk write)
// ----------------------
const storage = multer.memoryStorage();

// Recommended: file type & size limits
const allowedExt = [".pdf", ".doc", ".docx"];
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExt.includes(ext)) return cb(null, true);
    const err = new Error("Only .pdf, .doc and .docx files are allowed.");
    err.code = "INVALID_FILE_TYPE";
    return cb(err);
  },
});

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

// ----------------------
// POST /career
// Expects multipart/form-data with fields:
//  - name (text), email (text), message (text), resume (file field name 'resume')
// ----------------------
// IMPORTANT: upload.single('resume') must be present so multer parses form-data
router.post("/career", upload.single("resume"), async (req, res) => {
  try {
    // After multer runs:
    // - req.body contains text fields (name, email, message)
    // - req.file contains the uploaded resume (in memory)
    console.log("DEBUG: /career received body:", req.body);
    console.log("DEBUG: file object:", req.file ? req.file.originalname : "no file");

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      console.log("DEBUG: missing fields");
      return res.status(400).json({ msg: "Please fill name, email and message." });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "Resume file is required." });
    }

    const resumeFile = req.file; // buffer, originalname, mimetype

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
      subject: `New Career Application from ${esc(name)}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nResume attached.`,
      html: htmlBody,
      attachments: [
        {
          filename: resumeFile.originalname,
          content: resumeFile.buffer,
          contentType: resumeFile.mimetype,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email send info:", {
      accepted: info.accepted,
      rejected: info.rejected,
      messageId: info.messageId,
      response: info.response,
    });

    return res.status(200).json({
      msg: "Application submitted successfully!",
      info: { accepted: info.accepted, rejected: info.rejected },
    });
  } catch (err) {
    console.error("careerRoute send error:", err);

    // multer file/type errors
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ msg: "Resume file too large (max 5MB)." });
    }
    if (err && err.code === "INVALID_FILE_TYPE") {
      return res.status(400).json({ msg: err.message });
    }

    return res.status(500).json({ msg: "Failed to send message. Try again later." });
  }
});

module.exports = router;
