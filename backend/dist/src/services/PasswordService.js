"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resetPassword = async (token, newPassword) => {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await UserModel_1.default.findById(decoded.id);
        if (!user) {
            throw new Error("User not found");
        }
        const salt = await bcrypt_1.default.genSalt(10);
        user.password = await bcrypt_1.default.hash(newPassword, salt);
        await user.save();
        console.log("Lösenord har återställts framgångsrikt");
        return { message: "Password has been reset successfully" };
    }
    catch (error) {
        throw new Error(`Error resetting password: ${error.message}`);
    }
};
exports.resetPassword = resetPassword;
