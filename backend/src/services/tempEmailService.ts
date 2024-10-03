import User from "../models/UserModel";
// import dotenv from 'dotenv';
// dotenv.config();
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // var försiktig med tls i produktion
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendPasswordResetEmail = async (email: string) => {
  try {
    console.log(`Begäran om lösenordsåterställning för e-post: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Kontrollera att JWT_SECRET är definierad
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:3000/api/user/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password reset",
      text: `You requested a password reset. Please click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    return { message: "Password reset link sent to you email." };
  } catch (error: any) {
    throw new Error(`Error sending password reset email: ${error}`);
  }
};
