"use strict";
// userController ansvarar för att hantera HTTP-förfrågningar
// och skicka svar tillbaka till klienten.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.resetUserPasswordController = exports.updateUserPasswordController = exports.updateUserController = exports.getUsersController = exports.createUserController = void 0;
const userService_1 = require("../services/userService");
const validRoles = ["user", "admin", "superadmin"];
// create
const createUserController = async (req, res) => {
    const { name, email, password, roles } = req.body;
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if (roles && !validRoles.includes(roles)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    try {
        const existingUser = await (0, userService_1.findUserByEmail)(email);
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email does already exist." });
        }
        const newUser = await (0, userService_1.createUser)(name, email, password, roles);
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            roles: newUser.roles,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
exports.createUserController = createUserController;
// get all
const getUsersController = async (req, res) => {
    try {
        const users = await (0, userService_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getUsersController = getUsersController;
// update
const updateUserController = async (req, res) => {
    const { id, name, email, roles } = req.body;
    console.log(req.body);
    if (roles && !validRoles.includes(roles)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    try {
        // Hitta och uppdatera användaren baserat på _id
        const updatedUser = await (0, userService_1.updateUser)(id, name, email, roles);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // vi får tillbaka det uppdaterade json-objektet
        res.status(200).json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            roles: updatedUser.roles,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
exports.updateUserController = updateUserController;
// kontroll för att uppdatera lösenord
const updateUserPasswordController = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    try {
        const updatedUser = await (0, userService_1.updateUserPassword)(id, currentPassword, newPassword);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: 'Password updated successfully',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                roles: updatedUser.roles,
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUserPasswordController = updateUserPasswordController;
// reset user lösenord
const resetUserPasswordController = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    try {
        // byt namn på const updatedUser till något med reset imorgon
        const updatedUser = await (0, userService_1.resetUserPassword)(id, newPassword);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: 'Password reset successfully',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                roles: updatedUser.roles,
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.resetUserPasswordController = resetUserPasswordController;
// delete
const deleteUserController = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const deletedUser = await (0, userService_1.deleteUser)(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found " });
        }
        console.log("User deleted successfully", deletedUser);
        res.status(200).json({ message: "User deleted successfully: ", id });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.deleteUserController = deleteUserController;
