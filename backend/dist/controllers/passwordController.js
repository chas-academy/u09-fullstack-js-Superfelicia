"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.requestPasswordResetController = void 0;
const emailService_1 = require("../services/emailService");
const passwordService_1 = require("../services/passwordService");
// begäran om lösenordsåterställning
const requestPasswordResetController = async (req, res) => {
    const { email } = req.body;
    try {
        await (0, emailService_1.sendPasswordResetEmail)(email);
        res.status(200).json({ message: 'Password reset link sent to your email.' });
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
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    try {
        const result = await (0, passwordService_1.resetPassword)(token, newPassword);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error in resetPasswordController: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
exports.resetPasswordController = resetPasswordController;
