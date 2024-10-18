"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
// import dotenv from 'dotenv';
// dotenv.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transporter = nodemailer_1.default.createTransport({
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
const sendPasswordResetEmail = async (email) => {
    try {
        console.log(`Begäran om lösenordsåterställning för e-post: ${email}`);
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        // Kontrollera att JWT_SECRET är definierad
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, jwtSecret, {
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
    }
    catch (error) {
        throw new Error(`Error sending password reset email: ${error}`);
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
