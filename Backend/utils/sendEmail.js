import dotenv from "dotenv";
dotenv.config(); // 🔥 REQUIRED HERE

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify once
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

export const sendEmail = async ({ name, email, message }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "📩 New Contact Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  });
};
