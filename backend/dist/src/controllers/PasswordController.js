"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPasswordController = exports.updateUserPasswordController = exports.resetPasswordController = exports.requestPasswordResetController = void 0;
const EmailService_1 = require("../services/EmailService");
const PasswordService_1 = require("../services/PasswordService");
const UserService_1 = require("../services/UserService");
// begäran om lösenordsåterställning
const requestPasswordResetController = async (req, res) => {
    const { email } = req.body;
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return res.status(400).json({ message: "Invalid email address." });
    }
    try {
        await (0, EmailService_1.sendPasswordResetEmail)(email);
        console.log(`Password reset link sent to: ${email}`);
        res
            .status(200)
            .json({ message: "Password reset link sent to your email." });
    }
    catch (error) {
        console.error(`Error in requestPasswordResetController: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
exports.requestPasswordResetController = requestPasswordResetController;
// återställning av lösenord
const resetPasswordController = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
    }
    try {
        const result = await (0, PasswordService_1.resetPassword)(token, newPassword);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error in resetPasswordController: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
exports.resetPasswordController = resetPasswordController;
// kontroll för att uppdatera lösenord
const updateUserPasswordController = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
    }
    try {
        const updatedUser = await (0, UserService_1.updateUserPassword)(id, currentPassword, newPassword);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Password updated successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                roles: updatedUser.roles,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUserPasswordController = updateUserPasswordController;
// reset user lösenord som admin
const resetUserPasswordController = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
    }
    try {
        // byt namn på const updatedUser till något med reset imorgon
        const updatedUser = await (0, UserService_1.resetUserPassword)(id, newPassword);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Password reset successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                roles: updatedUser.roles,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.resetUserPasswordController = resetUserPasswordController;
